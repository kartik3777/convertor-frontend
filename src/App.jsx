import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [file, setFile] = useState(null);
  const [file2, setFile2] = useState(null);
  const [downloadUrl1, setDownloadUrl1] = useState('');
  const [downloadUrl2, setDownloadUrl2] = useState('');
  const [coming, setComing] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleFileChange2 = (e) => {
    setFile2(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('https://convertor-api.vercel.app/convert-to-pdf', formData, {
        responseType: 'blob', // Ensure we receive the file as a blob
      });

      // Create a download link for the generated PDF file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      setDownloadUrl1(url);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleFileUpload2 = async () => {
    const formData = new FormData();
    formData.append('file', file2);

    try {
      const response = await axios.post('https://convertor-api.vercel.app/convert-to-txt', formData, {
        responseType: 'blob', // Ensure we receive the file as a blob
      });

      // Create a download link for the converted file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      setDownloadUrl2(url);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };




  return (
    <div>
     
      {coming && <h2>backend connection working</h2>}
      <h2>TXT to PDF</h2>

      <label htmlFor="">Select txt file</label>
      <input type="file" onChange={handleFileChange} accept=".txt" />
      <button onClick={handleFileUpload} disabled={!file}>Convert to PDF</button>

      {downloadUrl1 && (
        <div>
          <a href={downloadUrl1} download="converted.pdf">Download Converted PDF</a>
        </div>
      )}
     <h2>PDF to TXT</h2>

            <label htmlFor="">Select pdf file</label>
      <input type="file" onChange={handleFileChange2} accept=".pdf" />
      <button onClick={handleFileUpload2} disabled={!file2}>Convert to Text</button>
      {downloadUrl2 && (
        <div>
          <a href={downloadUrl2} download="converted.txt">Download Converted TXT</a>
        </div>
      )}
    </div>
  );
};
export default App
