import { toast } from 'react-toastify';
import { CONSTANTS } from 'utils/constants';

const GIGABYTE = 1024;

export const isValidFile = (
  file: File,
  validFormats: string[],
  maxFileSize: number
): boolean | null => {
  const MAX_FILE_SIZE_IN_GIGABYTES = maxFileSize;

  if (
    validFormats.includes(file.type.toLocaleLowerCase()) &&
    file.size / GIGABYTE / GIGABYTE <= MAX_FILE_SIZE_IN_GIGABYTES
  ) {
    return true;
  }
  if (file.size / GIGABYTE / GIGABYTE > MAX_FILE_SIZE_IN_GIGABYTES) {
    toast.error(`Tamanho máximo de ${maxFileSize}`, {
      position: 'top-right',
      autoClose: CONSTANTS.alertDefaultTime,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return false;
  }
  toast.error('Formato inválido', {
    position: 'top-right',
    autoClose: CONSTANTS.alertDefaultTime,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
  return null;
};
