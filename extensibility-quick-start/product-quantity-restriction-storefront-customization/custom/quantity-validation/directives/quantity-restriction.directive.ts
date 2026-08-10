/*
 * Copyright (c) 2026 SAP SE or an SAP affiliate company. All rights reserved.
 */

import {
  computed,
  DestroyRef,
  Directive,
  effect,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import {
  outputFromObservable,
  takeUntilDestroyed,
  toObservable,
} from '@angular/core/rxjs-interop';
import { ItemCounterComponent } from '@spartacus/storefront';
import { distinctUntilChanged, startWith } from 'rxjs';
import { QuantityRestrictionService } from '../services/quantity-restriction.service';

/**
 * Applies quantity restrictions to an item counter and emits when the current
 * control value reaches the available quantity limit.
 */
@Directive({
  selector: 'cx-item-counter[appQuantityRestriction]',
})
export class QuantityRestrictionDirective implements OnInit {
  readonly destroyRef = inject(DestroyRef);
  readonly quantityRestrictionService = inject(QuantityRestrictionService);
  readonly itemCounter = inject(ItemCounterComponent, {
    host: true,
  });
  readonly productCode = input.required<string>();
  readonly viewingCart = input<boolean>(false);
  readonly quantityRestrictions = computed(
    () =>
      this.quantityRestrictionService.restrictions()[this.productCode()] ?? {
        max: Infinity,
        available: Infinity,
      },
  );
  readonly quantity = signal(0);
  readonly quantityRestriction = computed(() =>
    this.viewingCart()
      ? this.quantityRestrictions().max
      : this.quantityRestrictions().available,
  );
  readonly quantityRestrictionReached = outputFromObservable<
    number | undefined
  >(
    toObservable(
      computed(() =>
        this.quantity() >= this.quantityRestriction()
          ? this.quantityRestrictions().max
          : undefined,
      ),
    ).pipe(distinctUntilChanged()),
  );

  constructor() {
    effect(() => {
      this.itemCounter.max = this.quantityRestriction();
    });
  }

  ngOnInit() {
    this.itemCounter.control.valueChanges
      .pipe(
        startWith(this.itemCounter.control.value),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((value: number) => this.quantity.set(value));
  }
}
