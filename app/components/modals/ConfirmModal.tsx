"use client"

import React from 'react'

interface IConfirmModalProps {
    isProcessing: boolean,
    isModalOpen: boolean,
    handleConfirm: (id: string) => void,
    handleCloseModal: () => void,
    selectedBranding: string,
}

const ConfirmModal: React.FC<IConfirmModalProps> = ({ isProcessing, handleConfirm, handleCloseModal, selectedBranding, isModalOpen }) => {
    return (
        <div>
            {
                isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white rounded-lg shadow-xl w-96 p-6">
                            <div className="mb-4">
                                <h2 className="text-xl font-bold text-gray-800">
                                    İşlemi Onaylayın
                                </h2>
                                <p className="text-gray-600 mt-2">
                                    Bu işlem geri alınamaz. Devam etmek istediğinizden emin misiniz?
                                </p>
                            </div>

                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    onClick={handleCloseModal}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                                    disabled={isProcessing}
                                >
                                    İptal
                                </button>
                                <button
                                    onClick={() => handleConfirm(selectedBranding as string)}
                                    className={`px-4 py-2 bg-red-500 text-white rounded-md transition-colors 
                                ${isProcessing
                                            ? 'opacity-50 cursor-not-allowed'
                                            : 'hover:bg-red-600'
                                        }`}
                                    disabled={isProcessing}
                                >
                                    {isProcessing ? 'İşleniyor...' : 'Evet, Onayla'}
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>

    )
}

export default ConfirmModal