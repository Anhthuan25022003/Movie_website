import React, { useState } from 'react'
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

  const handleLoginWithGoogle = async () => {
    if (loading) return // Ngăn gọi lại khi đang xử lý

    setLoading(true)
    const auth = getAuth()
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      console.log('Đăng nhập thành công:', user)

        navigate('/danhmuc/upcoming')
    } catch (error) {
     {
        console.error('Lỗi đăng nhập:', error)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button onClick={handleLoginWithGoogle} disabled={loading} className=' ml-96 text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg  text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'>
        {/* {loading ? '': 'Login with Google'} */}Login
      </button>
    </div>
  )
}

export default Login
