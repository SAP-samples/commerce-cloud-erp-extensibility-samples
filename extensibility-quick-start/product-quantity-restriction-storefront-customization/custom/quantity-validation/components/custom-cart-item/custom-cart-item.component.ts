/*
 * Copyright (c) 2026 SAP SE or an SAP affiliate company. All rights reserved.
 */

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
import { QuantityValidationMessageComponent } from '../quantity-validation-message/quantity-validation-message.component';

/**
 * A customized version of the CartItemComponent that integrates quantity validation.
 */
@Component({
  selector: 'app-custom-cart-item',
  templateUrl: './custom-cart-item.component.html',
  styleUrls: ['./custom-cart-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    CartItemContextSource,
    { provide: CartItemContext, useExisting: CartItemContextSource },
  ],
  imports: [
    RouterModule,
    MediaModule,
    UrlModule,
    I18nModule,
    ItemCounterModule,
    AtMessageModule,
    OutletModule,
    QuantityValidationMessageComponent,
    QuantityRestrictionDirective,
  ],
})
export class CustomCartItemComponent extends AbstractCartItemComponent {
  readonly reachedQuantityRestriction = signal<number | undefined>(undefined);
}
