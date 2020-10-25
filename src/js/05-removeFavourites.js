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

/* PENDIENTE ELIMINAR LA SECCIÓN DE FAVORITOS AL COMPLETO   */