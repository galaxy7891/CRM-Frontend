import axios from 'axios';
import { productsTypes } from '@/types/productTypes';
import {
  setProduct,
  setProducts,
  setLogProduct,
} from '../reducers/productsReducers';
import { AppDispatch, RootState } from '@/redux/store';
import { paginationTypes } from '@/types/otherTypes';
import { ImportErrorMessageDetailTypes } from '@/types/otherTypes';

export const getProducts =
  (
    sortBy: string,
    perPage: string,
    currentPage: number,
    setPagination: (pagination: paginationTypes) => void
  ) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const { token } = getState().auth;
    try {
      const config = {
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/products?sort=${sortBy}&per_page=${perPage}&page=${currentPage}`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.request(config);
      if (response.data.success) {
        const products = response.data.data;
        dispatch(setProducts(products.data));
        setPagination({
          current_page: products.current_page,
          last_page: products.last_page,
          total: products.total,
          per_page: products.per_page,
          next_page_url: products.next_page_url,
          prev_page_url: products.prev_page_url,
        });
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

export const getProductById =
  (id: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { token } = getState().auth;
    try {
      const config = {
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.request(config);
      if (response.data.success) {
        dispatch(setProduct(response.data.data));
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

export const addProduct =
  (
    product: productsTypes,
    setIsSuccess: (success: boolean) => void,
    setErrorMessage: (messages: { [key: string]: string }) => void
  ) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const token = getState().auth.token;
      const config = {
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: product,
      };
      const response = await axios.request(config);
      console.log('Response API:', response.data);
      if (response.data.success) {
        setIsSuccess(true);
        // setTimeout(() => {
        //   window.location.reload();
        // }, 2000);
      } else {
        console.error(response.data.message);
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

export const updateProduct =
  (
    product: productsTypes,
    setIsSuccess: (success: boolean) => void,
    setErrorMessage: (messages: { [key: string]: string }) => void
  ) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const token = getState().auth.token;
    try {
      const config = {
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/products/${product?.id}`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: product,
      };

      const response = await axios.request(config);
      console.log('Response API:', response.data);
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

export const deleteProduct =
  (
    ids: string | string[],
    setIsSuccess: (success: boolean) => void,
    setIsDeleteFail: (fail: boolean) => void
  ) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const token = getState().auth.token;

    try {
      const config = {
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/products/`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { id: Array.isArray(ids) ? ids : [ids] },
      };
      const response = await axios.request(config);

      if (response.data.success) {
        setIsSuccess(true);
      }
      if (!response.data.success) {
        setIsDeleteFail(true);
      }
    } catch (error) {
      console.error('Error deleting product(s):', error);
    }
  };

export const logActivityProduct =
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
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/activity/log/products?page=${currentPage}&id=${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.request(config);

      if (response.data.success) {
        const logProduct = response.data.data[0];
        dispatch(setLogProduct(logProduct.data[0].activities));
        setPagination({
          current_page: logProduct.current_page,
          last_page: logProduct.last_page,
          total: logProduct.total,
          per_page: logProduct.per_page,
          next_page_url: logProduct.next_page_url,
          prev_page_url: logProduct.prev_page_url,
        });
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

export const importProducts =
  (
    file: File,
    setIsSuccess: (success: boolean) => void,
    setErrorMessage: (messages: string) => void,
    setErrorMessageDetail: (messages: ImportErrorMessageDetailTypes) => void,
    setIsFailed: (success: boolean) => void
  ) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const { token } = getState().auth;
    const formData = new FormData();
    formData.append('file', file);

    try {
      const config = {
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/import/products`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
      };

      const response = await axios.request(config);

      if (response.data.success) {
        setIsSuccess(true);
      } else {
        setErrorMessage(response.data.message);
        setErrorMessageDetail(response.data.data);
        setIsFailed(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

export const updatePhotoProduct =
  (
    photo: File | null,
    id: string,
    setErrorMessage: (message: string) => void,
    setIsLoading: (loading: boolean) => void
  ) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const { token } = getState().auth;
    const formData = new FormData();
    if (photo) {
      formData.append('photo_product', photo);
    }

    try {
      setIsLoading(true);

      const config = {
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
      };

      const response = await axios.request(config);

      if (!response.data.success) {
        setErrorMessage(response.data.message.photo[0]);
      } else {
        console.log('Photo updated successfully');
        window.location.reload();
      }
    } catch (error) {
      console.error('Error uploading photo:', error);
    } finally {
      setIsLoading(false);
    }
  };
