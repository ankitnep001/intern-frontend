import encryptDecrypt from 'function/encryptDecrypt';
import { Navigate } from 'react-router-dom';
import AdminTemplate from 'templates/AdminTemplate';

const ProtectedRoute = () => {
    const token = encryptDecrypt.decrypt(localStorage.getItem('accessTokenInternProject') as string) || encryptDecrypt.decrypt(sessionStorage.getItem('accessTokenInternProject') as string)
    if (token) {
        return <AdminTemplate />;
    } else
        return <Navigate to="/login" replace />;
};

export default ProtectedRoute;