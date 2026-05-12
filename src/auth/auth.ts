import { AUTH } from '@/constants/auth';
import Cookies from 'js-cookie';

export const isAuthenticated = (): boolean => {
  const token = Cookies.get(AUTH.COOKIE.ACCESS_TOKEN);
  return typeof token === 'string' && token.length > 0;
};
