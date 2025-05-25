import { ValidationRule, ValidationError, ValidationValue, ValidationContext } from '../types/common';
import { VALIDATION_MESSAGES } from '../constants';

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
): ValidationError[] => {
  return rules
    .filter(rule => !rule.validate(value, context))
    .map(rule => ({
      field: rule.field,
      message: rule.message,
    }));
};

// Regras comuns de validação
export const commonRules = {
  required: (field: string, message?: string) =>
    createValidationRule(
      field,
      (value) => value !== undefined && value !== null && value !== '',
      message || VALIDATION_MESSAGES.required(field)
    ),
  
  minLength: (field: string, length: number, message?: string) =>
    createValidationRule(
      field,
      (value) => value && String(value).length >= length,
      message || VALIDATION_MESSAGES.minLength(field, length)
    ),
  
  maxLength: (field: string, length: number, message?: string) =>
    createValidationRule(
      field,
      (value) => !value || String(value).length <= length,
      message || VALIDATION_MESSAGES.maxLength(field, length)
    ),
  
  email: (field: string, message?: string) =>
    createValidationRule(
      field,
      (value) => !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value)),
      message || VALIDATION_MESSAGES.email
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
};

// Validação específica para estudantes
export const validateStudent = (data: Record<string, ValidationValue>): ValidationError[] => {
  const rules = [
    commonRules.required('name', VALIDATION_MESSAGES.required('Nome')),
    commonRules.minLength('name', 3, VALIDATION_MESSAGES.minLength('Nome', 3)),
    commonRules.required('degreeId', VALIDATION_MESSAGES.required('Série')),
    commonRules.required('classId', VALIDATION_MESSAGES.required('Classe')),
  ];

  return Object.entries(data).flatMap(([field, value]) =>
    validateField(value, rules.filter(rule => rule.field === field), { value, field, formData: data })
  );
};

// Validação específica para professores
export const validateTeacher = (data: Record<string, ValidationValue>): ValidationError[] => {
  const rules = [
    commonRules.required('name', VALIDATION_MESSAGES.required('Nome')),
    commonRules.minLength('name', 3, VALIDATION_MESSAGES.minLength('Nome', 3)),
    commonRules.email('email', VALIDATION_MESSAGES.email),
    commonRules.required('subject', VALIDATION_MESSAGES.required('Disciplina')),
  ];

  return Object.entries(data).flatMap(([field, value]) =>
    validateField(value, rules.filter(rule => rule.field === field), { value, field, formData: data })
  );
};

// Função de sanitização de input
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove caracteres potencialmente perigosos
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}; 