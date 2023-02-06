import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import "../styles/navbar.scss";

function Navbar() {
  const [isExpanded, setIsExpanded] = useState(false);
  // const [address, setAddress] = useState("");

  function handleClick() {
    setIsExpanded(!isExpanded);
  }
  return (
    <>
      <header className="header">
        <nav className="navbar">
          <span className="logo">
            <Link to="/" className="link">
              {/* <Image src={logo} alt="logo" /> */}
              <div className="logo-sub">
                <img className="logo-left" src="/images/favicon.png" />
                <span className="logo-right">Paradigm</span>
                {/* UpToData */}
              </div>
            </Link>
          </span>
          <ul className={isExpanded === false ? "navmenu" : "navmenu active"}>
            <Link
              to="/"
              className="navlink"
            >
              <li className="navitem">
                <span>

                  Home
                </span>
              </li>
            </Link>
            <Link
              to="/loan"
              className="navlink"
            >
              <li className="navitem">
                <span>
                  Loan
                </span>
              </li>
            </Link>
            <Link
              to="/stake"
              className="navlink"
            >
              <li className="navitem">
                <span>
                  Stake
                </span>
              </li>
            </Link>
            <Link
              to="/method"
              className="navlink"
            >
              <li className="navitem">
                <span>
                  Methodology
                </span>
              </li>
            </Link>
            {/* <li className="navitem">
              <span>
                <Link
                  //   target="_blank"
                  //   rel="noopener noreferrer"
                  to="/page3"
                  className="navlink"
                >
                  Page3
                </Link>
              </span>
            </li> */}

            <ConnectButton
              accountStatus={{
                smallScreen: "avatar",
                largeScreen: "full",
              }}
            />
            <button
              onClick={handleClick}
              className={isExpanded === false ? "hamburger" : "hamburger active"}
            >
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </button>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
