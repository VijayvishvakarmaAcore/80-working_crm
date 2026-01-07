import { useState, useCallback } from 'react';

export const useToast = () => {
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'info', // 'success', 'error', 'warning', 'info'
    duration: 3000
  });

  const showToast = useCallback((message, type = 'info', duration = 3000) => {
    setToast({
      show: true,
      message,
      type,
      duration
    });

    // Auto hide after duration
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, duration);
  }, []);

  const hideToast = useCallback(() => {
    setToast(prev => ({ ...prev, show: false }));
  }, []);

  return { toast, showToast, hideToast };
};

export default useToast;