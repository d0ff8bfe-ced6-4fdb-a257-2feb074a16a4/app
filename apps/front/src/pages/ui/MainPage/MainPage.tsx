import { Button, Text } from '@shared/ui';
import { ColorEnum, SizeEnum } from '@shared/lib';

export const MainPage = () => {
    return (
        <div>
            <Button size={SizeEnum.H4}>
                <Text.Link to={'124'} color={ColorEnum.WHITE} size={SizeEnum.H2}>
                    12
                </Text.Link>
            </Button>
        </div>
    );
};

