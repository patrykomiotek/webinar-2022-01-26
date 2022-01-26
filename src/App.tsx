import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import abi from './abi.json';

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
    // to z dokumentacji MetaMask!!! https://docs.metamask.io/guide/rpc-api.html#permissions
    // https://eth.wiki/json-rpc/API#eth_getbalance
    await provider.send("eth_requestAccounts", []);

    // const myAddress = await signer.getAddress();
    const myAddress = await signer.getAddress();
    console.log("my address: ", myAddress);

    setAddress(myAddress);

    // const resp = await provider.send("eth_getBalance", []);
    // console.log('resp: ', resp);
    const myBalance = await signer.getBalance();
    console.log('myBalance: ', ethers.utils.formatEther(myBalance));

    // Custom token
    const erc20 = new ethers.Contract(
      "0xC0133a3009c9EaA905BD95e901163AA4524374FD",
      abi,
      provider,
    );

    const erc20Balance = await erc20.balanceOf(myAddress);
console.log("Contract: ", ethers.utils.formatEther(erc20Balance));

    // 0x8921E6c0aF2f45C226e89766EFA1b71b5a8D16b5
    // const tx = signer.sendTransaction({
    //   to: "0x8921E6c0aF2f45C226e89766EFA1b71b5a8D16b5",
    //   value: ethers.utils.parseEther("1.0")
    // });

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
