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
      <div className="form">
        <h2>Stake your FIL & earn intrest over it</h2>
        <div>
          <input
            className="input"
            type="text"
            value={number}
            onChange={handleNumber}
            onBlur={handleFloat}
            name="value"
            placeholder="value"
          />

          <button>Stake</button>
        </div>
      </div>
    </div>
  );
}

export default Stake;
