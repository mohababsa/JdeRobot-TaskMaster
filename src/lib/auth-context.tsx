import { createContext, useContext, useEffect, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth';
import { setUser, setLoading, signOut as signOutAction } from '../store/authSlice';
import { RootState } from '../store';

type AuthContextType = {
  user: { id: string; email: string | null; name: string | null } | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(setLoading(true));
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        dispatch(setUser({ id: firebaseUser.uid, email: firebaseUser.email, name: firebaseUser.displayName }));
      } else {
        dispatch(signOutAction());
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  const signIn = async (email: string, password: string) => {
    dispatch(setLoading(true));
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    dispatch(setUser({ id: user.uid, email: user.email, name: user.displayName }));
  };

  const signUp = async (email: string, password: string) => {
    dispatch(setLoading(true));
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    dispatch(setUser({ id: user.uid, email: user.email, name: user.displayName }));
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    dispatch(signOutAction());
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};