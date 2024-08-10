import cls from './Navbar.module.scss';
import { Text } from '@shared/ui';
import { ColorEnum, SizeEnum, WeightEnum } from '@shared/lib';

export const Navbar = () => {
  return (
    <nav className={cls.wrapper}>
      <Text.Heading
        size={SizeEnum.H4}
        color={ColorEnum.TEXT}
        weight={WeightEnum.BOLD}
      >
        BuildDoc
      </Text.Heading>
    </nav>
  );
};

