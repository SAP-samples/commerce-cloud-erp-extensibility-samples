# S/4 Sales Price Plugin — Field Mapping Table

## Scenario 1: Outbound — CCS Request → S/4 Request

| # | CCS Source Field                                                                        | S/4 Target Field | Type | Notes |
|---|-----------------------------------------------------------------------------------------|-----------------|------|-------|
| 1 | `data.salesArea.salesOrganization`                                                      | `SalesOrganization` | Direct map | Mandatory in S/4 |
| 2 | `data.salesArea.distributionChannel`                                                    | `DistributionChannel` | Direct map | Mandatory in S/4 |
| 3 | `data.salesArea.division`                                                               | `Division` | Direct map | Mandatory in S/4 |
| 4 | `data.currency.code`                                                                    | `TransactionCurrency` | Direct map | Optional in S/4; ISO currency code |
| 5 | _(hardcoded `""`)_                                                                      | `SalesDocumentType` | Hardcoded | Mandatory-but-defaultable; S/4 applies system default when empty |
| 6 | _(hardcoded `""`)_                                                                      | `SalesDocumentItemCategory` | Hardcoded | Mandatory-but-defaultable; S/4 applies system default when empty |
| 7 | _(hardcoded `""`)_                                                                      | `BillingDocumentType` | Hardcoded | Mandatory-but-defaultable; S/4 applies system default when empty |
| 8 | _(hardcoded `""`)_                                                                      | `LanguageISOCode` | Hardcoded | Optional; S/4 uses system language when empty |
| 9 | _(hardcoded `"SAP_DFLT"`)_                                                              | `SalesPriceRetrieveUseCase` | Hardcoded | Optional; triggers S/4 defaults for fields 5–7 when empty |
| 10 | _(hardcoded `true`)_                                                                    | `PriceElementsAreRequested` | Hardcoded | Mandatory; always `true` to retrieve full price breakdown |
| 11 | `data.pricingAt.split('T')[0]`, otherwise `new Date().toISOString().split('T')[0]` | `PricingDate` | Computed | Mandatory in S/4; date portion extracted from ISO datetime |
| 12 | `data.products[].id`                                                                    | `_Product[].Product` | Direct map (array) | Mandatory in S/4 |
| 13 | _(hardcoded `""`)_                                                                      | `_Product[].ProductUsedByCustomer` | Hardcoded | Optional; not present in CCS request |
| 14 | `data.products[].quantity`                                                              | `_Product[].RequestedQuantity` | Direct map | Quantity for which the price is requested; S/4 applies scale pricing accordingly |
| 15 | `data.products[].salesMeasureUnit.isoCode`                                              | `_Product[].RequestedQuantityISOUnit` | Direct map | UN/CEFACT ISO unit code |
| 16 | `data.products[].salesMeasureUnit.code`                                                 | `_Product[].RequestedQuantitySAPUnit` | Direct map | SAP-internal unit code |
| 17 | `data.soldToParty`                                                                      | `_SoldToParty[].SoldToParty` | Direct map (wrapped in array) | Mandatory in S/4 |

---

## Scenario 2: Inbound — S/4 Response → CCS Response

| # | S/4 Source Field | CCS Target Field | Type | Notes |
|---|-----------------|------------------|------|-------|
| 1 | _(hardcoded `"determinePrices"`)_ | `data.operations[0].operationId` | Hardcoded | Required CCS operation discriminator |
| 2 | `value[0].SalesOrganization` | `data.operations[0].data.salesArea.salesOrganization` | Direct map (from first item) | Echo of request context; taken from first array element |
| 3 | `value[0].DistributionChannel` | `data.operations[0].data.salesArea.distributionChannel` | Direct map (from first item) | Echo of request context; taken from first array element |
| 4 | `value[0].Division` | `data.operations[0].data.salesArea.division` | Direct map (from first item) | Echo of request context; taken from first array element |
| 5 | `value[0].TransactionCurrency` | `data.operations[0].data.currency.code` | Direct map (from first item) | SAP currency code used for both `code` and `sapCode` |
| 6 | `value[0].TransactionCurrency` | `data.operations[0].data.currency.sapCode` | Direct map (from first item) | Same value as `code`; ISO code not separately available from S/4 response |
| 7 | `value[].Product` | `data.operations[0].data.productPrices[].id` | Direct map (array iteration) | Products with `_SystemMessages` and no `_SalesPriceElements` are filtered out |
| 8 | `value[].RequestedQuantitySAPUnit` | `data.operations[0].data.productPrices[].salesMeasureUnit.code` | Direct map | SAP-internal unit code echoed from S/4 response |
| 9 | `value[].RequestedQuantityISOUnit` | `data.operations[0].data.productPrices[].salesMeasureUnit.isoCode` | Direct map | ISO unit code echoed from S/4 response |
| 10 | `value[].RequestedQuantity` | `data.operations[0].data.productPrices[].quantity` | Direct map | Quantity echoed from S/4 response |
| 11 | `value[].SoldToParty` | `data.operations[0].data.productPrices[].soldToParty` | Direct map | Customer number echoed from S/4 response |
| 12 | `value[].NetAmount` | `data.operations[0].data.productPrices[].price.effectiveValue` | Direct map | Net amount after all discounts, excl. tax |
| 13 | `value[]._SalesPriceElements[].ConditionAmount` (where `ConditionType === ""`) | `data.operations[0].data.productPrices[].price.priceBreakdowns[0].amount` | Computed | type=`BASE_PRICE`; picks the element with empty ConditionType from the sorted pricing procedure steps |
| 14 | _(hardcoded `[]`)_ | `data.operations[0].data.productPrices[].price.scalePrices` | Hardcoded | Always empty; scale price population not yet implemented — see Gap G4 |
| 15 | `value[]._SystemMessages[]` | _(not mapped)_ | **Known limitation** | S/4 messages are currently discarded; inbound function should be updated to emit an `addMessages` operation — see Gap G7 |

