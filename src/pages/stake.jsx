import React from "react";
import "../styles/stake.scss";
import { useState } from "react";
import { useAccount, useProvider, useSigner, useContract } from "wagmi";
import { CONTRACT_ADDRESS } from "../config";
import stakeFIL_abi from "../contract/stakeFIL.json";

function Stake() {
  //instance of connected contract
  const connectedContract = useContract({
    address: CONTRACT_ADDRESS,
    abi: stakeFIL_abi,
  });

  //function to stake
  const stakeFilCoin = async () => {
    let stakeTx = await connectedContract.addUser(Date.now(), { value: 0.001 });
    const receipt = await stakeTx.wait();
    if (receipt) {
      console.log("transaction successful");
    }
  };
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
      <div className="home-bg"></div>
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
            <button className="stake-btn" onClick={() => stakeFilCoin}>
              Stake
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stake;
