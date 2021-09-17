import WalletConnectProvider from "@walletconnect/web3-provider";
//import Web3 from "web3";

const provider = new WalletConnectProvider({
  infuraId: "f2b9103e4c9c453789af2575a99076e9",
});

//const web3 = new Web3(provider);

export default function ConnectWc() {
  async function connectWC() {
    try {
      await provider.enable();
    } catch(ex) {
      console.log(ex)
    }
  };

return (
    <div className="connect">
    <button onClick={connectWC}>Connect with WalletConnect</button>
    </div>
  );
}
