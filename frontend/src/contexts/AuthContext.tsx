import { ReactNode, createContext, useEffect, useState } from "react";
import { Authenticate } from "../services/Authenticate";

export interface AuthContextModel {
  user: string;
  setUser(user: string): void;
  logout(): void;
}

export const AuthContext = createContext<AuthContextModel | null>(null);

interface Props {
  children: ReactNode
}

export const AuthProvider: React.FC<Props> = ({children}) => {
  const [user, setUser] = useState("");

  useEffect(() => {
    Authenticate.authState()
      .then((name) => setUser(name))
      .catch(() => logout());
  }, [])

  function logout() {
    Authenticate.removeToken();
    setUser("");
  }

  return (
    <AuthContext.Provider value={{user, setUser, logout}}>
      { children }
    </AuthContext.Provider>
  );
}