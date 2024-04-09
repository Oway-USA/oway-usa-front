import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { setCookie } from '@/utils/cookieHelpers';
import { GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';
import { useRouter } from 'next/router';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const GoogleLoginButton = () => {
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSuccess = async (credentialResponse) => {
    console.log(credentialResponse);
    const receivedToken = credentialResponse.credential;
    setToken(receivedToken);
    await sendTokenToBackend(receivedToken);
  };

  const handleError = () => {
    console.log('Login Failed');
  };

  const sendTokenToBackend = async (token) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/users/auth/google/`,
        { token },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = response.data;

      if (response.status === 200) {
        setCookie('accessToken', data.access);
        if (data?.is_admin) {
          document.cookie = 'isAdmin=true';
          router.push('/admin');
        } else {
          router.push('/user');
        }
      } else {
        setError(data.detail || 'Произошла ошибка при авторизации');
      }
    } catch (error) {
      setError('Произошла ошибка при авторизации');
    }
  };

  return (
    <GoogleOAuthProvider clientId="1093979259932-crrapug660vsftv9pclko1o2nata4kgu.apps.googleusercontent.com">
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
