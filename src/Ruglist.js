import React, { useState, useEffect } from "react";
import firebase from "./firebase";
import rugstore from "./rugstore";
import MintMM from "./mint";
require('firebase/database');

export default function RugList(props) {
  const wallet = props.metaMaskAccount;
  const [urlState, setURLs] = useState();
  const [supplyExists, setSupply] = useState(0);
  const [existsList, setExists] = useState();
  const [loading, setLoading] = useState(false);
  const [lastTwenty, setLast] = useState();
  const [over20, check20] = useState(false);
  const [showMyRugs, setMyRugs] = useState(false);
  const [showMy, setMy] = useState(false);
  useEffect(() =>{
        b().then((supply) => rugPromise(supply));
        a().then((rugsOwned) => getMyRugs(rugsOwned));
  }, []);
  function showMine() {
    if(!showMy) {
      setMy(true);
    }
  }
  async function b() {
      const supply = await rugstore.methods.totalSupply().call({
        from: 0x0
      });
      setSupply(supply);
      if (supply >= 20) {
        check20(true);
      }
      console.log(check20);
      console.log(supply);
      return supply;
  };

  async function a() {
    const rugsOwned = await rugstore.methods.tokensOfOwner(wallet).call({
      from: 0x0
    })
    //console.log(rugsOwned);
    return rugsOwned;
  };

  async function rugPromise(supply) {
    const promise = new Promise(async function (resolve, reject){
      const answer = await firebase.database().ref("rugs");
      if(answer != null){
        answer.on('value', (snapshot) => {
          const rugs = snapshot.val();
          const rugList = [];
          for (let tokenId in rugs) {
            rugList.push(rugs[tokenId]);
          }
          const image = [];
          for (let tokenId in rugs) {
            image.push(
              "https://gateway.pinata.cloud/ipfs/" + rugs[tokenId].image);
          };
          //console.log(image);
          const _supply = supply;
          console.log(_supply);
          const urls = image.slice(0 , _supply);
          console.log(urls);
          const last20 = urls.slice(Math.max(urls.length - 20, 0));
          //console.log(last20);
          setLast(last20);
          setURLs(urls);
          return image;
      });
        resolve(console.log("cool"))
      } else {
        reject("err")
      }
    })
    return promise;
  }

  async function getMyRugs(rugsOwned) {
    const promise = new Promise(async function (resolve, reject){
      const answer = await firebase.database().ref("rugs");
      if(answer != null){
        answer.on('value', (snapshot) => {
          const rugs = snapshot.val();
          const rugList = [];
          const owned = rugsOwned.map(Number);
          //console.log(owned);
          for (let tokenId in rugs) {
            rugList.push(rugs[tokenId]);
          }
          //console.log(rugList);
          const image = [];
          for (let tokenId in rugs) {
            image.push(
              "https://gateway.pinata.cloud/ipfs/" + rugs[tokenId].image);
          };
          //console.log(image);
          const myRugs = image.filter(function(el, index) {
            return owned.indexOf(index) > -1;
          });
          //console.log(myRugs);
          setMyRugs(myRugs);
          return myRugs;
      });
        resolve(console.log("ok"))
      } else {
        reject("err")
      }
    })
    return promise;
  }


if(showMy) {
  return (
    <div className="images">
    <MintMM />
    <br></br>
    <h1>Your rugs: </h1>
    <br></br>

    { showMyRugs && showMyRugs.map(img => (
      <img src={img} width="100"/>
    )) }
    </div>
  );
} else if(over20) {
  return (
    <div className="images">
    <MintMM />
    <br></br>
    <button onClick={showMine}>Show my rugs</button>
    <br></br>
    <h1>Last 20 rugs minted: </h1>
    <br></br>

    { lastTwenty && lastTwenty.map(img => (
      <img src={img} width="100"/>
    )) }
    </div>
  );
} else {
    return (
      <div className="images">
      <MintMM />
      <br></br>
      <button onClick={showMine}>Show my rugs</button>
      <br></br>
      <h1>Last {supplyExists} rugs minted: </h1>
      <br></br>

      { urlState && urlState.map(img => (
        <img src={img} width="100"/>
      )) }
      </div>
    );
}






}
