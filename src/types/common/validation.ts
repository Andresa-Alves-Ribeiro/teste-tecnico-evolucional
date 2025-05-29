export type ValidationValue = string | number | boolean | null | undefined;

export interface ValidationContext {
  value: ValidationValue;
  field: string;
  formData: Record<string, ValidationValue>;
}

export interface ValidationRule {
  field: string;
  validate: (value: ValidationValue, context?: ValidationContext) => boolean;
  message: string;
}

export interface ValidationError {
  field: string;
  message: string;
} 