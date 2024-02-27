"use strict"

// --------------------- variables --------------------------------
let flagWrapper = $("#flags-wrapper");
let searchFlag = $("#search-flag");
let selectFlag = $("#select-flag");
let body = $("body");
let darkbtn = $("#dark-btn");
let flag = $(".flag");


// --------------------- functions --------------------------------
function getData(){
    let url = "https://restcountries.com/v2/all";
    return fetch(url).then(response => response.json()).catch(err => "No data found").finally(() => console.log("done"));    
}

function renderFlags(data){
    flagWrapper.innerHTML = "";
    if(data.length > 0){
        data.forEach(el => {
            let flag_card = createElement("div", "card");
            flag_card.setAttribute("data-flag", el.name)
            flag_card.innerHTML = `
                <img src="${el.flag}" alt="${el.name}">
                <div data-flag="${el.name}" class="card-body">
                    <h5>${el.name}</h5>
                    <p><span>Population: </span>${el.population}</p>
                    <p><span>Region: </span>${el.region}</p>
                    <p><span>Capital: </span>${el.capital}</p>
                </div>
            `
            flagWrapper.appendChild(flag_card);
        });
    }else{
            flagWrapper.innerHTML = "NOT FOUND";
    }

}

function searchRenderData(data){
    flagWrapper.innerHTML = "";
    if(data.length > 0){
        data.forEach(el => {
            let flag_card = createElement("div", "card");
            flag_card.setAttribute("data-flag", el.name)
            flag_card.innerHTML = `
                <img src="${el.flag}" alt="${el.name}">
                <div data-flag="${el.name}" class="card-body">
                    <h5>${el.name}</h5>
                    <p><span>Population: </span>${el.population}</p>
                    <p><span>Region: </span>${el.region}</p>
                    <p><span>Capital: </span>${el.capital}</p>
                </div>
            `
    
            flagWrapper.appendChild(flag_card);
        });
    }
}


function searchFlags(data, searchWord){
   data.then(el => searchRenderData(el.filter(ele => ele.name.toLowerCase().includes(searchWord))));
}

async function sortOptionFlag(data, name){
    flagWrapper.innerHTML = "<span class='loader'></span>";
    try{
        const dataRegion = await fetch(`https://restcountries.com/v2/region/${name}`);
        const dataRegionData = await dataRegion.json();
        renderFlags(dataRegionData);
    }catch(e){
        flagWrapper.innerHTML = "";
        innerHTML = e.value;
    }
    
}

function darkMode(){
    body.classList.toggle("dark-Mode");
}

flagWrapper.addEventListener("click", (element) => {
    let flag = element.target.parentNode.getAttribute("data-flag");
    localStorage.setItem("country", flag);
    if (localStorage.getItem("country")){
        window.location.href = "./flag.html"
    }
});




// ------------------------ AddEvents ------------------------
searchFlag.addEventListener("keyup", (el) =>{
    let search = el.target.value.toLowerCase();
            searchFlags(dataFlags, search);
});

selectFlag.addEventListener("change", (el) =>{
    sortOptionFlag(dataFlags, selectFlag.value);
})

darkbtn.addEventListener("click", () => {
    darkMode();
})


// -------------------------- Call back --------------------
const dataFlags = getData();
dataFlags.then(renderFlags);



