# Determine Price by External Provider Plugin

## Description

SAP Commerce Cloud, cloud ERP edition exposes an extension for product pricing with an external provider. This extension
lets you integrate with SAP S/4HANA to retrieve real-time sales price information.

The Determine Price by External Provider Plugin integrates the `pricing` extension in SAP Commerce Cloud, cloud ERP edition with the
`RetrieveSalesPrice` OData action in SAP S/4HANA. The plugin creates the "Determine Price by External Provider" extension configuration and
provides the required data mappings for this extension.

## Requirements

- SAP Commerce Cloud, cloud ERP edition
- SAP S/4HANA with the `API_PRODUCT_PRICING_SRV` OData service enabled
- A destination named `s4-salesprice` configured in the CCS destination service pointing to the S/4HANA system

## Download and Installation

1. Build the plugin zip from the `service-provider-integrations/s4-salesprice-plugin` directory.
   The resulting zip must have the following structure:

   ```
   s4-salesprice-plugin-<version>.zip
   ├── plugin-manifest.yaml
   └── config/
       └── ...
   ```

   On Unix/macOS:
   ```bash
   zip -r s4-salesprice-plugin-<version>.zip plugin-manifest.yaml config -x "*.DS_Store"
   ```

2. Install the plugin zip via the SAP Commerce Cloud plugin management UI or API.

## Content Structure

```
s4-salesprice-sample-plugin/
├── plugin-manifest.yaml                          # Plugin metadata and component registry
├── config/
│   ├── synchronous_extensions/
│   │   └── s4_retrieve_sales_price.json          # Extension configuration linking to the pricing extension
│   ├── functions/
│   │   ├── <uuid>-spoutbound.zip                 # Outbound JS handler (CCS → S/4 request transformation)
│   │   └── <uuid>-spinbound.zip                  # Inbound JS handler (S/4 response → CCS ExtensionInput transformation)
│   └── data_mappers/
│       ├── outbound.json                          # CCS pricing request → S/4 RetrieveSalesPrice request schema
│       └── inbound.json                          # S/4 RetrieveSalesPrice response → CCS ExtensionInput schema
├── MAPPING.md                                    # Full field mapping table and gap analysis
└── README.md
```

## Field Mapping

See [MAPPING.md](./MAPPING.md) for the full field mapping table covering both directions (CCS→S/4 and S/4→CCS) and a gap analysis.

### Key mapping decisions

- **Outbound**: Uses a JavaScript function handler to build the S/4 request, handling array fan-out for products and computed
  fields (pricing date extracted from `pricingAt`).
- **Inbound**: Uses a JavaScript function handler to transform the S/4 `RetrieveSalesPrice` response into a CCS `ExtensionInput`,
  mapping `value[].NetAmount` → `productPrices[].price.effectiveValue` and building `priceBreakdowns` from `_SalesPriceElements`.
- **`RequestedQuantity`**: Mapped from `data.products[].quantity` — the new SPI includes quantity and unit of measure per product,
  enabling S/4 to apply scale/tiered pricing correctly (Gap G2 resolved).
- **`_SystemMessages`**: Not yet forwarded to CCS; inbound function needs updating to emit an `addMessages` operation (see Gap G7 in MAPPING.md).

## Contributing

If you'd like to contribute code, fixes, or improvements, please create a pull request. Due to legal reasons, contributors must
accept a DCO. When you create your first pull request to this project, you are automatically asked to accept the DCO. SAP
uses [the standard DCO text of the Linux Foundation](https://developercertificate.org/).

## Code of Conduct

Members, contributors, and leaders pledge to make participation in our community a harassment-free experience. By participating in
this project, you agree to always abide by its [Code of Conduct](https://github.com/SAP/.github/blob/main/CODE_OF_CONDUCT.md).

## License

Copyright (c) 2026 SAP SE or an SAP affiliate company. All rights reserved. This project is licensed under the Apache Software
License, version 2.0 except as noted otherwise in the [LICENSE](../../LICENSE) file.
