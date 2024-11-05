import axios from 'axios';
import { setToken } from '../reducers/auth';
import { AppDispatch } from '../store';

export const login =
  (
    email: string,
    password: string,
    setErrorMessage: (message: string) => void
  ) =>
  async (dispatch: AppDispatch) => {
    const data = JSON.stringify({ email, password });

    try {
      const config = {
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        headers: {
          'Content-Type': 'application/json',
        },
        data,
      };

      const response = await axios.request(config);

      if (response.data.success) {
        const { access_token } = response.data.data;
        dispatch(setToken(access_token));
        return { success: true };
      } else {
      }
    } catch (error) {
      console.error(error);
    }
  };
