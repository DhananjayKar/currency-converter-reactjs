const API_KEY =/*"b73708099f812bb2372b868623eb2050";*/"c2f8c21a6a2133c0010380a9f6a3e33d";

export const fetchExchangeRate = async (from, to, amount) => {
  try {
    const response = await fetch(
      `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}&access_key=${API_KEY}`
    );
    const data = await response.json();

    if (data.success && data.result !== undefined) {
      return data.result.toFixed(2);
    } else {
      console.error("Conversion failed:", data);
      return "Error";
    }
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    return "Error";
  }
};

export const fetchCurrencies = async () => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();

    const currencyList = {};

    data.forEach((country) => {
      if (country.currencies) {
        Object.entries(country.currencies).forEach(([currencyCode, currencyData]) => {
          if (!currencyList[currencyCode]) {
            currencyList[currencyCode] = {
              name: currencyData.name,
              flag: country.flags?.svg || "",
            };
          }
        });
      }
    });

    return currencyList;
  } catch (error) {
    console.error("Error fetching currencies:", error);
    return {};
  }
};

export const fetchHistoricalRates = async (from, to) => {
  try {
    const endDate = new Date().toISOString().split("T")[0]; // Today
    const startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 1); // 1 year ago
    const formattedStartDate = startDate.toISOString().split("T")[0];

    const response = await fetch(
      `https://api.frankfurter.app/${formattedStartDate}..${endDate}?from=${from}&to=${to}`
    );

    const data = await response.json();

    if (data.rates) {
      return Object.entries(data.rates).map(([date, rates]) => ({
        date,
        value: rates[to],
      }));
    } else {
      console.error("API Error:", data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching historical exchange rates:", error);
    return [];
  }
};