import axios from 'axios';
import {
  setDealsQualification,
  setDealsProposal,
  setDealsNegotiation,
  setDealsWon,
  setDealsLose,
  setDeal,
} from '../reducers/dealsReducers';
// import { dealsTypes } from '@/types/dealsTypes';
// import { paginationTypes } from '@/types/otherTypes';
import { AppDispatch, RootState } from '../store';
import { dealsTypes, dealsDataTypes } from '@/types/dealsTypes';
// import { ImportErrorMessageDetailTypes } from '@/types/otherTypes';

export const getDealsQualification =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { token } = getState().auth;
    try {
      const config = {
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/deals?tahapan=kualifikasi&sort=terbaru&per_page=10&page=1`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.request(config);
      if (response.data.success) {
        dispatch(setDealsQualification(response.data.data.data));
      }
    } catch (error) {
      console.error(error);
    }
  };

export const getDealsProposal =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { token } = getState().auth;
    try {
      const config = {
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/deals?tahapan=proposal&sort=terbaru&per_page=10&page=1`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.request(config);
      if (response.data.success) {
        dispatch(setDealsProposal(response.data.data.data));
      }
    } catch (error) {
      console.error(error);
    }
  };

export const getDealsNegotiation =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { token } = getState().auth;
    try {
      const config = {
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/deals?tahapan=negosiasi&sort=terbaru&per_page=10&page=1`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.request(config);
      if (response.data.success) {
        dispatch(setDealsNegotiation(response.data.data.data));
      }
    } catch (error) {
      console.error(error);
    }
  };

export const getDealsWon =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { token } = getState().auth;
    try {
      const config = {
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/deals?tahapan=tercapai&sort=terbaru&per_page=10&page=1`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.request(config);
      if (response.data.success) {
        dispatch(setDealsWon(response.data.data.data));
      }
    } catch (error) {
      console.error(error);
    }
  };

export const getDealsLose =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { token } = getState().auth;
    try {
      const config = {
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/deals?tahapan=gagal&sort=terbaru&per_page=10&page=1`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.request(config);
      if (response.data.success) {
        dispatch(setDealsLose(response.data.data.data));
      }
    } catch (error) {
      console.error(error);
    }
  };

export const getDealById =
  (id: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { token } = getState().auth;

    try {
      const config = {
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/deals/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.request(config);
      if (response.data.success) {
        dispatch(setDeal(response.data.data));
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

export const addDeals =
  (
    deal: dealsTypes,
    setIsSuccess: (success: boolean) => void,
    setErrorMessage: (messages: { [key: string]: string }) => void
  ) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const { token } = getState().auth;
    try {
      const config = {
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/deals`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: deal,
      };
      const response = await axios.request(config);
      if (response.data.success) {
        setIsSuccess(true);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        console.error(response.data.message);
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

export const updateDeal =
  (
    deal: dealsDataTypes,
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
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/deals/${deal?.id}`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: deal,
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
    } finally {
      setIsLoading(false);
    }
  };

export const updateDealStage =
  (id: string, stage: string, setIsSuccess: (success: string) => void) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const token = getState().auth.token;
    console.log(id, stage, 'tes');
    try {
      const config = {
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/deals/stage/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: { stage },
      };

      const response = await axios.request(config);

      if (response.data.success) {
        setIsSuccess('StageUpdateSuccess');
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

export const deleteDeal =
  (ids: string | string[], setIsSuccess: (success: string) => void) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const token = getState().auth.token;

    try {
      const config = {
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/deals`,
        method: 'delete',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { id: Array.isArray(ids) ? ids : [ids] },
      };
      const response = await axios.request(config);

      if (response.data.success) {
        setIsSuccess('DeleteSuccess');
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('Error deleting deal(s):', error);
    }
  };
