import cls from './MainPageProvider.module.scss';
import { Button, Text } from '@shared/ui';
import { classNames, ColorEnum, SizeEnum, WeightEnum } from '@shared/lib';
import { ProjectBar, ProjectCalendar, ProjectCanban, ProjectEnumValue, ProjectReview } from '@entities/project';
import { ReactNode } from 'react';

interface Provider {
    children: ReactNode;
}

export const MainPageProvider = ({ children }: Provider) => {
    return (
        <div className={cls.wrapper}>
            <div className={cls.heading}>
                <Button
                    size={SizeEnum.H3}
                    color={ColorEnum.PRIMARY}
                >
                    <Text.Paragraph
                        size={SizeEnum.H3}
                        color={ColorEnum.WHITE}
                        weight={WeightEnum.BOLD}
                    >
                        Создать новый акт
                    </Text.Paragraph>
                </Button>
                <Button
                    size={SizeEnum.H3}
                    color={ColorEnum.SECONDARY}
                >
                    <Text.Paragraph
                        size={SizeEnum.H3}
                        color={ColorEnum.WHITE}
                        weight={WeightEnum.BOLD}
                    >
                        Загрузить чертеж
                    </Text.Paragraph>
                </Button>
                <Button
                    size={SizeEnum.H3}
                    color={ColorEnum.PRIMARY}
                >
                    <Text.Paragraph
                        size={SizeEnum.H3}
                        color={ColorEnum.WHITE}
                        weight={WeightEnum.BOLD}
                    >
                        Посмотреть отчет
                    </Text.Paragraph>
                </Button>
            </div>
            <ProjectBar />
            {children}
        </div>
    );
};

