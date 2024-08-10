import cls from './Time.module.scss';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import RangePicker from 'react-range-picker';
import React from 'react';
import { Text } from '@shared/ui';
import { ColorEnum, SizeEnum } from '@shared/lib';

interface Time {
  startDate: Date | undefined,
  endDate: Date | undefined,
  setDate: React.Dispatch<React.SetStateAction<{
    startDate: Date | undefined,
    endDate: Date | undefined,
  } | undefined>>
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  updateTime: (time: { startDate: Date | undefined, endDate: Date | undefined }) => void
}

export const Time = ({ setDate, setShow, updateTime }: Time) => {
  const placeholder = ({ startDate, endDate }: { startDate: Date, endDate: Date }) => {
    if (!startDate) {
      return <div className={cls.placeholder}>
        <Text.Paragraph
          size={SizeEnum.H3}
          color={ColorEnum.TEXT}
        >
          Выберите промежуток
        </Text.Paragraph>
      </div>;
    }
    return (
      <div className="placeholderWrap">
        <div className="placeholder">From - {startDate.toLocaleString()}</div>
        {endDate && (
          <div className="placeholder">To - {endDate.toLocaleString()}</div>
        )}
      </div>
    );
  };
  return (
    <div className={cls.wrapper}>
      <RangePicker
        placeholder={placeholder}
        selectTime
        onDateSelected={(f: Date, l: Date) => {
          setDate({
            startDate: f,
            endDate: l,
          });
          updateTime({
            startDate: f,
            endDate: l,
          });
        }}
        onClose={() => {
          setShow(false);
        }}
      />
    </div>
  );
};

