/*
 * Copyright (c) 2026 SAP SE or an SAP affiliate company. All rights reserved.
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AbstractAddedToCartDialogComponent } from '@spartacus-bff/cart/base/universal/components';
import { I18nModule } from '@spartacus/core';
import {
  IconModule,
  KeyboardFocusModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { CustomCartItemComponent } from '../custom-cart-item/custom-cart-item.component';

/**
 * A customized version of the AddToCartDialogComponent that integrates quantity validation.
 */
@Component({
  selector: 'app-custom-added-to-cart-dialog',
  templateUrl: './custom-added-to-cart-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    KeyboardFocusModule,
    I18nModule,
    IconModule,
    SpinnerModule,
    RouterModule,
    ReactiveFormsModule,
    CustomCartItemComponent,
  ],
})
export class CustomAddedToCartDialogComponent extends AbstractAddedToCartDialogComponent {}
