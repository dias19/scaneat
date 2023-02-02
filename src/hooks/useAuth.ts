import { useAppSelector } from '~/store/store';

export const useAuth = () => {
  const { isLoggedIn } = useAppSelector((state) => state.authSlice);

  return { isLoggedIn };
};
