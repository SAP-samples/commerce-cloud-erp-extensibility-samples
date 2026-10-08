# SAP S/4HANA Cloud Public Edition Sample Plugin

## Description

SAP Commerce Cloud, cloud ERP edition exposes an extension point for price calculation with an external provider. This extension point lets you integrate with external calculation service providers or with a custom calculation service of your choice.

The SAP S/4HANA Cloud Public Edition Sample Plugin demonstrates how to integrate SAP S/4HANA with the calculation extension in SAP Commerce Cloud, cloud ERP edition. The plugin creates the "Simulate Sales Order by an External Provider" extension configuration and provides the required data mappings for this extension. It uses the SAP S/4HANA Sales Order Simulation API (`POST /SalesOrder`) to simulate sales order pricing, discounts, taxes, and freight charges in the cart and during checkout.

For detailed guidance on integrating SAP Commerce Cloud, cloud ERP edition with calculation service providers, refer to [this page](https://help.sap.com/docs/CC_CEE). To learn more about the SAP S/4HANA Cloud Public Edition Sample Plugin, visit [this documentation](https://help.sap.com/docs/CC_CEE).

## Requirements

- SAP Commerce Cloud, cloud ERP edition
- SAP S/4HANA Cloud Public Edition system with Sales Order Simulation API enabled

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
   zip -r sap-s4hana-cloud-public-edition-sample-plugin-<version>.zip plugin-manifest.yaml config
   ```
2. Follow the installation instructions provided on [this help page](https://help.sap.com/docs/CC_CEE).

## Content Structure

For a detailed overview of the plugin's structure and configuration, see [this documentation page](https://help.sap.com/docs/CC_CEE/ad2d84908ea94e9a83c3a8e7c3e41646/2b73a3e688814a949c5ac1aa4753c130.html).

## Contributing

If you'd like to contribute code, fixes, or improvements, please create a pull request. Due to legal reasons, contributors must accept a DCO. When you create your first pull request to this project, you are automatically asked to accept the DCO. SAP uses [the standard DCO text of the Linux Foundation](https://developercertificate.org/).

## Code of Conduct

Members, contributors, and leaders pledge to make participation in our community a harassment-free experience. By participating in this project, you agree to always abide by its [Code of Conduct](https://github.com/SAP/.github/blob/main/CODE_OF_CONDUCT.md).

## License

Copyright (c) 2026 SAP SE or an SAP affiliate company. All rights reserved. This project is licensed under the Apache Software License, version 2.0 except as noted otherwise in the [LICENSE](../../LICENSE) file.
