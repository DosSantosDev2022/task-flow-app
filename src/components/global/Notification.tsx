'use client'
import React, { useEffect } from 'react';
import { motion } from 'framer-motion'
import { ImCheckboxChecked } from "react-icons/im";
interface NotificationProps {
  message: string;
  duration?: number; // Tempo em milissegundos para a notificação desaparecer
  onClose: () => void; // Função para fechar a notificação
}

const Notification: React.FC<NotificationProps> = ({ message, duration = 5000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.5 } }}
      className="fixed bottom-4 rounded-md right-4 bg-gray-800 text-zinc-50 p-4  shadow-lg"
    >
      <div className='flex items-center justify-between gap-2 w-full'>
        <p className='text-base font-medium text-zinc-50 '>{message}
        </p>
        <ImCheckboxChecked className='text-green-600' />
      </div>
    </motion.div>
  );
};

export default Notification;
