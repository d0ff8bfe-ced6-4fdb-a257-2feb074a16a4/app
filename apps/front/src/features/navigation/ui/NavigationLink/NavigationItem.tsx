import cls from './NavigationItem.module.scss';
import { INavigation } from '@features/navigation';
import { Text } from '@shared/ui';
import { classNames, ColorEnum, SizeEnum } from '@shared/lib';
import { useLocation } from 'react-router-dom';

export const NavigationItem = (
  {
    path,
    icon: Icon,
    label,
  }: INavigation) => {
  const { pathname } = useLocation();
  return (
    <li className={classNames(cls.link, {
      [cls.active]: path === pathname,
    }, [])}>
      <Text.Link
        size={SizeEnum.H3}
        color={path === pathname ? ColorEnum.PRIMARY : ColorEnum.TEXT}
        to={path}
      >
        <Icon />
        {label}
      </Text.Link>
    </li>
  );
};

