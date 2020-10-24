- [x] Pintar las series cuando haga click en el botón (evento)
  - [x] Escuchar el evento click en el botón
  - [x] Fetch obtener datos del servidor (FUNCTION CONNECTTOAPI)
  - [x] Pasear, datos,del servidor a JSON
  - [x] Guardar las series en un array (seriesArrow)
  - [x] Pintar la tarjeta en el HTML (usar datos dinámicos) con una imagen y el título (FUNCTION PAINTCARD)
  - [x] Poner imagen de relleno cuando no hay imagen

- [x] POnerlo bonito (con clases de css se las añado)

- [ ] Marcar como favoritas, las seleccionada por la usuaria
  - [x] Escuchar el evento click en cada tarjeta (FUNCTION LISTENCARD)
  - [x] Identificar el elemento clicado (id con currentTarget)
  - [x] Relaciónar el ID con array de favoritos
  - [x] Guardar los favoritos en un Array (favouriteListArrow)
  - [x] Añadir la clase de favorito (la traemos de css) para intercambiar color de fondo y fuente
  - [x] Pintar tarjetas de favoritos: Mostrar un listado de las series favoritas.
  - [x] Si vuelve a pinchar en la misma tarjeta no queremos que se añada al array (y por lo tanto tampoco a la lista)
  - [ ] Con css que aparezca en la parte izquierda y hidden (clase ya creada en css)
  - [x] Mantener las series favoritas aunque la usuaria realice otra búsqueda. ASEGURARSE DE POR QUÉ APARECE ASÍ

- [] Localstorage: al recargar la página los favoritos deben de seguir mostrándose
  - [x] Guardar array de favoritos en localStorage
    - [x] Transformar array a cadena de caracteres (JSON.stringify)
  - [x] Recuperar los datos guardados
    - [x] Transformar cadena de caracteres a array (JSON.parse)

- [] Bonus: borrar favoritos

- [] Bonus: Afinar la maquetación

- [] Hacer README

- [] Subir a docs. 


Flujo de trabajo:

- Evento escuchador de click (al final del código): conecta con servidor API
- Función conectar con el servidor API cuando la usuaria hace click. (coge todos los datos del servidor y los guarda en el array seriesArrow)
- La función api-->Activa la función PaintCard. 
  - Se pinta la imagen si no la hay.
- La función api-->Activa la función ListenCard (escuchar los favoritos)