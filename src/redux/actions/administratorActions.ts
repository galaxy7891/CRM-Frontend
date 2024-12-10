import axios from 'axios';
import { paginationTypes } from '@/types/otherTypes';
import { AppDispatch, RootState } from '../store';
import {
  setUser,
  setClient,
  setDashboardUser,
  setDashboardActivities,
} from '../reducers/administratorReducers';
import { logout } from './authActions';
import { clientTypes } from '@/types/administratorTypes';

export const getProfile =
  (
    navigate?: (path: string) => void,
    successRedirect?: string,
    errorRedirect?: string
  ) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const { token } = getState().auth;
    if (!token) {
      dispatch(logout());

      if (navigate && errorRedirect) {
        navigate(errorRedirect);
      }
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        dispatch(setUser(response.data.data));
      }
    } catch (error) {
      console.error(error);
      dispatch(logout());

      if (navigate && errorRedirect) {
        navigate(errorRedirect);
      }
    }
  };

export const getDashboardData =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { token } = getState().auth;

    try {
      const config = {
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/admin`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.request(config);

      if (response.data.success) {
        dispatch(setDashboardUser(response.data.data));
        dispatch(setDashboardActivities(response.data.data.count));
      }
    } catch (error) {
      console.error(error);
    }
  };

export const getClients =
  (
    sortBy: string,
    typeBy: string,
    perPage: string,
    currentPage: number,
    setPagination: (pagination: paginationTypes) => void
  ) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const { token } = getState().auth;

    try {
      const config = {
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/accountstype?tipe=${typeBy}&sort=${sortBy}&per_page=${perPage}&page=${currentPage}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.request(config);

      if (response.data.success) {
        const clients = response.data.data;
        dispatch(setClient(clients.data));
        setPagination({
          current_page: clients.current_page,
          last_page: clients.last_page,
          total: clients.total,
          per_page: clients.per_page,
          next_page_url: clients.next_page_url,
          prev_page_url: clients.prev_page_url,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

export const getClientsForPrint =
  () =>
  async (
    dispatch: AppDispatch,
    getState: () => RootState
  ): Promise<clientTypes[] | undefined> => {
    const { token } = getState().auth;

    try {
      const config = {
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/accountstype`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.request(config);

      return response.data.data.data;
    } catch (error) {
      console.error(error);
    }
  };
