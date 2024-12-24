import axios from 'axios';

export const getProvinces = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_ADDRESS_API}/api/provinsi/get/`
  );
  return response.data.result;
};

export const getCities = async (provinceId: string) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_ADDRESS_API}/api/kabkota/get/?d_provinsi_id=${provinceId}`
  );
  return response.data.result;
};

export const getSubDistricts = async (cityId: string) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_ADDRESS_API}/api/kecamatan/get/?d_kabkota_id=${cityId}`
  );
  return response.data.result;
};

export const getVillage = async (districtId: string) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_ADDRESS_API}/api/kelurahan/get/?d_kecamatan_id=${districtId}`
  );
  return response.data.result;
};

export const getZipCodes = async (cityId: string, districtId: string) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_ADDRESS_API}/api/kodepos/get/?d_kabkota_id=${cityId}&d_kecamatan_id=${districtId}`
  );
  return response.data.result;
};
