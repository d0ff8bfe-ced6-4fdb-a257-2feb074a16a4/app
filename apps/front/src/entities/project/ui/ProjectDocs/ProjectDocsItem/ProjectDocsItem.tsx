import cls from './ProjectDocsItem.module.scss';
import { IProjectDocsItem, ProjectDocsItemType } from '@entities/project';
import { classNames, ColorEnum, SizeEnum, WeightEnum } from '@shared/lib';
import { Text } from '@shared/ui';


export const ProjectDocsItem = (
    {
        name,
        type,
        lastUpdated,
        ...props
    }: IProjectDocsItem) => {
    return (
        <li
            {...props}
            className={cls.item}>
            <div className={classNames(cls.icon, {
                [cls.pdf]: type === ProjectDocsItemType.PDF,
                [cls.excel]: type === ProjectDocsItemType.EXCEL,
                [cls.word]: type === ProjectDocsItemType.WORD,
                [cls.pptx]: type === ProjectDocsItemType.PPTX,
            }, [])}>
                <Text.Heading
                    size={SizeEnum.H6}
                    weight={WeightEnum.BOLD}
                    color={ColorEnum.WHITE}
                >
                    {name.toUpperCase().slice(0, 2)}
                </Text.Heading>
            </div>
            <div className={cls.info}>
                <Text.Paragraph
                    size={SizeEnum.H2}
                    weight={WeightEnum.MEDIUM}
                    color={ColorEnum.TEXT}
                >
                    {name}
                </Text.Paragraph>
                <Text.Paragraph
                    size={SizeEnum.H5}
                    color={ColorEnum.TEXT}
                >
                    Последнее обновление&nbsp;
                    {lastUpdated.toLocaleDateString()}
                </Text.Paragraph>
            </div>
        </li>
    );
};

