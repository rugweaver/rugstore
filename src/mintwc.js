import React, { useState, useEffect } from "react";
import injected from './Connectors';
import {Web3ReactProvider} from '@web3-react/core';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';

export default function MintWC(props) {
const { active, account, library, connector, activate, deactivate } = useWeb3React();
  async function mint() {
    console.log({account});
  }
  const metaMask = {account};
  const metaMaskAccount = metaMask.account;


    return (
      <div className="mint">
      {props.acct}</div>
    );

}
