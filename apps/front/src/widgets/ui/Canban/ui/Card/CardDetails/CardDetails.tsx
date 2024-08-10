import cls from './CardDetails.module.scss';
import React, { useEffect, useState } from 'react';
import { Clock, Tag, Trash, X } from 'react-feather';
import { v4 as uuidv4 } from 'uuid';
import { ICard, ITask, ITag } from '@widgets/ui/Canban/lib';
import { Editable, Label, Modal } from '@widgets/ui';
import { Button, Input, Text } from '@shared/ui';
import { BorderEnum, ColorEnum, SizeEnum } from '@shared/lib';

interface CardDetailsProps {
  removeCard: (boardId: string, cardId: string) => void;
  updateCard: (bid: string, cid: string, card: ICard) => void;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  card: ICard;
  bid: string;
}
export const CardDetails: React.FC<CardDetailsProps> = (props: CardDetailsProps) => {
  const colors = ['#61bd4f', '#f2d600', '#ff9f1a', '#eb5a46', '#c377e0'];

  const [values, setValues] = useState<ICard>({ ...props.card });
  const [input, setInput] = useState<boolean>(false);
  const [text, setText] = useState<string>(values.title);
  const [labelShow, setLabelShow] = useState<boolean>(false);

  const addTask = (value: string) => {
    const newTask: ITask = {
      id: uuidv4(),
      task: value,
      completed: false,
    };
    setValues((prevValues) => ({
      ...prevValues,
      task: [...prevValues.task, newTask],
    }));
  };

  const removeTask = (id: string) => {
    setValues((prevValues) => ({
      ...prevValues,
      task: prevValues.task.filter((item) => item.id !== id),
    }));
  };

  const deleteAllTask = () => {
    setValues((prevValues) => ({
      ...prevValues,
      task: [],
    }));
  };

  const updateTask = (id: string) => {
    setValues((prevValues) => ({
      ...prevValues,
      task: prevValues.task.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    }));
  };

  const updateTitle = (value: string) => {
    setValues((prevValues) => ({ ...prevValues, title: value }));
  };

  const removeTag = (id: string) => {
    setValues((prevValues) => ({
      ...prevValues,
      tags: prevValues.tags.filter((item) => item.id !== id),
    }));
  };

  const addTag = (value: string, color: string) => {
    const newTag: ITag = {
      id: uuidv4(),
      tagName: value,
      color: color,
    };
    setValues((prevValues) => ({
      ...prevValues,
      tags: [...prevValues.tags, newTag],
    }));
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.code === 'Enter') {
      setInput(false);
      updateTitle(text === '' ? values.title : text);
    }
  };

  useEffect(() => {
    document.addEventListener('keypress', handleKeyPress);
    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, [handleKeyPress, text, values.title]); // Добавил зависимости

  useEffect(() => {
    if (props.updateCard) props.updateCard(props.bid, values.id, values);
  }, [values, props.bid, props.updateCard, props]);

  return (
    <Modal onClose={props.onClose}>
      <div className="local__bootstrap">
        <div className={cls.modal}>
          <div className={cls.heading}>
            {input ? (
              <Input
                size={SizeEnum.H3}
                border={BorderEnum.H5}
                label="Название"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            ) : (
              <Text.Heading
                color={ColorEnum.TEXT}
                size={SizeEnum.H6}
                onClick={() => setInput(true)}
              >
                {values.title}
              </Text.Heading>
            )}
          </div>
          <div className={cls.body}>
            <div className={cls.labels}>
              <Text.Paragraph color={ColorEnum.TEXT} size={SizeEnum.H1}>
                Ярлыки
              </Text.Paragraph>
              <div className={cls.labelsList}>
                {values.tags.length !== 0 ? (
                  values.tags.map((item) => (
                    <Text.Paragraph
                      key={item.id} // Добавил ключ для уникальности
                      color={ColorEnum.WHITE}
                      className={cls.labelsListItem}
                      size={SizeEnum.H4}
                      style={{ backgroundColor: item.color }}
                    >
                      {item.tagName.length > 10
                        ? `${item.tagName.slice(0, 6)}...`
                        : item.tagName}
                      <X
                        onClick={() => removeTag(item.id)}
                        style={{
                          width: '15px',
                          cursor: 'pointer',
                          height: '15px',
                        }}
                      />
                    </Text.Paragraph>
                  ))
                ) : (
                  <Text.Paragraph color={ColorEnum.TEXT} size={SizeEnum.H4}>
                    Нет ярлыков
                  </Text.Paragraph>
                )}
              </div>
            </div>
            <div className={cls.tasks}>
              <div className={cls.tasksHeading}>
                <Text.Paragraph color={ColorEnum.TEXT} size={SizeEnum.H1}>
                  Подзадачи
                </Text.Paragraph>
                <Button
                  border={BorderEnum.H6}
                  size={SizeEnum.H4}
                  color={ColorEnum.BGDARK}
                  onClick={deleteAllTask} // Добавил обработчик события
                >
                  <Text.Paragraph color={ColorEnum.TEXT} size={SizeEnum.H3}>
                    Удалить все задачи
                  </Text.Paragraph>
                </Button>
              </div>
              <div className={cls.tasksList}>
                {values.task.length !== 0 ? (
                  values.task.map((item) => (
                    <li key={item.id} className={cls.tasksListItem}>
                      <div className={cls.control}>
                        <input
                          className={cls.checkbox}
                          type="checkbox"
                          checked={item.completed}
                          onChange={() => updateTask(item.id)}
                        />
                        <Text.Paragraph
                          size={SizeEnum.H2}
                          color={ColorEnum.TEXT}
                          className={`flex-grow-1 ${
                            item.completed ? 'strike-through' : ''
                          }`}
                        >
                          {item.task}
                        </Text.Paragraph>
                      </div>
                      <Trash
                        onClick={() => removeTask(item.id)}
                        style={{
                          cursor: 'pointer',
                          width: '25px',
                          height: '25px',
                        }}
                      />
                    </li>
                  ))
                ) : (
                  <></>
                )}
                <Editable placeholder="Добавить задачу" onSubmit={addTask} />
              </div>
            </div>
            <div className={cls.tools}>
              <Text.Paragraph color={ColorEnum.TEXT} size={SizeEnum.H1}>
                Действия
              </Text.Paragraph>
              <Button
                border={BorderEnum.H5}
                className={cls.toolsButton}
                color={ColorEnum.BGDARK}
                onClick={() => setLabelShow(true)}
              >
                <Tag />
                <Text.Paragraph
                  className={cls.toolsText}
                  size={SizeEnum.H3}
                  color={ColorEnum.TEXT}
                >
                  Добавить ярлык
                </Text.Paragraph>
              </Button>
              {labelShow && (
                <Label
                  color={colors}
                  addTag={addTag}
                  tags={values.tags}
                  onClose={setLabelShow}
                />
              )}
              <Button border={BorderEnum.H5} className={cls.toolsButton} color={ColorEnum.BGDARK}>
                <Clock />
                <Text.Paragraph className={cls.toolsText} size={SizeEnum.H3} color={ColorEnum.TEXT}>
                  Добавить дату
                </Text.Paragraph>
              </Button>
              <Button
                border={BorderEnum.H5}
                className={cls.toolsButton}
                color={ColorEnum.BGDARK}
                onClick={() => props.removeCard(props.bid, values.id)}
              >
                <Trash />
                <Text.Paragraph className={cls.toolsText} size={SizeEnum.H3} color={ColorEnum.TEXT}>
                  Удалить карточку
                </Text.Paragraph>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
