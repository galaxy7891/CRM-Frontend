import axios from 'axios';
import { organizationsTypes } from '@/types/leads';
import { setOrganizations, setOrganization } from '../reducers/organizations';
import { AppDispatch, RootState } from '@/redux/store';

export const getOrganizations =
  (sortBy: string, statusBy: string, perPage: string) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const { token } = getState().auth;

    try {
      const config = {
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/organization?sort=${sortBy}&status=${statusBy}&per_page=${perPage}&page=1`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.request(config);

      if (response.data.success) {
        dispatch(setOrganizations(response.data.data.data));
      }
    } catch (error) {
      console.error(error);
    }
  };

export const getOrganizationsById =
  (id: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { token } = getState().auth;
    try {
      const config = {
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/organization/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.request(config);
      if (response.data.success) {
        dispatch(setOrganization(response.data.data));
      }
    } catch (error) {
      console.error(error);
    }
  };

export const addOrganization =
  (
    organization: organizationsTypes,
    setIsLoading: (loading: boolean) => void,
    setErrorMessage: (messages: { [key: string]: string }) => void,
    setIsSuccess: (sent: boolean) => void
  ) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    setIsLoading(true);
    console.log(organization.id);
    const { token } = getState().auth;
    try {
      const config = {
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/organization/`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: organization,
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

export const updateOrganization =
  (
    organization: organizationsTypes,
    setIsLoading: (loading: boolean) => void,
    setIsSuccess: (sent: boolean) => void
  ) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    setIsLoading(true);
    console.log(organization.id);
    const { token } = getState().auth;
    try {
      const config = {
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/organization/${organization.id}`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: organization,
      };

      const response = await axios.request(config);
      if (response.data.success) {
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

export const deleteOrganization =
  (ids: string | string[]) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const { token } = getState().auth;

    try {
      const config = {
        method: 'delete',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/organization`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: { id: Array.isArray(ids) ? ids : [ids] },
      };

      const response = await axios.request(config);

      if (response.data.success) {
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
