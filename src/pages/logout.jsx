import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        const url = 'http://localhost:5093/api/Authentication/logout';

        axios.post(url)
            .then(response => {
                if (response.status === 200) {
                    console.log(response.data.message); 
                    
                    localStorage.removeItem('session');
                    localStorage.removeItem('user');
                    
                    navigate('/girisyap');
                } else {
                    console.log('Unexpected status code:', response.status);
                }
            })
            .catch(error => {
                console.error('Error logging out:', error);
            });
    }, [navigate]);

    return (
        <div>
            <h2>Çıkış yapılıyor...</h2>
        </div>
    );
}

export default Logout;
