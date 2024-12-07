import axios from 'axios';
import { companiesTypes } from '@/types/companiesTypes';
import {
  paginationTypes,
  ImportErrorMessageDetailTypes,
} from '@/types/otherTypes';
import {
  setCompany,
  setCompanies,
  setCompanyLog,
} from '../reducers/companiesReducers';
import { AppDispatch, RootState } from '@/redux/store';

export const getCompanies =
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
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/customers/companies?sort=${sortBy}&status=${statusBy}&per_page=${perPage}&page=${currentPage}`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.request(config);
      if (response.data.success) {
        const companies = response.data.data;
        dispatch(setCompanies(response.data.data.data));
        setPagination({
          current_page: companies.current_page,
          last_page: companies.last_page,
          total: companies.total,
          per_page: companies.per_page,
          next_page_url: companies.next_page_url,
          prev_page_url: companies.prev_page_url,
        });
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

export const getCompanyById =
  (id: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { token } = getState().auth;

    try {
      const config = {
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/customers/companies/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.request(config);
      if (response.data.success) {
        dispatch(setCompany(response.data.data));
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

export const addCompany =
  (
    company: companiesTypes,
    setIsSuccess: (success: boolean) => void,
    setErrorMessage: (messages: { [key: string]: string }) => void
  ) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const { token } = getState().auth;
    try {
      const config = {
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/customers/companies`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: company,
      };
      const response = await axios.request(config);
      if (response.data.success) {
        setIsSuccess(true);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

export const updateCompany =
  (
    company: companiesTypes,
    setIsSuccess: (success: boolean) => void,
    setErrorMessage: (messages: { [key: string]: string }) => void
  ) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const token = getState().auth.token;
    try {
      const config = {
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/customers/companies/${company?.id}`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: company,
      };

      const response = await axios.request(config);

      if (response.data.success) {
        setIsSuccess(true);
      } else {
        console.error(response.data.message);
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

export const deleteCompany =
  (ids: string | string[], setIsSuccess: (success: boolean) => void) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const token = getState().auth.token;

    try {
      const config = {
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/customers/companies/`,
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
      console.error('Error deleting company(s):', error);
    }
  };

export const logActivityCompany =
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
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/activity/log/customers_companies?page=${currentPage}&id=${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.request(config);

      if (response.data.success) {
        const logLead = response.data.data[0];
        console.log('loglcompanies', logLead.data[0].activities);
        dispatch(setCompanyLog(logLead.data[0].activities));
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

export const importCompanies =
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
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/import/customers_companies`,
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
