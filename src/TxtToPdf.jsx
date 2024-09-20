import React, { useState } from 'react';
import axios from 'axios';

function TxtToPdf() {
  const [file, setFile] = useState(null);
  const [downloadUrl1, setDownloadUrl1] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "https://convertor-api.vercel.app/convert-to-pdf",
        formData,
        {
          responseType: "blob", // Ensure we receive the file as a blob
        }
      );

      // Create a download link for the generated PDF file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      setDownloadUrl1(url);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      <h2>TXT to PDF</h2>

      <input type="file" onChange={handleFileChange} accept=".txt" />
      <button onClick={handleFileUpload} disabled={!file}>
        Convert to PDF
      </button>

      {downloadUrl1 && (
        <div>
          <a href={downloadUrl1} download="converted.pdf">
            Download Converted PDF
          </a>
        </div>
      )}
    </div>
  );
}

export default TxtToPdf;
