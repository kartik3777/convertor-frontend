import React, { useState } from "react";
import { Outlet, Link , useNavigate } from "react-router-dom";
import "./navbar.css";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function NavBar() {
    const [activeBox, setActiveBox] = useState(null);

    const handleClick = (box) => {
      setActiveBox(box); // Update the active box when clicked
    };
    const Navigate = useNavigate();

  return (
    <div>
    
      <div className="main">
        <div className="outer-side">
              <div onClick={() => Navigate("/")} className="out-heading">
        <h1>Kconvertor</h1>
      </div>
          <Link style={{textDecoration:"none"}} to="/pdftotxt" onClick={() => handleClick('box1')}> 
            <div className={`side-box sidebox1 ${activeBox === 'box1' ? 'active' : ''}`}>
              Convert Pdf to Txt
              {/* <ArrowForwardIosIcon fontSize="40" /> */}
            </div>
          </Link>
          <Link style={{textDecoration:"none"}} to="/txttopdf" onClick={() => handleClick('box2')}> 
            <div className={`side-box sidebox2 ${activeBox === 'box2' ? 'active' : ''}`}>
              Convert Txt to Pdf
              {/* <ArrowForwardIosIcon fontSize="20" /> */}
            </div>
          </Link>
        </div>
        <div className="main-area">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
