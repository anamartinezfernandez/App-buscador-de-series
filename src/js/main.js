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

//PINTAR TARJETAS DE PELÍCULAS

const paintCard = function(){
  console.log ("entro en paintcard");
  let filmHtml = "";
  console.log (filmHtml);

  for (let i=0; i < filmsArrow.length; i++){
    filmHtml += "<li class= filmElement>";
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

btnSearch.addEventListener ("click", connectToApi);

