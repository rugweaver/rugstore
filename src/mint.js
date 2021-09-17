import React, { useState, useEffect } from "react";
import injected from './Connectors';
import {Web3ReactProvider} from '@web3-react/core';
import { useWeb3React } from '@web3-react/core';
import web3 from 'web3';
import rugstore from "./rugstore";
import dog from './dog';
import agld from './agld';
import pebble from './pebble';
import ash from './ash';

export default function MintMM(props) {
const { active, account, library, connector, activate, deactivate } = useWeb3React();
const [amount, setAmount] = useState();
const [amountDog, setAmountDog] = useState();
const [amountAgld, setAmountAgld] = useState();
const [amountAsh, setAmountAsh] = useState();
const [amountPebble, setAmountPebble] = useState();
const [message, setMessage] = useState();
const [messageAgld, setMessageAgld] = useState();
const [messagePebble, setMessagePebble] = useState();
const [messageAsh, setMessageAsh] = useState();
const [agldPrice, setAgldPrice] = useState();
const [dogPrice, setDog] = useState();
const [ashPrice, setAsh] = useState();
const [pebblePrice, setPebble] = useState();

useEffect(() =>{
      getPrices();
}, []);

  async function getPrices() {
    const agldPrice = await rugstore.methods.showAGLDPriceSushi().call();
    const agldEther = web3.utils.fromWei(agldPrice, 'ether');
    const dogPrice = await rugstore.methods.showDogPriceSushi().call();
    const dogEther = web3.utils.fromWei(dogPrice, 'ether');
    const pebPrice = await rugstore.methods.showPebblePrice().call();
    const pebEther = web3.utils.fromWei(pebPrice, 'ether');
    const ashPrice = await rugstore.methods.showASHPriceUNI().call();
    const ashEther = web3.utils.fromWei(ashPrice, 'ether');
    setAsh(ashEther);
    setPebble(pebEther);
    setAgldPrice(agldEther);
    setDog(dogEther);
  }
  async function mint() {
    const price = 25000000000000000;
    const account = metaMaskAccount;
    console.log(numberOfTokens);
    const msgval = numberOfTokens * price;
    console.log(msgval);
    await rugstore.methods.mintRugWithEth(numberOfTokens).send({
      from: metaMaskAccount,
      value: msgval
    })
  }
  async function mintDog() {
    const account = metaMaskAccount;
    setMessage("Approving...")
    await dog.methods.approve('0x2721B369Be9a9b1739fc107fA54727AbF083a8ec', "115792089237316195423570985008687907853269984665640564039457584007913129639935").send({from:account});
    setMessage("Success!")
    setMessage("Weaving your rug...")
    await rugstore.methods.mintRugWithDog(amountDog).send({
      from: metaMaskAccount
    })
    setMessage("Success!")
  }
  async function mintAgld() {
    const account = metaMaskAccount;
    const agldPricey = await rugstore.methods.showAGLDPriceSushi().call();
    const val = (agldPricey * amountAgld).toString();
    console.log(val);
    setMessageAgld("Approving...")
    await agld.methods.approve('0x2721B369Be9a9b1739fc107fA54727AbF083a8ec', val).send({from:account});
    setMessageAgld("Success!")
    setMessageAgld("Weaving your rug...")
    await rugstore.methods.mintRugWithAgld(amountAgld).send({
      from: metaMaskAccount
    })
    setMessage("Success!")
  }
  async function mintAsh() {
    const account = metaMaskAccount;
    setMessageAsh("Approving...")
    await ash.methods.approve('0x2721B369Be9a9b1739fc107fA54727AbF083a8ec', "115792089237316195423570985008687907853269984665640564039457584007913129639935").send({from:account});
    setMessageAsh("Success!")
    setMessageAsh("Weaving your rug...")
    await rugstore.methods.mintRugWithAsh(amountAsh).send({
      from: metaMaskAccount
    })
    setMessageAsh("Success!")
  }
  async function mintPebble() {
    const account = metaMaskAccount;
    setMessagePebble("Approving...")
    await pebble.methods.approve('0x2721B369Be9a9b1739fc107fA54727AbF083a8ec', "115792089237316195423570985008687907853269984665640564039457584007913129639935").send({from:account});
    setMessagePebble("Success!")
    setMessagePebble("Weaving your rug...")
    await rugstore.methods.mintRugWithPebble(amountPebble).send({
      from: metaMaskAccount
    })
    setMessagePebble("Success!")
  }
  const metaMask = {account};
  const metaMaskAccount = metaMask.account;
  const numberOfTokens = amount;
  const numberOfTokensDog = amountDog;
  const showEthPrice = amount * .025;


    return (
      <div className="mint">

      <div className="mintBox">
      <br></br>
      <form>
        <h4>Mint with ETH:</h4>
        <p>You will pay: {showEthPrice} ETH (plus gas)</p>
        <div>
          <label>Max 25:</label>
          <input
          value= {amount}
          onChange= {event => setAmount(event.target.value)}
          />
        </div>
        </form>
        <button onClick={mint}>Mint</button>
        </div>

        <br></br>

        <div className="mintBox">
        <form>
          <h4>Mint with $DOG:</h4>
          <p>You will pay: {amountDog * dogPrice} $DOG</p>
          <div>
            <label>Max 15:</label>
            <br></br>
            <label>Current price: {dogPrice} $DOG per rug</label>
            <br></br>
            <input
            value= {amountDog}
            onChange= {event => setAmountDog(event.target.value)}
            />
          </div>
          </form>
          <p>{message}</p>
          <button onClick={mintDog}>Mint</button>
          </div>

          <br></br>

          <div className="mintBox">
          <form>
            <h4>Mint with $AGLD:</h4>
            <p>You will pay: {amountAgld * agldPrice} $AGLD</p>
            <div>
              <label>Max 15:</label>
              <br></br>
              <label>Current price: {agldPrice} $AGLD per rug</label>
              <br></br>
              <input
              value= {amountAgld}
              onChange= {event => setAmountAgld(event.target.value)}
              />
            </div>
            </form>
            <p>{messageAgld}</p>
            <button onClick={mintAgld}>Mint</button>
            </div>

            <br></br>

            <div className="mintBox">
            <form>
              <h4>Mint with $PEBBLE:</h4>
              <p>You will pay {amountPebble * pebblePrice} $PEBBLE</p>
              <div>
                <label>Max 15:</label>
                <br></br>
                <label>Current price: {pebblePrice} $PEBBLE per rug</label>
                <br></br>
                <input
                value= {amountPebble}
                onChange= {event => setAmountPebble(event.target.value)}
                />
              </div>
              </form>
              <p>{messagePebble}</p>
              <button onClick={mintPebble}>Mint</button>
              </div>

              <br></br>

              <div className="mintBox">
              <form>
                <h4>Mint with $ASH:</h4>
                <p>You will pay {amountAsh * ashPrice} $ASH</p>
                <div>
                  <label>Max 15:</label>
                  <br></br>
                  <label>Current price: {ashPrice} $ASH per rug</label>
                  <br></br>
                  <input
                  value= {amountAsh}
                  onChange= {event => setAmountAsh(event.target.value)}
                  />
                </div>
                </form>
                <p>{messageAsh}</p>
                <button onClick={mintAsh}>Mint</button>
                </div>


        </div>
    );

}
