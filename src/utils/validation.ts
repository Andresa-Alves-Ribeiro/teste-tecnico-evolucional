export interface ValidationError {
  field: string;
  message: string;
}

export const validateStudent = (data: any): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!data.name || data.name.trim().length < 3) {
    errors.push({
      field: 'name',
      message: 'O nome deve ter pelo menos 3 caracteres',
    });
  }

  if (!data.degreeId) {
    errors.push({
      field: 'degreeId',
      message: 'A série é obrigatória',
    });
  }

  if (!data.classId) {
    errors.push({
      field: 'classId',
      message: 'A classe é obrigatória',
    });
  }

  return errors;
};

export const validateTeacher = (data: any): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!data.name || data.name.trim().length < 3) {
    errors.push({
      field: 'name',
      message: 'O nome deve ter pelo menos 3 caracteres',
    });
  }

  if (!data.subject || data.subject.trim().length < 2) {
    errors.push({
      field: 'subject',
      message: 'A matéria é obrigatória',
    });
  }

  if (!data.degrees || data.degrees.length === 0) {
    errors.push({
      field: 'degrees',
      message: 'Selecione pelo menos uma série',
    });
  }

  if (!data.classes || data.classes.length === 0) {
    errors.push({
      field: 'classes',
      message: 'Selecione pelo menos uma classe',
    });
  }

  return errors;
};

export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove caracteres potencialmente perigosos
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}; 