import axios from 'axios';
import { leadsTypes } from '@/types/leads';
import { AppDispatch, RootState } from '../store';
// import { setLead } from '../reducers/leads';

export const convertManualLeads =
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
