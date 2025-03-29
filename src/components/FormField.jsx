import React from "react";
import '../App.css';

const FormField = ({ currency, amount, onCurrencyChange, onAmountChange, currencies = {}, readOnly }) => {
  const selectedCurrency = currencies[currency];

  const isMobile = window.innerWidth < 576;
  const screen = window.innerWidth >= 768;
  
  const containerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
    flexDirection: isMobile ? "column" : "row",
  };

  return (
    <div  className="d-flex align-items-center justify-content-evenly gap-1 flex-row flex-md-column input-field-group" style={{width:"100%", padding: "20px 12px"}}
    >
      <input
        type="number"
        value={amount}
        onChange={(e) => onAmountChange(e.target.value)}
        readOnly={readOnly}
        style={{
          padding: "5px 10px",
          fontSize: "16px",
          width: screen? "80%":"30%",
          height: screen? "auto":"40px"
        }}
        className="rounded-pill transparent-class"
      />

      <div style={{ position: "relative", display: "flex", flex: "1", width: "80%", marginTop: screen? "12px":"0px" }}>
  {selectedCurrency?.flag && (
    <img
      src={selectedCurrency.flag}
      alt={selectedCurrency.name}
      width="25"
      height="20"
      style={{
        position: "absolute",
        left: "10px",
        top: "50%",
        transform: "translateY(-50%)",
        borderRadius: "3px",
        pointerEvents: "none",
      }}
    />
  )}

  <select
    className="form-select rounded-pill transparent-class"
    value={currency}
    onChange={(e) => onCurrencyChange(e.target.value)}
    style={{
      paddingLeft: selectedCurrency?.flag ? "45px" : "10px",
      fontSize: "16px",
      height: "35px",
      border: "1px solid #000",
      borderRadius: "5px",
      appearance: "none",
      cursor: "pointer",
      width: "80%",
      flex: "1",
    }}
  >
    {Object.entries(currencies).length > 0 ? (
      Object.entries(currencies).map(([code, { name }]) => (
        <option key={code} value={code}>
          {code} - {name}
        </option>
      ))
    ) : (
      <option>Loading...</option>
    )}
  </select>
</div>
    </div>
  );
};

export default FormField;