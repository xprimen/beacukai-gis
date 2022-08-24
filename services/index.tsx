import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';
import { useRouter } from 'next/router';
import React from 'react';
import { auth } from '../configs/firebase/clientApp';
import { IAuth } from '../configs/types';

const AuthContext = React.createContext<IAuth>({
  user: null,
  login: () => {},
  logout: () => {},
  loading: false,
  isLogin: false,
});

export const AuthProvider: React.FC<React.ReactNode> = ({
  children,
}): React.ReactElement => {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
        setIsLogin(true);
        if (isLogin) {
          router.back();
        } else {
          router.push('/admin');
        }
      } else {
        setUser(null);
        setIsLogin(false);
      }
    });

    return unsub;
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      router.push('/auth');
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        isLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
