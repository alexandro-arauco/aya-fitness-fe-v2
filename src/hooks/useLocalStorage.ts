import { useEffect, useState, useCallback } from "react";

export function useLocalStorage<T>() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []); // Empty dependency array - only run once

  const getItem = useCallback(
    (key: string): T | null => {
      if (!isClient || typeof window === "undefined") {
        return null;
      }

      try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      } catch (error) {
        console.error(`Error reading localStorage key "${key}":`, error);
        return null;
      }
    },
    [isClient]
  ); // Only depend on isClient

  const setItem = useCallback(
    (key: string, value: T): void => {
      if (!isClient || typeof window === "undefined") {
        return;
      }

      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [isClient]
  );

  const removeItem = useCallback(
    (key: string): void => {
      if (!isClient || typeof window === "undefined") {
        return;
      }

      try {
        window.localStorage.removeItem(key);
      } catch (error) {
        console.error(`Error removing localStorage key "${key}":`, error);
      }
    },
    [isClient]
  );

  return { getItem, setItem, removeItem, isClient };
}
