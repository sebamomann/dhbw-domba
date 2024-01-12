import React, { useState, useEffect } from 'react';

import {
  Page,
  Navbar,
  List,
  ListInput,
  ListItem,
  Toggle,
  BlockTitle,
  Button,
  Range,
  Block,
} from 'framework7-react';


const CryptoInfo = () => {
const [cryptoData, setCryptoData] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(10); // Countdown timer

  // Function to fetch crypto data
  const fetchData = async () => {
    const randomId = Math.floor(Math.random() * 100) + 1;
    const url = `https://api.coinlore.net/api/ticker/?id=${randomId}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.length === 0) {
        fetchData(); // Recursively fetch if the array is empty
      } else {
        setCryptoData(data[0]);
        setSecondsLeft(10); // Reset timer after successful fetch
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Function to handle button click
  const handleButtonClick = () => {
    fetchData();
  };

  // Handle the countdown and periodic data fetching
  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft(prevSecondsLeft => {
        if (prevSecondsLeft === 1) {
          fetchData();
        }
        return prevSecondsLeft > 1 ? prevSecondsLeft - 1 : 10;
      });
    }, 1000);

    fetchData(); // Initial fetch

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <Page name="form">
    <Navbar title="Crypto Info" backLink="Back"></Navbar>

    <BlockTitle>Crypto Info</BlockTitle>
    <Block strong inset>
      {cryptoData && (
        <div>
          <h2>{cryptoData.name} ({cryptoData.symbol})</h2>
          <p>Price: USD {cryptoData.price_usd}</p>
        </div>
      )}
        <Button onClick={handleButtonClick}>Fetch Data</Button>
        <Block>Next fetch in: {secondsLeft} seconds</Block>
    </Block>
    </Page>
  );
};

export default CryptoInfo;