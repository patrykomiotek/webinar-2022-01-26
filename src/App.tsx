import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';

function App() {

  const [address, setAddress] = useState<string>("");

  const loadData = async () => {
    const provider = new ethers.providers.Web3Provider(
      window.ethereum
    );
    // const provider = new ethers.providers.JsonRpcProvider();

    const signer = provider.getSigner();

    const blockNumber = await provider.getBlockNumber()
    console.log('blockNumber: ', blockNumber);

    // Get the balance of an account (by address or ENS name, if supported by network)
    const balance = await provider.getBalance("0x68fC90731D45b2513b85f500584C486F3Ed0607d")
    console.log("balance: ", balance);
    // // { BigNumber: "2337132817842795605" }

    // // Often you need to format the output to something more user-friendly,
    // // such as in ether (instead of wei)
    console.log(ethers.utils.formatEther(balance))
    // // '2.337132817842795605'

    // // If a user enters a string in an input field, you may need
    // // to convert it from ether (as a string) to wei (as a BigNumber)
    console.log(ethers.utils.parseEther("1.0"));
    // // { BigNumber: "1000000000000000000" }

    // console.log(provider.getBalance(signer.getAddress()));

    // super istotne aby odczytać z metamask adresy
    await provider.send("eth_requestAccounts", []);

    const myAddress = await signer.getAddress();
    console.log("my address: ", myAddress);

    setAddress(myAddress);
  }

  useEffect(() => {
    loadData();
  }, []);
  return (
    <div className="App">
      <h3>Address: {address}</h3>
    </div>
  );
}

export default App;
