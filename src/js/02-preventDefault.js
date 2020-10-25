//-------------------Prevent Default: prevent form from being submitted-------------------

function handlerForm(event) {
  event.preventDefault();
}
form.addEventListener("submit", handlerForm);