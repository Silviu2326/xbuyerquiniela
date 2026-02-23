import { useEffect } from 'react';

interface ToastProps {
  message: string;
  type?: 'info' | 'error' | 'success';
  onClose: () => void;
}

export const Toast = ({ message, type = 'info', onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = {
    info: 'bg-[#2196F3]',
    error: 'bg-[#F44336]',
    success: 'bg-[#FFE600]'
  }[type];

  const textColor = type === 'success' ? 'text-black' : 'text-white';

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[10000] animate-[bounce_0.5s_ease-out]">
      <div className={`${bgColor} ${textColor} px-5 py-3 rounded-xl font-bold text-sm shadow-lg max-w-sm`}>
        {message}
      </div>
    </div>
  );
};
