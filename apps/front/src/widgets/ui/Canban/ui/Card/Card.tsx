import cls from './Card.module.scss';
import { useEffect, useState } from 'react';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd'; // Import DraggableProvided
import { classNames, ColorEnum, SizeEnum, WeightEnum } from '@shared/lib';
import { Text } from '@shared/ui';
import { ICard, ITag } from '@widgets/ui/Canban/lib';
import { CheckSquare } from 'react-feather';
import { CardDetails, Tag } from '@widgets/ui';

interface Card {
    bid: string;
    id: string;
    index: number;
    title: string;
    completed?: boolean;
    tags: ITag[];
    removeCard: (boardId: string, cardId: string) => void,
    updateCard: (bid: string, cid: string, card: ICard) => void,
    card: ICard;
}

export const Card = (
    {
        card,
        index,
        removeCard,
        updateCard,
        completed = false,
        tags,
        bid,
        title,
        id,
    }: Card) => {
    const [dropdown, setDropdown] = useState(false);
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        const htmlElement = document.querySelector('html');
        if (htmlElement) {
            if (modalShow) {
                htmlElement.style.overflowY = 'hidden';
            } else {
                htmlElement.style.overflowY = 'auto';
            }
        }
    }, [modalShow]);

    return (
        <Draggable
            key={id}
            draggableId={id}
            index={index}
        >
            {(provided: DraggableProvided) => (
                <>
                    {modalShow && (
                        <CardDetails
                            updateCard={updateCard}
                            onClose={setModalShow}
                            card={card}
                            bid={bid}
                            removeCard={removeCard}
                        />
                    )}
                    <div
                        className={cls.card}
                        onClick={() => {
                            setModalShow(true);
                        }}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <div className={cls.title}>
                            <Text.Paragraph
                                size={SizeEnum.H3}
                                color={ColorEnum.TEXT}
                                className={classNames(cls.title, {
                                    [cls.done]: completed,
                                }, [])}
                                weight={WeightEnum.MEDIUM}
                            >
                                {title}
                            </Text.Paragraph>
                        </div>
                        <div className={cls.tags}>
                            {tags?.map((item, index) => (
                                <Tag key={index} tagName={item.tagName} color={item.color} />
                            ))}
                        </div>
                        <div className={cls.footer}>
                            {card.task.length !== 0 && (
                                <div className={cls.task}>
                                    <CheckSquare />
                                    <Text.Paragraph
                                        size={SizeEnum.H3}
                                        color={ColorEnum.TEXT}
                                    >
                                        {card.task.length !== 0
                                            ?
                                            `${card.task?.filter((item) => item.completed,
                                            ).length} / ${card.task.length}` : '0/0'}
                                    </Text.Paragraph>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </Draggable>
    );
};

