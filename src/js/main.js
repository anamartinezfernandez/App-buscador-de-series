'use strict';

//DECLARACIÓN DE VARIABLES GLOBALES
const btnSearch = document.querySelector (".js-searchBtn");
const inputSearch = document.querySelector (".js-searchInput");
const filmList = document.querySelector (".js-filmList");

let filmsArrow = [];

//CONECTAR CON EL SERVIDOR API


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
  })
}



btnSearch.addEventListener ("click", connectToApi);
