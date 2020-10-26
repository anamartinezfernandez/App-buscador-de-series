
//-------------------Set serie cards marked as favourites to user local Storage-------------------

function setLocalStorage() {
  localStorage.setItem("favourites", JSON.stringify(favouriteListArrow));
}

//-------------------Get serie cards marked as favourites from user local Storage-------------------

function getFromLocalStorage() {
  const favouriteStorage = JSON.parse(localStorage.getItem("favourites"));
  if (favouriteStorage !== null) {
    favouriteListArrow = favouriteStorage;
    favouriteSection.classList.remove("hidden");
    paintFavourites();
  } else {
    return favouriteListArrow = [];
  } 
}

getFromLocalStorage();

function resetLocalStorage(event) {
  favouriteListArrow = [];
  localStorage.clear();
  event.preventDefault();

  paintFavourites();
  setLocalStorage();
}

btnReset.addEventListener("click", resetLocalStorage);

