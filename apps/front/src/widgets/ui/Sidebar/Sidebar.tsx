import cls from './Sidebar.module.scss';
import { ThemeSwitcher } from '@shared/ui';
import { NavigationList } from '@features/navigation';
import { classNames } from '@shared/lib';

export const Sidebar = () => {
  return (
    <div className={classNames(cls.wrapper, {}, [])}>
      <NavigationList />
      <div className={classNames(cls.buttons, {}, [])}>
        <ThemeSwitcher />
      </div>
    </div>
  );
};

