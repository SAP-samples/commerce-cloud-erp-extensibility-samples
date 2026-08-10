# Step 4: Upload and Configure the Commerce Serverless Function

Upload the function to your tenant and configure product quantity restrictions using key-value pairs.

## Procedure

1. Upload the function:

   a. On the left menu, choose **Extensibility** > **Functions**.

   b. Choose **Import**.

   c. In the **Import Function** dialog, enter `product-quantity-restriction` as the **Function Name**.

   d. Under **Function Package**, choose **Browse** and select the `prdqtyfunction-prdqtyfunction.zip` file you created in the previous step.

   e. Choose **Import**.

   A success message confirms the function was created and it appears in the Functions list.

2. Configure product quantity restrictions:

   a. Find the IDs of the products you want to restrict. Go to **Products and Catalogs** > **Products** > **Products** or **Product Dashboard**.

      > **Tip:** See [Product Management](https://help.sap.com/docs/CC_CEE/13de6c3f0122465d9cd200c05f8ed6cb/bb136c17cf0149ddbb4e8c8857212046.html) for more details on finding products.

   b. Go back to **Extensibility** > **Functions** and click **product-quantity-restriction** to open it.

   c. Choose **Add Parameter**. Enter the following values:
      - The product ID as the **Key**. For example, `BK-211-M`.
      - The maximum allowed quantity as the **Value**. For example, `2`.

      > **Tip:** See [Creating Key-Value Pairs](https://help.sap.com/docs/CC_CEE/ad2d84908ea94e9a83c3a8e7c3e41646/c13a905c556d46fd8cb2ddf9f953d502.html) for more details.

   d. Repeat for each product you want to restrict.

   e. Save your changes.

## Results

The function is uploaded and configured with product quantity restrictions. Each key-value pair restricts a product to the specified maximum quantity per shopper cart. In the next step, you will wire the `product-quantity-restriction` function to the extension points.

## Navigation

[← Previous Step](step-3-implement-serverless-function.md) | [Back to Overview](README.md) | [Next Step →](step-5-configure-and-test-synchronous-extensions.md)
