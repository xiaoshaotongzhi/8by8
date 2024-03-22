import { NullContextError } from '@/hooks/null-context-error.error';
import { useContext } from 'react';
import { NamedContext } from './named-context.type';

/**
 * Calls useContext with the provided context.
 *
 *
 * @param context
 * @returns
 * @throws
 */
export function useContextSafely<T>(
  context: NamedContext<T>,
  consumerName: string,
) {
  const ctx = useContext(context);

  if (!ctx) throw new NullContextError(context.displayName, consumerName);

  return ctx as NonNullable<T>;
}
