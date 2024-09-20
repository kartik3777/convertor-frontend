import React, { useState } from 'react';
import axios from 'axios';

function PdfToTxt() {
    const [file2, setFile2] = useState(null);
    const [downloadUrl2, setDownloadUrl2] = useState('');

    const handleFileChange2 = (e) => {
        setFile2(e.target.files[0]);
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
       <h2>PDF to TXT</h2>

<input type="file" onChange={handleFileChange2} accept=".pdf" />
<button onClick={handleFileUpload2} disabled={!file2}>Convert to Text</button>
{downloadUrl2 && (
<div>
<a href={downloadUrl2} download="converted.txt">Download Converted TXT</a>
</div>
)}
    </div>
  )
}

export default PdfToTxt
