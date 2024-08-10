import cls from './Board.module.scss';
import React, { useEffect, useState } from 'react';
import { Input, Text } from '@shared/ui';
import { BorderEnum, ColorEnum, SizeEnum, WeightEnum } from '@shared/lib';
import { Droppable } from 'react-beautiful-dnd';
import { Card, Editable } from '@widgets/ui';
import { ICard } from '@widgets/ui/Canban/lib';
import { MoreHorizontal } from 'react-feather';
import Dropdown from '@widgets/ui/Canban/ui/Dropdown/Dropdown.tsx';

export interface IBoard {
  name: string;
  setName: (value: string, id: string) => void,
  addCard: (title: string, bid: string) => void,
  removeBoard: (bid: string) => void,
  removeCard: (boardId: string, cardId: string) => void,
  updateCard: (bid: string, cid: string, card: any) => void,
  id: string
  card: []
}

export const Board = (
  {
    name,
    setName,
    removeBoard,
    updateCard,
    removeCard,
    addCard,
    id,
    card,
  }: IBoard) => {
  const [show, setShow] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    document.addEventListener('keypress', (e) => {
      if (e.code === 'Enter') setShow(false);
    });
    return () => {
      document.removeEventListener('keypress', (e) => {
        if (e.code === 'Enter') setShow(false);
      });
    };
  });


  return (
    <div className={cls.wrapper}>
      <div className={cls.nav}>
        {show ? (
          <Input
            size={SizeEnum.H3}
            border={BorderEnum.H5}
            label="Новое название"
            value={name}
            className={cls.titleInput}
            onChange={(e) => {
              setName(e.target.value, id);
            }}
          />
        ) : (
          <div className={cls.heading}>
            <div
              className={cls.title}
            >
              <Text.Paragraph
                size={SizeEnum.H3}
                weight={WeightEnum.BOLD}
                color={ColorEnum.TEXT}
                onClick={() => {
                  setShow(true);
                }}
                className={cls.headingTitle}
              >
                {name}
              </Text.Paragraph>
              <Text.Paragraph
                size={SizeEnum.H3}
                color={ColorEnum.TEXT}
                onClick={() => {
                  setShow(true);
                }}
                className={cls.headingLenght}
              >
                {card.length}
              </Text.Paragraph>
            </div>
            <div
              className={cls.dropdown}
              onClick={() => {
                setDropdown(true);
              }}
            >
              <MoreHorizontal />
              {dropdown && (
                <Dropdown
                  onClose={() => {
                    removeBoard(id);
                    setDropdown(false);
                  }}
                >
                  Удалить доску
                </Dropdown>
              )}
            </div>
          </div>
        )}
      </div>
      {card.length ?
        <div className={cls.cards}>
          <Droppable droppableId={id}>
            {(provided) => (
              <div
                className={cls.cardList}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {card.map((items: ICard, index) => (
                  <Card
                    bid={id}
                    id={items.id}
                    index={index}
                    key={items.id}
                    title={items.title}
                    tags={items.tags}
                    updateCard={updateCard}
                    removeCard={removeCard}
                    card={items}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
        : <></>
      }
      <div className={cls.footer}>
        <Editable
          transfer={true}
          placeholder="Добавить"
          onSubmit={(value) => addCard(value, id)}
        />
      </div>
    </div>
  );
};
