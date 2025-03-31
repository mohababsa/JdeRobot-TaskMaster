import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { setUser, setError } from '../store/authSlice';
import { motion } from 'framer-motion';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignInModal({ isOpen, onClose }: SignInModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetSent, setResetSent] = useState(false); // Track reset email status
  const dispatch = useDispatch();
  const error = useSelector((state: RootState) => state.auth.error);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      dispatch(setUser(userCredential.user));
      setEmail('');
      setPassword('');
      setResetSent(false); // Reset success message on sign-in
      onClose();
    } catch (error: unknown) {
      console.log('Sign-in error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to sign in';
      dispatch(setError(errorMessage));
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      dispatch(setError('Please enter your email to reset your password'));
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
      dispatch(setError('')); // Clear any previous errors
    } catch (error: unknown) {
      console.log('Reset password error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to send reset email';
      dispatch(setError(errorMessage));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Sign In</h2>
        <form onSubmit={handleSignIn}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 mb-4 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 mb-4 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
          />
          <div className="flex justify-between items-center mb-4">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 text-sm transition duration-200"
            >
              Forgot Password?
            </button>
          </div>
          {resetSent && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="text-green-500 mb-4"
            >
              Password reset email sent! Check your inbox.
            </motion.p>
          )}
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="text-red-500 mb-4"
            >
              {error}
            </motion.p>
          )}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
            >
              Sign In
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}