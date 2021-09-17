import React, { useState, useEffect } from "react";

export default function Choose(props) {
  function chooseMM(){
    props.chooseMM(true);
    props.chooseWC(false);
  }
  function chooseWC() {
    props.chooseWC(true);
    props.chooseMM(false);
  }
  return (
    <div className="connect">
    <button onClick={chooseMM}>MetaMask</button>
    <button onClick={chooseWC}>WalletConnect</button>
    <br></br>
    </div>
  );
}
