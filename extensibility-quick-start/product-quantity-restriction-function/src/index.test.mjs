/*
 * Copyright: 2026 SAP SE or an SAP affiliate company
 * License: Apache-2.0
 */

import { handler } from './index.mjs';

describe('Product Quantity Restriction Function', () => {
  
  it('should allow when quantity is within limit', () => {
    // given
    const functionConfiguration = { "PROD-001": "5" };
    const input = {
      apiContext: {
        operations: [
          {
            operationId: "addToCart",
            data: { productId: "PROD-001", quantity: 2 }
          }
        ]
      },
      data: {
        cart: {
          entries: [
            { id: "entry-1", productId: "PROD-001", quantity: 2 }
          ]
        }
      }
    };
    
    // when
    const result = handler(input, functionConfiguration);

    // then
    expect(result).toEqual({});
  });

  it('should reject when addToCart operation exceeds limit', () => {
    // given
    const functionConfiguration = { "PROD-001": "5" };
    const input = {
      apiContext: {
        operations: [
          {
            operationId: "addToCart",
            data: { productId: "PROD-001", quantity: 3 }  // 3 + 3 = 6 > 5
          }
        ]
      },
      data: {
        cart: {
          entries: [
            { id: "entry-1", productId: "PROD-001", quantity: 3 }
          ]
        }
      }
    };
    
    // when
    const result = handler(input, functionConfiguration);

    // then
    expect(result).toHaveProperty("error");
    expect(result.error.code).toBe("quantity_limit_exceeded");
    expect(result.error.message).toContain("PROD-001");
    expect(result.error.message).toContain("5");
    expect(result.error.details).toHaveLength(2);

    // Verify productId detail
    const productIdDetail = result.error.details.find(d => d.target === "productId");
    expect(productIdDetail).toBeDefined();
    expect(productIdDetail.code).toBe("product_quantity_limit");
    expect(productIdDetail.message).toBe("PROD-001");

    // Verify quantity limit detail
    const limitDetail = result.error.details.find(d => d.target === "quantity");
    expect(limitDetail).toBeDefined();
    expect(limitDetail.code).toBe("max_quantity_allowed");
    expect(limitDetail.message).toBe("5");
  });

  it('should reject when updateCartEntry operation exceeds limit', () => {
    // given
    const functionConfiguration = { "PROD-001": "5" };
    const input = {
      apiContext: {
        operations: [
          {
            operationId: "updateCartEntry",
            data: { entryId: "entry-1", quantity: 6 }
          }
        ]
      },
      data: {
        cart: {
          entries: [
            { id: "entry-1", productId: "PROD-001", quantity: 3 }
          ]
        }
      }
    };
    
    // when
    const result = handler(input, functionConfiguration);

    // then
    expect(result).toHaveProperty("error");
    expect(result.error.code).toBe("quantity_limit_exceeded");
    expect(result.error.message).toContain("PROD-001");
    expect(result.error.message).toContain("5");
    expect(result.error.details).toHaveLength(2);

    // Verify productId detail
    const productIdDetail = result.error.details.find(d => d.target === "productId");
    expect(productIdDetail).toBeDefined();
    expect(productIdDetail.code).toBe("product_quantity_limit");
    expect(productIdDetail.message).toBe("PROD-001");

    // Verify quantity limit detail
    const limitDetail = result.error.details.find(d => d.target === "quantity");
    expect(limitDetail).toBeDefined();
    expect(limitDetail.code).toBe("max_quantity_allowed");
    expect(limitDetail.message).toBe("5");
  });

  it('should allow deleteCartEntry that brings quantity below limit', () => {
    // given
    const functionConfiguration = { "PROD-001": "5" };
    const input = {
      apiContext: {
        operations: [
          {
            operationId: "deleteCartEntry",
            data: { entryId: "entry-1" }
          }
        ]
      },
      data: {
        cart: {
          entries: [
            { id: "entry-1", productId: "PROD-001", quantity: 8 }
          ]
        }
      }
    };
    
    // when
    const result = handler(input, functionConfiguration);

    // then
    expect(result).toEqual({});
  });

  it('should allow any quantity when no restrictions are configured', () => {
    // given
    const functionConfiguration = {};
    const input = {
      apiContext: {
        operations: [
          {
            operationId: "addToCart",
            data: { productId: "PROD-001", quantity: 100 }
          }
        ]
      },
      data: {}
    };

    // when
    const result = handler(input, functionConfiguration);
    
    // then
    expect(result).toEqual({});
  });
});
