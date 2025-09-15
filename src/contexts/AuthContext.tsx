import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'client' | 'hustler';
  profile?: {
    bio?: string;
    skills?: string[];
    rating?: number;
    completedJobs?: number;
    avatar?: string;
  };
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: any) => Promise<void>;
  logout: () => void;
  updateProfile: (profileData: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Check for stored user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('juahustle_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user data based on email
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: email.includes('client') ? 'Sarah Kimani' : 'Alex Mwangi',
      email,
      phone: '+254712345678',
      role: email.includes('client') ? 'client' : 'hustler',
      profile: {
        bio: email.includes('client') ? 
          'Business owner looking for reliable services' : 
          'Experienced hustler with 2+ years in various services',
        skills: email.includes('client') ? [] : ['Cleaning', 'Tutoring', 'Moving'],
        rating: email.includes('client') ? undefined : 4.8,
        completedJobs: email.includes('client') ? undefined : 23,
      }
    };
    
    setUser(mockUser);
    localStorage.setItem('juahustle_user', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const signup = async (userData: any) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      role: userData.role,
      profile: {
        bio: userData.role === 'client' ? 
          'New client on JuaHustle' : 
          'New hustler ready to work',
        skills: userData.role === 'hustler' ? [] : undefined,
        rating: userData.role === 'hustler' ? 0 : undefined,
        completedJobs: userData.role === 'hustler' ? 0 : undefined,
      }
    };
    
    setUser(newUser);
    localStorage.setItem('juahustle_user', JSON.stringify(newUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('juahustle_user');
  };

  const updateProfile = async (profileData: any) => {
    if (!user) return;
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const updatedUser = {
      ...user,
      ...profileData,
      profile: {
        ...user.profile,
        ...profileData.profile
      }
    };
    
    setUser(updatedUser);
    localStorage.setItem('juahustle_user', JSON.stringify(updatedUser));
    setIsLoading(false);
  };

  const value = {
    user,
    isLoading,
    login,
    signup,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};