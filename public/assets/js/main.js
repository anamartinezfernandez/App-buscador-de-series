"use strict";

const btnSearch = document.querySelector(".js-searchBtn");
const form = document.querySelector(".js-form");
const inputSearch = document.querySelector(".js-searchInput");
const serieList = document.querySelector(".js-serieList");
const favouriteSerieList = document.querySelector(".js-favouriteSerieList");
const favouriteSection = document.querySelector(".js-aside");

const btnRemove = document.querySelector(".js-btnRemove");

const btnReset = document.querySelector(".js-reset");



let seriesResultArrow = [];
let favouriteListArrow = [];

//-------------------Prevent Default: prevent form from being submitted-------------------

function handlerForm(event) {
  event.preventDefault();
}
form.addEventListener("submit", handlerForm);

//-------------------Activate connecttoAPI function when btnSearch is clicked -------------------


function handlerEvent() {
  seriesResultArrow = []; 
  connectToApi();
}


//-------------------Connect to API server, brings data & store in JSON -------------------

function connectToApi() {
  const inputSearchValue = inputSearch.value;
  console.log("entro");
  fetch(`//api.tvmaze.com/search/shows?q=${inputSearchValue}`)
    .then(function (response) {
      console.log(response.json);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      seriesResultArrow = data; 
      paintCard();
      listenCard(); 
    });
}


//-------------------Paint serie cards from user search in HTML  -------------------

const paintCard = function () {
  //console.log ("entro en paintcard");
  let serieHtml = "";
  //console.log (serieHtml);

  for (let i = 0; i < seriesResultArrow.length; i++) {
    //console.log (i);

    //console.log(seriesResultArrow[i].show);
    const series = seriesResultArrow[i].show;
    //console.log (series);
    //console.log (series.name);
    //console.log (seriesResultArrow);
    //console.log (series.id);
    serieHtml += `<li class= "serieElement js-serieElement" id ="${series.id}">`;

    if (series.image === null) {
      serieHtml += `<img alt="foto carátula ${series.name}" name= "foto ${series.name}" src="https://via.placeholder.com/210x295/B695C0/525252/?text=tv">`;
    } else {
      serieHtml += `<img alt="foto carátula ${series.name}" name= "foto ${series.name}" src="${series.image.medium}" >`;
    }
    serieHtml += `<h3 class= "serieTitle">${series.name}</h3>`;
    serieHtml += "</li>";
  }
  serieList.innerHTML = serieHtml;
  //console.log (serieList);
};


//-------------------Listener of btnSearch when is clicked-------------------

btnSearch.addEventListener("click", handlerEvent);
//-------------------Listener of serie cards when are clicked-------------------

const listenCard = function () {
  //console.log ("entro en función listenCard");
  const cardElements = document.querySelectorAll(".js-serieElement");
  // console.log (cardElements);
  for (let cardElement of cardElements) {
    cardElement.addEventListener("click", favouriteSeries);
    //console.log (cardElement);
  }
}



//-------------------Saves as favourite serie cards clicked by user-------------------


const favouriteSeries = function (event) {
  //la escuchamos más arriba en la función listenCard
  //console.log ("entro en función FavouriteSeries");
  //console.log (event); //targetCurrent es null y target es la imagen

 //-------------------Identify clicked element-------------------
  const favouriteClicked = event.currentTarget;
  console.log(favouriteClicked);
  const favouriteClickedId = parseInt(event.currentTarget.id); 
  console.log(favouriteClickedId);

  console.log(seriesResultArrow);
  const object = seriesResultArrow.find(
    function (favouriteElement) {return favouriteElement.show.id === favouriteClickedId});
  console.log(object); 

  //-------------------Saves as favourite into the favourite List array serie cards clicked by user -------------------
  console.log(favouriteListArrow);
  

  const findFavourite = favouriteListArrow.findIndex (function (favouriteIndex) {return favouriteIndex.show.id === favouriteClickedId});
  console.log(object);
  // findIndex >>> id 123 === 123
  console.log(findFavourite);

  //aquí utilizo findIndex en vez de indexOf para que al recargar la página compare los objetos como iguales //const findFavourite = favouriteListArrow.indexOf(object); 

  //esto significa que no está dentro del array
  if (findFavourite === -1) {
    
    favouriteListArrow.push(object); 
    console.log(object);
    console.log(favouriteListArrow);
    console.log(favouriteClicked);
    console.log(favouriteClicked.classList.add("classFavourite"));
    paintFavourites();
    
  } else {
    const findFavouriteLength = favouriteListArrow + 1;
    favouriteListArrow.splice(findFavouriteLength, 0);
  
    alert ("This series is already in your favourite list"); 
    /* removeFavourites(); */
   
    
    //Aquí lo que queremos es que si ya está en el array no se vuelva a añadir si se clicka. Por lo que usamos el método splice. El primer parámetro sería el índice a partir del cual queremos añadir elementos y el segundo el número de elementos que queremos añadir a partir de la posición dada. Para ello creamos una nueva variable (que cogeremos como primer parámetro) y que será la longitud del array +1. En el segundo parámetro le diremos que no queremos que nos añada nada más.

    console.log(favouriteListArrow);
  }
  
 
  setLocalStorage();
};

//-------------------Paint serie cards marked as favourite  in favouriste section of HTML  -------------------

const paintFavourites = function () {
  console.log("entro en paintfav");
  let favouriteSerieHtml = "";
  for (const favouriteObject of favouriteListArrow) {
    console.log (favouriteListArrow);
    console.log(favouriteObject);
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
 console.log(favouriteSerieList);
 listenRemoveBtn(); 
};

/* const removeFavourites = function () {
  console.log("entro en removefav");
  let favouriteSerieHtml = "";
  favouriteSerieList.innerHTML = favouriteSerieHtml;
  console.log(favouriteSerieList);
  console.log (favouriteListArrow);
  

  console.log (favouriteListArrow);

};
 */





//-------------------Listener of remove buttons when are clicked-------------------



const listenRemoveBtn = function(){
  console.log ("entro en función listenerremove");
  
  const btnsRemove = document.querySelectorAll(".js-btnRemove");
  console.log(btnsRemove);
  for (let btnRemove of btnsRemove) {
    btnRemove.addEventListener ("click", removeFavouriteSeries);
    console.log(btnRemove);
  }
}


//-------------------Remove as favourite serie cards which X button is clicked by user-------------------



const removeFavouriteSeries = function(event){
  const  btnClicked = event.currentTarget;
  console.log(btnClicked);
  console.log("entro en función removeFavouriteSeries");
  const btnClickedId = parseInt (event.currentTarget.id);
  console.log (btnClickedId);
  for (const favouriteArrow of favouriteListArrow){
    console.log (favouriteArrow);
    console.log (favouriteArrow.show.id);
    console.log(favouriteListArrow);
    if (btnClickedId === parseInt(favouriteArrow.show.id)){
      favouriteListArrow.splice(0,1);
      console.log(favouriteListArrow);
    }
  }
  setLocalStorage(); 
  paintFavourites();
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
    favouriteSection.classList.remove("hidden");
    //console.log(favouriteListArrow);
    paintFavourites();
  } else {
    console.log(favouriteListArrow);
    //favouriteSection.classList.add("hidden");
    return favouriteListArrow = [];
  } 
}

getFromLocalStorage();


//# sourceMappingURL=main.js.map
