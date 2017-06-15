var api = {
  url: 'http://examen-laboratoria-sprint-5.herokuapp.com/topics'
};

var plantillaFinal = '';


var cargarPagina = function() {
  cargarTemas();
  $('#add-form').submit(agregarTema);
  $("#search-form").submit(filtrarTema);
};

var cargarTemas = function() {
  $.getJSON(api.url, function(temas) {
    temas.forEach(crearTema);
    $('#temas').append(plantillaFinal);
  });
};


var crearTema = function(tema) {
  var autor = tema.author_name;
  var contenido = tema.content;
  var id = tema.id;
  var respuestas = tema.responses_count;
  plantillaFinal += plantilla.replace("__autor__", autor)
    .replace("__contenido__", contenido).replace("__id__", id).replace("__respuestas__", respuestas);
};

var plantilla= '<div class="jumbotron">' +
  '<h2>__contenido__</h2>' +
  '<p>__autor__</p>' +
  '<span>__respuestas__</span>' +
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

var filtro = {
  url: 'http://examen-laboratoria-sprint-5.herokuapp.com/topics/topic_id'
}
var filtrarTema = function(e) {
  e.preventDefault();
  var criterioBusqueda = $("#search").val().toLowerCase();
  $.get(filtro.url, {
    id
    content: criterioBusqueda
  }, function(response){
    var temaFiltrado = $('#temas').filter(function(tema) {
    return tema.id.toLowerCase().indexOf(criterioBusqueda) >= 0;
  });
  cargarTemas(temaFiltrado);
});
};

$(document).ready(cargarPagina);
