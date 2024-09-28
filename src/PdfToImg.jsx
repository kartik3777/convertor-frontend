import React, { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';

const PdfToImageConverter = () => {
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [convertedImages, setConvertedImages] = useState([]);

  // Handle PDF file selection
  const handleFileChange = (event) => {
    setSelectedPdf(event.target.files[0]);
  };

  // Function to upload PDF and get converted images
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedPdf) {
      alert('Please select a PDF file');
      return;
    }

    const formData = new FormData();
    formData.append('pdf', selectedPdf);

    try {
      const response = await axios.post('https://convertor-api.vercel.app/convert-pdf-to-images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setConvertedImages(response.data.images); // Store converted images
    } catch (error) {
      console.error('Error converting PDF to images:', error);
    }
  };

  // Function to download images as a zip file
  const downloadAsZip = async () => {
    try {
      const response = await axios.post(
        'https://convertor-api.vercel.app/download-zip',
        { images: convertedImages },
        { responseType: 'blob' }
      );

      const zipBlob = new Blob([response.data], { type: 'application/zip' });
      saveAs(zipBlob, 'images.zip'); // Trigger download using FileSaver.js
    } catch (error) {
      console.error('Error downloading zip file:', error);
    }
  };

  return (
    <div>
      <h1>PDF to Image Converter</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="application/pdf" onChange={handleFileChange} />
        <button type="submit">Convert PDF to Images</button>
      </form>

      {/* Show the converted images */}
      {convertedImages.length > 0 && (
        <div>
          <h3>Converted Images</h3>
          <ul>
            {convertedImages.map((image, index) => (
              <li key={index}>
                <a href={image.url} download={image.filename}>
                  {image.filename}
                </a>
              </li>
            ))}
          </ul>
          <button onClick={downloadAsZip}>Download All as Zip</button>
        </div>
      )}
    </div>
  );
};

export default PdfToImageConverter;
