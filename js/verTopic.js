var topicId = getParameterByName('topic_id');

//Solo por propositos de debug


var api = {
  url: 'http://examen-laboratoria-sprint-5.herokuapp.com/topics/'+ topicId
}
var plantillaFinal = '';
var cargarPagina = function() {
  cargarTemas();
  $('#add-form').submit(agregarTema);
};

var cargarTemas = function() {
  $.getJSON(api.url, function(tema) {
      var autor = tema.author_name;
      var contenido = tema.content;
      var id = tema.id;
      var fecha = tema.created_at;
      var respuestas = tema.responses_count;
      plantillaFinal = plantilla.replace("__autor__", autor)
        .replace("__contenido__", contenido)
        .replace("__id__", id)
        .replace("__creado__", fecha);

    $('#topic').append(plantillaFinal);
  });

};


var plantilla= '<div class="jumbotron">' +
  '<div class= "contenido-res">' +
  '<h2>__contenido__</h2>' +
  '<p>__autor__</p>' +
  '<span><small> Creado: __creado__ </small></span>' +
  '<button class="btn-success btn-sm btn-res" data-toggle="modal" data-target="#myModal">Respuesta</button>'+
  '</div>' +
  '</div>';


  var agregarTema = function(e) {
    e.preventDefault();
    var autor = $('#autor-res').val();
    var contenido = $('#contenido-res').val();
    $.post(api.url, {
      author_name: autor,
      content: contenido
    }, function(response){
      $('#myModal').modal('hide');
      cargarTemas();
    });
  };


  $(document).ready(cargarPagina);
