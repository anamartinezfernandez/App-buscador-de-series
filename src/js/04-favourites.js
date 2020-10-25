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

//-------------------Relate the ID of serie card marked as favourite with favourite arrow-------------------

const getObject = function (id) {
  console.log("entro en getobject");
  console.log(seriesResultArrow);
  console.log(favouriteListArrow);
  console.log (seriesResultArrow.find(
    (serieArrow) => serieArrow.show.id === parseInt(id)
  ));
  return seriesResultArrow.find(
    serieArrow => serieArrow.show.id === parseInt(id)
  );
};


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
  const object = getObject(favouriteClickedId);
  console.log(object);


  //-------------------Saves as favourite into the favourite List array serie cards clicked by user -------------------
  console.log(favouriteListArrow);
  const findFavourite = favouriteListArrow.indexOf(object); 
  console.log(findFavourite);


  //esto significa que no está dentro del array
  if (findFavourite === -1) {
    favouriteSection.classList.remove("hidden");
    favouriteListArrow.push(object); 
    console.log(object);
    console.log(favouriteListArrow);
    console.log(favouriteClicked);
    console.log(favouriteClicked.classList.add("classFavourite"));
    paintFavourites();

    
  } else {
    const findFavouriteLength = favouriteListArrow + 1;
    favouriteListArrow.splice(findFavouriteLength, 0);
    console.log(favouriteClicked.classList.remove("classFavourite")); 
    
    //Aquí lo que queremos es que si ya está en el array no se vuelva a añadir si se clicka. Por lo que usamos el método splice. El primer parámetro sería el índice a partir del cual queremos añadir elementos y el segundo el número de elementos que queremos añadir a partir de la posición dada. Para ello creamos una nueva variable (que cogeremos como primer parámetro) y que será la longitud del array +1. En el segundo parámetro le diremos que no queremos que nos añada nada más.

    console.log(favouriteListArrow);
  }
  
 
  setLocalStorage();
};

//-------------------Paint serie cards marked as favourite  in favouriste section of HTML  -------------------

const paintFavourites = function () {
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
  listenRemoveBtn(); 
};



