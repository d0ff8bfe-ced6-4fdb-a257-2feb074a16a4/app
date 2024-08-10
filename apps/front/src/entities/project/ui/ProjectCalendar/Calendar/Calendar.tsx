import React from 'react';
import cls from './Calendar.module.scss';
import { Text } from '@shared/ui';
import { ColorEnum, SizeEnum } from '@shared/lib';
import ScrollableFeed from 'react-scrollable-feed';

export const Calendar = () => {
  const daysOfWeek = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
  const hours = Array.from({ length: 15 }, (_, i) => i + 8); // Рабочие часы с 8:00 до 22:00

  return (
    <ScrollableFeed>
      <div className={cls.calendarContainer}>
        <table className={cls.table}>
          <thead>
          <tr>
            <th></th>
            {daysOfWeek.map((day, index) => (
              <th key={index}>
                <Text.Paragraph
                  size={SizeEnum.H4}
                  color={ColorEnum.TEXT}
                >
                  {day}
                </Text.Paragraph>
              </th>
            ))}
          </tr>
          </thead>
          <tbody>
          {hours.map((hour, hourIndex) => (
            <tr key={hourIndex}>
              <td className={cls.timeCell}>
                <Text.Paragraph
                  size={SizeEnum.H4}
                  color={ColorEnum.TEXT}
                >
                  {hour}:00
                </Text.Paragraph>
              </td>
              {daysOfWeek.map((_, dayIndex) => (
                <td key={dayIndex}></td>
              ))}
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </ScrollableFeed>
  );
};
