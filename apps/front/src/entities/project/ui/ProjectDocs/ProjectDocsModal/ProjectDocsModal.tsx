import cls from './ProjectDocsModal.module.scss';
import { SetStateAction, useCallback, useEffect, useState } from 'react';
import { BorderEnum, ColorEnum, SizeEnum } from '@shared/lib';
import { useDropzone } from 'react-dropzone';
import { Button, Select, Text } from '@shared/ui';

// Define document types
const documentTypes = [
    { value: 'act', label: 'Акт' },
    { value: 'invoice', label: 'Счет' },
    { value: 'design', label: 'Чертеж' },
    { value: 'other', label: 'Другие' },
];

export interface IProjectDocsModal {
    isOpen: boolean;
    setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}

export const ProjectDocsModal = ({ isOpen, setIsOpen }: IProjectDocsModal) => {
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [files, setFiles] = useState<File[]>([]);

    const handleKeyPress = useCallback((e: KeyboardEvent) => {
        if (e.code === 'Escape') {
            e.preventDefault();
            setIsOpen(false);
        }
    }, [setIsOpen]);

    const handleClickOverlay = useCallback((e: React.MouseEvent) => {
        if (e.currentTarget === e.target) {
            setIsOpen(false);
        }
    }, [setIsOpen]);

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'application/pdf': ['.pdf'],
            'application/msword': ['.doc'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
        },
        onDrop: (acceptedFiles) => setFiles(acceptedFiles),
    });

    const handleSubmit = () => {
        // Handle form submission logic here
        console.log('Selected Type:', selectedType);
        console.log('Files:', files);
        // Reset the state or close modal as needed
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleKeyPress);
            return () => {
                document.removeEventListener('keydown', handleKeyPress);
            };
        }
    }, [isOpen, handleKeyPress]);

    if (!isOpen) return null;

    return (
        <div
            className={cls.overlay}
            onClick={handleClickOverlay}
        >
            <div className={cls.modal}>
                <button
                    className={cls.closeButton}
                    onClick={() => setIsOpen(false)}
                >
                    &times;
                </button>
                <div className={cls.content}>
                    <div className={cls.formGroup}>
                        <Text.Heading
                            size={SizeEnum.H6}
                            color={ColorEnum.TEXT}
                        >
                            Тип документа:
                        </Text.Heading>
                        <Select
                            options={documentTypes}
                            onChange={(option) => setSelectedType(option?.value || null)}
                            placeholder="Выберите тип документа"
                        />
                    </div>

                    <div {...getRootProps({ className: cls.dropzone })}>
                        <input {...getInputProps()} />
                        <Text.Paragraph
                            size={SizeEnum.H2}
                            color={ColorEnum.TEXT}
                        >
                            Перетащите файлы сюда или кликните для выбора файлов
                        </Text.Paragraph>
                        {files.length > 0 && (
                            <ul className={cls.fileList}>
                                {files.map((file, index) => (
                                    <li key={index}>
                                        <Text.Paragraph
                                            size={SizeEnum.H2}
                                            color={ColorEnum.TEXT}
                                        >
                                            {file.name}
                                        </Text.Paragraph>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <Button
                        border={BorderEnum.H6}
                        size={SizeEnum.H3}
                        onClick={handleSubmit}
                    >
                        <Text.Paragraph
                            size={SizeEnum.H2}
                            color={ColorEnum.WHITE}
                        >
                            Сохранить
                        </Text.Paragraph>
                    </Button>
                </div>
            </div>
        </div>
    );
};
