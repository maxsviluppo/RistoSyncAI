import { useState } from 'react';

interface DialogState {
    isOpen: boolean;
    title: string;
    message: string;
    type: 'confirm' | 'alert' | 'success' | 'delete';
    onConfirm?: () => void;
    onCancel?: () => void;
}

export function useDialog() {
    const [dialogState, setDialogState] = useState<DialogState>({
        isOpen: false,
        title: '',
        message: '',
        type: 'alert'
    });

    const showConfirm = (title: string, message: string): Promise<boolean> => {
        return new Promise((resolve) => {
            setDialogState({
                isOpen: true,
                title,
                message,
                type: 'confirm',
                onConfirm: () => {
                    setDialogState(prev => ({ ...prev, isOpen: false }));
                    resolve(true);
                },
                onCancel: () => {
                    setDialogState(prev => ({ ...prev, isOpen: false }));
                    resolve(false);
                }
            });
        });
    };

    const showDelete = (title: string, message: string): Promise<boolean> => {
        return new Promise((resolve) => {
            setDialogState({
                isOpen: true,
                title,
                message,
                type: 'delete',
                onConfirm: () => {
                    setDialogState(prev => ({ ...prev, isOpen: false }));
                    resolve(true);
                },
                onCancel: () => {
                    setDialogState(prev => ({ ...prev, isOpen: false }));
                    resolve(false);
                }
            });
        });
    };

    const showAlert = (title: string, message: string): Promise<void> => {
        return new Promise((resolve) => {
            setDialogState({
                isOpen: true,
                title,
                message,
                type: 'alert',
                onConfirm: () => {
                    setDialogState(prev => ({ ...prev, isOpen: false }));
                    resolve();
                }
            });
        });
    };

    const showSuccess = (title: string, message: string): Promise<void> => {
        return new Promise((resolve) => {
            setDialogState({
                isOpen: true,
                title,
                message,
                type: 'success',
                onConfirm: () => {
                    setDialogState(prev => ({ ...prev, isOpen: false }));
                    resolve();
                }
            });
        });
    };

    const closeDialog = () => {
        setDialogState(prev => ({ ...prev, isOpen: false }));
    };

    return {
        dialogState,
        showConfirm,
        showDelete,
        showAlert,
        showSuccess,
        closeDialog
    };
}
