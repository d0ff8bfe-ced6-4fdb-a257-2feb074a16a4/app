import { ILoginRequest, setToken, useLoginMutation } from '@features/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch } from '@shared/lib';

export const useLogin = () => {
    const [loginTrigger, { data, error, isLoading }] = useLoginMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const trigger = async (data: ILoginRequest) => {
        await loginTrigger(data);
    };
    useEffect(() => {
        if (data) {
            const { accessToken } = data;
            const token = accessToken.split(' ')[1];
            localStorage.setItem('accessToken', token);
            dispatch(setToken(token));
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