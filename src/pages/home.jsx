import React from "react";
import "../styles/home.scss";

function Home() {
  return (
    <div className="home">
      <div className="home-bg">
      </div>
      <div className="tag-holder">
        <div className="tag">
          <div className="left">
            <div className="content">
              <div className="content-main">
                Scale up your storage infrastructure with <span className="highlight">Paradigm</span>!
              </div>
              <div className="content-btn">
                <button className="btn">Check Score</button>
              </div>
            </div>
          </div>
          <div className="right">
            <img src="/images/favicon.png" alt="icon" className="tag-img" />
          </div>
        </div>
      </div>
      <div className="sp-card">
        <div className="title">
          Loans to Storage Providers
        </div>
        <div className="tag">
          Your reputation score will light your path to upscaling.
        </div>
        <div className="benefits">
          <ul className="list">
            <li className="data">
              Filecoin values storing information. This platform aims to empower the storage providers to upgrade their infrastructure for better functionality in the day and age of data transmission and transfer.
            </li>
            <li className="data">
              Storage Providers can connect to our wallet and avail themselves a credit score. It also informs how much FIL they can avail as a loan.
            </li>
            <li className="data">
              However, before processing the loan, the storage provider must provide collateral. Failing to repay the amount, the ownership of the collateral shall be transferred to the organization.
            </li>
          </ul>
        </div>
      </div>

      <div className="stake-card">
        <div className="title">
          Staking and Earning
        </div>
        <div className="tag">
          Let your FIL earn for you when you are away.
        </div>
        <div className="benefits">
          <ul className="list">
            <li className="data">
              Staking is a procedure to keep your coins in a safe space that rewards you over time.
            </li>
            <li className="data">
              So, stake your FIL tokens on our platform to earn interest. You can stake them for 3 months, 6 months or 12 months.
            </li>
            <li className="data">
              Higher the duration of stake, higher your rewards.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
