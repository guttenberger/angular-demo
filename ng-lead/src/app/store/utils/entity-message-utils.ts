import { EntityAction, EntityOp } from '@ngrx/data';

/**
 * Generates a user-friendly success message based on the operation performed.
 * @param entityOp - The entity operation that was successful.
 * @param entityName - Optional, name of the entity being operated on.
 * @returns {string} - A user-friendly success message specific to the entity operation.
 */
export function getSuccessMessageFromEntityAction(
  entityOp: EntityOp,
  entityName = 'Entity',
): string {
  switch (entityOp) {
    case EntityOp.QUERY_ALL_SUCCESS:
      return `${entityName} data loaded successfully.`;
    case EntityOp.QUERY_BY_KEY_SUCCESS:
      return `${entityName} loaded successfully.`;
    case EntityOp.SAVE_ADD_ONE_SUCCESS:
      return `New ${entityName} added successfully.`;
    case EntityOp.SAVE_UPDATE_ONE_SUCCESS:
      return `${entityName} updated successfully.`;
    case EntityOp.SAVE_DELETE_ONE_SUCCESS:
      return `${entityName} deleted successfully.`;
    default:
      return `${entityName} operation completed successfully.`;
  }
}

/**
 * Generates a user-friendly error message based on the operation and error details in the EntityAction.
 * @param action - The EntityAction containing the error.
 * @returns {string} - A user-friendly error message specific to the entity operation.
 */
export function getErrorMessageFromEntityAction(action: EntityAction): string {
  const entityOp = action.payload?.entityOp;
  const entityName = action.payload?.entityName || 'Entity';

  // Handle specific entity operations
  switch (entityOp) {
    case EntityOp.QUERY_ALL_ERROR:
      return `Failed to load ${entityName} data. Please try again later.`;
    case EntityOp.QUERY_BY_KEY_ERROR:
      return `Failed to retrieve the ${entityName} by its key. Please check the ID and try again.`;
    case EntityOp.SAVE_ADD_ONE_ERROR:
      return `Failed to add a new ${entityName}. Please check your input and try again.`;
    case EntityOp.SAVE_UPDATE_ONE_ERROR:
      return `Failed to update the ${entityName}. Please ensure your changes are valid.`;
    case EntityOp.SAVE_DELETE_ONE_ERROR:
      return `Failed to delete the ${entityName}. Please try again later.`;
    case EntityOp.QUERY_MANY_ERROR:
      return `Failed to retrieve multiple ${entityName} entries. Please try again.`;
    default:
      return `An error occurred while performing an operation on ${entityName}. Please try again.`;
  }
}
