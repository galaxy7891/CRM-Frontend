import axios from 'axios';
import { AppDispatch, RootState } from '../store';
import { paginationTypes } from '@/types/otherTypes';
import { setLogProfile } from '../reducers/profileReducers';

export const updateUserPhoto =
  (
    photo: File | null,
    setIsLoading: (loading: boolean) => void,
    setErrorMessage: (errorMessage: string | null) => void
  ) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const token = getState().auth.token;

    const formData = new FormData();

    if (photo) {
      formData.append('photo', photo);
    }

    try {
      setIsLoading(true);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.data.success) {
        setErrorMessage(response.data.message.photo[0]);
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

export const logActivityProfile =
  (
    currentPage: number,

    setPagination: (pagination: paginationTypes) => void
  ) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const token = getState().auth.token;
    try {
      const config = {
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/activity/log/users?page=${currentPage}`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.request(config);

      if (response.data.success) {
        const logProfile = response.data.data[0];
        dispatch(setLogProfile(logProfile.data[0].activities));
        setPagination({
          current_page: logProfile.current_page,
          last_page: logProfile.last_page,
          total: logProfile.total,
          per_page: logProfile.per_page,
          next_page_url: logProfile.next_page_url,
          prev_page_url: logProfile.prev_page_url,
        });
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
