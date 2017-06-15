var api = {
  url: 'http://examen-laboratoria-sprint-5.herokuapp.com/topics'
};

var plantillaFinal = '';


var cargarPagina = function() {
  cargarTemas();
  $('#add-form').submit(agregarTema);
  // $("#search-form").submit(filtrarTema);
};

var cargarTemas = function() {
  $.getJSON(api.url, function(topics) {
    topics.forEach(function(tema) {
      var autor = tema.author_name;
      var contenido = tema.content;
      var id = tema.id;
      var respuestas = tema.responses_count;
      plantillaFinal += plantilla.replace("__autor__", autor)
        .replace("__contenido__", contenido)
        .replace("__id__", id)
        .replace("__respuestas__", respuestas);
    });
    $('#temas').html(plantillaFinal);
  });
};


var plantilla= '<div class="jumbotron">' +
  '<h2>__contenido__</h2>' +
  '<p>__autor__</p>' +
  '<p>__respuestas__</p>' +
  '<a href="verTopic.html?topic_id=__id__">+</a>'+
  '</div>';


var agregarTema = function(e) {
  e.preventDefault();
  var autor = $('#autor').val();
  var contenido = $('#contenido').val();
  $.post(api.url, {
    author_name: autor,
    content: contenido
  }, function(response){
    $('#myModal').modal('hide');
    cargarTemas();
  });
};


// var filtrarTema = function(e) {
//   e.preventDefault();
//   var criterioBusqueda = $("#search").val().toLowerCase();
//   var id = plantillaFinal.id;
//   var autor = plantillaFinal.autor;
//   console.log(criterioBusqueda);
//   $.getJSON(api.url, {
//     content: criterioBusqueda,
//     id: id,
//     author_name: autor
//   }, function(response){
//       var temaFiltrado = response.filter(function(plantillaFinal){
//       return plantillaFinal.content.toLowerCase().indexOf(criterioBusqueda) >= 0;
//     });
//     crearTema(temaFiltrado);
//   });
// };



$(document).ready(cargarPagina);
