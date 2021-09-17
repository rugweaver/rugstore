import React, { useState, useEffect } from "react";
import injected from './Connectors';
import walletconnect from './Connectors';
import {Web3ReactProvider} from '@web3-react/core';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';
import RugList from './Ruglist';

export default function MetaMask(props) {
const web3r = useWeb3React();
const { active, account, library, connector, activate, deactivate, context } = useWeb3React();
  async function getWallet(){
    await activate(injected);
    return account;
  }
  async function connect() {
      getWallet();
  }
  const metaMask = {account};
  const metaMaskAccount = metaMask.account;
  return (
    <div className="connect">
    <button onClick={connect}>Connect with MetaMask</button>
    <br></br>
    {active? <span>Connected with account {metaMaskAccount}</span> : ""}
    {active? <RugList metaMaskAccount={metaMaskAccount} /> : <span>Please connect</span>}
    </div>
  );
}
