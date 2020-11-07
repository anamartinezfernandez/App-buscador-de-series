
//-------------------Set serie cards marked as favourites to user local Storage-------------------

function setLocalStorage() {
  localStorage.setItem("favourites", JSON.stringify(favouriteListArrow));
}

//-------------------Get serie cards marked as favourites from user local Storage-------------------

function getFromLocalStorage() {
  const favouriteStorage = JSON.parse(localStorage.getItem("favourites"));
  if (favouriteStorage !== null) {
    favouriteListArrow = favouriteStorage;
    paintFavourites();
  } else {
    return favouriteListArrow = [];
  } 
  hideFavSection();
}

getFromLocalStorage();

function resetLocalStorage(event) {
  console.log("entro en reset");
  favouriteListArrow = [];
  localStorage.clear();
  event.preventDefault();
  paintFavourites(); 
  favouriteSection.classList.add("hidden");
  setLocalStorage();
}

btnReset.addEventListener("click", resetLocalStorage);

//PENDIENTE DE MEJORAS


//Que el color de la tarjeta vaya acorde con las funciones
//Que cuando hago click de nuevo en la tarjeta se me elimine de los favoritos