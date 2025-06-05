import { Navigate, Outlet } from "react-router"
import { useSelector } from "react-redux"


const PrivateRoute = () => {
    const { loading, isLoggedIn, user } = useSelector(state => state.auth)
 

    const token = sessionStorage.getItem("token")

    if (loading) {
        return <div>Loading...</div>
    }
    if (token || isLoggedIn) {
        return <Outlet />
    } 
    else {
        <Navigate to="/login" />
    }
}

export default PrivateRoute