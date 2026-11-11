# SAP S/4HANA Cloud Public Edition Sample Plugin

## Description

SAP Commerce Cloud, cloud ERP edition supports external providers for Cart and Checkout Calculation and Price Determination. This sample plugin integrates both extension points with SAP S/4HANA Cloud Public Edition and installs the extension configurations, data mappings, and mapping functions together.

For Cart and Checkout Calculation, the plugin integrates with the `Perform Calculation by External Provider` extension point. This extension point lets you add custom business logic to the Cart and Checkout APIs to perform the entire calculation with an external service provider to, for example, apply custom prices, taxes, discounts, and delivery costs.It uses the Sales Order Simulation API to simulate sales order pricing, discounts, taxes, and freight charges in the cart and during checkout.

For Price Determination, the plugin integrates with the `Determine Prices by External Provider` extension point. It uses the Sales Price - Retrieve (Version 2) API to retrieve product prices for the requested sales area, customer, currency, quantity, and pricing date. This allows applications to obtain product prices from S/4HANA, for example when displaying prices before a customer adds products to a cart.

For detailed guidance on integrating SAP Commerce Cloud, cloud ERP edition with calculation service providers, refer to [Sales Order Simulation](https://help.sap.com/docs/CC_CEE/ad2d84908ea94e9a83c3a8e7c3e41646/e982613a3a4147cc8e3bedc4df10a249.html) ,determination service provider, [Price Determination](https://help.sap.com/docs/CC_CEE/2bde64d55a304fe19cd6be4a2bc303d6/c819a03166784014bc6014460cbd7562.html?version=DEV&state=DRAFT&ai=true&profile=21067360). 
To learn more about the SAP S/4HANA Cloud Public Edition Sample Plugin, visit [SAP S/4HANA Order Simulation Sample Plugin](https://help.sap.com/docs/CC_CEE/ad2d84908ea94e9a83c3a8e7c3e41646/c1090a4d762c4f79a34fb9400cdd3891.html).

## Requirements

- SAP Commerce Cloud, cloud ERP edition
- SAP S/4HANA Cloud Public Edition system with:
  - Sales Order Simulation API enabled
  - Sales Price - Retrieve (Version 2) API enabled
- A destination named `s4-salesprice` configured in the CCE destination service pointing to the S/4HANA system

## Download and Installation

1. Download the latest release of this plugin from the [releases page](https://github.com/SAP-samples/commerce-cloud-erp-extensibility-samples/releases?q=sap-s4hana-cloud-public-edition&expanded=true). Look for the assets section of the respective release and download the `sap-s4hana-cloud-public-edition-sample-plugin-<version>.zip` file. Alternatively, you can build the plugin zip manually from the `service-provider-integrations/sap-s4hana-cloud-public-edition-sample-plugin` directory:
   The resulting zip should have the following structure:

   ```
   sap-s4hana-cloud-public-edition-sample-plugin-<version>.zip
   ├── plugin-manifest.yaml
   └── config/
       └── ...
   ```
   For example, on Unix/macOS:
   ```bash
   zip -r sap-s4hana-cloud-public-edition-sample-plugin-<version>.zip plugin-manifest.yaml config -x "*.DS_Store"
   ```
2. Follow the installation instructions provided on [this help page](https://help.sap.com/docs/CC_CEE/ad2d84908ea94e9a83c3a8e7c3e41646/c1090a4d762c4f79a34fb9400cdd3891.html).

## Content Structure

For a detailed overview of the plugin's structure and configuration, see [this documentation page](https://help.sap.com/docs/CC_CEE/ad2d84908ea94e9a83c3a8e7c3e41646/2b73a3e688814a949c5ac1aa4753c130.html).

## Contributing

If you'd like to contribute code, fixes, or improvements, please create a pull request. Due to legal reasons, contributors must accept a DCO. When you create your first pull request to this project, you are automatically asked to accept the DCO. SAP uses [the standard DCO text of the Linux Foundation](https://developercertificate.org/).

## Code of Conduct

Members, contributors, and leaders pledge to make participation in our community a harassment-free experience. By participating in this project, you agree to always abide by its [Code of Conduct](https://github.com/SAP/.github/blob/main/CODE_OF_CONDUCT.md).

## License

Copyright (c) 2026 SAP SE or an SAP affiliate company. All rights reserved. This project is licensed under the Apache Software License, version 2.0 except as noted otherwise in the [LICENSE](../../LICENSE) file.
