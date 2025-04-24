import React, { createContext, useState, useEffect } from 'react'
import { getAuth } from 'firebase/auth'

// ✅ Tạo context ở ngoài để có thể import và dùng ở các component khác
export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const auth = getAuth()

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged((user) => {
      console.log("User changed:", user)
      if (user) {
        setUser(user)
        localStorage.setItem('user:', JSON.stringify(user))
      } else {
        setUser(null)
        localStorage.removeItem('user')
      }
    })

    return () => unsubscribe()
  }, [auth])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
