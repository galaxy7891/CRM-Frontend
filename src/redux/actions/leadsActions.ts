import axios from 'axios';
import { leadsTypes } from '@/types/leadsTypes';
import { AppDispatch, RootState } from '../store';
import { setLead, setLeads, setLogLead } from '../reducers/leadsReducers';
import {
  paginationTypes,
  ImportErrorMessageDetailTypes,
} from '@/types/otherTypes';

export const getLeads =
  (
    sortBy: string,
    statusBy: string,
    perPage: string,
    currentPage: number,
    setPagination: (pagination: paginationTypes) => void
  ) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const { token } = getState().auth;
    try {
      const config = {
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/leads?sort=${sortBy}&status=${statusBy}&per_page=${perPage}&page=${currentPage}`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.request(config);
      if (response.data.success) {
        const leads = response.data.data;
        dispatch(setLeads(response.data.data.data));
        setPagination({
          current_page: leads.current_page,
          last_page: leads.last_page,
          total: leads.total,
          per_page: leads.per_page,
          next_page_url: leads.next_page_url,
          prev_page_url: leads.prev_page_url,
        });
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

export const getLeadById =
  (id: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { token } = getState().auth;

    try {
      const config = {
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/leads/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.request(config);
      if (response.data.success) {
        dispatch(setLead(response.data.data));
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

export const addLead =
  (
    lead: leadsTypes,
    setIsSuccess: (success: boolean) => void,
    setErrorMessage: (messages: { [key: string]: string }) => void
  ) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const { token } = getState().auth;
    try {
      const config = {
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/leads`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: lead,
      };
      const response = await axios.request(config);
      if (response.data.success) {
        setIsSuccess(true);
        // setTimeout(() => {
        //   window.location.reload();
        // }, 2000);
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

export const updateLead =
  (
    lead: leadsTypes,
    setIsLoading: (loading: boolean) => void,
    setIsSuccess: (success: boolean) => void,
    setErrorMessage: (messages: { [key: string]: string }) => void
  ) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    setIsLoading(true);
    const token = getState().auth.token;
    try {
      const config = {
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/leads/${lead?.id}`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: lead,
      };

      const response = await axios.request(config);

      if (response.data.success) {
        setIsSuccess(true);
      } else {
        if (response.data.message) {
          setErrorMessage(response.data.message);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

export const deleteLead =
  (ids: string | string[], setIsSuccess: (success: boolean) => void) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const token = getState().auth.token;

    try {
      const config = {
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/leads/`,
        method: 'delete',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { id: Array.isArray(ids) ? ids : [ids] },
      };
      const response = await axios.request(config);

      if (response.data.success) {
        setIsSuccess(true);
      }
    } catch (error) {
      console.error('Error deleting lead(s):', error);
    }
  };

export const convertManualLead =
  (
    lead: leadsTypes,
    setIsSuccess: (success: boolean) => void,
    setErrorMessage: (messages: { [key: string]: string }) => void
  ) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const { token } = getState().auth;

    try {
      const config = {
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/leads/convert/${lead?.id}`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: lead,
      };

      const response = await axios.request(config);

      if (!response.data.success) {
        setErrorMessage(response.data.message);
      } else {
        setIsSuccess(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

export const convertAutoLead =
  (id: string, setIsSuccess: (success: boolean) => void) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const token = getState().auth.token;

    try {
      const config = {
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/leads/convert/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.request(config);
      if (response.data.success) {
        setIsSuccess(true);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

export const logActivityLead =
  (
    currentPage: number,
    id: string,
    setPagination: (pagination: paginationTypes) => void
  ) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const token = getState().auth.token;
    try {
      const config = {
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/activity/log/leads?page=${currentPage}&id=${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.request(config);

      if (response.data.success) {
        const logLead = response.data.data[0];
        dispatch(setLogLead(logLead.data[0].activities));
        setPagination({
          current_page: logLead.current_page,
          last_page: logLead.last_page,
          total: logLead.total,
          per_page: logLead.per_page,
          next_page_url: logLead.next_page_url,
          prev_page_url: logLead.prev_page_url,
        });
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

export const importLeads =
  (
    file: File,
    setIsLoading: (loading: boolean) => void,
    setIsSuccess: (success: boolean) => void,
    setErrorMessage: (messages: string) => void,
    setErrorMessageDetail: (messages: ImportErrorMessageDetailTypes) => void,
    setIsFailed: (success: boolean) => void
  ) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    setIsLoading(true);
    const { token } = getState().auth;
    const formData = new FormData();
    formData.append('file', file);
    try {
      const config = {
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/import/leads`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
      };

      const response = await axios.request(config);

      if (response.data.success) {
        setIsSuccess(true);
      } else if (!response.data.success && !response.data.data) {
        setErrorMessage(response.data.message);
      } else {
        setErrorMessageDetail(response.data.data);
        setIsFailed(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
