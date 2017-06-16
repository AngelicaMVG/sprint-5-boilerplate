var api = {
  url: 'http://examen-laboratoria-sprint-5.herokuapp.com/topics'
};

var plantillaFinal = '';
var arregloTemas = [];

var cargarPagina = function() {
  cargarTemas();
  $('#add-form').submit(agregarTema);
  $("#search-form").submit(filtrarTema);
};

var cargarTemas = function() {
  $.getJSON(api.url, function(topics) {
    arregloTemas = topics;
    topics.forEach(mostrarTema);
  });
};

var mostrarTema = function(tema) {
  var autor = tema.author_name;
  var contenido = tema.content;
  var id = tema.id;
  var respuestas = tema.responses_count;
  plantillaFinal = plantilla.replace("__autor__", autor)
    .replace("__contenido__", contenido)
    .replace("__id__", id)
    .replace("__respuestas__", respuestas);
    $('#temas').prepend(plantillaFinal);
};


var plantilla= '<div class="jumbotron">' +
  '<h2>__contenido__</h2>' +
  '<p>Por: __autor__</p>' +
  '<a href="verTopic.html?topic_id=__id__"><i class="glyphicon glyphicon-plus"></i> Ver mas</a>'+
  '<span class="num-res">Respuestas: __respuestas__</span>' +
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



var filtrarTema = function(e) {
  e.preventDefault();
  var criterioBusqueda = $("#search").val().toLowerCase();
  console.log(criterioBusqueda);
  var temasFiltrados = arregloTemas.filter(function(tema) {
    return tema.content.toLowerCase().indexOf(criterioBusqueda) >= 0;
  });
  $('#temas').html('');
  temasFiltrados.forEach(mostrarTema);
};



$(document).ready(cargarPagina);
