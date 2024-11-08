import axios from 'axios';

export const getProvinces = async () => {
  const response = await axios.get(
    'https://alamat.thecloudalert.com/api/provinsi/get/'
  );
  return response.data.result;
};

export const getCities = async (provinceId: string) => {
  const response = await axios.get(
    `https://alamat.thecloudalert.com/api/kabkota/get/?d_provinsi_id=${provinceId}`
  );
  return response.data.result;
};

export const getSubDistricts = async (cityId: string) => {
  const response = await axios.get(
    `https://alamat.thecloudalert.com/api/kecamatan/get/?d_kabkota_id=${cityId}`
  );
  return response.data.result;
};

export const getVillage = async (districtId: string) => {
  const response = await axios.get(
    `https://alamat.thecloudalert.com/api/kelurahan/get/?d_kecamatan_id=${districtId}`
  );
  return response.data.result;
};

export const getZipCodes = async (cityId: string, districtId: string) => {
  const response = await axios.get(
    `https://alamat.thecloudalert.com/api/kodepos/get/?d_kabkota_id=${cityId}&d_kecamatan_id=${districtId}`
  );
  return response.data.result;
};
