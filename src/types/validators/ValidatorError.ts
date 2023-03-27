import type { ValidatorResult } from "./ValidatorResult";

export type ValidatorError = Omit<ValidatorResult, 'isValid'>;