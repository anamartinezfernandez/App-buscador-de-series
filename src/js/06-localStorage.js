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
   /*  listenCard();  */ 
  } else {
    favouriteSection.classList.add("hidden");
    return favouriteListArrow = [];
    

    //elemntSectionfav.classList.add('hidden'); 
  }
}

getFromLocalStorage();

/* const resetLocalStorage = function() {
  localStorage.clear();
  favouriteListArrow =[];
  avouriteSection.classList.add('hidden');
}
elementButtonReset.addEventListener ('click', resetLocalStorage);*/