import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import firebase from "./firebase";
import RugList from './Ruglist'
import Choose from './ChooseWallet'
import Wallet from './Wallet'
import MetaMask from './MetaMask'
import WalletC from './WalletC'
import MintMM from './mint'
import MintWC from './mintwc'
import {Web3ReactProvider} from '@web3-react/core';
import Web3 from 'web3';

require('firebase/database');

function getLibrary(provider) {
  return new Web3(provider)
}
export const web3 = getLibrary();
console.log(web3);

function Main({Component, pageProps}) {

  const [urls, setURLs] = useState();
  const [val, setVal] = useState('');
  const [acct, setAcct] = useState('');
  const [mBool, chooseMM] = useState(false);
  const [wBool, chooseWC] = useState(false);
  useEffect(() =>{

  }, []);

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
    <div className="App">
    <img src="images/closedblack.svg" width="400"></img>
    <Choose chooseMM={chooseMM} chooseWC={chooseWC}/>
    {mBool ? <MetaMask/> : <WalletC />}
    <br></br>

    </div>
    </Web3ReactProvider>
  );
}
export default Main;
