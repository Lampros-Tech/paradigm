import "../styles/stake.scss";
import { useState, useRef, useEffect } from "react";
import { useAccount, useSigner, useContract } from "wagmi";
import { CONTRACT_ADDRESS } from "../config";
import stakeFIL_abi from "../contract/stakeFIL.json";
import { ethers } from "ethers";
import Staked from "./stake/staked.jsx";
import Withdraw from "./stake/withdraw";

function Stake() {
  //getting signer and provider
  const { address } = useAccount();
  // const provider = useProvider();
  const { data: signer } = useSigner();
  const [duration, setDuration] = useState(30);
  const [stakeValue, setStakeValue] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [balance, setBalance] = useState("");
  const stakeRef = useRef();
  const withdrawRef = useRef();

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
      fetchBalance();
      stakeRef.current = "";
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
    let withdrawTx = await connectedContract.withdraw(
      address,
      parseInt(
        ethers.utils.parseUnits(stakeValue.toString(), "ether")
      ).toString(),
      {
        gasLimit: 3000000,
      }
    );
    const receipt = await withdrawTx.wait();
    if (receipt) {
      console.log("withdraw successful");
      withdrawRef.current = "";
      fetchBalance();
    }
  };

  const viewFunctions = async () => {
    //duration of stake as we set from front end
    console.log(Math.round(Date.now() / 1000) + duration);

    //consoles current epoch from javascript
    console.log(Math.round(Date.now() / 1000));

    //returns current epoch time from smart contract
    let rightNow = await connectedContract.rightNow();
    console.log("right now from sc " + parseInt(rightNow));

    //returns stake amount of a user
    let readUserStake = await connectedContract.readUserStake();
    console.log("stake " + parseInt(readUserStake));

    //returns the epoch time when user stakes
    let readStakeTimeEpoch = await connectedContract.readStakeTimeEpoch();
    console.log("time of stake " + parseInt(readStakeTimeEpoch));

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

  const handleWNumber = (e) => {
    let input = e.target.value;

    if (input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) setStakeValue(input);
  };

  const handleWFloat = () => {
    setStakeValue(parseFloat(stakeValue) || "");
  };

  const fetchBalance = async () => {
    //returns stake amount of a user
    // console.log("In here");
    try {
      let readUserStake = await connectedContract.readUserStake();
      // console.log("stake " + parseInt(readUserStake));
      setBalance(ethers.utils.formatEther(parseInt(readUserStake).toString()));
      // console.log(balance);
    } catch (e) {
      console.log(e);
    }

  }

  useEffect(() => {
    if (activeTab === 1) fetchBalance();
  }, [activeTab])

  useEffect(() => {
    console.log(balance)
  }, [balance])

  return (
    <div className="stake-main">
      <div className="home-bg"></div>
      <div className="stake-form">
        <div className="switch">
          <div className="left" onClick={() => { setActiveTab(0) }}>
            <span className={activeTab === 0 ? "active" : "inactive"}>
              Stake
            </span>
          </div>
          <div className="right" onClick={() => { setActiveTab(1) }}>
            <span className={activeTab === 1 ? "active" : "inactive"}>
              Withdraw
            </span>
          </div>
        </div>
        {
          activeTab === 0
            ?
            <Staked stakeValue={stakeValue} handleNumber={handleNumber} stakeRef={stakeRef} handleFloat={handleFloat} stakeFilCoin={stakeFilCoin} />
            :
            <Withdraw stakeValue={stakeValue} balance={balance} withdrawRef={withdrawRef} handleNumber={handleWNumber} handleFloat={handleWFloat} withdrawFilCoin={withdrawFilCoin} />
        }
      </div>
    </div>
  );
}

export default Stake;
