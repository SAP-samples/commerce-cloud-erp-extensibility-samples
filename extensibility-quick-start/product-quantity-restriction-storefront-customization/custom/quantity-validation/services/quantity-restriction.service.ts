/*
 * Copyright (c) 2026 SAP SE or an SAP affiliate company. All rights reserved.
 */

import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CartFacade } from '@spartacus-bff/cart/base/universal/root';
import { Cart } from '@spartacus-bff/procedures';

/**
 * Service for managing quantity restrictions for products.
 * It calculates the maximum and available quantities based on the current cart state
 * and any validation errors from the synchronous extension point configurations.
 */
@Injectable({ providedIn: 'root' })
export class QuantityRestrictionService {
  private readonly maxQuantities = signal<Partial<Record<string, number>>>({});
  private readonly cart: Signal<Cart | undefined> = toSignal(
    inject(CartFacade).getActiveCart(),
  );

  readonly restrictions = computed(() =>
    Object.keys(this.maxQuantities()).reduce(
      (quantities, productId) => {
        const maxQuantity = this.maxQuantities()[productId] ?? Infinity;
        const quantity =
          this.cart()?.entries?.find((entry) => entry.productId === productId)
            ?.quantity ?? 0;
        return {
          ...quantities,
          [productId]: {
            max: maxQuantity,
            available: maxQuantity - quantity,
          },
        };
      },
      {} as Partial<Record<string, { max: number; available: number }>>,
    ),
  );

  setMaxQuantity(productId: string, maxQuantity: number): void {
    this.maxQuantities.update((maxQuantities) => ({
      ...maxQuantities,
      [productId]: maxQuantity,
    }));
  }
}
