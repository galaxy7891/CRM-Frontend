import { parse } from 'json2csv';

const handleExport = (data: any) => {
  try {
    // Konversi data JSON dari state ke CSV
    const csv = parse(data);

    // Buat blob dari CSV dan URL unduhan
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    // Buat link untuk mengunduh file
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Gagal mengekspor data:', error);
  }
};

export default handleExport;
