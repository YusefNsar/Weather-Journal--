/* Global Variables */
const apiKey = "85332a7250d0c426cf11327d2924fc43";
const baseURL = "http://api.openweathermap.org/data/2.5/weather?";
var gTemp;

// Elements
const generateButton = document.getElementById("generate");
const tempText = document.getElementById("temp");
const dateText = document.getElementById("date");
const contentText = document.getElementById("content");
const zipCodeEl = document.getElementById("zip");
const feelingEl = document.getElementById("feelings");

// Date
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();
newDate = `<strong>Date: </strong>${newDate}`;

/* functions */
// API get function
const getWebApi = async (URL, key) => {
  let zipCode = zipCodeEl.value;
  //zipCode = 94040
  let temp;
  return fetch(`${URL}zip=${zipCode},us&appid=${key}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      temp = data.main.temp;
      return temp;
    })
    .then((temp) => {
      temp -= 273.15;
      temp = temp.toFixed(2);
      gTemp = `<strong>Temp: </strong>${temp} &#8451;`;
      return temp;
    })
    .catch((err) => {
      console.log("error in web API", err);
      window.alert(
        "Failed: Check your connection and that your zip code is from US"
      );
    });
};

const getLastEntry = async () => {
  let res = await fetch("http://localhost:8000/getLastEntry");
  let data = await res.json();
  if (data && data.temp) {
    dateText.innerHTML = data.date;
    tempText.innerHTML = data.temp;
    contentText.innerHTML = data.content;
  } else {
    window.alert("There is no last entry!");
  }
};

const postNewEntry = async (date, temp, feel) => {
  if (!temp) {
    window.alert("Failed: Enter zipCode to get the temperature");
  } else if (!feel) {
    window.alert("Failed: Enter your feeling");
  } else {
    let newEntry = {
      date: date,
      temp: temp,
      content: feel,
    };
    fetch("http://localhost:8000/postNewEntry", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEntry),
    }).then(() => {
      getLastEntry();
    });
  }
};

const clickHandle = async () => {
  let feel = feelingEl.value;
  if (feel) feel = `<strong>Feeling: </strong>${feel}`;
  const temp = await getWebApi(baseURL, apiKey);
  postNewEntry(newDate, gTemp, feel);
};

/* code */

window.onload = () => {
  getLastEntry();
};

generateButton.addEventListener("click", clickHandle);
