import cls from './DocumentsPage.module.scss';
import { DocumentBar, DocumentBarTypesEnum, DocumentTable } from '@entities/document';
import { useState } from 'react';

export const DocumentsPage = () => {
    const [activeTab, setActiveTab] = useState<DocumentBarTypesEnum>(DocumentBarTypesEnum.ALL);
    return (
        <div className={cls.wrapper}>
            <DocumentBar activeTab={activeTab} setActiveTab={setActiveTab} />
            <DocumentTable activeTab={activeTab} />
        </div>
    );
};

