import { AxiosError } from 'axios';

export class IError extends Error {
  constructor(error: AxiosError | Error | unknown) {
    if (error instanceof AxiosError) {
      super(error.response?.data.message);
    } else if (error instanceof Error) {
      super(error.message);
    }
  }
}
