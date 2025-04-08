// UserContext.js
import { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const UserContext = createContext(null); // Initialize with null

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserData({
          uid: user.uid,
          displayName: user.displayName || '',
          email: user.email || '',
          photoURL: user.photoURL || 'https://randomuser.me/api/portraits/men/32.jpg',
          phoneNumber: user.phoneNumber || '',
          // Add other user properties as needed
        });
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const updateUserData = (newData) => {
    setUserData(prev => ({ ...prev, ...newData }));
  };

  return (
    <UserContext.Provider value={{ userData, updateUserData }}>
      {children}
    </UserContext.Provider>
  );
};