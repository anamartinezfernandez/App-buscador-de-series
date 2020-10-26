//-------------------Listener of remove buttons when are clicked-------------------


const listenRemoveBtn = function(){
  const btnsRemove = document.querySelectorAll(".js-btnRemove");
  for (let btnRemove of btnsRemove) {
    btnRemove.addEventListener ("click", removeFavouriteSeries);
  }
}


//-------------------Remove as favourite serie cards which X button is clicked by user-------------------



const removeFavouriteSeries = function(event){

  const btnClickedId = parseInt (event.currentTarget.id);
  for (const favouriteArrow of favouriteListArrow){
  
    if (btnClickedId === parseInt(favouriteArrow.show.id)){
      favouriteListArrow.splice(0,1);
    }
  }
  setLocalStorage(); 
  paintFavourites();
}

