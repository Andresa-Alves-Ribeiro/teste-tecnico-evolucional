import { ValidationValue, ValidationContext } from '../types/common/validation';
import { VALIDATION_MESSAGES } from '../constants';

export interface ValidationRule {
  field: string;
  validate: (value: ValidationValue, context?: ValidationContext) => boolean;
  message: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export const createValidationRule = (
  field: string,
  validate: (value: ValidationValue, context?: ValidationContext) => boolean,
  message: string
): ValidationRule => ({
  field,
  validate,
  message,
});

export const validateField = (
  value: ValidationValue,
  rules: ValidationRule[],
  context?: ValidationContext
): string | null => {
  for (const rule of rules) {
    if (!rule.validate(value, context)) {
      return rule.message;
    }
  }
  return null;
};

// Regras comuns de validação
export const commonRules = {
  required: (field: string, message?: string) =>
    createValidationRule(
      field,
      (value) => Boolean(value),
      message || `${field} é obrigatório`
    ),
  
  minLength: (field: string, length: number, message?: string) =>
    createValidationRule(
      field,
      (value) => Boolean(value && String(value).length >= length),
      message || `${field} deve ter no mínimo ${length} caracteres`
    ),
  
  maxLength: (field: string, length: number, message?: string) =>
    createValidationRule(
      field,
      (value) => !value || String(value).length <= length,
      message || `${field} deve ter no máximo ${length} caracteres`
    ),
  
  email: (field: string, message?: string) =>
    createValidationRule(
      field,
      (value) => {
        if (!value) return true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(String(value));
      },
      message || 'Email inválido'
    ),
  
  number: (field: string, message?: string) =>
    createValidationRule(
      field,
      (value) => !value || !isNaN(Number(value)),
      message || VALIDATION_MESSAGES.number(field)
    ),

  date: (field: string, message?: string) =>
    createValidationRule(
      field,
      (value) => !value || !isNaN(Date.parse(String(value))),
      message || VALIDATION_MESSAGES.invalidDate
    ),

  phone: (field: string, message?: string) =>
    createValidationRule(
      field,
      (value) => !value || /^\(\d{2}\) \d{5}-\d{4}$/.test(String(value)),
      message || VALIDATION_MESSAGES.invalidPhone
    ),

  cpf: (field: string, message?: string) =>
    createValidationRule(
      field,
      (value) => !value || /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(String(value)),
      message || VALIDATION_MESSAGES.invalidCPF
    ),

  cnpj: (field: string, message?: string) =>
    createValidationRule(
      field,
      (value) => !value || /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(String(value)),
      message || VALIDATION_MESSAGES.invalidCNPJ
    ),

  cep: (field: string, message?: string) =>
    createValidationRule(
      field,
      (value) => !value || /^\d{5}-\d{3}$/.test(String(value)),
      message || VALIDATION_MESSAGES.invalidCEP
    ),

  pattern: (field: string, pattern: RegExp, message?: string) =>
    createValidationRule(
      field,
      (value) => !value || pattern.test(String(value)),
      message || `${field} está em formato inválido`
    ),

  match: (field: string, matchField: string, message?: string) =>
    createValidationRule(
      field,
      (value, context) => {
        if (!context?.formData) return true;
        return value === context.formData[matchField];
      },
      message || `${field} não corresponde a ${matchField}`
    ),
};

// Validação específica para estudantes
export const validateStudent = (data: Record<string, ValidationValue>): Record<string, string> => {
  const errors: Record<string, string> = {};

  const nameError = validateField(data.name, [
    commonRules.required('Nome'),
    commonRules.minLength('Nome', 3),
    commonRules.maxLength('Nome', 100),
  ]);

  if (nameError) {
    errors.name = nameError;
  }

  const emailError = validateField(data.email, [
    commonRules.required('Email'),
    commonRules.email('Email'),
  ]);

  if (emailError) {
    errors.email = emailError;
  }

  return errors;
};

// Validação específica para professores
export const validateTeacher = (data: Record<string, ValidationValue>): Record<string, string> => {
  const errors: Record<string, string> = {};

  const nameError = validateField(data.name, [
    commonRules.required('Nome'),
    commonRules.minLength('Nome', 3),
    commonRules.maxLength('Nome', 100),
  ]);

  if (nameError) {
    errors.name = nameError;
  }

  const subjectError = validateField(data.subject, [
    commonRules.required('Disciplina'),
    commonRules.minLength('Disciplina', 3),
    commonRules.maxLength('Disciplina', 50),
  ]);

  if (subjectError) {
    errors.subject = subjectError;
  }

  return errors;
};

// Função de sanitização de input
export const sanitizeInput = (value: string): string => {
  return value
    .trim()
    .replace(/[<>]/g, '') // Remove < and > to prevent XSS
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove on* attributes
    .replace(/data:/gi, ''); // Remove data: protocol
}; 