### S/4 response fields available but not mapped to CCS

| S/4 Field | Reason not mapped |
|-----------|------------------|
| `value[].NetPriceAmount` | Redundant with `NetAmount` for the qty-1 case; `NetAmount` preferred as it reflects all discounts |
| `value[].NetPriceQuantity` | Quantity context; not surfaced in CCS price model |
| `value[].NetPriceQuantityUnitISOCode` / `SAPCode` | Unit context; not surfaced in CCS price model |
| `value[].TaxAmount` | CCS price model does not include tax in `determinePrice` response |
| `value[].PricingHasError` | Not mapped to a structured CCS field; pricing errors surface via `_SystemMessages` instead |
| `value[].SalesOrganization` / `DistributionChannel` / `Division` | Echo of request context; not needed in CCS response |
| `value[].SoldToParty` | Echo of request context; not needed in CCS response |
| `value[].PricingDate` / `TransactionCurrency` / `LanguageISOCode` | Echo of request context; not needed in CCS response |
| `value[].RequestedQuantity` / `RequestedQuantityISOUnit` / `RequestedQuantitySAPUnit` | Echo of request context; not needed in CCS response |
| `value[]._SalesPriceElements[]` | Full pricing procedure breakdown (gross, discounts, tax lines, etc.); partially mapped via `priceBreakdowns` in `ProductPriceInputV1` — inbound function needs updating to populate discounts and additional condition types |
| `value[].ProductUsedByCustomer` | Customer material number; not used in CCS response |

---

## Gap Summary

| # | Gap                                                                                     | Direction | Impact | Resolution |
|---|-----------------------------------------------------------------------------------------|-----------|--------|------------|
| G1 | ~~`PricingDate` not in CCS request~~                                                        | CCS→S/4 | ~~Plugin always uses today's date; past/future pricing not possible~~ | Resolved: `pricingAt` field now exists in `ProductPriceRequestV1` |
| G2 | ~~`RequestedQuantity` not in CCS request~~                                                  | CCS→S/4 | ~~S/4 always prices for qty 1; scale/tiered pricing returns wrong price for other quantities~~ | Resolved: `quantity` and `salesMeasureUnit` now exist in `ProductRequestV1` |
| G3 | `SalesDocumentType` / `SalesDocumentItemCategory` / `BillingDocumentType` not in CCS request | CCS→S/4 | S/4 uses system defaults; may not match the actual sales document context | CCS SPI enhancement: add optional document type fields, or expose `SalesPriceRetrieveUseCase` |
| G4 | ~~`_SalesPriceElements` not mapped to CCS response~~                                        | S/4→CCS | ~~Full pricing breakdown (conditions, discounts, tax lines) is discarded~~ | Partially resolved: `priceBreakdowns` and `scalePrices` now exist in `ProductPriceInputV1`; inbound function needs updating to fully populate them |
| G5 | `TaxAmount` not mapped to CCS response                                                  | S/4→CCS | Tax is excluded from the determined price; downstream tax calculation may double-count | Accepted: tax is handled separately via the `simulateTax` extension point |
| G6 | `PricingHasError` not mapped to CCS response                                            | S/4→CCS | Pricing error flag is lost unless S/4 also populates `_SystemMessages` | Mitigation: S/4 typically populates `_SystemMessages` when `PricingHasError=true`; add explicit check if needed |
| G7 | `_SystemMessages` not forwarded to CCS                                                  | S/4→CCS | S/4 warning/error messages are silently discarded | Partially resolved: spec now supports `addMessages` operation; inbound function needs updating to emit it |
