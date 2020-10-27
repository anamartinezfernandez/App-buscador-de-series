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
 listenFavourites();
}

const listenFavourites = function(){
  console.log("entro en función ListenFavourites");
  btnLog.addEventListener ("click", showFavourites);
}

const showFavourites = function(){
  console.log(favouriteListArrow);
  for (const favourite of favouriteListArrow){
   console.log(favourite.show.name);
  }
}

