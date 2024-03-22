import { createContext } from 'react';
import { NamedContext } from './named-context.type';

export function createNamedContext<T>(
  displayName: string,
): NamedContext<T | null> {
  const context = createContext<T | null>(null);
  context.displayName = displayName;
  return context as NamedContext<T | null>;
}
