import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

function Withdraw(props) {

    return (
        <>
            <div className="stake-main">
                <h2 className="header">Withdraw the staked amount</h2>
                <div className='balance'>
                    <div className='left'>
                        Balance
                    </div>
                    <div className='right'>
                        { props.balance ? props.balance : "-" }
                    </div>
                </div>
                <div>
                    <input
                        className="stake-entry"
                        type="text"
                        value={props.stakeValue}
                        onChange={props.handleNumber}
                        onBlur={props.handleFloat}
                        name="value"
                        placeholder="value"
                    />
                </div>
                <div>
                    {/* <button className="stake-btn" onClick={() => props.stakeFilCoin()}>
                        Stake
                    </button> */}
                    <button className="stake-btn" onClick={() => props.withdrawFilCoin()}>
                        withdraw
                    </button>
                    {/* <button className="stake-btn" onClick={() => viewFunctions()}>
              viewEpoch
            </button> */}
                </div>
            </div>
        </>
    )
}

export default Withdraw;