'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';
import Notification from '@/components/global/Notification';

interface NotificationContextType {
  showNotification: (message: string, duration?: number) => void;
}

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }: {children: ReactNode}) => {
  const [notification, setNotification] = useState<{ message: string; duration: number } | null>(null);

  const showNotification = (message: string, duration = 5000) => {
    setNotification({ message, duration });
  };

  const handleClose = () => {
    setNotification(null);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && (
        <Notification
          message={notification.message}
          duration={notification.duration}
          onClose={handleClose}
        />
      )}
    </NotificationContext.Provider>
  );
};
