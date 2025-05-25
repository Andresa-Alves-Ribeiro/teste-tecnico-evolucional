import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Estado para armazenar o valor
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Tenta obter do localStorage
      const item = window.localStorage.getItem(key);
      // Retorna o item parseado ou o valor inicial
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Em caso de erro, retorna o valor inicial
      console.error('Erro ao acessar localStorage:', error);
      return initialValue;
    }
  });

  // Retorna uma versão embrulhada do useState's setter function
  // que persiste o novo valor no localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Permite que o valor seja uma função para que tenhamos a mesma API que useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Salva o estado
      setStoredValue(valueToStore);
      // Salva no localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Erro ao salvar no localStorage:', error);
    }
  };

  // Atualiza o valor quando a chave muda
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.error('Erro ao sincronizar com localStorage:', error);
    }
  }, [key]);

  return [storedValue, setValue] as const;
} 