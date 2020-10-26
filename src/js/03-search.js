
//-------------------Activate connecttoAPI function when btnSearch is clicked -------------------


function handlerEvent() {
  seriesResultArrow = []; 
  connectToApi();
}


//-------------------Connect to API server, brings data & store in JSON -------------------

function connectToApi() {
  const inputSearchValue = inputSearch.value;
  console.log("entro");
  fetch(`//api.tvmaze.com/search/shows?q=${inputSearchValue}`)
    .then(function (response) {
      console.log(response.json);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      seriesResultArrow = data; 
      paintCard();
      listenCard(); 
    });
}


//-------------------Paint serie cards from user search in HTML  -------------------

const paintCard = function () {
  //console.log ("entro en paintcard");
  let serieHtml = "";
  //console.log (serieHtml);

  for (let i = 0; i < seriesResultArrow.length; i++) {
    //console.log (i);

    //console.log(seriesResultArrow[i].show);
    const series = seriesResultArrow[i].show;
    //console.log (series);
    //console.log (series.name);
    //console.log (seriesResultArrow);
    //console.log (series.id);
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
  //console.log (serieList);
};


//-------------------Listener of btnSearch when is clicked-------------------

btnSearch.addEventListener("click", handlerEvent);