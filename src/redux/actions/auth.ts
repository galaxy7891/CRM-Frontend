// import axios from 'axios';
// import { setToken } from '../reducers/auth';

// export const login =
//   (navigate: (path: string) => void, email: string, password: string) =>
//   async (dispatch: any) => {
//     const data = JSON.stringify({ email, password });

//     const config = {
//       method: 'post',
//       url: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, // Ganti dengan URL yang sesuai
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       data,
//     };

//     try {
//       const response = await axios.request(config);

//       // Mengambil data token dan user dari response
//       const { access_token } = response.data.data.access_token;
//       if (response.data.success) {
//         console.log('login success', response.data.data.access_token);
//       }
//       // Menyimpan token dan user ke dalam Redux
//       dispatch(setToken(access_token)); // Pastikan ini mengirimkan token yang benar

//       // Redirect ke homepage
//     } catch (error) {
//       console.error(error);
//     }
//   };
