import axios from 'axios';
import { AppDispatch, RootState } from '@/redux/store';
import { setCompaniesDropdown } from '@/redux/reducers/companiesReducers';

export const getCompaniesDropdown =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { token } = getState().auth;
    try {
      const config = {
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/customers/companies`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.request(config);
      if (response.data.success) {
        dispatch(setCompaniesDropdown(response.data.data.data));
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
