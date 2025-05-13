import React, { createContext, useState, useEffect } from 'react'
import { getAuth, signOut } from 'firebase/auth'
import { useNavigate,  } from 'react-router-dom'

// ✅ Tạo context ở ngoài để có thể import và dùng ở các component khác
export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null thay vì {}
  const [loading, setLoading] = useState(true); // mới
  const navigate = useNavigate();
  const auth=getAuth()

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged((user) => {
      if (user?.uid) {
        setUser(user);
        localStorage.setItem('accessToken', user.accessToken);
      } else {
        setUser(null);
         localStorage.removeItem('accessToken');

        localStorage.clear();
      }
      setLoading(false); 
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Firebase logout
      localStorage.removeItem('accessToken');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  
  return (
    <AuthContext.Provider value={{ user, setUser, loading, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
