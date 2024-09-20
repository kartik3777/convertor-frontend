import React, { useState } from 'react';
import {Route, Routes, BrowserRouter } from "react-router-dom";
import TxtToPdf from './TxtToPdf';
import PdfToTxt from './PdfToTxt';
import NavBar from './NavBar';
import ImageToPdfConverter from './ImgToPdf';


const App = () => {

  return (
    <>
    <BrowserRouter>
    {/* <Router> */}
      <Routes>
      <Route path="/" element={<NavBar />}>
          {/* <Route index element={<TxtToPdf />} /> */}
          <Route path="txttopdf" element={<TxtToPdf />} />
          <Route path="pdftotxt" element={<PdfToTxt />} />
          <Route path="imgtopdf" element={<ImageToPdfConverter />} />
        </Route>
        </Routes>
    {/* </Router> */}
    </BrowserRouter>
    </>
  );
};
export default App
