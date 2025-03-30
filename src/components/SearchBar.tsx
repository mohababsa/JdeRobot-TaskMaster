import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../store/filtersSlice';

export default function SearchBar() {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setSearchTerm(value));
    }, 300);

    return () => clearTimeout(timer);
  }, [value, dispatch]);

  const handleClear = () => {
    setValue('');
    dispatch(setSearchTerm(''));
  };

  return (
    <div className="relative mb-4">
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        placeholder="Search tasks..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full p-3 pl-10 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}