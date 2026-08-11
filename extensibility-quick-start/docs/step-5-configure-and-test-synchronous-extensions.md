# Step 5: Configure and Test Synchronous Extensions

Wire the Before Cart Creation and Before Cart Operations extension points to the `product-quantity-restriction` function, then test and activate each extension.

## Procedure

1. Wire the Before Cart Creation extension point to the function:

   a. On the left menu, choose **Extensibility** > **Extension Points**.

   b. Open the **Cart Creation** tile.

   c. On the **Before Cart Creation** card, click **Synchronous Extensions** to open the extensions panel.

   d. Choose **Create**.

   e. In the **New Synchronous Extension** dialog, enter:
      - A name for the extension. For example, `before-cart-creation-quantity`.
      - `Function` as the **Destination Type**.
      - The previously created function. For example, `product-quantity-restriction`.
      - Under **Stores**, select the store the extension should apply to.

   f. Choose **Create**. The extension opens in edit view with status **Draft**.

   g. Choose **Test**. In the test dialog, replace the payload with the following, substituting `{productId}` with a product ID you configured in the previous step, `{quantityAboveLimit}` with a quantity above your configured limit, and `{storeId}` with your store ID from the previous sub-step:

      ```json
      {
        "commerceContext": {
          "storeId": "{storeId}"
        },
        "apiContext": {
          "operations": [
            {
              "operationId": "addToCart",
              "data": {
                "productId": "{productId}",
                "quantity": {quantityAboveLimit}
              }
            }
          ]
        }
      }
      ```

   h. Run the test. The expected result is a `quantity_limit_exceeded` error.

   i. Test the no-violation case by changing `quantity` to a value at or below your configured limit, and run the test again. The expected result is `{ "status": 201 }`.

   j. Choose **Close**.

   k. Choose **Activate** and confirm.

      > **Important:** Activating a synchronous extension means it will be invoked by the Cart API, which directly impacts your business flows.

2. Wire the Before Cart Operations extension point to the function:

   a. On the left menu, choose **Extensibility** > **Extension Points**.

   b. Open the **Cart Operations** tile.

   c. On the **Before Cart Operations** card, click **Synchronous Extensions**.

   d. Choose **Create**.

   e. In the **New Synchronous Extension** dialog, enter:
      - A name for the extension. For example, `before-cart-operations-quantity`.
      - `Function` as the **Destination Type**.
      - The previously created function. For example, `product-quantity-restriction`.
      - Under **Stores**, select the same store as in the previous extension.

   f. Choose **Create**.

   g. Choose **Test** and use the following payload, substituting `{productId}` with a product ID you configured in the previous step, `{quantityAboveLimit}` with a quantity above your configured limit, and `{storeId}` with your store ID. Note the `data.cart` with existing entries — this is the key difference from Before Cart Creation, as the function needs the current cart state to calculate the total quantity after all operations are applied:

      ```json
      {
        "commerceContext": {
          "storeId": "{storeId}"
        },
        "apiContext": {
          "operations": [
            {
              "operationId": "updateCartEntry",
              "data": {
                "entryId": "c5427f46-d3b5-4292-abd0-97ae39458a45",
                "quantity": {quantityAboveLimit}
              }
            }
          ]
        },
        "data": {
          "cart": {
            "entries": [
              {
                "id": "c5427f46-d3b5-4292-abd0-97ae39458a45",
                "productId": "{productId}",
                "quantity": 1
              }
            ]
          }
        }
      }
      ```

   h. Run the test. The expected result is a `quantity_limit_exceeded` error.

   i. Choose **Close**.

   j. Choose **Activate** and confirm.

## Results

Both synchronous extensions are active. The Cart API now invokes the `product-quantity-restriction` function for both the cart creation endpoint (`POST /{salesChannelId}/carts`) and the cart operations endpoint (`POST /{salesChannelId}/carts/{cartId}/operations`). In the next step, you will test the extensions using the Storefront Cart API.

## Navigation

[← Previous Step](step-4-upload-and-configure-serverless-function.md) | [Back to Overview](README.md) | [Next Step →](step-6-test-with-storefront-cart-api.md)
