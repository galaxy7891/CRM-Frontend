import axios from 'axios';
import { ParamsData, Password, PersonalData } from '@/types/authTypes';
import { employeesTypes } from '@/types/employeeTypes';
import { paginationTypes } from '@/types/componentTypes';
import { setEmployees, setEmployee } from '../reducers/employeesReducers';
import { AppDispatch, RootState } from '@/redux/store';

export const getEmployees =
  (
    sortBy: string,
    perPage: string,
    currentPage: number,
    setPagination: (pagination: paginationTypes) => void
  ) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const { token } = getState().auth;
    console.log(currentPage, 'currentPage');
    try {
      const config = {
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/employee?sort=${sortBy}&per_page=${perPage}&page=${currentPage}`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.request(config);
      if (response.data.success) {
        const leads = response.data.data;
        dispatch(setEmployees(response.data.data.data));
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

export const getEmployeeById =
  (id: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { token } = getState().auth;

    try {
      const config = {
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/employee/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.request(config);
      if (response.data.success) {
        dispatch(setEmployee(response.data.data));
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

export const updateEmployee =
  (
    employee: employeesTypes,
    setIsSuccess: (success: boolean) => void,
    setErrorMessage: (messages: { [key: string]: string }) => void
  ) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const token = getState().auth.token;
    try {
      const config = {
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/employee/${employee?.id}`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: employee,
      };

      const response = await axios.request(config);

      if (response.data.success) {
        setIsSuccess(true);
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

export const deleteEmployee =
  (ids: string | string[], setIsSuccess: (success: boolean) => void) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const token = getState().auth.token;

    try {
      const config = {
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/employee`,
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