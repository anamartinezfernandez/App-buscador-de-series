'use strict';

//DECLARACIÓN DE VARIABLES GLOBALES
const btnSearch = document.querySelector (".js-searchBtn");
const inputSearch = document.querySelector (".js-searchInput");
const serieList = document.querySelector (".js-serieList");
const favouriteSerieList  = document.querySelector (".js-favouriteSerieList");

let seriesArrow = []; 
let favouriteList = [];


//CONECTAR CON EL SERVIDOR API cuando la usuaria hace click


function connectToApi(event){
  const inputSearchValue = inputSearch.value;
  //console.log ("entro");
  fetch (`http://api.tvmaze.com/search/shows?q=${inputSearchValue}`)
  .then (function (response) {
    console.log(response.json);
    return response.json(); 
  })
  .then (function (data){
    console.log(data);
    seriesArrow = data; //me faltaba esto
    paintCard();
    listenCard();
    /* paintFavourites(); */ //DUDA
   /*  setLocalStorage(); */
  })
event.preventDefault();
}

//PINTAR TARJETAS DE SERIES

const paintCard = function(){
  console.log ("entro en paintcard");
  let serieHtml = "";
  console.log (serieHtml);

  for (let i=0; i < seriesArrow.length; i++){
    console.log (i);
  
    console.log(seriesArrow[i].show);
    const series = seriesArrow[i].show;
    console.log (series);
    console.log (series.name);
    console.log (seriesArrow);
    console.log (series.id);
    serieHtml += `<li class= "serieElement js-serieElement" id ="${series.id}">`;
  
    if (series.image === null){
      serieHtml += `<img alt="foto carátula ${series.name}" name= "foto ${series.name}" src="https://via.placeholder.com/210x295/B695C0/525252/?text=tv">`;
    }
    else {
      
      serieHtml += `<img alt="foto carátula ${series.name}" name= "foto ${series.name}" src="${series.image.medium}" >`;
    }
    serieHtml += `<h3 class= "serieTitle">${series.name}</h3>`;
    serieHtml += "</li>"
  }
  serieList.innerHTML = serieHtml;
  console.log (serieList);
}

//ESCUCHAR TARJETAS DE VISITA

function listenCard(){
  console.log ("entro en función listenCard");
  const cardElements = document.querySelectorAll(".js-serieElement");
  console.log (cardElements);
  for (let cardElement of cardElements) {
    cardElement.addEventListener('click', favouriteSeries);
    console.log (cardElement);
  }
}

//RELACIONAR ID FAVORITOS CON ARRAY 

const getObject = function(id){
  console.log ("entro en getobject");
  console.log (seriesArrow);
  console.log(seriesArrow.find(serieArrow => serieArrow.show.id === 41531));
 
  return seriesArrow.find(serieArrow => serieArrow.show.id === parseInt(id));

}

//MARCAR COMO FAVORITAS LAS SERIES SELECCIONADAS POR LA USUARIA (poner escuchador de eventos)

const favouriteSeries = function(event){
//la escuchamos más arriba en la función listenCard
  console.log ("entro en función FavouriteSeries");
  console.log (event); //targetCurrent es null y target es la imagen

  //Identifico el elemento clickado
  const favouriteClicked = event.currentTarget;
  console.log(favouriteClicked);
  const favouriteClickedId = parseInt(event.currentTarget.id); 
  console.log (favouriteClickedId);
  const object = getObject(favouriteClickedId);
  console.log(object);
  const findFavourite = favouriteList.indexOf(favouriteClickedId);
  

  //Guardo los favoritos en un array let favouriteList = [];
    //esto significa que no está dentro del array
  if (findFavourite === -1){
    favouriteList.push(favouriteClickedId); //¡¡¡dar una vuelta a lo que añadir aquí!!!1 Habría que relacionar de alguna forma el id de favoritos con el array de objetos 
    console.log (favouriteList);
    favouriteClicked.classList.add ("favouriteSerie");
    //pensar si hay que poner un remove
    favouriteSerieList.innerHTML +=  `${object.show.name} ${object.show.url} `; //AQUÍ HAY QUE HACER QUE APAREZCA TOOOODO
  /*   paintFavourites(); */

  } else {
    favouriteList.splice (findFavourite, 1); 
      //aquí podríamos hacer una constante, 
      //splice nos indica que si ya está en el array, no queremos volverlo a ponerlo como favorito, por lo que lo quitamos, solo ese.
  }
/* paintCard();
listenCard(); */
}


//PINTAR FAVORITAS EN ASIDE:

/* const paintFavourites = function(){
  favouriteList.innerHTML =  `${object}`;
  
} */


    //Hay que mostrar un listado en la parte izquierda de la pantalla, debajo del formulario de búsqueda, con
/* las series favoritas. Os recomendamos crear un variable o constante de tipo array en JS para almacenar las series favoritas.
Las series favoritas deben seguir apareciendo a la izquierda aunque la usuaria realice otra búsqueda. */




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


/* README */