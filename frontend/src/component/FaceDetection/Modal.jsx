import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 w-screen">
      <div className="bg-white rounded-lg p-6 w-[80%]  max-w-md transform transition-all duration-300 ease-in-out">
        {children}
      </div>
    </div>
  );
};

export default Modal;

