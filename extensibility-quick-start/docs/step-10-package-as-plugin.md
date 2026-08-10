# Step 10: Package as a Plugin

Bundle the commerce serverless function and synchronous extensions you created into a plugin — a portable, versioned package that you can install in other tenants.

## Procedure

1. On the left menu, choose **Extensibility** > **Plugins**.

2. Choose **Create**.

3. In the **New Plugin** dialog, enter:
   - A name for the plugin. For example, `Product Quantity Restriction Plugin`.
   - A description. For example, `Restricts the quantity of specific products that shoppers can add to their cart.`
   - Under **Source Environment**, select `{solutionInstanceId}-STAGE` — the environment where you created the extensions in the previous steps. You identified `{solutionInstanceId}` in [step 6](step-6-test-with-storefront-cart-api.md).

4. Choose **Create**. The plugin version opens in **Draft** status with an empty Extensions list.

5. Add the commerce serverless function to the plugin:

   a. Choose **Add**.

   b. In the **Add Extensions** dialog, choose **Function**.

   c. Search for and select the previously created function. For example, `product-quantity-restriction`.

   d. Choose **Add**.

6. Add the synchronous extensions to the plugin:

   a. Choose **Add** again.

   b. In the **Add Extensions** dialog, choose **Synchronous Extension**.

   c. Search for and select the previously created synchronous extensions. For example, `before-cart-creation-quantity` and `before-cart-operations-quantity`.

   d. Choose **Add**.

   The Extensions list now shows all three extensions grouped by type.

7. Choose **Publish** and confirm.

   > **Tip:** Publishing captures the current state of all selected extensions as a snapshot. Any later changes made to these extensions will not be reflected in this plugin version. Once published, you can optionally define placeholders — environment-specific variables that can be replaced with actual values when the plugin is installed in another tenant.

8. Choose **Release** and confirm.

   > **Note:** Releasing makes the plugin available for installation across all tenants and automatically installs it in the source environment. Once released, the plugin version can no longer be edited.

   The plugin version status changes to **Released**. The extensions in the source environment are now assigned a Plugin ID.

9. Choose **Export** to download the plugin as a ZIP file.

   > **Tip:** See [Plugin Package Structure](https://help.sap.com/docs/CC_CEE/ad2d84908ea94e9a83c3a8e7c3e41646/2b73a3e688814a949c5ac1aa4753c130.html) for details on the contents and format of the exported ZIP file.

## Results

You have packaged the product quantity restriction extension as a plugin. The exported ZIP file can also be imported into another landscape — for example, to reuse the same plugin across different projects, such as a service provider integration shared across multiple customers.

To install the plugin in another tenant, select it from the Plugins list, choose the version you want to install, and follow the installation flow to select the target environment. Once installed, you can activate all extensions in the plugin at once using the **Activate** button. See [Installing and Activating a Plugin](https://help.sap.com/docs/CC_CEE/ad2d84908ea94e9a83c3a8e7c3e41646/1361b2dfb4d84f0c91cdb1b9997f2eb3.html) for more details.

## Navigation

[← Previous Step](step-9-view-metrics-traces-and-logs.md) | [Back to Overview](README.md) | [Next Step →](step-11-next-steps.md)
