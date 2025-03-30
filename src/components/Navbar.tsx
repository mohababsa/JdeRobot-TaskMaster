import { useState } from 'react';
import { useAuth } from '../lib/auth-context';
import { Button } from './ui/Button'; // We’ll create this

export default function Navbar({ onSignInClick, onSignUpClick }: { onSignInClick: () => void; onSignUpClick: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <span className="font-bold text-xl text-indigo-600">TaskMaster</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <span className="text-sm font-medium text-gray-600 hover:text-indigo-600 cursor-pointer">Dashboard</span>
          <span className="text-sm font-medium text-gray-600 hover:text-indigo-600 cursor-pointer">Projects</span>
          <span className="text-sm font-medium text-gray-600 hover:text-indigo-600 cursor-pointer">Calendar</span>
          <span className="text-sm font-medium text-gray-600 hover:text-indigo-600 cursor-pointer">Analytics</span>
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">{user.email}</span>
              <Button variant="outline" onClick={signOut}>Logout</Button>
            </div>
          ) : (
            <>
              <Button variant="ghost" onClick={onSignInClick}>Sign In</Button>
              <Button variant="default" onClick={onSignUpClick}>Sign Up</Button>
            </>
          )}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? '✕' : '☰'}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t">
          <div className="flex flex-col space-y-3 py-4 px-4">
            <span className="text-sm font-medium text-gray-600 hover:text-indigo-600 cursor-pointer" onClick={() => setIsOpen(false)}>Dashboard</span>
            <span className="text-sm font-medium text-gray-600 hover:text-indigo-600 cursor-pointer" onClick={() => setIsOpen(false)}>Projects</span>
            <span className="text-sm font-medium text-gray-600 hover:text-indigo-600 cursor-pointer" onClick={() => setIsOpen(false)}>Calendar</span>
            <span className="text-sm font-medium text-gray-600 hover:text-indigo-600 cursor-pointer" onClick={() => setIsOpen(false)}>Analytics</span>
          </div>
        </div>
      )}
    </header>
  );
}