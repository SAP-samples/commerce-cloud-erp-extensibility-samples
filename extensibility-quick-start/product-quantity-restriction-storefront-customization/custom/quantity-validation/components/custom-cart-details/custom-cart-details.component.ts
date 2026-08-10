/*
 * Copyright (c) 2026 SAP SE or an SAP affiliate company. All rights reserved.
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractCartDetailsComponent } from '@spartacus-bff/cart/base/universal/components';
import { I18nModule } from '@spartacus/core';
import { CustomCartItemListComponent } from '../custom-cart-item-list/custom-cart-item-list.component';

/**
 * A customized version of the CartDetailsComponent that integrates quantity validation.
 */
@Component({
  selector: 'app-custom-cart-details',
  templateUrl: './custom-cart-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [I18nModule, CustomCartItemListComponent],
})
export class CustomCartDetailsComponent extends AbstractCartDetailsComponent {}
