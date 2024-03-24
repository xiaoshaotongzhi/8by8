import { PropsWithChildren } from 'react';
import { createNamedContext } from '../hooks/functions/create-named-context';
import type { User } from '../model/types/user';

interface UserContextType {
  user: User | null;
}

const UserContext = createNamedContext<UserContextType>('UserContext');

function UserContextProvider({ children }: PropsWithChildren) {
  return (
    <UserContext.Provider value={{ user: null }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserContextProvider, type UserContextType };
