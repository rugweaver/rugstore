import React, { useState, useEffect } from "react";
import injected from './Connectors';
import walletconnect from './Connectors';
import {Web3ReactProvider} from '@web3-react/core';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: "f2b9103e4c9c453789af2575a99076e9" // required
    }
  }
};
const web3Modal = new Web3Modal({
  network: "mainnet", // optional
  cacheProvider: false, // optional
  providerOptions // required
});
export default function Wallet(props) {
const web3r = useWeb3React();
const { active, account, library, connector, activate, deactivate, context } = useWeb3React();
  async function getWallet(){
    await activate(injected);
    return account;
  }
  async function connect() {
      getWallet().then(props.setMetaMaskActive(true));
  }
  async function connectWc() {
    const provider = await web3Modal.connect();
    const web3 = new Web3(provider);
    props.setWcActive(true);
    const accounts = await web3.eth.getAccounts();
    props.setAcct(accounts[0]);
  }
  const metaMask = {account};
  const metaMaskAccount = metaMask.account;
  return (
    <div className="connect">
    <button onClick={connect}>Connect with MetaMask</button>
    <button onClick={connectWc}>Connect with WC</button>
    <br></br>
    </div>
  );
}
