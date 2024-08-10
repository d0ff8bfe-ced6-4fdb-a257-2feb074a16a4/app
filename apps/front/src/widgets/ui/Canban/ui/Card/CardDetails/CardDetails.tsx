import cls from './CardDetails.module.scss';
import React, { useEffect, useState } from 'react';
import { Clock, Tag, Trash, X } from 'react-feather';
import { v4 as uuidv4 } from 'uuid';
import { ICard, ITask, ITag } from '@widgets/ui/Canban/lib';
import { Editable, Label, Modal, Time } from '@widgets/ui';
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
  const [timeShow, setTimeShow] = useState(false);
  const [values, setValues] = useState<ICard>({ ...props.card });
  const [input, setInput] = useState<boolean>(false);
  const [descInput, setDescInput] = useState<boolean>(false);
  const [text, setText] = useState<string>(values.title);
  const [description, setDescription] = useState<string>(values.description);
  const [labelShow, setLabelShow] = useState<boolean>(false);
  const [time, setTime] = useState<{
    startDate: Date | undefined,
    endDate: Date | undefined,
  }>();
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
  const updateTime = (time: { startDate: Date | undefined, endDate: Date | undefined }) => {
    setValues(prevState => ({
      ...prevState,
      time,
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
  const updateDescription = (value: string) => {
    setValues((prevValues) => ({ ...prevValues, description: value }));
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
    if (e.code === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      setInput(false);
      setDescInput(false);
      if (text.trim() !== '') updateTitle(text);
      if (description.trim() !== '') updateDescription(description);
    } else if (e.code === 'Escape') {
      setInput(false);
      setDescInput(false);
      setText(values.title);
      setDescription(values.description);
    }
  };

  const handleBlur = () => {
    setInput(false);
    setDescInput(false);
    if (text.trim() !== '') updateTitle(text);
    if (description.trim() !== '') updateDescription(description);
  };

  useEffect(() => {
    document.addEventListener('keypress', handleKeyPress);
    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, [handleKeyPress, text, values.title, values.description, description]);

  useEffect(() => {
    if (props.updateCard) props.updateCard(props.bid, values.id, values);
  }, [values, props.bid, props.updateCard, updateTime]);

  return (
    <Modal onClose={props.onClose}>
      <div className={cls.modal}>
        <div className={cls.heading}>
          {input ? (
            <Input
              size={SizeEnum.H3}
              border={BorderEnum.H5}
              label="Название"
              value={text}
              onBlur={handleBlur}
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
          {time ?
            <div className={cls.time}>
              <Text.Paragraph color={ColorEnum.TEXT} size={SizeEnum.H2}>
                Начало: {time?.startDate instanceof Date ? `${time.startDate.toLocaleDateString()} ${time.startDate.toLocaleTimeString()}` : 'Не выбрано'}
              </Text.Paragraph>
              <Text.Paragraph color={ColorEnum.TEXT} size={SizeEnum.H2}>
                Конец: {time?.endDate instanceof Date ? `${time.endDate.toLocaleDateString()} ${time.endDate.toLocaleTimeString()}` : 'Не выбрано'}
              </Text.Paragraph>
            </div>
            : values.time && values.time.startDate && values.time.endDate ?
              <div className={cls.time}>
                <Text.Paragraph color={ColorEnum.TEXT} size={SizeEnum.H2}>
                  Начало: {values?.time?.startDate instanceof Date ? `${values.time.startDate.toLocaleDateString()} ${values.time.startDate.toLocaleTimeString()}` : 'Не выбрано'}
                </Text.Paragraph>
                <Text.Paragraph color={ColorEnum.TEXT} size={SizeEnum.H2}>
                  Конец: {values?.time?.endDate instanceof Date ? `${values.time.endDate.toLocaleDateString()} ${values.time.endDate.toLocaleTimeString()}` : 'Не выбрано'}
                </Text.Paragraph>
              </div>
              : null
          }
        </div>
        <div className={cls.description}>
          <Text.Paragraph color={ColorEnum.TEXT} size={SizeEnum.H1}>
            Описание
          </Text.Paragraph>
          {descInput ? (
            <textarea
              className={cls.textArea}
              value={description}
              onBlur={handleBlur}
              onChange={(e) => setDescription(e.target.value)}
            />
          ) : (
            <Text.Paragraph
              color={ColorEnum.TEXT}
              size={SizeEnum.H2}
              onClick={() => setDescInput(true)}
            >
              {values.description || 'Добавьте описание...'}
            </Text.Paragraph>
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
                    key={item.id}
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
                onClick={deleteAllTask}
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
              ) : null}
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
              onClick={() => setLabelShow(prevState => !prevState)}
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
            {timeShow &&
              <Time
                startDate={time?.startDate}
                endDate={time?.endDate}
                setDate={setTime}
                setShow={setTimeShow}
                updateTime={updateTime}
              />
            }
            <Button
              onClick={() => setTimeShow(prevState => !prevState)}
              border={BorderEnum.H5} className={cls.toolsButton} color={ColorEnum.BGDARK}>
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
    </Modal>
  );
};
