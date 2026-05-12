import Cookies from 'js-cookie';
import { AUTH } from '@/constants/auth';

export const saveAuthTokens = (accessToken: string, refreshToken: string) => {
  Cookies.set(AUTH.COOKIE.ACCESS_TOKEN, accessToken, {
    path: '/',
    expires: 1,
  });

  Cookies.set(AUTH.COOKIE.REFRESH_TOKEN, refreshToken, {
    path: '/',
    expires: 7,
  });
};

export const logout = () => {
  Cookies.remove(AUTH.COOKIE.ACCESS_TOKEN);
  Cookies.remove(AUTH.COOKIE.REFRESH_TOKEN);
};
