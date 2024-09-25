import { effect, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { LoadingService } from '@core/services/loading.service';
import { SnackbarService } from '@core/services/snackbar.service';
import {
  EntityAction,
  EntityCollectionServiceBase,
  EntityOp,
} from '@ngrx/data';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import * as messageUtils from '../utils/entity-message-utils';

export abstract class GenericEntityService<T extends { id: number | string }> {
  readonly #entityRepository: EntityCollectionServiceBase<T>;
  protected readonly _entitiesSignal: Signal<T[]>;
  protected readonly _isLoadingSignal: Signal<boolean>;
  protected readonly _errorsSignal: Signal<EntityAction | null>;

  constructor(
    entityRepository: EntityCollectionServiceBase<T>,
    loadingService: LoadingService,
    private snackbarService: SnackbarService,
  ) {
    this.#entityRepository = entityRepository;
    this._entitiesSignal = toSignal(entityRepository.entities$, {
      initialValue: [],
    });
    this._isLoadingSignal = toSignal(entityRepository.loading$, {
      initialValue: false,
    });
    this._errorsSignal = toSignal(entityRepository.errors$, {
      initialValue: null,
    });

    effect(() => loadingService.setLoading(this._isLoadingSignal()), {
      allowSignalWrites: true,
    });

    effect(() => {
      const error = this._errorsSignal();
      if (error) {
        const errorMsg = messageUtils.getErrorMessageFromEntityAction(error);
        this.snackbarService.showError(errorMsg);
      }
    });
  }

  get entitiesSignal() {
    return this._entitiesSignal;
  }

  get isLoadingSignal() {
    return this._isLoadingSignal;
  }

  get errorsSignal() {
    return this._errorsSignal;
  }

  loadAll(): Observable<T[]> {
    return this.#entityRepository.getAll();
  }

  getById(id: T['id']): Observable<T | undefined> {
    return this.#entityRepository.getByKey(id);
  }

  add(entity: T): Observable<T> {
    return this.#entityRepository
      .add(entity)
      .pipe(
        tap(() =>
          this.snackbarService.showSuccess(
            messageUtils.getSuccessMessageFromEntityAction(
              EntityOp.SAVE_ADD_ONE_SUCCESS,
              this.#entityRepository.entityName,
            ),
          ),
        ),
      );
  }

  update(entity: Partial<T>): Observable<T> {
    return this.#entityRepository
      .update(entity)
      .pipe(
        tap(() =>
          this.snackbarService.showSuccess(
            messageUtils.getSuccessMessageFromEntityAction(
              EntityOp.SAVE_UPDATE_ONE_SUCCESS,
              this.#entityRepository.entityName,
            ),
          ),
        ),
      );
  }

  delete(id: T['id']): Observable<T['id']> {
    return this.#entityRepository
      .delete(id)
      .pipe(
        tap(() =>
          this.snackbarService.showSuccess(
            messageUtils.getSuccessMessageFromEntityAction(
              EntityOp.SAVE_DELETE_ONE_SUCCESS,
              this.#entityRepository.entityName,
            ),
          ),
        ),
      );
  }
}
