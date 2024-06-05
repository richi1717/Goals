import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const ProtectedRoute = () => {
  const navigate = useNavigate()
  const isAuthenticated = true

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  return <Outlet />
}

export default ProtectedRoute
