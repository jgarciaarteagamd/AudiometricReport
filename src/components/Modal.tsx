
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  type?: 'info' | 'error' | 'success';
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title = "AudiometricReport", message, type = 'info' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden transform transition-all scale-100 animate-slideIn">
        <div className={`h-1.5 w-full ${
          type === 'error' ? 'bg-rose-500' : 
          type === 'success' ? 'bg-green-500' : 
          'bg-primary'
        }`}></div>
        
        <div className="p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className={`p-3 rounded-full ${
              type === 'error' ? 'bg-rose-50 text-rose-500' : 
              type === 'success' ? 'bg-green-50 text-green-500' : 
              'bg-purple-50 text-primary'
            }`}>
              {type === 'error' && <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>}
              {type === 'success' && <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
              {type === 'info' && <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            </div>
          </div>
          
          <h3 className="text-xl font-black text-slate-800 mb-2 tracking-tight">
            {title}
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed mb-8">
            {message}
          </p>
          
          <button 
            onClick={onClose}
            className={`w-full py-3 rounded-xl font-bold text-white shadow-lg transition-all transform active:scale-95 ${
              type === 'error' ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-200' : 
              type === 'success' ? 'bg-green-600 hover:bg-green-700 shadow-green-200' : 
              'bg-primary hover:bg-primary-hover shadow-purple-200'
            }`}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
