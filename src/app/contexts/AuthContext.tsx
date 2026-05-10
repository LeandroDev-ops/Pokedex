import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type User = {
  name: string;
  email: string;
  password: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storageUser = localStorage.getItem(
      "@pokemon:user"
    );

    if (storageUser) {
      setUser(JSON.parse(storageUser));
    }
  }, []);

  function register(newUser: User) {
    localStorage.setItem(
      "@pokemon:registeredUser",
      JSON.stringify(newUser)
    );
  }

  function login(email: string, password: string) {
    const registeredUser = localStorage.getItem(
      "@pokemon:registeredUser"
    );

    if (!registeredUser) {
      return false;
    }

    const parsedUser: User =
      JSON.parse(registeredUser);

    if (
      parsedUser.email === email &&
      parsedUser.password === password
    ) {
      localStorage.setItem(
        "@pokemon:user",
        JSON.stringify(parsedUser)
      );

      setUser(parsedUser);

      return true;
    }

    return false;
  }

  function logout() {
    localStorage.removeItem("@pokemon:user");

    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}