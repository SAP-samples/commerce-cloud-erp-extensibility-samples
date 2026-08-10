/*
 * Copyright (c) 2026 SAP SE or an SAP affiliate company. All rights reserved.
 */

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  viewChildren,
} from '@angular/core';
import { AbstractCartItemListComponent } from '@spartacus-bff/cart/base/universal/components';
import { I18nModule } from '@spartacus/core';
import { OutletModule } from '@spartacus/storefront';
import { CustomCartItemListRowComponent } from '../custom-cart-item-list-row/custom-cart-item-list-row.component';
import { QuantityValidationMessageComponent } from '../quantity-validation-message/quantity-validation-message.component';

/**
 * A customized version of the CartItemListComponent that integrates quantity validation.
 */
@Component({
  selector: 'app-custom-cart-item-list',
  templateUrl: './custom-cart-item-list.component.html',
  styleUrls: ['./custom-cart-item-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    I18nModule,
    OutletModule,
    CustomCartItemListRowComponent,
    QuantityValidationMessageComponent,
  ],
})
export class CustomCartItemListComponent extends AbstractCartItemListComponent {
  readonly cartItemsComponents = viewChildren(CustomCartItemListRowComponent);
  readonly reachedQuantityRestrictions = computed(() =>
    this.cartItemsComponents().reduce(
      (reachedQuantityRestrictions, cartItemComponent) => ({
        ...reachedQuantityRestrictions,
        [cartItemComponent.item().productId]:
          cartItemComponent.reachedQuantityRestriction(),
      }),
      {} as Record<string, number | undefined>,
    ),
  );
}
