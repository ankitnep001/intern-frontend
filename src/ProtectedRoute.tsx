import encryptDecrypt from 'function/encryptDecrypt';
import { Navigate } from 'react-router-dom';
import AdminTemplate from 'templates/AdminTemplate';

const ProtectedRoute = () => {
    if (encryptDecrypt.decrypt(localStorage.getItem('accessTokenInternProject') as string)) {
        return <AdminTemplate />;
    } else
        return <Navigate to="/login" replace />;
};

export default ProtectedRoute;