import React, { useState } from "react";
import axios from "axios";
import DownloadIcon from "@mui/icons-material/Download";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import ImageIcon from "@mui/icons-material/Image";
import "./img.css";
import ClearIcon from '@mui/icons-material/Clear';

const ImageToPdfConverter = () => {
  const [selectedFiles, setSelectedFiles] = useState([]); // Store selected files as an array
  const [downloadUrl, setDownloadUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle file selection (for adding new images)
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files); // Get the newly selected files as an array
    setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]); // Add new files to the existing selected files
  };

  // Handle form submission to convert images to PDF
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedFiles.length === 0) {
      alert("Please select at least one image.");
      return;
    }

    const formData = new FormData();
    // Append all selected files to the formData
    selectedFiles.forEach((file) => formData.append("images", file));
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://convertor-api.vercel.app/convert-images-to-pdf",
        formData,
        {
          responseType: "blob", // Expecting a PDF as a binary response (blob)
        }
      );

      // Create a URL for the returned PDF blob and make it available for download
      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      const pdfUrl = window.URL.createObjectURL(pdfBlob);
      setDownloadUrl(pdfUrl);
      setIsLoading(false);
    } catch (error) {
      console.error("Error uploading images:", error);
      setIsLoading(false);
    }
  };

  // Clear the selected images (if you want to reset after converting)
  const handleClear = () => {
    setSelectedFiles([]);
    setDownloadUrl("");
  };

   // Remove a single image from the selected files list
   const handleRemoveImage = (indexToRemove) => {
    setSelectedFiles(prevFiles => prevFiles.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div>
      <h2>Convert Images to PDF</h2>
        
        <p>Convert images to PDF for free online. Our JPG to PDF Converter turns any image file into a custom PDF file (No file size limits, no watermarks).</p>
      {/* Form to handle file selection and PDF conversion */}
      <form className="imgtopdf-form" onSubmit={handleSubmit}>
        <div className="img-input-box">
          <input
            className="img-input"
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
          />
          <div className="input-button">
            <ImageIcon />
            Select Image
          </div>
        </div>

        <button className="button-imgtopdf" type="submit">
          {/* Apply rotation animation to icon */}
          <ChangeCircleIcon className={isLoading ? "rotate" : ""} />

          {/* Apply blinking effect to text */}
          <span className={isLoading ? "blink" : ""}>
            {isLoading ? "Converting..." : "Convert to PDF"}
          </span>
        </button>
      </form>

      {/* Display the selected files */}
      {selectedFiles.length > 0 && (
        <div>
          <div className="select-head">
          <h3>Selected Images:</h3>
          <button className="clear-btn" onClick={handleClear}>Clear All </button>
          </div>
         
          <ul>
            {selectedFiles.map((file, index) => (
              <li className="selected-images" key={index}>
                {file.name} 
                <ClearIcon  style={{cursor:"pointer",fontSize:"20"}} onClick={() => handleRemoveImage(index)} />
                {/* <button onClick={() => handleRemoveImage(index)}>Remove</button>  */}
              </li>
            ))}
          </ul>
         
        </div>
      )}

      {/* Display the download link once the PDF is generated */}
      {downloadUrl && (
        <div className="download-imgtopdf">
          <DownloadIcon style={{ color: "white" }} />
          <a
            style={{ textDecoration: "none", color: "white" }}
            href={downloadUrl}
            download="converted-images.pdf"
          >
            Download PDF
          </a>
        </div>
      )}
    </div>
  );
};

export default ImageToPdfConverter;
