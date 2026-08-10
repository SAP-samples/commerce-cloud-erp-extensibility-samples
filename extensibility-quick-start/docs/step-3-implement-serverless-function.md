# Step 3: Implement a Commerce Serverless Function

Now that you understand the extension point specifications, implement the custom validation logic and package it into a zip file ready for upload. You'll implement the sample function from [product-quantity-restriction-function](../product-quantity-restriction-function). It receives `apiContext.operations` (the cart operations) and, for the Before Cart Operations extension point, `data.cart` (the current cart state), returning either an empty object to allow the operations, or a business validation error to reject them.

## Prerequisites

- Node.js 18+

## Procedure

1. Create a new directory and navigate into it.

   ```bash
   mkdir product-quantity-restriction-function && cd product-quantity-restriction-function
   ```

2. Create a `src` folder and copy [product-quantity-restriction-function/src/index.mjs](../product-quantity-restriction-function/src/index.mjs) into it. The file contains the `handler` function, which is the entry point invoked by the commerce serverless runtime.

   ```javascript
   export const handler = (extensionPointRequest, functionConfiguration) => {
     const productQuantities = aggregateQuantities(extensionPointRequest);
     const productRestrictions = getProductRestrictions(functionConfiguration);
   
     return validateProductQuantities(productQuantities, productRestrictions);
   };
   ```
   This function handles the **Before Cart Creation** and **Before Cart Operations** extension points, returning a business validation error when a product quantity restriction is exceeded or an empty object to allow the operations.

   Input parameters:
   * `extensionPointRequest` — the request payload of the extension point, passed as the function input. It contains `apiContext.operations` (the cart operations to be performed) and, for the Before Cart Operations extension point, `data.cart` (the current cart state, before the operations are applied).
   * `functionConfiguration` — key-value pairs configured for this function. Since the logic is separate from the configuration, you can update restrictions without re-uploading the function. In the next step, you'll configure restrictions for specific products using these key-value pairs.

   The return value is the response payload of the extension point: An empty object `{}` to allow the operations or a business validation error to reject them.

   > **Tip:** Review the helper functions `aggregateQuantities`, `getProductRestrictions`, and `validateProductQuantities` in the copied file to understand how the validation works.

3. Set up and run tests from the `product-quantity-restriction-function` directory.

   a. Initialize npm and configure Jest by running these commands:

      ```bash
      # Create a package.json file with default values
      npm init -y
      ```

      ```bash
      # Install the Jest testing framework
      npm install --save-dev jest
      ```

      ```bash
      # Configure the test command to use native ESM support
      npm pkg set scripts.test="node --experimental-vm-modules node_modules/jest/bin/jest.js"
      ```

   b. Copy [product-quantity-restriction-function/src/index.test.mjs](../product-quantity-restriction-function/src/index.test.mjs) into the `src` folder.

   c. Run the tests from the `product-quantity-restriction-function` directory:

      ```bash
      npm test
      ```

      Expected output:

      ```
      ...
      Tests:      5 passed, 5 total
      ```

4. Package the function by creating a ZIP file with `index.mjs` at the root level.

   ```bash
   zip -j prdqtyfunction-prdqtyfunction.zip src/index.mjs
   ```

   > **Important:** The `-j` flag stores `index.mjs` at the root of the zip, not inside a `src/` folder.

   Expected zip structure:

   ```
   prdqtyfunction-prdqtyfunction.zip
   └── index.mjs        ← Must be at root level, NOT src/index.mjs
   ```

## Results

Now you have a ZIP file containing the function, which is ready to be uploaded. If you prefer to skip the implementation steps, you can download the pre-built [prdqtyfunction-prdqtyfunction.zip](../product-quantity-restriction-function/prdqtyfunction-prdqtyfunction.zip) directly.

> **Note:** This tutorial uses JavaScript, but you can also implement commerce serverless functions in TypeScript. You can also use a module bundler to package your function — this is useful when you want to split the logic across multiple files or include external dependencies. See [Creating a Commerce Serverless Function](https://help.sap.com/docs/CC_CEE/ad2d84908ea94e9a83c3a8e7c3e41646/1fa01feff74e419da3632102e537c12a.html) for more details.

## Navigation

[← Previous Step](step-2-explore-extension-points.md) | [Back to Overview](README.md) | [Next Step →](step-4-upload-and-configure-serverless-function.md)
