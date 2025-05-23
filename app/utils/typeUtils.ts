import { type ComicPath } from '~/types/comicTypes';

/**
 * Helper function to ensure exhaustive checking of a discriminated union.
 * This will cause a TypeScript error if any case is not handled.
 *
 * @example
 * switch (value) {
 *   case 'a': return handleA();
 *   case 'b': return handleB();
 *   default: return assertNever(value); // Will error if value could be something else
 * }
 */
export const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};
