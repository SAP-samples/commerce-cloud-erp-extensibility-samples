# Step 6: Test with the Storefront Cart API

Verify that the quantity restriction logic works correctly by testing it with the Storefront Cart API.

This step shows how to call the Storefront Cart API as an anonymous user. To call the API as an authenticated user, see [Authenticating Storefront APIs](https://help.sap.com/docs/CC_CEE/e7518b82921b4f50912d02621c6c8797/61b71a9346c34abb9d2579298bf93ab5.html).

> **Tip:** See the [Storefront Cart API Reference](https://help.sap.com/docs/CC_CEE/e7518b82921b4f50912d02621c6c8797/641a95ee546b459b90d104239cee98ff.html) for the full API specification.

## Procedure

1. Collect the values for the placeholders used in the requests below:
   - `{solutionInstanceId}` and `{region}` — find both in the Cloud Portal URL. For example, in `https://roaj3677zfaj.app.eu1.saas.commerce.cloud.sap`, `roaj3677zfaj` is your solution instance ID and `eu1` is your region.
   - `{salesChannelId}` — your sales channel ID. To find it, either:
     - Go to **Stores Configuration** > **Stores** and use the store ID shown in the store header. For example, `sample-b2b-store`. Currently, each store is connected to a single sales channel, so the store ID matches the sales channel ID.
     - Open `https://{solutionInstanceId}.storefront.{region}.saas.commerce.cloud.sap/api/storefront/storeconfiguration/v1/salesChannels` in your browser (no authentication required). The response is paged — if your store is not on the first page, use the `page` query parameter to navigate further, for example `?page=1`.
   - `{currency}` — the currency code for your store, for example `USD`. To find it, either:
     - Go to **Stores Configuration** > **Stores**, open your store, and choose **Currencies** to see all available currency codes and pick the default one.
     - Open `https://{solutionInstanceId}.storefront.{region}.saas.commerce.cloud.sap/api/storefront/storeconfiguration/v1/salesChannels/{salesChannelId}/store` in your browser (no authentication required) and use the default currency code from the response.
   - `{productId}` — a product ID you previously configured with a quantity restriction.
   - `{quantityAboveLimit}` — a quantity above the configured restriction for that product.

2. Test the Before Cart Creation extension by calling the cart creation endpoint with a quantity above your configured limit.

   ```bash
   curl -X 'POST' \
     'https://{solutionInstanceId}.storefront.{region}.saas.commerce.cloud.sap/api/storefront/cart/v1/{salesChannelId}/carts' \
     -H 'accept: application/json' \
     -H 'Content-Type: application/json' \
     -d '{
       "currency": "{currency}",
       "operations": [
         {
           "operationId": "addToCart",
           "data": {
             "productId": "{productId}",
             "quantity": {quantityAboveLimit}
           }
         }
       ]
     }'
   ```

   The expected response is a `400` error with `code: "quantity_limit_exceeded"` (example values reflect your configured product and limit):

   ```json
   {
     "error": {
       "status": 400,
       "code": "quantity_limit_exceeded",
       "message": "The product with ID BK-211-M has a quantity restriction in the cart set to 2.",
       "target": "/api/storefront/cart/v1/{salesChannelId}/carts",
       "details": [
         { "code": "product_quantity_limit", "message": "BK-211-M", "target": "productId" },
         { "code": "max_quantity_allowed", "message": "2", "target": "quantity" }
       ]
     }
   }
   ```

3. Call the cart creation endpoint with a quantity within the limit to create a cart:

   ```bash
   curl -X 'POST' \
     'https://{solutionInstanceId}.storefront.{region}.saas.commerce.cloud.sap/api/storefront/cart/v1/{salesChannelId}/carts' \
     -H 'accept: application/json' \
     -H 'Content-Type: application/json' \
     -d '{
       "currency": "{currency}",
       "operations": [
         {
           "operationId": "addToCart",
           "data": {
             "productId": "{productId}",
             "quantity": 1
           }
         }
       ]
     }'
   ```

   The response contains the created cart. Note the cart `id` — you will use it as `{cartId}` in the request below.

   ```json
   {
     "id": "7d09b96d-7413-4948-8d0c-80b95941e40e",
     "entries": [ ... ],
     ...
   }
   ```

4. Test the Before Cart Operations extension by calling the cart operations endpoint with a quantity above your configured limit. Use the cart `id` from the previous response:

   ```bash
   curl -X 'POST' \
     'https://{solutionInstanceId}.storefront.{region}.saas.commerce.cloud.sap/api/storefront/cart/v1/{salesChannelId}/carts/{cartId}/operations' \
     -H 'accept: application/json' \
     -H 'Content-Type: application/json' \
     -d '{
       "operations": [
         {
           "operationId": "addToCart",
           "data": {
             "productId": "{productId}",
             "quantity": {quantityAboveLimit}
           }
         }
       ]
     }'
   ```

   The expected response is a `400` error with `code: "quantity_limit_exceeded"`, with the same structure as in step 2:

   ```json
   {
     "error": {
       "status": 400,
       "code": "quantity_limit_exceeded",
       "message": "The product with ID BK-211-M has a quantity restriction in the cart set to 2.",
       "target": "/api/storefront/cart/v1/{salesChannelId}/carts/{cartId}/operations",
       "details": [
         { "code": "product_quantity_limit", "message": "BK-211-M", "target": "productId" },
         { "code": "max_quantity_allowed", "message": "2", "target": "quantity" }
       ]
     }
   }
   ```

## Results

The quantity restriction logic is working correctly. The Storefront Cart API returns a validation error when a shopper tries to add a restricted product beyond the configured limit for both cart creation and cart operations.

## Navigation

[← Previous Step](step-5-configure-and-test-synchronous-extensions.md) | [Back to Overview](README.md) | [Next Step →](step-7-test-with-storefront.md)
