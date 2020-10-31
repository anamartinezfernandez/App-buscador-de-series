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