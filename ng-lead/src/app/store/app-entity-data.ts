import { EntityMetadataMap, provideEntityData, withEffects } from '@ngrx/data';

import { leadEntityMetadata } from '@features/leads/store/lead-entity-metadata';

/**
 * Entity metadata configuration for all entities in the app.
 * Each entity should be registered here with its metadata.
 */
const entityMetadata: EntityMetadataMap = {
  ...leadEntityMetadata,
};

/**
 * Plural names for entities that differ from their singular form.
 * This helps NGRX Data handle entity names correctly.
 */
const pluralNames = {
  Lead: 'Leads',
};

/**
 * Provides the entity data configuration for the entire app.
 * Uses entity metadata and plural names, and applies NgRx Data effects.
 */
export const provideAppEntityData = provideEntityData(
  { entityMetadata, pluralNames },
  withEffects(),
);
