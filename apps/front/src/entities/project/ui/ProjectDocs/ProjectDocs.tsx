import cls from './ProjectDocs.module.scss';
import { Button, ButtonTypeEnum, Text } from '@shared/ui';
import { BorderEnum, ColorEnum, SizeEnum } from '@shared/lib';
import { IProjectDocsItem, ProjectDocsItem, ProjectDocsItemType, ProjectDocsModal } from '@entities/project';
import { useState } from 'react';

export const ProjectDocs = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const projectDocsItems: IProjectDocsItem[] = [
        {
            name: 'Financial Report',
            type: ProjectDocsItemType.EXCEL,
            lastUpdated: new Date('2024-08-01'),
        },
        {
            name: 'Project Plan',
            type: ProjectDocsItemType.WORD,
            lastUpdated: new Date('2024-07-20'),
        },
        {
            name: 'Presentation',
            type: ProjectDocsItemType.PPTX,
            lastUpdated: new Date('2024-06-15'),
        },
        {
            name: 'Contract Agreement',
            type: ProjectDocsItemType.PDF,
            lastUpdated: new Date('2024-08-05'),
        },
        {
            name: 'Marketing Strategy',
            type: ProjectDocsItemType.PDF,
            lastUpdated: new Date('2024-07-28'),
        },
    ];

    return (
        <div className={cls.wrapper}>
            <ProjectDocsModal isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className={cls.title}>
                <Text.Heading
                    size={SizeEnum.H6}
                    color={ColorEnum.TEXT}
                >
                    Документы по проекту
                </Text.Heading>
                <Button
                    onClick={() => setIsOpen(true)}
                    size={SizeEnum.H6}
                    border={BorderEnum.H3}
                    buttonType={ButtonTypeEnum.DASHED}
                >
                    <Text.Heading
                        size={SizeEnum.H3}
                        color={ColorEnum.TEXT}
                    >
                        +
                    </Text.Heading>
                </Button>
            </div>
            <ul className={cls.list}>
                {projectDocsItems.map((item: IProjectDocsItem) => (
                    <ProjectDocsItem
                        key={item.name}
                        name={item.name}
                        type={item.type}
                        lastUpdated={item.lastUpdated}
                    />
                ))}
            </ul>
        </div>
    );
};

