import React, { useState, useEffect } from 'react';
import DecentralizedInstagram from './contracts/DecentralizedInstagram.json';
import getWeb3 from './getWeb3';
import { HomeWrapper } from './pages/home/Home';

import './App.css';

export default function App() {
  const [dependencies, setDependencies] = useState({ web3: null, account: null, decentralizedInstagram: null, loaded: false });

  /**
   * @description Use effect to load the dependencies needed by the routes to interact with the blockchain
   */
  useEffect(() => {
    (async function() {
      const web3 = await getWeb3();

      
      const networkId = await web3.eth.net.getId();
      const networkData = DecentralizedInstagram.networks[networkId];
      const decentralizedInstagram = await new web3.eth.Contract(DecentralizedInstagram.abi, networkData.address);
      console.warn('***', decentralizedInstagram);

      const [account] = await web3.eth.getAccounts();

      setDependencies(previousState => ({ ...previousState, web3, account, loaded: true, decentralizedInstagram }));
    })();
  }, []);

  /**
   * @description Abstraction for connecting user to application;
   * this is shown to the user if they are not initially connected
   * on load
   */
  async function connect() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const { web3 } = dependencies;
    const [account] = await web3.eth.getAccounts();
    setDependencies(previousState => ({...previousState, account}));
  }

  return (
    dependencies.loaded ?
      dependencies.account ?
        <HomeWrapper account={dependencies.account} decentralizedInstagram={dependencies.decentralizedInstagram}/> :
        <button onClick={connect} className="app-button app-button-primary">Connect</button>   
      :
      <div>loading....</div>
  )
}