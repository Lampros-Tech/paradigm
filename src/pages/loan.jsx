import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/loan.scss";

function Loan() {
  // useState that stores apiFetched Data
  const [dataFetched, setFetchedData] = useState({
    initialPledge: null,
    lockedRewards: null,
    preCommitDeposit: null,
    oneYear: null,
    thirtyDays: null,
    sevenDays: null,
    twentyFourHours: null,
    filRepScore: null,
    counter: 0,
  });

  // useState for final calculated score
  const [calculatedScore, setCalculatedScore] = useState({
    creditScore: null,
    filAvailability: null,
  });

  const [spname, setSpName] = useState("");
  const [loading, setLoading] = useState(false);
  // const [lockedRewards, setLockedRewards] = useState();
  function bytesToSize(bytes) {
    const sizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"];
    if (bytes === 0) return "n/a";
    const i = Math.min(
      Math.floor(Math.log(bytes) / Math.log(1024)),
      sizes.length - 1
    );
    if (i === 0) return `${bytes} ${sizes[i]}`;
    return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
  }

  const getData = () => {
    // const spname = "t01130";
    const test = new Promise((resolve, reject) => {
      //console.log(spname);
      setLoading(true);
      var data = `{
        "id": 1,
        "jsonrpc": "2.0",
        "params": ["${spname}"],"method": "filscan.FilscanActorById"\n}`;
      var config = {
        method: "post",
        url: "https://api.filscan.io:8700/rpc/v1",
        headers: {
          "Content-Type": "text/plain",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          // //console.log(response.data);
          // //console.log("total balance :" + response.data.result.basic.balance);
          //console.log(
          //   "Committed / total storage:" +
          //   bytesToSize(response.data.result.extra.quality_adjust_power)
          // );
          //-------------------------------------------------------------------------locked rewards
          //console.log(
          //   "Locked rewards: " + response.data.result.extra.locked_balance
          // );
          // const typeOfData = response.data.result.extra.locked_balance;
          // //console.log(typeof typeOfData);
          // //console.log(Number(typeOfData));
          // const numberTypeOfData = Number(typeOfData);
          // //console.log(typeof numberTypeOfData);
          // console.log(response.data.result)
          setFetchedData((dataFetched) => ({
            ...dataFetched,
            lockedRewards: Number(response.data.result.extra.locked_balance),
          }));
          //--------------------------------------------------------------------------Initial pledge
          //console.log(
          //   "Initial Pledge: " + response.data.result.extra.init_pledge
          // );
          setFetchedData((dataFetched) => ({
            ...dataFetched,
            initialPledge: Number(response.data.result.extra.init_pledge),
          }));

          //console.log("power:" + response.data.result.extra.power);
          //-----------------------------------------------------------------------pre commit rewards
          //console.log(
          //   "pre commit deposits:" + response.data.result.extra.pre_deposits
          // );
          setFetchedData((dataFetched) => ({
            ...dataFetched,
            preCommitDeposit: Number(response.data.result.extra.pre_deposits),
          }));

          setFetchedData((dataFetched) => ({
            ...dataFetched,
            counter: dataFetched.counter + 1,
          }));
          //console.log("Rewards:" + response.data.result.basic.rewards);
        })
        .catch(function (error) {
          //console.log(error);
        });

      ////block reward api 1 year

      var dataOneYear = `{
            "id": 1,
            "jsonrpc": "2.0",
            "params": [["${spname}"],"1y",1],
            "method": "filscan.FilscanStatisticalIndicatorsUnite"
        }`;

      var config = {
        method: "post",
        url: "https://api.filscan.io:8700/rpc/v1",
        headers: {
          "Content-Type": "text/plain",
        },
        data: dataOneYear,
      };
      axios(config)
        .then(function (response) {
          //------------------------------------------------------------------------one year data
          //console.log(
          //   "1 year Block Rewards : " + response.data.result.blocks_rewards
          // );
          setFetchedData((dataFetched) => ({
            ...dataFetched,
            oneYear: Number(response.data.result.blocks_rewards),
          }));
          setFetchedData((dataFetched) => ({
            ...dataFetched,
            counter: dataFetched.counter + 1,
          }));
        })
        .catch(function (error) {
          //console.log(error);
        });

      ///block rewards 30 days

      var data = `{
            "id": 1,
            "jsonrpc": "2.0",
            "params": [["${spname}"],"0.5y",1],
            "method": "filscan.FilscanStatisticalIndicatorsUnite"
        }`;

      var config = {
        method: "post",
        url: "https://api.filscan.io:8700/rpc/v1",
        headers: {
          "Content-Type": "text/plain",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          //------------------------------------------------------------------------thirty days data
          //console.log(
          //   " 30 days Block Rewards : " + response.data.result.blocks_rewards
          // );
          setFetchedData((dataFetched) => ({
            ...dataFetched,
            thirtyDays: Number(response.data.result.blocks_rewards),
          }));
          setFetchedData((dataFetched) => ({
            ...dataFetched,
            counter: dataFetched.counter + 1,
          }));
        })
        .catch(function (error) {
          //console.log(error);
        });

      //sevenDays data

      var data = `{
            "id": 1,
            "jsonrpc": "2.0",
            "params": [["${spname}"],"1w",1],
            "method": "filscan.FilscanStatisticalIndicatorsUnite"
        }`;

      var config = {
        method: "post",
        url: "https://api.filscan.io:8700/rpc/v1",
        headers: {
          "Content-Type": "text/plain",
        },
        data: data,
      };
      axios(config)
        .then(function (response) {
          //------------------------------------------------------------------------seven days data
          //console.log(
          //   " 7 days Block Rewards : " + response.data.result.blocks_rewards
          // );
          setFetchedData((dataFetched) => ({
            ...dataFetched,
            sevenDays: Number(response.data.result.blocks_rewards),
          }));
          setFetchedData((dataFetched) => ({
            ...dataFetched,
            counter: dataFetched.counter + 1,
          }));
        })
        .catch(function (error) {
          //console.log(error);
        });

      //24 hours data

      var data = `{
            "id": 1,
            "jsonrpc": "2.0",
            "params": [["${spname}"],"24h",1],
            "method": "filscan.FilscanStatisticalIndicatorsUnite"
        }`;

      var config = {
        method: "post",
        url: "https://api.filscan.io:8700/rpc/v1",
        headers: {
          "Content-Type": "text/plain",
        },
        data: data,
      };
      axios(config)
        .then(function (response) {
          //------------------------------------------------------------------------24 hours data
          //console.log(
          //   " 24 hours Block Rewards : " + response.data.result.blocks_rewards
          // );
          setFetchedData((dataFetched) => ({
            ...dataFetched,
            twentyFourHours: Number(response.data.result.blocks_rewards),
          }));
          setFetchedData((dataFetched) => ({
            ...dataFetched,
            counter: dataFetched.counter + 1,
          }));
        })
        .catch(function (error) {
          //console.log(error);
        });

      //filrep API
      // var spname = "f01662887";
      var config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://api.filrep.io/api/v1/miners?search=${spname}`,
        headers: {},
      };
      axios(config)
        .then(function (response) {
          // //console.log(response.data);
          //console.log("Reputation score : " + response.data.miners[0].score);
          // console.log(response.data);
          setFetchedData((dataFetched) => ({
            ...dataFetched,
            filRepScore: Number(response.data.miners[0].score),
          }));
          setFetchedData((dataFetched) => ({
            ...dataFetched,
            counter: dataFetched.counter + 1,
          }));
        })
        .catch(function (error) {
          //console.log(error);
        });
    });

    test.then(() => {
      calculateData();
      setFetchedData((dataFetched) => ({
        ...dataFetched,
        counter: 0,
      }));
      setLoading(false);
    });
  };

  const calculateData = () => {
    let maxCap = 57142; //max cap for 1Pib
    //--------------------------------- 1. staked amount + Initial pledge (stored in scoreCollateral) (out of 30)
    let spCollateral = dataFetched?.initialPledge + dataFetched?.lockedRewards;
    //console.log(spCollateral);
    let scoreCollateral;
    if (spCollateral > maxCap) {
      scoreCollateral = 30;
    } else {
      const diffValueCollateral =
        (Math.abs(maxCap - spCollateral) / maxCap) * 2;
      const answer = 2 - diffValueCollateral;
      //console.log(answer);
      scoreCollateral = (30 * answer) / 1.5;
      if (scoreCollateral > 30) {
        scoreCollateral = 30;
      }
    }
    //console.log("1. Collateral score out of 30 " + scoreCollateral);

    //---------------------------------- 2. previous history / monthly average (stored in scoreHistory) (x/10) (out of 30)
    const avg =
      (dataFetched?.twentyFourHours * 30 +
        dataFetched?.sevenDays * (30 / 7) +
        dataFetched?.thirtyDays +
        dataFetched?.oneYear / 12) /
      4;
    //console.log("averageis" + avg);

    const xByTen = maxCap / 10;

    const diffValue = (Math.abs(xByTen - avg) / xByTen) * 30;
    let scoreHistory = 30 - diffValue;
    if (avg >= xByTen) {
      scoreHistory = 30;
    }
    //console.log("2. previous history score out of 30: " + scoreHistory);

    //---------------------------------------3. reputation score percentage (out of 40) (stored in scoreFilRep)
    const diffValueReputation =
      (Math.abs(100 - dataFetched?.filRepScore) / 100) * 40;
    let scoreFilRep = 40 - diffValueReputation;

    //console.log("3. Filrep score out of 40: " + scoreFilRep);

    const finalScore = scoreCollateral + scoreHistory + scoreHistory;
    //console.log("Final credit score: " + finalScore);

    setCalculatedScore((calculatedScore) => ({
      ...calculatedScore,
      creditScore: finalScore,
    }));

    //calculating filAvailablity from credit score
    const filEligible = (maxCap * finalScore) / 100;
    //console.log(
    //   "FIL amount eligible to borrow: " + filEligible + " / " + maxCap
    // );

    setCalculatedScore((calculatedScore) => ({
      ...calculatedScore,
      filAvailability: filEligible,
    }));
  };

  const validateNameAndApprove = () => {
    // //console.log(e);
    if (!spname) {
      return;
    }
    getData();
    // calculateData();
  };

  useEffect(() => {
    //console.log(dataFetched.counter);
    if (dataFetched.counter > 5) {
      //console.log("Fetched all data");
      calculateData();
      setFetchedData((dataFetched) => ({
        ...dataFetched,
        counter: 0,
      }));
      setLoading(false);
    }
  }, [dataFetched.counter]);

  useEffect(() => {
    // //console.log(dataFetched);
    // if (
    //   dataFetched.initialPledge &&
    //   dataFetched.lockedRewards &&
    //   dataFetched.preCommitDeposit &&
    //   dataFetched.oneYear &&
    //   dataFetched.thirtyDays &&
    //   dataFetched.sevenDays &&
    //   dataFetched.twentyFourHours &&
    //   dataFetched.filRepScore
    // ) {
    //   calculateData();
    // }
    if (dataFetched.filRepScore) {
      //console.log("------- got data -------");
    }
  }, [dataFetched.filRepScore]);

  return (
    <div className="loan-main">
      <div className="home-bg"></div>
      <div className="loan-form">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter the SP address"
            className="search-box"
            onChange={(e) => {
              setSpName(e.target.value);
            }}
          />
          <button
            className="search-btn"
            onClick={() => {
              validateNameAndApprove();
            }}
          >
            {loading ? <div>loading...</div> : <div>Check Eligibility</div>}
          </button>
          <button
            className="search-btn"
            onClick={() => {
              calculateData();
            }}
            id=""
            hidden={true}
          >
            Calculate score
          </button>
        </div>
        <div className="display">
          {calculatedScore ? (
            <>
              <div className="loading-screen">
                {calculatedScore ? (
                  <div>Credit score: {calculatedScore.creditScore}</div>
                ) : null}
                {calculatedScore ? (
                  <div>
                    FIL Available to borrow: {calculatedScore.filAvailability}
                  </div>
                ) : null}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Loan;
