/*
 * Copyright (c) 2026 SAP SE or an SAP affiliate company. All rights reserved.
 */

import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AbstractCartItemComponent,
  CartItemContextSource,
} from '@spartacus-bff/cart/base/universal/components';
import { CartItemContext } from '@spartacus-bff/cart/base/universal/root';
import { I18nModule, UrlModule } from '@spartacus/core';
import {
  AtMessageModule,
  ItemCounterModule,
  MediaModule,
  OutletModule,
} from '@spartacus/storefront';
import { QuantityRestrictionDirective } from '../../directives/quantity-restriction.directive';

/**
 * A customized version of the CartItemListRowComponent that integrates quantity validation.
 */
@Component({
  selector: '[app-custom-cart-item-list-row], app-custom-cart-item-list-row',
  templateUrl: './custom-cart-item-list-row.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    CartItemContextSource,
    { provide: CartItemContext, useExisting: CartItemContextSource },
  ],
  imports: [
    NgTemplateOutlet,
    RouterModule,
    MediaModule,
    UrlModule,
    I18nModule,
    ItemCounterModule,
    AtMessageModule,
    OutletModule,
    QuantityRestrictionDirective,
  ],
})
export class CustomCartItemListRowComponent extends AbstractCartItemComponent {
  readonly reachedQuantityRestriction = signal<number | undefined>(undefined);
}
