"use client";

import { useEffect, useState } from "react";
import { CustomModal } from "./CustomModal";
import { Button } from "./ui/button";

interface AlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading: boolean;
    description?: string;
}

export const AlertModal: React.FC<AlertModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    loading,
    description = "This action cannot be undone.",
}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <CustomModal
            title="Are you sure?"
            description={description}
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="pt-6 space-x-3 flex items-center justify-center md:justify-end w-full">
                <Button disabled={loading} variant="outline" onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    disabled={loading}
                    variant="destructive"
                    onClick={onConfirm}
                    className="dark:bg-red-500"
                >
                    Continue
                </Button>
            </div>
        </CustomModal>
    );
};
