// utils/auth.js
import Cookies from 'js-cookie';

export async function login(username, password) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    throw new Error('Failed to login');
  }

  const data = await res.json();

  // Simpan token di cookie dengan masa berlaku tertentu
  Cookies.set('token', data.token.acces_token, { expires: 1 }); // 1 hari

  return data;
}
