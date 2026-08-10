/*
 * Copyright: 2026 SAP SE or an SAP affiliate company
 * License: Apache-2.0
 */

/**
 * Entry point for the Commerce Serverless Function.
 *
 * Validates product quantities against configured restrictions. Implements the
 * specification of extension points beforeCartCreation and beforePerformCartOperations.
 *
 * @param {object} extensionPointRequest - The request payload of the extension point
 * @param {object} functionConfiguration - Product quantity restrictions configured via the
 *   Functions UI or Functions API. This parameter is automatically populated by the Commerce
 *   system at runtime based on the function configuration.
 *   Example: { "BK-211-M": "2" }
 * @returns {object} The response payload for the extension point - error object if violation
 *   found, empty object otherwise
 */
export const handler = (extensionPointRequest, functionConfiguration) => {
  const productQuantities = aggregateQuantities(extensionPointRequest);
  const productRestrictions = getProductRestrictions(functionConfiguration);
  
  return validateProductQuantities(productQuantities, productRestrictions);
};

/**
 * Gets product restrictions from configuration.
 *
 * Configuration parameter is a plain object mapping product IDs to quantity limits:
 * - Key: Product ID (string)
 * - Value: Quantity limit (string, will be converted to number)
 *
 * Example configuration:
 * {
 *   "BK-135": "5",
 *   "BK-9000": "7"
 * }
 *
 * @param {object} functionConfiguration - Object of productId → quantityLimit from CSF configuration
 * @returns {object} Product restrictions with numeric quantity limits, or empty object if no configuration
 */
function getProductRestrictions(functionConfiguration) {
  if (!functionConfiguration || Object.keys(functionConfiguration).length === 0) {
    console.log('No product restrictions configured');
    return {};
  }

  return Object.fromEntries(
    Object.entries(functionConfiguration).map(([key, value]) => [key, Number(value)])
  );
}

/**
 * Aggregates product quantities from extension point request.
 * 
 * Starts with existing cart state if present, then applies all operations.
 * 
 * @param {object} extensionPointRequest - The request payload of the extension point
 * @returns {object} Map of product IDs to their total quantities
 */
function aggregateQuantities(extensionPointRequest) {
  const cart = extensionPointRequest.data?.cart;
  const operations = extensionPointRequest.apiContext?.operations ?? [];
  
  // Step 1: Load initial cart state from existing entries (empty for cart creation)
  const quantities = {};
  const entryToProduct = {};

  if (cart?.entries) {
    for (const entry of cart.entries) {
      quantities[entry.productId] = entry.quantity;
      entryToProduct[entry.id] = entry.productId;
    }
  }

  // Step 2: Apply operations to modify quantities
  for (const operation of operations) {
    const { operationId, data } = operation;

    switch (operationId) {
      case 'addToCart': {
        const { productId, quantity } = data;
        quantities[productId] = (quantities[productId] ?? 0) + quantity;
        break;
      }

      case 'updateCartEntry': {
        const productId = entryToProduct[data.entryId];
        if (productId) {
          quantities[productId] = data.quantity;
        }
        break;
      }

      case 'deleteCartEntry': {
        const productId = entryToProduct[data.entryId];
        if (productId) {
          delete quantities[productId];
        }
        break;
      }

      default:
        break;
    }
  }

  return quantities;
}

/**
 * Validates product quantities against configured restrictions.
 * 
 * @param {object} productQuantities - Map of product IDs to their total quantities
 * @param {object} productRestrictions - Map of product IDs to their quantity limits
 * @returns {object} Error object if violation found, otherwise empty object
 */
function validateProductQuantities(productQuantities, productRestrictions) {
  for (const [productId, quantityLimit] of Object.entries(productRestrictions)) {
    if (productQuantities[productId] > quantityLimit) {
      return createViolationError(productId, quantityLimit);
    }
  }
  return {};
}

/**
 * Creates an error response for quantity violations.
 * 
 * @param {string} productId - The ID of the product that violates the restriction
 * @param {number} quantityLimit - The maximum quantity allowed for this product
 * @returns {object} Error response object following Commerce Cloud error format
 */
function createViolationError(productId, quantityLimit) {
  console.log(`Restricting operation on product with ID ${productId} because of a quantity restriction in the cart set to ${quantityLimit} for this product.`);
  
  // The details array provides structured data for the frontend, e.g. to build a localized error message with the product name
  return {
    error: {
      code: "quantity_limit_exceeded",
      message: `The product with ID ${productId} has a quantity restriction in the cart set to ${quantityLimit}.`,
      details: [
        {
          code: "product_quantity_limit",
          message: productId,
          target: "productId"
        },
        {
          code: "max_quantity_allowed",
          message: String(quantityLimit),
          target: "quantity"
        }
      ]
    }
  };
}
