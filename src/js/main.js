'use strict';

//DECLARACIÓN DE VARIABLES GLOBALES
const btnSearch = document.querySelector (".js-searchBtn");
const inputSearch = document.querySelector (".js-searchInput");
const serieList = document.querySelector (".js-serieList");
const favouriteSerieList  = document.querySelector (".js-favouriteSerieList");

let seriesArrow = []; 
let favouriteListArrow = [];


//CONECTAR CON EL SERVIDOR API cuando la usuaria hace click


function connectToApi(event){
  const inputSearchValue = inputSearch.value;
  console.log ("entro");
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
  //console.log ("entro en paintcard");
  let serieHtml = "";
  //console.log (serieHtml);

  for (let i=0; i < seriesArrow.length; i++){
    //console.log (i);
  
    //console.log(seriesArrow[i].show);
    const series = seriesArrow[i].show;
    //console.log (series);
    //console.log (series.name);
    //console.log (seriesArrow);
    //console.log (series.id);
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
  //console.log (serieList);
}


//ESCUCHAR TARJETAS DE VISITA

function listenCard(){
  //console.log ("entro en función listenCard");
  const cardElements = document.querySelectorAll(".js-serieElement");
 // console.log (cardElements);
  for (let cardElement of cardElements) {
    cardElement.addEventListener('click', favouriteSeries);
    //console.log (cardElement);
  }
}

//RELACIONAR ID FAVORITOS CON ARRAY 

const getObject = function(id){
  console.log ("entro en getobject");
  console.log (seriesArrow);
  console.log (favouriteListArrow);
  console.log (seriesArrow.find(serieArrow => serieArrow.show.id === 41531));
  console.log (seriesArrow.find(serieArrow => serieArrow.show.id === parseInt(id)));
 
  return seriesArrow.find(serieArrow => serieArrow.show.id === parseInt(id));

}

//MARCAR COMO FAVORITAS LAS SERIES SELECCIONADAS POR LA USUARIA (poner escuchador de eventos)

const favouriteSeries = function(event){
//la escuchamos más arriba en la función listenCard
   //console.log ("entro en función FavouriteSeries");
   //console.log (event); //targetCurrent es null y target es la imagen

  //Identifico el elemento clickado
  const favouriteClicked = event.currentTarget;
  console.log(favouriteClicked);
  const favouriteClickedId = parseInt(event.currentTarget.id); 
  console.log (favouriteClickedId);
  const object = getObject(favouriteClickedId);
  console.log(object);
  
  //const findFavourite = favouriteListArrow.indexOf(favouriteClickedId);
  //console.log (findFavourite);
  

  
  //Guardo los favoritos en un array let favouriteListArrow = [];
  const findFavourite = favouriteListArrow.indexOf(object);
  console.log (findFavourite);

    //esto significa que no está dentro del array
  if (findFavourite === -1){
    favouriteListArrow.push(object); //¡¡¡dar una vuelta a lo que añadir aquí!!!1 Habría que relacionar de alguna forma el id de favoritos con el array de objetos 
    console.log(object);
    console.log (favouriteListArrow);
    favouriteClicked.classList.add ("favouriteSerie");
    //pensar si hay que poner un remove
    paintFavourites(); 

  } else {
    const findFavouriteLength = favouriteListArrow +1;
    favouriteListArrow.splice(findFavouriteLength, 0); 
    //Aquí lo que queremos es que si ya está en el array no se vuelva a añadir si se clicka. Por lo que usamos el método splice. El primer parámetro sería el índice a partir del cual queremos añadir elementos y el segundo el número de elementos que queremos añadir a partir de la posición dada. Para ello creamos una nueva variable (que cogeremos como primer parámetro) y que será la longitud del array +1. En el segundo parámetro le diremos que no queremos que nos añada nada más.
    
    console.log (favouriteListArrow);
  }
}



//PINTAR FAVORITAS EN ASIDE:

const paintFavourites = function(){
  let favouriteSerieHtml = "";
  for (const favouriteObject of favouriteListArrow){
    favouriteSerieHtml += "<li>";
    if (favouriteObject.show.image === null){
      favouriteSerieHtml += `<img alt="foto carátula ${favouriteObject.show.name}" name= "foto ${favouriteObject.show.name}" src="https://via.placeholder.com/210x295/B695C0/525252/?text=tv">`;
    }
    else {
      
      favouriteSerieHtml += `<img alt="foto carátula ${favouriteObject.show.name}" name= "foto ${favouriteObject.show.name}" src="${favouriteObject.show.image.medium}" >`;
    }
    favouriteSerieHtml += `<h3>${favouriteObject.show.name}</h3>`
    favouriteSerieHtml += "</li>";
  } 
  favouriteSerieList.innerHTML = favouriteSerieHtml;

}



btnSearch.addEventListener ("click", connectToApi);
