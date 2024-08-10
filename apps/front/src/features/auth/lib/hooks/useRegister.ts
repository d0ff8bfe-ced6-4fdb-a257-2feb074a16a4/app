import { IRegisterRequest, setToken, useRegisterMutation } from '@features/auth/lib';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch } from '@shared/lib';

export const useRegister = () => {
    const [registerTrigger, { data, isLoading, error }] = useRegisterMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const trigger = async (data: IRegisterRequest) => {
        await registerTrigger(data);
    };
    useEffect(() => {
        if (data) {
            const accessToken = data.accessToken.split(' ')[1];
            localStorage.setItem('accessToken', accessToken);
            dispatch(setToken(accessToken));
            toast.success('Вы успешно вошли');
            setTimeout(() => {
                navigate('/');
            }, 1500);
        }
        if (error) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            toast.error(error.data.message);
        }
    }, [data, error, dispatch, navigate]);


    return { trigger, data, isLoading };
};