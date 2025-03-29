import React, { useState, useEffect } from "react";
import { Tooltip } from "bootstrap";
import FormField from "./components/FormField";
import { fetchExchangeRate, fetchCurrencies } from "./components/api.js";
import Graph from "./components/Graph";
import './index.css';
import './App.css';
import rightToLeft from "./assets/horizontal.png";
import topToBottom from "./assets/vertical.png";

const App = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCurrencies = async () => {
      const data = await fetchCurrencies();
      setCurrencies(data);
    };
    loadCurrencies();
  }, []);

  useEffect(() => {
    if (!amount || !fromCurrency || !toCurrency) return;

    setLoading(true);
    setConvertedAmount("Converting...");

    const loadExchangeRate = async () => {
      const result = await fetchExchangeRate(fromCurrency, toCurrency, amount);
      setConvertedAmount(result);
      setLoading(false);
    };

    loadExchangeRate();
  }, [fromCurrency, toCurrency, amount]);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };
  
  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach(tooltip => {
      new Tooltip(tooltip, {delay: {show: 0, hide: 1000}
      });
    });
  }, []);
  
  const isMobile = window.innerWidth < 576;

  return (
    <div className="d-flex justify-content-center align-items-center" style={{minHeight:"100vh" }}>
    <div className="container main-div d-flex flex-column align-items-center justify-items-center mx-auto px-3" style={{maxWidth:"900px", minHeight: isMobile? "100vh": "auto"}}>
      <h1 className="mb-5 fw-bolder">Currency Converter</h1>
      <div className="d-flex flex-column flex-md-row align-items-center p-1" style={{width: "100%"}}>
      <FormField
        currency={fromCurrency}
        amount={amount}
        onCurrencyChange={setFromCurrency}
        onAmountChange={setAmount}
        currencies={currencies}
      />
      <button type="button" data-bs-toggle="tooltip" data-bs-placement="top" title="Swap" className="btn btn-link border-0 p-0 m-1" onClick={swapCurrencies}>
        <img src={rightToLeft} alt="Swap" width="40px" className="d-none d-md-block" />
        <img src={topToBottom} alt="Swap" width="35px" className="d-inline-block d-md-none" />
      </button>
      <FormField
        currency={toCurrency}
        amount={loading ? "Converting..." : convertedAmount}
        onCurrencyChange={setToCurrency}
        onAmountChange={() => {}}
        currencies={currencies}
        readOnly={true}
      />
      </div>
      <div style={{width: "100%"}}>
        <form action="#">
          <div className="d-flex justify-content-center align-items-center m-2">
         <textarea className="transparent-class textarea" style={{width: "90%"}} value={`1 ${fromCurrency} = ${convertedAmount} ${toCurrency}`} readOnly />
         </div>
        </form>
      </div>
      <Graph fromCurrency={fromCurrency} toCurrency={toCurrency} />
    </div>
    </div>
  );
};

export default App;