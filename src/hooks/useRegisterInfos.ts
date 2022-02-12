import { UserRegisterValues } from 'interfaces/UserRegister';
import { useSelector } from 'react-redux';
import { RootState } from 'store/reducers';

export const useRegisterInfos = (): UserRegisterValues =>
  useSelector(
    (state: RootState) => state.userRegisterValues.userRegisterValues
  );
