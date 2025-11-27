import React from 'react';
import { LEGAL_TEXTS } from '../constants';
import { X } from 'lucide-react';
import { Button } from './ui/Button';

interface LegalModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full flex flex-col max-h-[90vh]">
                <div className="p-5 border-b flex justify-between items-center flex-shrink-0">
                    <h3 className="text-xl font-bold text-gray-800">Base Legal (Art. 6º-A)</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-800 p-1 rounded-full">
                        <X size={24} />
                    </button>
                </div>
                <div className="p-6 space-y-6 overflow-y-auto">
                    {Object.entries(LEGAL_TEXTS).map(([key, value]) => (
                        <div key={key} className="p-4 bg-light border border-gray-200 rounded-md"
                             dangerouslySetInnerHTML={{ __html: value }} />
                    ))}
                </div>
                <div className="p-4 bg-light text-right flex-shrink-0 border-t">
                    <Button
                        onClick={onClose}
                        variant="secondary"
                    >
                        Fechar
                    </Button>
                </div>
            </div>
        </div>
    );
};