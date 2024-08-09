import cls from './Button.module.scss';
import { ButtonTypeEnum, IButtonProps } from '@shared/ui';
import { BorderEnum, classNames, ColorEnum, SizeEnum } from '@shared/lib';
import Loading from '@assets/icons/loadingSpinner.svg';

export const Button = (
    {
        size = SizeEnum.H1,
        border = BorderEnum.H3,
        color = ColorEnum.PRIMARY,
        buttonType = ButtonTypeEnum.FILLED,
        className,
        isLoading,
        children,
        ...props
    }: IButtonProps,
) => {
    return (
        <button
            disabled={isLoading}
            {...props}
            className={classNames(cls.button, {
                // BG
                [cls.primary]: color === ColorEnum.PRIMARY,
                [cls.secondary]: color === ColorEnum.SECONDARY,
                [cls.success]: color === ColorEnum.SUCCESS,
                [cls.warning]: color === ColorEnum.WARNING,
                [cls.danger]: color === ColorEnum.DANGER,
                [cls.info]: color === ColorEnum.INFO,
                [cls.link]: color === ColorEnum.LINK,
                [cls.white]: color === ColorEnum.WHITE,
                [cls.black]: color === ColorEnum.BLACK,
                [cls.bg]: color === ColorEnum.BG,
                [cls.bgDark]: color === ColorEnum.BGDARK,


                // РАЗМЕР
                [cls.h1]: size === SizeEnum.H1,
                [cls.h2]: size === SizeEnum.H2,
                [cls.h3]: size === SizeEnum.H3,
                [cls.h4]: size === SizeEnum.H4,
                [cls.h5]: size === SizeEnum.H5,
                [cls.h6]: size === SizeEnum.H6,

                // BORDER
                [cls.borderH1]: border === BorderEnum.H1,
                [cls.borderH2]: border === BorderEnum.H2,
                [cls.borderH3]: border === BorderEnum.H3,
                [cls.borderH4]: border === BorderEnum.H4,
                [cls.borderH5]: border === BorderEnum.H5,
                [cls.borderH6]: border === BorderEnum.H6,


                [cls.default]: buttonType === ButtonTypeEnum.DEFAULT,
                [cls.dashed]: buttonType === ButtonTypeEnum.DASHED,
                [cls.filled]: buttonType === ButtonTypeEnum.FILLED,

            }, [className])}
        >
            {isLoading
                ?
                <Loading />
                :
                <>
                    {children}
                </>
            }
        </button>
    );
};

