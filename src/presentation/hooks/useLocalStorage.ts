import { useState, useEffect } from 'react';

interface StorageConfig {
  key: string;
  columns: string[];
}

interface UseLocalStorageStore<T> {
  data: T[];
  error: string | null;
  loading: boolean;
  insertItem: (item: T) => Promise<void>;
  updateItem: (id: number, item: T) => Promise<void>;
  deleteItem: (id: number) => Promise<void>;
  getAllItems: () => Promise<void>;
  getById: (id: number) => Promise<T | null>;
  findByField: (field: keyof T, value: any) => Promise<T[]>;
  clearStore: () => Promise<void>;
}

export const useLocalStorage = <T extends { id?: number }>(
  config: StorageConfig
): UseLocalStorageStore<T> => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Función para generar un nuevo ID único
  const generateUniqueId = (items: T[]): number => {
    if (items.length === 0) return 1;
    const maxId = Math.max(...items.map(item => item.id || 0));
    return maxId + 1;
  };

  // Función para validar si un ID ya existe
  const isIdUnique = (id: number, items: T[]): boolean => {
    return !items.some(item => item.id === id);
  };

  const saveToStorage = (items: T[]) => {
    try {
      localStorage.setItem(config.key, JSON.stringify(items));
      setData(items);
    } catch (err) {
      setError(`Error saving to localStorage: ${err}`);
      throw err;
    }
  };

  const loadFromStorage = (): T[] => {
    try {
      const stored = localStorage.getItem(config.key);
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      setError(`Error reading from localStorage: ${err}`);
      return [];
    }
  };

  useEffect(() => {
    try {
      const items = loadFromStorage();
      setData(items);
    } catch (err) {
      setError(`Error initializing from localStorage: ${err}`);
    } finally {
      setLoading(false);
    }
  }, []);

  const getAllItems = async (): Promise<void> => {
    try {
      const items = loadFromStorage();
      setData(items);
    } catch (err) {
      setError(`Error getting all items: ${err}`);
    }
  };

  const insertItem = async (item: T): Promise<void> => {
    try {
      const items = loadFromStorage();

      // Si el item tiene un ID, verificar que no exista
      if (item.id !== undefined) {
        if (!isIdUnique(item.id, items)) {
          throw new Error(`Item with ID ${item.id} already exists`);
        }
      } else {
        // Si no tiene ID, generar uno nuevo
        const newId = generateUniqueId(items);
        item = { ...item, id: newId };
      }

      const newItems = [...items, item];
      saveToStorage(newItems);
    } catch (err) {
      setError(`Error inserting item: ${err}`);
      throw err;
    }
  };

  const updateItem = async (id: number, item: T): Promise<void> => {
    try {
      const items = loadFromStorage();
      const index = items.findIndex(i => i.id === id);
      if (index === -1) throw new Error('Item not found');

      // Asegurarse de mantener el mismo ID
      const updatedItems = [
        ...items.slice(0, index),
        { ...item, id },
        ...items.slice(index + 1)
      ];
      saveToStorage(updatedItems);
    } catch (err) {
      setError(`Error updating item: ${err}`);
      throw err;
    }
  };

  const deleteItem = async (id: number): Promise<void> => {
    try {
      const items = loadFromStorage();
      const filteredItems = items.filter(item => item.id !== id);
      saveToStorage(filteredItems);
    } catch (err) {
      setError(`Error deleting item: ${err}`);
      throw err;
    }
  };

  const getById = async (id: number): Promise<T | null> => {
    try {
      const items = loadFromStorage();
      return items.find(item => item.id === id) || null;
    } catch (err) {
      setError(`Error getting item by id: ${err}`);
      throw err;
    }
  };

  const findByField = async (field: keyof T, value: any): Promise<T[]> => {
    try {
      const items = loadFromStorage();
      return items.filter(item => item[field] === value);
    } catch (err) {
      setError(`Error finding items by field: ${err}`);
      throw err;
    }
  };

  const clearStore = async (): Promise<void> => {
    try {
      localStorage.removeItem(config.key);
      setData([]);
    } catch (err) {
      setError(`Error clearing store: ${err}`);
      throw err;
    }
  };

  return {
    data,
    error,
    loading,
    insertItem,
    updateItem,
    deleteItem,
    getAllItems,
    getById,
    findByField,
    clearStore
  };
};