/*
 * Copyright (c) 2026 SAP SE or an SAP affiliate company. All rights reserved.
 */

import { inject, Injectable } from '@angular/core';
import { HandleErrorOptions } from '@vivaldi/trpc/client';
import { UpstreamBadRequestErrorHandler } from '../../upstream-bad-request-error-handler';
import { QuantityRestrictionService } from '../services/quantity-restriction.service';

type UpstreamErrorData = {
  upstream?: {
    body?: {
      error?: MerchantError;
    };
  };
};

type QuantityErrorDetail = {
  code: string;
  message: string;
  target: string;
};

type MerchantError = {
  code?: string;
  message?: string;
  details?: QuantityErrorDetail[];
};

type QuantityErrorData = {
  productId: string;
  maxQuantity: number;
};

/**
 * Specialized error handler for quantity validation errors.
 */
@Injectable()
export class QuantityRestrictionErrorHandler extends UpstreamBadRequestErrorHandler {
  readonly quantityRestrictionService = inject(QuantityRestrictionService);

  parseQuantity(value: string): number | undefined {
    const quantity = parseInt(value);
    return Number.isNaN(quantity) || quantity < 0 ? undefined : quantity;
  }

  extractQuantityErrorData(
    error: MerchantError,
  ): QuantityErrorData | undefined {
    const details = error.details;
    if (!details) {
      return undefined;
    }

    const productDetail = details.find(({ target }) => target === 'productId');
    const quantityDetail = details.find(({ target }) => target === 'quantity');
    if (!productDetail || !quantityDetail) {
      return undefined;
    }

    const maxQuantity = this.parseQuantity(quantityDetail.message);
    if (maxQuantity === undefined) {
      return undefined;
    }

    return {
      productId: productDetail.message,
      maxQuantity,
    };
  }

  override handleError({ op, error, logger }: HandleErrorOptions): void {
    logger.error('Error detected', op, error);

    const upstreamErrorData = error.data as UpstreamErrorData | undefined;
    if (!upstreamErrorData) {
      super.handleError({ op, error, logger });
      return;
    }

    const merchantError = upstreamErrorData.upstream?.body?.error;
    if (!merchantError || merchantError.code !== 'quantity_limit_exceeded') {
      super.handleError({ op, error, logger });
      return;
    }

    const quantityErrorData = this.extractQuantityErrorData(merchantError);
    if (!quantityErrorData) {
      super.handleError({ op, error, logger });
      return;
    }

    this.quantityRestrictionService.setMaxQuantity(
      quantityErrorData.productId,
      quantityErrorData.maxQuantity,
    );
  }
}
