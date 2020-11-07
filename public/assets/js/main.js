"use strict";

const body = document.querySelector(".js-body");
const btnSearch = document.querySelector(".js-searchBtn");
const form = document.querySelector(".js-form");
const inputSearch = document.querySelector(".js-searchInput");
const serieList = document.querySelector(".js-serieList");
const favouriteSerieList = document.querySelector(".js-favouriteSerieList");
const favouriteSection = document.querySelector(".js-section");

const btnRemove = document.querySelector(".js-btnRemove");

const btnReset = document.querySelector(".js-reset");

const btnLog= document.querySelector (".js-logBtn");

let seriesResultArrow = [];
let favouriteListArrow = [];


//-------------------Activate connecttoAPI function when btnSearch is clicked -------------------


function handlerEvent(event) {
  event.preventDefault();
  seriesResultArrow = []; 
  body.classList.remove ("full_screen");
  body.classList.add("changeBackground");
  hideFavSection();
  connectToApi();
}


//-------------------Connect to API server, brings data & store in JSON -------------------

function connectToApi() {
  const inputSearchValue = inputSearch.value;
  fetch(`//api.tvmaze.com/search/shows?q=${inputSearchValue}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      seriesResultArrow = data; 
      paintCard();
      listenCard(); 
      });
}


//-------------------Paint serie cards from user search in HTML  -------------------

const paintCard = function () {
  let serieHtml = "";
  for (let i = 0; i < seriesResultArrow.length; i++) {
    const series = seriesResultArrow[i].show;
    serieHtml += `<li class= "serieElement js-serieElement" id ="${series.id}">`;

    if (series.image === null) {
      serieHtml += `<img alt="foto carátula ${series.name}" name= "foto ${series.name}" src="https://via.placeholder.com/210x295/B695C0/525252/?text=tv">`;
    } else {
      serieHtml += `<img alt="foto carátula ${series.name}" name= "foto ${series.name}" src="${series.image.medium}" >`;
    }
    serieHtml += `<h3 class= "serieTitle">${series.name}</h3>`;
    serieHtml += "</li>";
    serieList.innerHTML = serieHtml;
  }
};


//-------------------Listener of btnSearch when is clicked-------------------

btnSearch.addEventListener("click", handlerEvent);


//-------------------Listener of serie cards when are clicked-------------------

const listenCard = function () {
  const cardElements = document.querySelectorAll(".js-serieElement");
  for (let cardElement of cardElements) {
    cardElement.addEventListener("click", favouriteSeries);
  }
}


//-------------------Saves as favourite serie cards clicked by user-------------------


const favouriteSeries = function (event) {

 //-------------------Identify clicked element-------------------
  const favouriteClicked = event.currentTarget;
  console.log(favouriteClicked);
  const favouriteClickedId = parseInt(event.currentTarget.id);
  console.log(favouriteClickedId);
  console.log(seriesResultArrow);
  const object = seriesResultArrow.find(
  function (favouriteElement) {return favouriteElement.show.id === favouriteClickedId});

  //-------------------Saves as favourite into the favourite List array serie cards clicked by user -------------------

  const findFavourite = favouriteListArrow.findIndex (function (favouriteIndex) {return favouriteIndex.show.id === favouriteClickedId});
 
  if (findFavourite === -1) {
    favouriteListArrow.push(object); 
    favouriteClicked.classList.add("classFavourite");
    paintFavourites();
    } 
    else {
      const findFavouriteLength = favouriteListArrow.length + 1;
      favouriteListArrow.splice(findFavouriteLength, 0);

      alert ("This series is already in your favourite list"); 
     }
  
  setLocalStorage();
};


//-------------------Paint serie cards marked as favourite  in favourite section of HTML  -------------------

const paintFavourites = function () {
  favouriteSection.classList.remove ("hidden");
  let favouriteSerieHtml = "";
  for (const favouriteObject of favouriteListArrow) {
    
    favouriteSerieHtml += `<li class= "favouriteSeries">`;
    if (favouriteObject.show.image === null) {
      favouriteSerieHtml += `<img class= "favouriteSeriesImg" alt="foto carátula ${favouriteObject.show.name}" name= "foto ${favouriteObject.show.name}" src="https://via.placeholder.com/210x295/B695C0/525252/?text=tv">`;
    } else {
      favouriteSerieHtml += `<img class= "favouriteSeriesImg"alt="foto carátula ${favouriteObject.show.name}" name= "foto ${favouriteObject.show.name}" src="${favouriteObject.show.image.medium}" >`;
    }
    favouriteSerieHtml += `<h3 class = "favouriteSeriesTitle">${favouriteObject.show.name}</h3>`;
    favouriteSerieHtml += `<button  class= "js-btnRemove btnRemove" type="button" id= ${favouriteObject.show.id}> X </button>`
    favouriteSerieHtml += "</li>";
  }
  
 favouriteSerieList.innerHTML = favouriteSerieHtml;
 listenRemoveBtn(); 
}



function hideFavSection(){
  console.log("entro en hidefav");
  console.log (favouriteListArrow);
  if (favouriteListArrow.length === 0){
    favouriteSection.classList.add("hidden");
  }
} 


//-------------------Listener of remove buttons when are clicked-------------------


const listenRemoveBtn = function(){
  console.log("enetro en listenremove");
  const btnsRemove = document.querySelectorAll(".js-btnRemove");
  for (const btnRemove of btnsRemove) {
    btnRemove.addEventListener ("click", removeFavouriteSeries);
  }
}


//-------------------Remove as favourite serie cards which X button is clicked by user-------------------

const removeFavouriteSeries = function(event){
  console.log("entro en remove");
  
  const btnClickedId = parseInt (event.currentTarget.id);
  console.log(btnClickedId);

  const findFavourite = favouriteListArrow.findIndex (function (favouriteIndex) {return favouriteIndex.show.id === btnClickedId});
  if (findFavourite !== -1){
    console.log("entrrrr");
    favouriteListArrow.splice(findFavourite,1);
    console.log(favouriteListArrow);
  }

  setLocalStorage(); 
  paintFavourites();
  if (favouriteListArrow.length === 0){
    console.log("entro aquí");
    favouriteSection.classList.add("hidden");
  }

} 

//-------------------Set serie cards marked as favourites to user local Storage-------------------

function setLocalStorage() {
  localStorage.setItem("favourites", JSON.stringify(favouriteListArrow));
}

//-------------------Get serie cards marked as favourites from user local Storage-------------------

function getFromLocalStorage() {
  const favouriteStorage = JSON.parse(localStorage.getItem("favourites"));
  if (favouriteStorage !== null) {
    favouriteListArrow = favouriteStorage;
    paintFavourites();
  } else {
    return favouriteListArrow = [];
  } 
  hideFavSection();
}

getFromLocalStorage();

function resetLocalStorage(event) {
  console.log("entro en reset");
  favouriteListArrow = [];
  localStorage.clear();
  event.preventDefault();
  paintFavourites(); 
  favouriteSection.classList.add("hidden");
  setLocalStorage();
}

btnReset.addEventListener("click", resetLocalStorage);

//PENDIENTE DE MEJORAS


//Que el color de la tarjeta vaya acorde con las funciones
//Que cuando hago click de nuevo en la tarjeta se me elimine de los favoritos
//# sourceMappingURL=main.js.map
