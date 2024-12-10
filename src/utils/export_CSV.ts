import { parse } from 'json2csv';
const handleExport = <T>(data: T[]) => {
  try {
    // convert JSON to CSV
    const csv = parse(data);

    // Create blob from CSV and URL
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    // Create Link
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error(error);
  }
};

export default handleExport;
