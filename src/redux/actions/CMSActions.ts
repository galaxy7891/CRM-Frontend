import axios from 'axios';
import { articleTypes } from '@/types/CMSTypes';
import { paginationTypes } from '@/types/otherTypes';
import { AppDispatch, RootState } from '@/redux/store';
import {
  setPublicArticles,
  setPublicArticle,
  setArticles,
  setArticle,
} from '../reducers/CMSReducers';

// Public API
export const getPublicArticles =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { token } = getState().auth;
    try {
      const config = {
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/landingpage/article?sort=terbaru&per_page=25&page=1`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.request(config);
      if (response.data.success) {
        dispatch(setPublicArticles(response.data.data.data));
      }
    } catch (error) {
      console.error(error);
    }
  };

export const getPublicArticle =
  (id: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { token } = getState().auth;
    try {
      const config = {
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/landingpage/article/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      const response = await axios.request(config);
      if (response.data.success) {
        dispatch(setPublicArticle(response.data.data));
      }
    } catch (error) {
      console.error(error);
    }
  };

// Admin API
export const getArticles =
  (
    sortBy: string,
    articleStatusBy: string,
    perPage: string,
    currentPage: number,
    setPagination: (pagination: paginationTypes) => void
  ) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const { token } = getState().auth;
    try {
      const config = {
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/article?sort=${sortBy}&per_page=${perPage}&page=${currentPage}&status=${articleStatusBy}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.request(config);
      if (response.data.success) {
        const article = response.data.data;
        dispatch(setArticles(response.data.data.data));
        setPagination({
          current_page: article.current_page,
          last_page: article.last_page,
          total: article.total,
          per_page: article.per_page,
          next_page_url: article.next_page_url,
          prev_page_url: article.prev_page_url,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

export const getArticleById =
  (id: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { token } = getState().auth;
    console.log(id);
    try {
      const config = {
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/article/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      const response = await axios.request(config);

      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  };

export const getPublicArticleSSR = async (id: string) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/article/${id}`
  );
  return response.data.data;
};

export const addArticle =
  (article: articleTypes, content: string, photo: File | null) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const { token } = getState().auth;

    const formData = new FormData();

    if (photo) {
      formData.append('photo_article', photo);
    }

    formData.append('title', article.title);
    formData.append('status', article.status);
    formData.append('description', content);

    try {
      const config = {
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/article`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: formData,
      };

      const response = await axios.request(config);

      if (response.data.success) {
        alert(response.data.message);
      } else {
        console.error('Error:', response.data.message);
      }
    } catch (error) {
      console.error('Request failed:', error);
    }
  };

export const deleteArticle =
  (ids: string | string[], setIsSuccess: (success: boolean) => void) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const token = getState().auth.token;

    try {
      const config = {
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/article/`,
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
      console.error(error);
    }
  };
