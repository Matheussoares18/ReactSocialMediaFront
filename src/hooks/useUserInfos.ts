import { AuthUser } from 'interfaces/AuthUser';
import { useSelector } from 'react-redux';
import { RootState } from 'store/reducers';

export const useUserInfos = (): AuthUser | undefined =>
  useSelector((state: RootState) => state.authUser.authUser);
