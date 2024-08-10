import { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import { Board, Editable } from '@widgets/ui';
import { IBoard, ICard } from '@widgets/ui/Canban/lib';
import cls from './Canban.module.scss';
import ScrollableFeed from 'react-scrollable-feed';

export const Canban = () => {
  const [data, setData] = useState<IBoard[]>(
    localStorage.getItem('kanban-board')
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      ? JSON.parse(localStorage.getItem('kanban-board'))
      : [],
  );


  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const dragCardInBoard = (source, destination) => {
    const tempData = [...data];
    const destinationBoardIdx = tempData.findIndex(
      (item) => item.id.toString() === destination.droppableId,
    );
    const sourceBoardIdx = tempData.findIndex(
      (item) => item.id.toString() === source.droppableId,
    );
    tempData[destinationBoardIdx].card.splice(
      destination.index,
      0,
      tempData[sourceBoardIdx].card[source.index],
    );
    tempData[sourceBoardIdx].card.splice(source.index, 1);

    return tempData;
  };

  const addBoard = (title: string) => {
    const tempData = [...data];
    tempData.push({
      id: uuidv4(),
      name: title,
      card: [],
    });
    setData(tempData);
  };

  const addCard = (title: string, bid: string) => {
    const index = data.findIndex((item: IBoard) => item.id === bid);
    const tempData = [...data];
    tempData[index].card.push({
      id: uuidv4(),
      title: title,
      time: {
        startDate: undefined,
        endDate: undefined,
      },
      description: '',
      tags: [],
      task: [],
    });
    setData(tempData);
  };
  const setName = (title: string, bid: string) => {
    const index = data.findIndex((item: IBoard) => item.id === bid);
    const tempData = [...data];
    tempData[index].name = title;
    setData(tempData);
  };
  const updateCard = (bid: string, cid: string, card: ICard) => {
    const index = data.findIndex((item) => item.id === bid);
    if (index < 0) return;

    const tempBoards = [...data];
    const cards = tempBoards[index].card;

    const cardIndex = cards.findIndex((item) => item.id === cid);
    if (cardIndex < 0) return;

    tempBoards[index].card[cardIndex] = card;
    setData(tempBoards);
  };
  const removeBoard = (bid: string) => {
    const tempData = [...data];
    const index = data.findIndex((item) => item.id === bid);
    tempData.splice(index, 1);
    setData(tempData);
  };
  const removeCard = (boardId: string, cardId: string) => {
    const index = data.findIndex((item) => item.id === boardId);
    const tempData = [...data];
    const cardIndex = data[index].card.findIndex((item) => item.id === cardId);

    tempData[index].card.splice(cardIndex, 1);
    setData(tempData);
  };
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    if (source.droppableId === destination.droppableId) return;

    setData(dragCardInBoard(source, destination));
  };

  useEffect(() => {
    localStorage.setItem('kanban-board', JSON.stringify(data));
  }, [data]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ScrollableFeed>
        <div className={cls.boards}>
          {data && data.map((item: IBoard) => (
            <Board
              key={item.name}
              name={item.name}
              setName={setName}
              addCard={addCard}
              id={item.id}
              removeCard={removeCard}
              removeBoard={removeBoard}
              updateCard={updateCard}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              card={item.card || []}
            />
          ))}
          <div className={cls.add}>
            <Editable
              transfer={true} onSubmit={addBoard} />
          </div>
        </div>
      </ScrollableFeed>
    </DragDropContext>
  );
};

