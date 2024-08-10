import cls from './Tag.module.scss';
import { Text } from '@shared/ui';
import { ColorEnum, SizeEnum } from '@shared/lib';

interface Tag {
  tagName: string;
  color: string | undefined;
}

export const Tag = (
  {
    tagName,
    color,
  }: Tag) => {
  return (
    <Text.Paragraph
      color={ColorEnum.WHITE}
      size={SizeEnum.H4}
      className={cls.tag}
      style={{ backgroundColor: `${color}` }}
    >
      {tagName}
    </Text.Paragraph>
  );
};

