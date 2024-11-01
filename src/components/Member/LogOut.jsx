import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.removeItem('userId');
        navigate(-1);
    }, [navigate]); // Add navigate here

    return null; 
};

export default Logout;
