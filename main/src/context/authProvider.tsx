import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../auth/superbaseClient";
import type { User } from "../types/User";
import { useLoading } from "./loadingProvider";

interface AuthContextType {
  user: User | undefined;
  authLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: undefined,
  authLoading: true,
  setUser: () => {},
  signIn: async () => {},
  signOut: async () => {},
});

export const AuthgProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session) {
        setUser(data.session.user as User);
      } else {
        setUser(undefined);
      }
      setAuthLoading(false);
    };
    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser(session.user as User);
      } else {
        setUser(undefined);
      }
      setAuthLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{ user, authLoading, setUser, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
