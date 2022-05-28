import { requestAccount, getContract } from './utils/common';
import { contractAddress } from './config';
import brewDao from './contracts/ETHBrewDao.json';
import React, { useEffect, useState } from "react";
import { ethers } from 'ethers';

function App() {
  let contract = getContract(contractAddress, brewDao);
  const [supply, setSupply] = useState();
  const [price, setPrice] = useState();
  const [amountToBuy, setAmountToBuy] = useState();

  const getSupply = async () => {
    await requestAccount();
    const supply = await contract.totalSupply();
    const price = await contract.tokenPrice();
    setSupply(supply.toNumber());
    setPrice(ethers.utils.formatEther(price));
  };

  const buyTokens = async () => {
    await contract.buyOnInitialOffering({ value: ethers.utils.parseEther(amountToBuy.toString()) });
  };

  useEffect(() => {
    getSupply();
  }, []);

  return (
    <div className="App">
      <p>Token price: {price} ETH</p>
      <p>Token supply: {supply}</p>
      <p><input type="number" onChange={(e) => { setAmountToBuy(e.target.value) }} /></p>
      <button onClick={buyTokens}>Buy Token</button>
    </div>
  );
}

export default App;
