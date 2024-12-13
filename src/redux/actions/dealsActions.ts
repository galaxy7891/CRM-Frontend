import axios from 'axios';
import {
  setDealsQualification,
  setDealsProposal,
  setDealsNegotiation,
  setDealsWon,
  setDealsLose,
  setDeals,
  setDeal,
  setLogDeal,
} from '../reducers/dealsReducers';
// import { dealDataTypes } from '@/types/dealDataTypes';
import { paginationTypes } from '@/types/otherTypes';
import { AppDispatch, RootState } from '../store';
import { dealsDataTypes } from '@/types/dealsTypes';
// import { ImportErrorMessageDetailTypes } from '@/types/otherTypes';

export const getDeals =
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
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/deals?sort=${sortBy}&status=${statusBy}&per_page=${perPage}&page=${currentPage}`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      const response = await axios.request(config);
      if (response.data.success) {
        const deals = response.data.data;
        dispatch(setDeals(response.data.data.data));
        setPagination({
          current_page: deals.current_page,
          last_page: deals.last_page,
          total: deals.total,
          per_page: deals.per_page,
          next_page_url: deals.next_page_url,
          prev_page_url: deals.prev_page_url,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
export const getDealsForExport =
  () =>
  async (
    dispatch: AppDispatch,
    getState: () => RootState
  ): Promise<dealsDataTypes[] | undefined> => {
    const { token } = getState().auth;

    try {
      const config = {
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/deals?sort=terbaru&status=semua&per_page=semua&page=1`,
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

export const getDealsQualification =
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
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/deals?tahapan=kualifikasi&sort=${sortBy}&status=${statusBy}&per_page=${perPage}&page=1=${currentPage}`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.request(config);
      if (response.data.success) {
        const deals = response.data.data;
        dispatch(setDealsQualification(response.data.data.data));
        setPagination({
          current_page: deals.current_page,
          last_page: deals.last_page,
          total: deals.total,
          per_page: deals.per_page,
          next_page_url: deals.next_page_url,
          prev_page_url: deals.prev_page_url,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

export const getDealsProposal =
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
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/deals?tahapan=proposal&sort=${sortBy}&status=${statusBy}&per_page=${perPage}&page=1=${currentPage}`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.request(config);
      const deals = response.data.data;
      if (response.data.success) {
        dispatch(setDealsProposal(response.data.data.data));
        setPagination({
          current_page: deals.current_page,
          last_page: deals.last_page,
          total: deals.total,
          per_page: deals.per_page,
          next_page_url: deals.next_page_url,
          prev_page_url: deals.prev_page_url,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

export const getDealsNegotiation =
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
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/deals?tahapan=negosiasi&sort=${sortBy}&status=${statusBy}&per_page=${perPage}&page=1=${currentPage}`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.request(config);
      const deals = response.data.data;
      if (response.data.success) {
        dispatch(setDealsNegotiation(response.data.data.data));
        setPagination({
          current_page: deals.current_page,
          last_page: deals.last_page,
          total: deals.total,
          per_page: deals.per_page,
          next_page_url: deals.next_page_url,
          prev_page_url: deals.prev_page_url,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

export const getDealsWon =
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
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/deals?tahapan=tercapai&sort=${sortBy}&status=${statusBy}&per_page=${perPage}&page=1=${currentPage}`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.request(config);
      const deals = response.data.data;
      if (response.data.success) {
        dispatch(setDealsWon(response.data.data.data));
        setPagination({
          current_page: deals.current_page,
          last_page: deals.last_page,
          total: deals.total,
          per_page: deals.per_page,
          next_page_url: deals.next_page_url,
          prev_page_url: deals.prev_page_url,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

export const getDealsLose =
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
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/deals?tahapan=gagal&sort=${sortBy}&status=${statusBy}&per_page=${perPage}&page=1=${currentPage}`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      const response = await axios.request(config);
      const deals = response.data.data;
      setPagination({
        current_page: deals.current_page,
        last_page: deals.last_page,
        total: deals.total,
        per_page: deals.per_page,
        next_page_url: deals.next_page_url,
        prev_page_url: deals.prev_page_url,
      });
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
    deal: dealsDataTypes,
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

export const logActivityDeals =
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
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/activity/log/deals?page=${currentPage}&id=${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.request(config);

      if (response.data.success) {
        const logLead = response.data.data[0];
        dispatch(setLogDeal(logLead.data[0].activities));
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
