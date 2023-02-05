import React from "react";

const Staked = React.forwardRef((props, stakeRef) => {
    return (
        <>
            <div className="stake-main">
                <h2 className="header">Stake your FIL & earn interest over it</h2>
                <div>
                    <input
                        className="stake-entry"
                        type="text"
                        value={props.stakeValue}
                        onChange={props.handleNumber}
                        onBlur={props.handleFloat}
                        name="value"
                        placeholder="value"
                        ref={stakeRef}
                    />
                </div>
                <div>
                    <button className="stake-btn" onClick={() => props.stakeFilCoin()}>
                        Stake
                    </button>
                    {/* <button className="stake-btn" onClick={() => withdrawFilCoin()}>
                        withdraw
                    </button> */}
                    {/* <button className="stake-btn" onClick={() => viewFunctions()}>
                        viewEpoch
                    </button> */}
                </div>
            </div>
        </>
    )
})

export default Staked;