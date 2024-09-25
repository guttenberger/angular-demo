import { HttpClient } from '@angular/common/http';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Update } from '@ngrx/entity';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

import { environment } from '@env/environment';

/**
 * Fake service for using in mock data instead of api calls for basic CRUD operations
 *
 * @template T - The entity type, must have an `id` field of type number
 */
export abstract class GenericMockDataApiService<
  T extends { id: number | string },
> extends DefaultDataService<T> {
  #mockData: T[] = []; // The mock data array
  #delayTime = environment.mockApiDelay; // Use delay time from environment

  constructor(
    entityName: string,
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    initialMockData: T[] = [],
  ) {
    super(entityName, http, httpUrlGenerator);
    this.#mockData = [...initialMockData];
  }

  /**
   * Get all entities (mock data)
   * @returns {Observable<T[]>} An observable emitting the list of entities
   */
  override getAll(): Observable<T[]> {
    return of(this.#mockData).pipe(delay(this.#delayTime));
  }

  /**
   * Get an entity by ID
   * @param id Entity's ID
   * @returns {Observable<T>} Observable with entity or throws an error if not found
   */
  override getById(id: T['id']): Observable<T> {
    const entity = this.#mockData.find((e) => e.id === id);

    if (entity) {
      return of(entity).pipe(delay(this.#delayTime));
    }

    return throwError(
      () => new Error(`${this.entityName} with id ${id} not found.`),
    ).pipe(delay(this.#delayTime));
  }

  /**
   * Delete an entity by ID
   * @param id Entity's ID
   * @returns {Observable<T['id']>} Observable with deleted entity ID or throws an error if not found
   */
  override delete(id: T['id']): Observable<T['id']> {
    const entityToDelete = this.#mockData.find((e) => e.id === id);

    if (entityToDelete) {
      // Create a new array
      this.#mockData = this.#mockData.filter((e) => e.id !== id); // Filter out the entity with the matching ID
      return of(entityToDelete.id).pipe(delay(this.#delayTime));
    }

    return throwError(
      () => new Error(`${this.entityName} with id ${id} not found.`),
    ).pipe(delay(this.#delayTime));
  }

  /**
   * Add a new entity to the mock data
   * @param entity Entity object to add
   * @returns {Observable<T>} Observable with the added entity
   */
  override add(entity: T): Observable<T> {
    const id =
      this.#mockData.length +
      Math.floor(Math.random() * (9999 - 100 + 1)) +
      100; // Generate a new unique ID

    // Create a new array with new entity
    this.#mockData = [...this.#mockData, { ...entity, id }];
    return of(entity).pipe(delay(this.#delayTime));
  }

  /**
   * Update an existing entity in the mock data
   * @param updateEntityAction Updated entity object
   * @returns {Observable<T>} Observable with updated entity or throws an error if not found
   */
  override update(updateEntityAction: Update<T>): Observable<T> {
    const index = this.#mockData.findIndex(
      (e) => e.id === updateEntityAction.id,
    );

    if (index !== -1) {
      const updatedEntity: T = {
        ...this.#mockData[index],
        ...updateEntityAction.changes,
      };

      // Create a new array with updated entity
      this.#mockData = [...this.#mockData];
      this.#mockData[index] = updatedEntity;

      return of(updatedEntity).pipe(delay(this.#delayTime));
    }

    return throwError(
      () =>
        new Error(
          `${this.entityName} with id ${updateEntityAction.id} not found.`,
        ),
    ).pipe(delay(this.#delayTime));
  }
}
