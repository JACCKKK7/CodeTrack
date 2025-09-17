// Utility functions for Pro status management

// Simplified Pro module: legacy identifiers preserved for import compatibility, but everything is unlocked.
export const isPro = () => true;
export const getProExpirationDate = () => null;
export const clearProStatus = () => {};
export const setProStatus = () => {};
export const isCategoryLocked = () => false;
export const isProblemLocked = () => false;
export const FREE_CATEGORIES: string[] = [];
export const FREE_PROBLEMS_PER_CATEGORY = Infinity;
