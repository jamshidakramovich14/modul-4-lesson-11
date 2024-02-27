"use strict";

// --------------------- variables --------------------------------
let flag = $(".flag");
let bodyy = $("body");
let darkbtn = $("#darkk-btn");

// --------------------- functions --------------------------------
let singlePage = $(".flag");

async function target() {
  let flag = localStorage.getItem("country");
  try {
    const dataFlag = await fetch(`https://restcountries.com/v2/name/${flag}`);
    const dataFlagData = await dataFlag.json();
    singleRender(dataFlagData[0]);
    }catch (e) {
        console.log(e.value)
    }
}
target();

function singleRender(data) {
  let div = document.createElement("div");
  div.className = "flagg-wrap";
  div.innerHTML = `
            <div class="flag-left">
                <img src="${data.flags.png}" alt="">
            </div>
             <div class="flag-right">
                    <h4>${data.name}</h4>
                    <div class="uls">
                        <ul>
                            <li><strong>Native name:</strong> ${data.nativeName}</li>
                            <li><strong>Population:</strong> ${data.population}</li>
                            <li><strong>Region:</strong> ${data.region}</li>
                            <li><strong>Sub Region:</strong> ${data.subregion}</li>
                            <li><strong>Capital:</strong> ${data.capital}</li>
                        </ul>
                        <ul>
                            <li><strong>Top Level Domain</strong> ${data.demonym}</li>
                            <li><strong>Currencies</strong> ${data.currencies[0].name}</li>
                            <li><strong>Language</strong> ${data.languages[0].name}</li>
                        </ul>
                    </div>
            </div>
    `;
    flag.appendChild(div);
}

function darkMode(){
    bodyy.classList.toggle("dark-Mode");
}

darkbtn.addEventListener("click", () => {
    darkMode();
})
// --------------------- call () ------------------------
