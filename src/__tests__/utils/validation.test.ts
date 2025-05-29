import { createValidationRule, validateField, commonRules, validateStudent, validateTeacher, sanitizeInput } from '../../utils/validation';

describe('Validation Utils', () => {
  describe('createValidationRule', () => {
    it('should create a validation rule with correct structure', () => {
      const rule = createValidationRule('test', () => true, 'test message');

      expect(rule).toEqual({
        field: 'test',
        validate: expect.any(Function),
        message: 'test message',
      });
    });
  });

  describe('validateField', () => {
    it('should return null when all rules pass', () => {
      const rules = [
        createValidationRule('test', () => true, 'error 1'),
        createValidationRule('test', () => true, 'error 2'),
      ];

      const errors = validateField('value', rules);
      expect(errors).toBeNull();
    });

    it('should return the first error message', () => {
      const rules = [
        createValidationRule('test', () => true, 'error 1'),
        createValidationRule('test', () => false, 'error 2'),
      ];
      const errors = validateField('value', rules);
      expect(errors).toBe('error 2');
    });
  });

  describe('commonRules', () => {
    describe('required', () => {
      it('should validate required fields', () => {
        const rule = commonRules.required('test');
        expect(rule.validate('value')).toBe(true);
        expect(rule.validate('')).toBe(false);
        expect(rule.validate(null)).toBe(false);
        expect(rule.validate(undefined)).toBe(false);
      });
    });

    describe('minLength', () => {
      it('should validate minimum length', () => {
        const rule = commonRules.minLength('test', 3);
        expect(rule.validate('abc')).toBe(true);
        expect(rule.validate('ab')).toBe(false);
      });
    });

    describe('maxLength', () => {
      it('should validate maximum length', () => {
        const rule = commonRules.maxLength('test', 3);
        expect(rule.validate('abc')).toBe(true);
        expect(rule.validate('abcd')).toBe(false);
      });
    });

    describe('email', () => {
      it('should validate email format', () => {
        const rule = commonRules.email('test');
        expect(rule.validate('test@example.com')).toBe(true);
        expect(rule.validate('invalid-email')).toBe(false);
      });
    });

    describe('number', () => {
      it('should validate number format', () => {
        const rule = commonRules.number('test');
        expect(rule.validate('123')).toBe(true);
        expect(rule.validate('abc')).toBe(false);
      });
    });

    describe('date', () => {
      it('should validate date format', () => {
        const rule = commonRules.date('test');
        expect(rule.validate('2024-03-20')).toBe(true);
        expect(rule.validate('invalid-date')).toBe(false);
      });
    });

    describe('phone', () => {
      it('should validate phone format', () => {
        const rule = commonRules.phone('test');
        expect(rule.validate('(11) 99999-9999')).toBe(true);
        expect(rule.validate('invalid-phone')).toBe(false);
      });
    });

    describe('cpf', () => {
      it('should validate CPF format', () => {
        const rule = commonRules.cpf('test');
        expect(rule.validate('123.456.789-00')).toBe(true);
        expect(rule.validate('invalid-cpf')).toBe(false);
      });
    });

    describe('cnpj', () => {
      it('should validate CNPJ format', () => {
        const rule = commonRules.cnpj('test');
        expect(rule.validate('12.345.678/0001-90')).toBe(true);
        expect(rule.validate('invalid-cnpj')).toBe(false);
      });
    });

    describe('cep', () => {
      it('should validate CEP format', () => {
        const rule = commonRules.cep('test');
        expect(rule.validate('12345-678')).toBe(true);
        expect(rule.validate('invalid-cep')).toBe(false);
      });
    });
  });

  describe('validateStudent', () => {
    it('should validate student data correctly', () => {
      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
      };

      const invalidData = {
        name: 'Jo',
        email: 'invalid-email',
      };

      expect(validateStudent(validData)).toEqual({});
      expect(validateStudent(invalidData)).toEqual({
        name: 'Nome deve ter no mínimo 3 caracteres',
        email: 'Email inválido',
      });
    });
  });

  describe('validateTeacher', () => {
    it('should validate teacher data correctly', () => {
      const validData = {
        name: 'John Doe',
        subject: 'Mathematics',
      };

      const invalidData = {
        name: 'Jo',
        subject: '',
      };

      expect(validateTeacher(validData)).toEqual({});
      expect(validateTeacher(invalidData)).toEqual({
        name: 'Nome deve ter no mínimo 3 caracteres',
        subject: 'Disciplina é obrigatório',
      });
    });
  });

  describe('sanitizeInput', () => {
    it('should sanitize input correctly', () => {
      const input = '<script>alert("test")</script>';
      const expected = 'scriptalert("test")/script';
      expect(sanitizeInput(input)).toBe(expected);
    });

    it('should trim whitespace', () => {
      expect(sanitizeInput('  test  ')).toBe('test');
    });

    it('should handle empty string', () => {
      expect(sanitizeInput('')).toBe('');
    });
  });
}); 