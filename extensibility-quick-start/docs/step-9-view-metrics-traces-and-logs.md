# Step 9: View Metrics, Traces, and Logs

Each SAP Commerce Cloud, cloud ERP edition tenant comes with an SAP Cloud Logging instance provided out of the box. It collects metrics, traces, and logs from various components — including the Backend-for-Frontend Server, the Storefront APIs, and the core synchronous extensions and commerce serverless functions you create. SAP Commerce Cloud, cloud ERP edition also supports SAP Cloud ALM — you can connect your own SAP Cloud ALM instance for additional observability.

SAP Cloud Logging is primarily designed for developers — for example, for troubleshooting extensions. SAP Cloud ALM provides broader operational observability: administrators can use it to monitor system health, while developers can also use it for extension troubleshooting. This step focuses on SAP Cloud Logging, but you may find SAP Cloud ALM useful too.

> **Tip:** See the [Observability Guide](https://help.sap.com/docs/CC_CEE/63e83d7b73b04bc1be5c66f4f34f9a29/196046a3b55e4af18f6a3c1b73f3d17a.html) for more details on SAP Cloud ALM and other observability options.

The following attributes appear in logs and traces related to synchronous extensions and commerce serverless functions. These are a subset selected for this tutorial.

| Attribute | Description |
|-------|-------------|
| `com@sap@cxcommerce@extensibility@type` | Extension type, e.g. `commercefunctions` or `side-by-side` |
| `com@sap@cxcommerce@extensibility@id` | Synchronous extension ID |
| `com@sap@cxcommerce@extensibility@point` | Extension point, e.g. `sap.ccm.cart.cartOperations.beforePerformCartOperations` |
| `com@sap@cxcommerce@extensibility@commercefunctions@function-id` | Commerce Serverless Function ID |
| `com@sap@cxcommerce@extensibility@plugin` | Plugin ID — present when the extension is deployed as part of a plugin |
| `com@sap@cxcommerce@extensibility@dryrun` | `false` for real invocations, `true` when invoked via the Synchronous Extensibility Test capability |

## Prerequisites

Before beginning this step, ensure that you have the following:

- SAP Cloud Logging set up by a system administrator. For more details, see [Setting Up SAP Cloud Logging](https://help.sap.com/docs/CC_CEE/63e83d7b73b04bc1be5c66f4f34f9a29/19bc782316904e2abb8b15c1efc7d9cc.html).
- Access to SAP Cloud Logging. For more details, see [Accessing SAP Cloud Logging](https://help.sap.com/docs/CC_CEE/63e83d7b73b04bc1be5c66f4f34f9a29/1ef8e52ca38848f180d814b3b2c4dd90.html).

## Procedure

1. Collect the values for the placeholders used in the next steps:

   - `{extensionId}` — the synchronous extension ID. To find it, go to **Extensibility** > **Extension Points** > **Cart Operations** > **Before Cart Operations**, open your synchronous extension (e.g. `before-cart-operations-quantity`), and note the **ID** at the top of the screen.
   - `{functionId}` — the commerce serverless function ID. On the same screen, note the function **ID** under **Destination**.

2. Open SAP Cloud Logging:

   a. In the Commerce Portal, on the home page, find the **Observability** section and click **Log Analysis**. The SAP Cloud Logging portal opens.

3. View metrics:

   a. In the navigation pane, choose **OpenSearch Dashboards** > **Dashboards**.

   b. Search for **Core Extensions Observability** and open the dashboard. The dashboard shows metrics for your extensions including throughput, success and error rates, and response times.

   > **Tip:** See [Viewing Metrics for Synchronous Extensions](https://help.sap.com/docs/CC_CEE/63e83d7b73b04bc1be5c66f4f34f9a29/921c24d9f736493ea59e86c92e4de911.html) for more details.

4. View traces:

   a. In the navigation pane, choose **Observability** > **Traces**.

   b. Filter traces by any of the following:

      - **By trace ID** — find the trace for a specific request:

        Make a Storefront Cart API request as you did in [step 6](step-6-test-with-storefront-cart-api.md) that triggers the quantity restriction error and copy the `traceparent` response header. The header format is:

        ```
        {version}-{traceId}-{parentId}-{traceFlags}
        ```

        For example: `00-96a21fcf207864760059856bc8f4413c-bf65f04e8ad0dd81-01`

        Extract the `{traceId}` and search for it in the Traces view.

        > **Tip:** See [Distributed Tracing](https://help.sap.com/docs/CC_CEE/63e83d7b73b04bc1be5c66f4f34f9a29/d0203d96d7e54b3a92429e2d59157955.html) for more details on the `traceparent` header format.

        > **Note:** Currently, when calling through the storefront ([step 7](step-7-test-with-storefront.md)), the `traceparent` header returned by the BFF only covers the BFF layer. Use the direct Storefront Cart API call approach to get a trace ID that also includes traces from the synchronous extension and the commerce serverless function.

      - **By synchronous extension ID** — all traces for the extension:

        ```
        span.attributes.com@sap@cxcommerce@extensibility@id: "{extensionId}"
        ```

      - **By function ID** — all traces involving your function:

        ```
        span.attributes.com@sap@cxcommerce@extensibility@commercefunctions@function-id: "{functionId}"
        ```

5. View logs:

   a. In the navigation pane, choose **Discover** and select the index pattern `logs-otel-v1-*` (the data source for logs provided by SAP Commerce Cloud).

   b. Filter logs by any of the following:

      - **By trace ID** — correlate all logs for a specific request:

        ```
        traceId: "{traceId}"
        ```

      - **By synchronous extension ID** — all invocation logs for the extension:

        ```
        log.attributes.com@sap@cxcommerce@extensibility@id: "{extensionId}"
        ```

        Example log entry (the `Log` field extracted from the full log document): `Successfully invoked synchronous extension ID [9b64de36-26e1-42b7-8310-a35e1c2b3717] for extension point [sap.ccm.cart.cartOperations.beforePerformCartOperations]. Destination response status code: 201 Created`

      - **By function ID** — logs from `console.log()` and `console.error()` calls in your function:

        ```
        log.attributes.com@sap@cxcommerce@extensibility@commercefunctions@function-id: "{functionId}"
        ```

        For example, the following `console.log()` call in your function:

        ```js
        function createViolationError(productId, quantityLimit) {
          console.log(`Restricting operation on product with ID ${productId} because of a quantity restriction in the cart set to ${quantityLimit} for this product.`);
          // ...
        }
        ```

        Produces a log entry like: `Restricting operation on product with ID BK-211-M because of a quantity restriction in the cart set to 2 for this product.`

        > **Note:** Only single-argument `console.log()` and `console.error()` calls are supported in function code. For more details, see [Creating and Viewing Commerce Serverless Function Logs](https://help.sap.com/docs/CC_CEE/63e83d7b73b04bc1be5c66f4f34f9a29/ac90497c5f9340f485049ebebff65f0d.html).

## Results

You have learned how to view metrics, traces, and logs for your extensions in SAP Cloud Logging. You can use these capabilities to monitor extension performance and troubleshoot issues. For further exploration including SAP Cloud ALM, see the [Observability Guide](https://help.sap.com/docs/CC_CEE/63e83d7b73b04bc1be5c66f4f34f9a29/196046a3b55e4af18f6a3c1b73f3d17a.html).

## Navigation

[← Previous Step](step-8-customize-storefront.md) | [Back to Overview](README.md) | [Next Step →](step-10-package-as-plugin.md)
