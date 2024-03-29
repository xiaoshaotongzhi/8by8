import { useContextSafely } from '@/hooks/functions/use-context-safely';
import { NamedContext } from '@/hooks/types/named-context';
import { render, cleanup } from '@testing-library/react';
import type { FunctionComponent, PropsWithChildren } from 'react';

/**
 * A function that can be used to verify the value provided by a certain context.
 *
 * @param Context - The context from which the value is to be retrieved.
 * @param Provider - The context provider to be tested.
 * @returns The value expected to be returned by the context.
 */
export function getProvidedContextValue<T>(
  Context: NamedContext<T>,
  Provider: FunctionComponent<PropsWithChildren>,
): T {
  let value: T | null = null;

  function Consumer() {
    value = useContextSafely(Context, 'getProvidedContextValue');

    return null;
  }

  render(
    <Provider>
      <Consumer />
    </Provider>,
  );
  cleanup();

  return value as T;
}
