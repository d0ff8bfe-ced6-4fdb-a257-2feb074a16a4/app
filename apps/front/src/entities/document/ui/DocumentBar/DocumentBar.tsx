import cls from './DocumentBar.module.scss'; // Ensure the styles are correctly imported
import { SetStateAction, useState } from 'react';
import { DocumentBarTypesEnum } from '@entities/document';
import { Select, Text } from '@shared/ui';
import { ColorEnum, SizeEnum } from '@shared/lib';

interface DocumentBar {
    activeTab: string;
    setActiveTab: React.Dispatch<SetStateAction<DocumentBarTypesEnum>>;
}

export const DocumentBar = ({ activeTab, setActiveTab }: DocumentBar) => {
    const opt = [
        {
            value: 'all',
            label: 'Все проекты',
        },
    ];
    return (
        <div className={cls.wrapper}>
            <ul className={cls.list}>
                {Object.values(DocumentBarTypesEnum).map((type: DocumentBarTypesEnum) => (
                    <li
                        key={type}
                        className={cls.listItem}
                    >
                        <Text.Paragraph
                            onClick={() => setActiveTab(type)}
                            color={activeTab === type ? ColorEnum.PRIMARY : ColorEnum.TEXT}
                            size={SizeEnum.H1}
                        >
                            {getTabLabel(type)}
                        </Text.Paragraph>
                    </li>
                ))}
            </ul>
            <Select options={opt} placeholder={'Проекты'} onChange={() => {
            }} />
        </div>
    );
};

// Helper function to get the label for each tab
const getTabLabel = (type: DocumentBarTypesEnum) => {
    switch (type) {
        case DocumentBarTypesEnum.ACT:
            return 'Акты';
        case DocumentBarTypesEnum.INVOICE:
            return 'Счета';
        case DocumentBarTypesEnum.DESIGN:
            return 'Чертежи';
        case DocumentBarTypesEnum.ALL:
            return 'Все';
        default:
            return '';
    }
};
