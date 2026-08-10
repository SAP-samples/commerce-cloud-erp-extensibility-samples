/*
 * Copyright (c) 2026 SAP SE or an SAP affiliate company. All rights reserved.
 */

import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { I18nModule } from '@spartacus/core';

/**
 * Presentational component that displays a contextual message when a product
 * quantity is at its limit.
 */
@Component({
  selector: 'app-quantity-validation-message',
  templateUrl: './quantity-validation-message.component.html',
  styleUrl: './quantity-validation-message.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [I18nModule],
})
export class QuantityValidationMessageComponent {
  readonly maxQuantity = input.required<number>();
}
