export type ValidationResult =
    | {
        success: true;
        value: unknown;
    }
    | {
        success: false;
        error: ValidationError;
    }


export class ValidationError extends Error { };