import React from "react";
import "../styles/stake.scss";
import { useState } from "react";
import { useAccount, useProvider, useSigner, useContract } from "wagmi";
import { CONTRACT_ADDRESS } from "../config";
import stakeFIL_abi from "../contract/stakeFIL.json";
import { ethers } from "ethers";

function Stake() {
  //getting signer and provider
  const { address } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();
  const [duration, setDuration] = useState(30);
  const [stakeValue, setStakeValue] = useState("");

  //instance of connected contract
  const connectedContract = useContract({
    address: CONTRACT_ADDRESS,
    abi: stakeFIL_abi,
    signerOrProvider: signer,
  });

  //function to stake
  const stakeFilCoin = async () => {
    //1675492444
    //1675492603134
    console.log("Inside stake function");
    let stakeTx = await connectedContract.stake(duration, {
      value: ethers.utils.parseUnits(stakeValue.toString(), "ether"),
    });
    const receipt = await stakeTx.wait();
    if (receipt) {
      console.log("stake successful");
    }
  };

  //function to withdraw
  const withdrawFilCoin = async () => {
    console.log("Inside withdraw function");
    //converting stakeValue from eth -> wei -> integer -> string
    console.log(
      "amount going to withdraw: " +
        parseInt(
          ethers.utils.parseUnits(stakeValue.toString(), "ether")
        ).toString()
    );
    let stakeTx = await connectedContract.withdraw(
      address,
      parseInt(
        ethers.utils.parseUnits(stakeValue.toString(), "ether")
      ).toString(),
      {
        gasLimit: 3000000,
      }
    );
    const receipt = await stakeTx.wait();
    if (receipt) {
      console.log("withdraw successful");
    }
  };

  const viewFunctions = async () => {
    //duration of stake as we set from front end
    console.log(Math.round(Date.now() / 1000) + duration);

    //consoles current epoch from javascript
    console.log(Math.round(Date.now() / 1000));

    //returns current epoch time from smart contract
    let stakeTx = await connectedContract.rightNow();
    console.log("right now from sc " + parseInt(stakeTx));

    //returns stake amount of a user
    let readStake = await connectedContract.readStake();
    console.log("stake " + parseInt(readStake));

    //returns the epoch time when user stakes
    let readEpoch = await connectedContract.readEpoch();
    console.log("time of stake " + parseInt(readEpoch));

    //returns the epoch time to withdraw
    let readWithdrawEligibility =
      await connectedContract.readWithdrawEligibility();
    console.log("eligible time " + parseInt(readWithdrawEligibility));
  };

  const handleNumber = (e) => {
    let input = e.target.value;

    if (input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) setStakeValue(input);
  };

  const handleFloat = () => {
    setStakeValue(parseFloat(stakeValue) || "");
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
              value={stakeValue}
              onChange={handleNumber}
              onBlur={handleFloat}
              name="value"
              placeholder="value"
            />
          </div>
          <div>
            <button className="stake-btn" onClick={() => stakeFilCoin()}>
              Stake
            </button>
            <button className="stake-btn" onClick={() => withdrawFilCoin()}>
              withdraw
            </button>
            <button className="stake-btn" onClick={() => viewFunctions()}>
              viewEpoch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stake;
