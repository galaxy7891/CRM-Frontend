import axios from 'axios';
import {
  //   setDealsQualification,
  //   setDealsProposal,
  setDealsNegotiation,
  //   setDealsWon,
  //   setDealsLose,
} from '../reducers/dealsReducers';
// import { dealsTypes } from '@/types/dealsTypes';
// import { paginationTypes } from '@/types/otherTypes';
import { AppDispatch, RootState } from '../store';
// import { ImportErrorMessageDetailTypes } from '@/types/otherTypes';

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
