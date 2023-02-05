import { useState, useEffect } from 'react'
import axios from 'axios';
import "../styles/loan.scss";

function Loan() {

    const [dataFetched, setFetchedData] = useState({
        initialPledge: null,
        lockedRewards: null,
        preCommitDeposit: null,
        oneYear: null,
        thirtyDays: null,
        sevenDays: null,
        twentyFourHours: null,
    });

    const [spname, setSpName] = useState("");
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
    const methodOne = () => {
        // const spname = "t01130";
        var data = `{"id": 1,"jsonrpc": "2.0","params": [    "${spname}"],"method": "filscan.FilscanActorById"\n}`;
        var config = {
            method: "post",
            url: "https://hyperspace.filscan.io:8891/rpc/v1",
            headers: {
                "Content-Type": "text/plain",
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
                // console.log(response.data);
                console.log("total balance :" + response.data.result.basic.balance);
                console.log(
                    "Committed / total storage:" +
                    bytesToSize(response.data.result.extra.quality_adjust_power)
                );
                //-------------------------------------------------------------------------locked rewards
                console.log(
                    "Locked rewards: " + response.data.result.extra.locked_balance
                );
                setFetchedData(dataFetched => ({
                    ...dataFetched,
                    lockedRewards: response.data.result.extra.locked_balance,
                }));
                //--------------------------------------------------------------------------Initial pledge
                console.log(
                    "Initial Pledge: " + response.data.result.extra.init_pledge
                );
                setFetchedData(dataFetched => ({
                    ...dataFetched,
                    initialPledge: response.data.result.extra.init_pledge,
                }));
                console.log("power:" + response.data.result.extra.power);
                //-----------------------------------------------------------------------pre commit rewards
                console.log(
                    "pre commit deposits:" + response.data.result.extra.pre_deposits
                );
                setFetchedData(dataFetched => ({
                    ...dataFetched,
                    preCommitDeposit: response.data.result.extra.pre_deposits,
                }));
                console.log("Rewards:" + response.data.result.basic.rewards);
            })
            .catch(function (error) {
                console.log(error);
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
            url: "https://hyperspace.filscan.io:8891/rpc/v1",
            headers: {
                "Content-Type": "text/plain",
            },
            data: dataOneYear,
        };
        axios(config)
            .then(function (response) {
                //------------------------------------------------------------------------one year data
                console.log(
                    "1 year Block Rewards : " + response.data.result.blocks_rewards
                );
                setFetchedData(dataFetched => ({
                    ...dataFetched,
                    oneYear: response.data.result.blocks_rewards,
                }));
            })
            .catch(function (error) {
                console.log(error);
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
            url: "https://hyperspace.filscan.io:8891/rpc/v1",
            headers: {
                "Content-Type": "text/plain",
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
                //------------------------------------------------------------------------thirty days data
                console.log(
                    " 30 days Block Rewards : " + response.data.result.blocks_rewards
                );
                setFetchedData(dataFetched => ({
                    ...dataFetched,
                    thirtyDays: response.data.result.blocks_rewards,
                }));
            })
            .catch(function (error) {
                console.log(error);
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
            url: "https://hyperspace.filscan.io:8891/rpc/v1",
            headers: {
                "Content-Type": "text/plain",
            },
            data: data,
        };
        axios(config)
            .then(function (response) {
                //------------------------------------------------------------------------seven days data
                console.log(
                    " 7 days Block Rewards : " + response.data.result.blocks_rewards
                );
                setFetchedData(dataFetched => ({
                    ...dataFetched,
                    sevenDays: response.data.result.blocks_rewards,
                }));
            })
            .catch(function (error) {
                console.log(error);
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
            url: "https://hyperspace.filscan.io:8891/rpc/v1",
            headers: {
                "Content-Type": "text/plain",
            },
            data: data,
        };
        axios(config)
            .then(function (response) {
                //------------------------------------------------------------------------24 hours data
                console.log(
                    " 24 hours Block Rewards : " + response.data.result.blocks_rewards
                );
                setFetchedData(dataFetched => ({
                    ...dataFetched,
                    twentyFourHours: response.data.result.blocks_rewards,
                }));
            })
            .catch(function (error) {
                console.log(error);
            });

        //filrep API
        var minerID = "f01662887";
        var config = {
            method: "get",
            maxBodyLength: Infinity,
            url: `https://api.filrep.io/api/v1/miners?search=${minerID}`,
            headers: {},
        };
        axios(config)
            .then(function (response) {
                // console.log(response.data);
                console.log("Reputation score : " + response.data.miners[0].score);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const validateNameAndApprove = () => {
        // console.log(e);
        if (!spname) {
            return
        }
        methodOne();
    }

    // useEffect(() => {
    //     methodOne();
    // }, [])

    // useEffect(() => {
    //     console.log(dataFetched);
    // }, [dataFetched])

    return (
        <div className='loan-main'>
            <div className="home-bg"></div>
            <div className='loan-form'>
                <div className='search-bar'>
                    <input
                        type="text"
                        placeholder='Enter the SP address'
                        className='search-box'
                        onChange={(e) => { setSpName(e.target.value) }}
                    />
                    <button className='search-btn' onClick={() => { validateNameAndApprove() }}>Check Eligibility</button>
                </div>
                <div className='display'>

                </div>
            </div>
        </div>
    )
}

export default Loan