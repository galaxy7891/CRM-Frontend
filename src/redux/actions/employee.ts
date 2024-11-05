import axios from 'axios';
import { ParamsData, Password, PersonalData } from '@/types/auth';
import { AppDispatch, RootState } from '@/redux/store';

export const inviteUser =
  (
    email: string,
    setIsLoading: (loading: boolean) => void,
    setIsSuccess: (sent: boolean) => void,
    setErrorMessage: (messages: { [key: string]: string }) => void
  ) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    setIsLoading(true);
    const { token } = getState().auth;

    try {
      const config = {
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/invitation/send`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: { email },
      };

      const response = await axios.request(config);
      if (response.data.success) {
        setIsSuccess(true);
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

export const acceptInvitation =
  (
    paramsData: ParamsData,
    password: Password,
    personalData: PersonalData,
    setIsLoading: (loading: boolean) => void,
    setIsSuccess: (sent: boolean) => void
  ) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    setIsLoading(true);
    const { token } = getState().auth;
    try {
      const config = {
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/invitation/accept`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: {
          ...paramsData,
          ...password,
          ...personalData,
        },
      };

      const response = await axios.request(config);

      if (response.data.success) {
        console.log('berhasil');
        setIsSuccess(true);
      } else {
  
        console.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
