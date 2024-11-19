import axios from 'axios';
import {
  newPassword,
  dataUser,
  dataCompany,
  changePasswordTypes,
} from '@/types/profileTypes';
import { AppDispatch, RootState } from '../store';
import { paginationTypes } from '@/types/otherTypes';
import {
  setUser,
  setUserCompany,
  setLogProfile,
  setDashboardUser,
  setDashboardActivities,
  setDashboardDealsCount,
  setDashboardDealsValue,
} from '../reducers/profileReducers';
import { logout } from './authActions';

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
        dispatch(setUserCompany(response.data.data.company));
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
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.request(config);

      if (response.data.success) {
        dispatch(setDashboardUser(response.data.data));
        dispatch(setDashboardActivities(response.data.data.activities));
        dispatch(
          setDashboardDealsValue(response.data.data.deals_pipeline.value)
        );
        dispatch(
          setDashboardDealsCount(response.data.data.deals_pipeline.count)
        );
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

export const updateUserProfile =
  (
    userProfile: dataUser,
    setErrorMessage: (messages: { [key: string]: string }) => void
  ) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const { token } = getState().auth;

    try {
      const config = {
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/user`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: userProfile,
      };

      const response = await axios.request(config);

      if (response.data.success) {
      } else {
        setErrorMessage(response.data.message);
        console.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

export const updateCompanyUserProfile =
  (
    companyUserProfile: dataCompany,
    setIsSuccess: (success: boolean) => void,
    setErrorMessage: (messages: { [key: string]: string }) => void
  ) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const { token } = getState().auth;

    try {
      const config = {
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/users/companies`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: companyUserProfile,
      };

      const response = await axios.request(config);

      if (response.data.success) {
        setIsSuccess(true);
      } else {
        setErrorMessage(response.data.message);
        console.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

export const updateUserPhoto =
  (
    photo: File | null,
    setIsLoading: (loading: boolean) => void,
    setIsSuccess: (success: boolean) => void,
    setErrorMessage: (errorMessage: string | null) => void
  ) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const { token } = getState().auth;

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
      if (response.data.success) {
        setIsSuccess(true);
      } else {
        setErrorMessage(response.data.message.photo[0]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

export const updateCompanyUserLogo =
  (
    logo: File | null,
    setIsLoading: (loading: boolean) => void,
    setIsSuccess: (success: boolean) => void,
    setErrorMessage: (errorMessage: string | null) => void
  ) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const { token } = getState().auth;

    const formData = new FormData();
    if (logo) {
      formData.append('logo', logo);
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/companies/logo`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setIsSuccess(true);
      } else {
        setErrorMessage(response.data.message.logo[0]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

export const sendForgotPasswordEmail =
  (
    email: string | null,
    setIsLoading: (isLoading: boolean) => void,
    setErrorMessage: (errorMessage: string) => void,
    setStep?: (step: number) => void,
    setIsEmailSent?: (isEmailSent: boolean) => void
  ) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    setIsLoading(true);
    const { token } = getState().auth;
    try {
      const config = {
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/password/forgot`,
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        data: email ? { email } : {},
      };
      const response = await axios.request(config);
      if (response.data.success) {
        if (setStep) {
          setStep(2);
        } else if (setIsEmailSent) {
          setIsEmailSent(true);
        }
      } else {
        setErrorMessage(response.data.message.email[0]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
export const resetPassword =
  (
    token: string,
    email: string,
    newPassword: newPassword,
    setIsLoading: (isLoading: boolean) => void,
    setIsSuccess: (success: boolean) => void,
    setErrorMessage: (messages: { [key: string]: string }) => void
  ) =>
  async () => {
    setIsLoading(true);
    try {
      const config = {
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/password/reset`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: { token, email, ...newPassword },
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

export const changePassword =
  (
    password: changePasswordTypes,
    setIsSuccess: (success: boolean) => void,
    setErrorMessage: (messages: { [key: string]: string }) => void
  ) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const { token } = getState().auth;
    try {
      const config = {
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/password/change`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: { ...password },
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

export const logActivityProfile =
  (currentPage: number, setPagination: (pagination: paginationTypes) => void) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const { token } = getState().auth;
    const { id } = getState().auth.user;
    try {
      const config = {
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/activity/log/users?page=${currentPage}&id=${id}`,
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
