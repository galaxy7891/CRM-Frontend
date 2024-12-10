import axios from 'axios';
import { setToken, setUser } from '../reducers/authReducers';
import { AppDispatch } from '../store';
import {
  PersonalDataTypes,
  CompanyDataTypes,
  PasswordTypes,
} from '@/types/authTypes';

export const login =
  (
    email: string,
    password: string,
    setErrorMessage: (message: string) => void
  ) =>
  async (dispatch: AppDispatch) => {
    try {
      const config = {
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: { email, password },
      };

      const response = await axios.request(config);

      if (response.data.success) {
        dispatch(setUser(response.data.data.user));
        dispatch(setToken(response.data.data.access_token));
        return { success: true };
      } else {
        setErrorMessage(response.data.message);
        console.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

export const loginWithGoogle = () => async () => {
  try {
    const config = {
      method: 'get',
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await axios.request(config);

    if (response.data.success) {
      console.log(response.data.data);
    }
  } finally {
  }
};

export const sendOTP =
  (
    email: string,
    setIsLoading: (loading: string) => void,
    setErrorMessage: (message: string) => void,
    setStep: (step: number) => void,
    startCountdown: () => void
  ) =>
  async () => {
    setIsLoading('Send OTP');
    try {
      const config = {
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/otp/send`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: { email },
      };

      const response = await axios.request(config);

      if (response.data.success) {
        setErrorMessage('');
        startCountdown();
        setStep(2);
      } else {
        if (response.data.message.email) {
          setErrorMessage(response.data.message.email[0]);
        } else {
          setErrorMessage(response.data.message);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading('');
    }
  };

export const verifyOTP =
  (
    email: string,
    OTP: string,
    setIsLoading: (loading: string) => void,
    setErrorMessage: (message: string) => void,
    setStep: (step: number) => void
  ) =>
  async () => {
    setIsLoading('Verify OTP');

    try {
      const config = {
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/otp/verify`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: { email, code: OTP },
      };

      const response = await axios.request(config);

      if (response.data.success) {
        setErrorMessage('');
        setStep(3);
      } else {
        if (response.data.message.code) {
          setErrorMessage(response.data.message.code[0]);
        } else if (response.data.message.email) {
          setErrorMessage(response.data.message.email[0]);
        } else {
          setErrorMessage(response.data.message);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading('');
    }
  };

export const submitRegisterData =
  (
    email: string,
    setIsLoading: (loading: string) => void,
    setErrorMessage: (message: string) => void,
    setIsSuccess: (success: boolean) => void,
    password: PasswordTypes,
    personalData: PersonalDataTypes,
    companyData: CompanyDataTypes
  ) =>
  async (dispatch: AppDispatch) => {
    setIsLoading('Register');
    try {
      const config = {
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: { email, ...password, ...personalData, ...companyData },
      };
      const response = await axios.request(config);

      if (response.data.success) {
        setErrorMessage('');
        dispatch(setToken(response.data.data.access_token));
        setIsSuccess(true);
        return { success: true };
      } else {
        setErrorMessage(response.data.message);
        console.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading('');
    }
  };
export const logout = () => (dispatch: AppDispatch) => {
  dispatch(setUser(null));
  dispatch(setToken(''));
};
