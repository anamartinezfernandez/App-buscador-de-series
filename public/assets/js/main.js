'use strict';

//DECLARACIÓN DE VARIABLES GLOBALES
const btnSearch = document.querySelector (".js-searchBtn");
const inputSearch = document.querySelector (".js-searchInput");
const filmList = document.querySelector (".js-filmList");

let filmsArrow = [];
let favouriteSeries = [];

//CONECTAR CON EL SERVIDOR API cuando la usuaria hace click


function connectToApi(){
  const inputSearchValue = inputSearch.value;
  //console.log ("entro");
  fetch (`http://api.tvmaze.com/search/shows?q=${inputSearchValue}`)
  .then (function (response) {
    console.log(response.json);
    return response.json(); 
  })
  .then (function (data){
    console.log(data);
    filmsArrow = data; //me faltaba esto
    paintCard();
    listenCard();
   /*  setLocalStorage(); */
  })
}

//PINTAR TARJETAS DE PELÍCULAS

const paintCard = function(){
  console.log ("entro en paintcard");
  let filmHtml = "";
  console.log (filmHtml);

  for (let i=0; i < filmsArrow.length; i++){
    filmHtml += `<li class= "filmElement js-filmElement">`;
    console.log(filmsArrow[i].show);
    const films = filmsArrow[i].show;
    console.log (films);
    console.log (films.name);
    if (films.image === null){
      filmHtml += `<img alt="foto carátula ${films.name}" name= "foto ${films.name}" src="https://via.placeholder.com/210x295/B695C0/525252/?text=tv">`;
    }
    else {
      
      filmHtml += `<img alt="foto carátula ${films.name}" name= "foto ${films.name}" src="${films.image.medium}">`;
    }
    filmHtml += `<h3>${films.name}</h3>`;
    filmHtml += "</li>"
  }
  filmList.innerHTML = filmHtml;
  console.log (filmList);
}

//ESCUCHAR TARJETAS DE VISITA

function listenCard(){
  console.log ("entro en funcióin listenCard");
  const cardElements = document.querySelectorAll(".js-filmElement");
  console.log (cardElements);
  for (const cardElement of cardElements) {
    cardElement.addEventListener('click', favouritesFilms);
    console.log (cardElement);
  }
}

//MARCAR COMO FAVORITAS LAS SERIRES SELECCIONADAS POR LA USUARIA (poner escuchador de eventos)

const favouritesFilms = function(event){
//la escuchamos más arriba en la función listenCard
  console.log ("entro en función FavouriteFillms");
  console.log (event); //targetCurrent es null y target es la imagen
  /* const clicked = event.targetCurrent; */
}










//LOCAL STORAGE

//2.1. Diagrama de flujo cuando la usuaria hace un evento.

/* function setLocalStorage(){
  localStorage.setItem ("textinStorage", favouriteSeries);
  const stringFavouriteSeries = JSON.stringify (favouriteSeries);
  }; */
  
//2.2. Diagrama de flujo al arrancar la página.

  /* function getFromLocalStorage(){
  const stringFavouriteStorage = localStorage.getItem ("textinStorage");
  const favouriteStorage = JSON.parse (stringFavouriteStorage);

  if (favouriteStorage !== null) {
 //aquí falta
  }
};


favouriteSeries.addEventListener ("keyup", setLocalStorage); //aquí mirar el elemento sobre el que se pone el escuchador */

btnSearch.addEventListener ("click", connectToApi);


//# sourceMappingURL=main.js.map
