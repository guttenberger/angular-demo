import { EntityMetadataMap } from '@ngrx/data';

export const leadEntityMetadata: EntityMetadataMap = {
  Lead: {
    entityDispatcherOptions: {
      optimisticAdd: true,
      optimisticUpdate: true,
      optimisticDelete: true,
    },
  },
};
