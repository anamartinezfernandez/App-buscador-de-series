**Aplicación Web de búsqueda de series de televisión:**

Esta aplicación web es una web donde el usuario/a puede buscar series, añadirlas y eliminarlas de su lista de favoritos. 

Toda la información introducida por el usuario/a se almacena en local Storage, por lo que seguirá disponible aunque cierre el explorador. 

Para arrancar el proyecto, se puede acceder a la demo a través del enlace de GitHub Pages: http://beta.adalab.es/modulo-2-evaluacion-final-anamartinezfernandez/ 

**Las tecnologías utilizadas** son HTML y SASS para la maquetación, JavaScript para hacer la web interactiva y GIT para el control de versiones.

**La estructura de la página cuenta con:**

1- Un campo de texto y un botón para buscar series de televisión por su título. 

2- Un listado de resultados de búsqueda donde aparece el cartel de la serie y el título.

3- Un listado con las series marcadas como favoritas, que se encuentra oculta hasta que se selecciona la primera favorita.

**El funcionamiento de la página es el siguiente**

1- BÚSQUEDA:

a- Al hacer clic sobre el botón de Buscar, la aplicación se conecta al API de TVMaze para búsqueda de series.

b- Se pinta una tarjeta con imagen de la serie y el título, por cada uno de los resultados de la búsqueda.

c- Algunas de las series que devuelve el API no tienen imagen. En ese caso se muestra una imagen de relleno.

2- FAVORITOS:

a- Una vez aparecen los resultados de búsqueda, la usuaria puede indicar cuáles son sus series favoritas.

b- Para ello debe hacer clic sobre la serie que quiere marcar. Cuando sucede este evento:
  - El color de fondo y el de fuente se intercambian, indicando que es una serie favorita.
  - Se muestra un listado con
  las series marcadas como favoritas.
  - Las series favoritas siguen apareciendo aunque la usuaria realice otra búsqueda o recargue la página.

c- Al hacer clic sobre el icono de una 'x' al lado de cada favorito, se borra el favorito clicado de la lista y del localStorage.
