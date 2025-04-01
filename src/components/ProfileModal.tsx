import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setUser } from '../store/authSlice';
import { supabase } from '../lib/supabase'; // Supabase client
import { updateProfile } from 'firebase/auth';
import { auth } from '../lib/firebase'; // Firebase Auth
import { motion } from 'framer-motion';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '');
      setPhotoURL(user.photoURL || '');
    }
  }, [user]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoFile(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    if (!user || !auth.currentUser) return;
    try {
      setError(null);
      let newPhotoURL = photoURL;

      // Upload photo to Supabase Storage if a new file is selected
      if (photoFile) {
        const filePath = `${user.uid}/${photoFile.name}`;
        const { error: uploadError } = await supabase.storage
          .from('profile_photos')
          .upload(filePath, photoFile, { upsert: true });
        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from('profile_photos').getPublicUrl(filePath);
        newPhotoURL = data.publicUrl;
        setPhotoURL(newPhotoURL);
      }

      // Update Firebase Auth profile with new displayName and photoURL
      await updateProfile(auth.currentUser, { displayName, photoURL: newPhotoURL });

      // Update Redux store
      const updatedUser = { ...auth.currentUser, displayName, photoURL: newPhotoURL };
      dispatch(setUser(updatedUser));

      setIsEditing(false);
      setPhotoFile(null);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update profile';
      setError(errorMessage);
    }
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Your Profile</h2>
        <div className="space-y-6">
          {/* Photo */}
          <div className="flex justify-center">
            <div className="relative group">
              <img
                src={photoURL || 'https://via.placeholder.com/100'}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600 transition-transform duration-200 group-hover:scale-105"
              />
              {isEditing && (
                <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                  <span className="text-white text-sm">Upload Photo</span>
                </label>
              )}
            </div>
          </div>

          {/* Display Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              disabled={!isEditing}
              className={`w-full p-3 mt-1 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ${!isEditing ? 'bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-gray-400' : ''}`}
            />
          </div>

          {/* Email (Read-Only) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              value={user.email || ''}
              disabled
              className="w-full p-3 mt-1 border rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-gray-400 dark:border-gray-600 cursor-not-allowed"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Email cannot be changed here.</p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="text-red-500 text-sm"
            >
              {error}
            </motion.p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200"
          >
            Close
          </button>
          {isEditing ? (
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
            >
              Edit
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}