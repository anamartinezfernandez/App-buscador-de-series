
//-------------------Activate connecttoAPI function when btnSearch is clicked -------------------


function handlerEvent() {
  seriesResultArrow = []; 
  connectToApi();
}


//-------------------Connect to API server, brings data & store in JSON -------------------

function connectToApi() {
  const inputSearchValue = inputSearch.value;
  fetch(`//api.tvmaze.com/search/shows?q=${inputSearchValue}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      seriesResultArrow = data; 
      paintCard();
      listenCard(); 
    });
}


//-------------------Paint serie cards from user search in HTML  -------------------

const paintCard = function () {
  let serieHtml = "";
  for (let i = 0; i < seriesResultArrow.length; i++) {
    const series = seriesResultArrow[i].show;
    serieHtml += `<li class= "serieElement js-serieElement" id ="${series.id}">`;

    if (series.image === null) {
      serieHtml += `<img alt="foto carátula ${series.name}" name= "foto ${series.name}" src="https://via.placeholder.com/210x295/B695C0/525252/?text=tv">`;
    } else {
      serieHtml += `<img alt="foto carátula ${series.name}" name= "foto ${series.name}" src="${series.image.medium}" >`;
    }
    serieHtml += `<h3 class= "serieTitle">${series.name}</h3>`;
    serieHtml += "</li>";
  }
  serieList.innerHTML = serieHtml;
};


//-------------------Listener of btnSearch when is clicked-------------------

btnSearch.addEventListener("click", handlerEvent);