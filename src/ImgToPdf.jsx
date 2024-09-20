import React, { useState } from 'react';
import axios from 'axios';
import DownloadIcon from '@mui/icons-material/Download';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import ImageIcon from '@mui/icons-material/Image';
import './img.css';

const ImageToPdfConverter = () => {
  const [selectedFiles, setSelectedFiles] = useState([]); // Store selected files as an array
  const [downloadUrl, setDownloadUrl] = useState('');

  // Handle file selection (for adding new images)
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files); // Get the newly selected files as an array
    setSelectedFiles(prevFiles => [...prevFiles, ...newFiles]); // Add new files to the existing selected files
  };

  // Handle form submission to convert images to PDF
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedFiles.length === 0) {
      alert('Please select at least one image.');
      return;
    }

    const formData = new FormData();
    // Append all selected files to the formData
    selectedFiles.forEach(file => formData.append('images', file));

    try {
      const response = await axios.post('https://convertor-api.vercel.app/convert-images-to-pdf', formData, {
        responseType: 'blob', // Expecting a PDF as a binary response (blob)
      });

      // Create a URL for the returned PDF blob and make it available for download
      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      const pdfUrl = window.URL.createObjectURL(pdfBlob);
      setDownloadUrl(pdfUrl);

    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  // Clear the selected images (if you want to reset after converting)
  const handleClear = () => {
    setSelectedFiles([]);
    setDownloadUrl('');
  };

  return (
    <div>
      <h2>Convert Images to PDF</h2>

      {/* Form to handle file selection and PDF conversion */}
      <form className='imgtopdf-form' onSubmit={handleSubmit}>
        <div className='img-input-box'>
           <input className='img-input' type="file" multiple accept="image/*" onChange={handleFileChange} />
           <div className='input-button'>
            <ImageIcon />
            Select Image</div>
        </div>
      
            <button className='button-imgtopdf' type="submit">
            <ChangeCircleIcon />
                Convert to PDF
                </button>

      </form>

      {/* Display the selected files */}
      {selectedFiles.length > 0 && (
        <div>
          <h3>Selected Images:</h3>
          <ul>
            {selectedFiles.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
          <button onClick={handleClear}>Clear Selected Images</button>

        </div>
      )}

      {/* Display the download link once the PDF is generated */}
      {downloadUrl && (
        <div className='download-imgtopdf'>
            <DownloadIcon style={{color:"white"}} />
          <a style={{textDecoration:"none", color:"white"}} href={downloadUrl} download="converted-images.pdf">
            Download PDF
          </a>
        </div>
      )}
    </div>
  );
};

export default ImageToPdfConverter;
