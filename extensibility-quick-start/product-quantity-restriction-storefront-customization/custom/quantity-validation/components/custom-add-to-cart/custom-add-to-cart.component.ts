/*
 * Copyright (c) 2026 SAP SE or an SAP affiliate company. All rights reserved.
 */

import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AbstractAddToCartComponent } from '@spartacus-bff/cart/base/universal/components';
import { I18nModule } from '@spartacus/core';
import {
  IconModule,
  ItemCounterModule,
  OutletModule,
} from '@spartacus/storefront';
import { QuantityRestrictionDirective } from '../../directives/quantity-restriction.directive';
import { QuantityValidationMessageComponent } from '../quantity-validation-message/quantity-validation-message.component';

/**
 * A customized version of the AddToCartComponent that integrates quantity validation.
 */
@Component({
  selector: 'app-custom-add-to-cart',
  templateUrl: './custom-add-to-cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    I18nModule,
    IconModule,
    ItemCounterModule,
    OutletModule,
    QuantityValidationMessageComponent,
    QuantityRestrictionDirective,
  ],
})
export class CustomAddToCartComponent extends AbstractAddToCartComponent {
  readonly reachedQuantityRestriction = signal<number | undefined>(undefined);
}
