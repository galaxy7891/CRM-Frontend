// import axios from 'axios';
// import { setLead } from '../reducers/leads';

// export const getAllLeads = async (dispatch) => {
//   const token = localStorage.getItem('token');
//   const config = {
//     method: 'get',
//     url: `${process.env.NEXT_PUBLIC_API_URL}/api/leads?sort=terbaru&status=rendah&per_page=10&page=1`,
//     headers: {
//       Authorization: `Bearer ${token}`,
//       'Content-Type': 'application/json',
//     },
//   };

//   try {
//     const response = await axios.request(config);
//     const { data } = response.data;
//     dispatch(setLead(data.data));
//     console.log('redux', data);
//   } catch (error) {
//     console.log(error);
//   }
// };
