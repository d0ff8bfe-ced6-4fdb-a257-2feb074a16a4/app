import React, { useEffect, useRef } from 'react';
import cls from './Dropdown.module.scss';
import { Text } from '@shared/ui';
import { classNames, ColorEnum, SizeEnum } from '@shared/lib';

interface DropdownProps {
  onClose?: () => void;
  className?: string;
  children: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ onClose, className, children }) => {
  const dropRef = useRef<HTMLDivElement>(null);

  const handleClick = (event: MouseEvent) => {
    if (dropRef.current && !dropRef.current.contains(event.target as Node) && onClose) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick, { capture: true });

    return () => {
      document.removeEventListener('click', handleClick, { capture: true });
    };
  }, []);

  return (
    <div ref={dropRef} className={classNames(cls.dropdown, {}, [className])}>
      <Text.Paragraph
        color={ColorEnum.TEXT}
        size={SizeEnum.H3}
      >
        {children}
      </Text.Paragraph>
    </div>
  );
};

export default Dropdown;
