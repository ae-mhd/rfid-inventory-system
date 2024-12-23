// import { useAuthContext } from '@/context/authContext'
import { useAuthContext } from '@/context/authContext'
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({ children }) => {
    const { user } = useAuthContext()

    // const isAuth = localStorage.user
    if (!user) return <Navigate to='/login' />
    return (
        <>{children} </>
    )
}

export default ProtectedRoutes