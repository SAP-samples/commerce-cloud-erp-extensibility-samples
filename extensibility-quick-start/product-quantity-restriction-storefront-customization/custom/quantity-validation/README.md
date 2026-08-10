# Storefront Customization: Quantity Restriction Contextual Messages

This directory contains the storefront customizations that surface quantity restriction errors as contextual inline messages next to the relevant quantity controls, replacing the default generic error banners.

For architecture details and setup instructions see `docs/step-8-customize-storefront.md`.

## File Structure

```
quantity-validation/
├── components/
│   ├── custom-add-to-cart/                       # PDP add-to-cart with quantity error signal
│   ├── custom-added-to-cart-dialog/              # Add-to-cart dialog using CustomCartItemComponent
│   ├── custom-cart-details/                      # Cart page using CustomCartItemListComponent
│   ├── custom-cart-item/                         # Cart item (add-to-cart dialog) with inline error message
│   ├── custom-cart-item-list/                    # Cart item list with full-width error rows
│   ├── custom-cart-item-list-row/                # Cart item row with quantity cap
│   └── quantity-validation-message/              # Presentational error message component
├── directives/
│   └── quantity-restriction.directive.ts         # Applies per-product max quantity behavior to item counters
├── handlers/
│   └── quantity-restriction-error-handler.ts    # Intercepts quantity_limit_exceeded upstream errors
└── services/
    └── quantity-restriction.service.ts          # Stores max quantities and computes available quantity per product
```
