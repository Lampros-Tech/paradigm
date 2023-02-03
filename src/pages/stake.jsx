import React from "react";
import "../styles/stake.scss";
import { useState } from "react";

function Stake() {
  const [number, setNumber] = useState("");

  const handleNumber = (e) => {
    let input = e.target.value;

    if (input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) setNumber(input);
  };

  const handleFloat = () => {
    setNumber(parseFloat(number) || "");
  };
  return (
    <div className="stake-main">
      <div className="home-bg">
      </div>
      <div className="stake-form">
        <div className="stake-main">
          <h2 className="header">Stake your FIL & earn interest over it</h2>
          <div>
            <input
              className="stake-entry"
              type="text"
              value={number}
              onChange={handleNumber}
              onBlur={handleFloat}
              name="value"
              placeholder="value"
            />
          </div>
          <div>
            <button className="stake-btn">Stake</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stake;
