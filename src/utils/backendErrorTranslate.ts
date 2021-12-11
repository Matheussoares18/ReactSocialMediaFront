interface ErrorReturn {
  errorType: BackendErrors;
  translatedError: string;
}

export enum BackendErrors {
  GENERIC_ERROR = 'Generic error',
  INVALID_CREDENTIALS = 'Invalid credentials',
  EMAIL_ALREADY_EXISTS = 'User with that email already exists',
}

export const backendErrorTranslate = (message?: string): ErrorReturn => {
  switch (message) {
    case BackendErrors.INVALID_CREDENTIALS:
      return {
        errorType: BackendErrors.INVALID_CREDENTIALS,
        translatedError: 'Email ou senha inválidos',
      };
    case BackendErrors.EMAIL_ALREADY_EXISTS:
      return {
        errorType: BackendErrors.EMAIL_ALREADY_EXISTS,
        translatedError: 'Email já cadastrado',
      };
    default:
      return {
        errorType: BackendErrors.GENERIC_ERROR,
        translatedError: 'Falha ao realizar operação',
      };
  }
};
