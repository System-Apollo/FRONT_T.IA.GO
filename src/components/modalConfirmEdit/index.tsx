import React from "react";

interface NotificationModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
    isSuccess?: boolean;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ isOpen, onClose, title, message, isSuccess }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
                <h2 className={`text-xl font-semibold ${isSuccess ? "text-green-600" : "text-red-600"}`}>
                    {title}
                </h2>
                <p className="text-gray-700 mt-4">{message}</p>
                <div className="flex justify-end mt-6">
                    <button
                        onClick={onClose}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotificationModal;
