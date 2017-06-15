var topicId = getParameterByName('topic_id');

//Solo por propositos de debug
if(topicId){
  alert("El topic ID es:"+topicId);
}

var api = {
  url: 'http://examen-laboratoria-sprint-5.herokuapp.com/topics/'+ topicId
}
var plantillaFinal = '';
var cargarPagina = function() {
  cargarTemas();
};

var cargarTemas = function() {
  $.getJSON(api.url, function(tema) {

      var autor = tema.author_name;
      var contenido = tema.content;
      var id = tema.id;
      var respuestas = tema.responses_count;
      plantillaFinal += plantilla.replace("__autor__", autor)
        .replace("__contenido__", contenido)
        .replace("__id__", id)
        .replace("__respuestas__", respuestas);

    $('#topic').html(plantillaFinal);
  });

};


var plantilla= '<div class="jumbotron">' +
  '<h2>__contenido__</h2>' +
  '<p>__autor__</p>' +
  '<p>__respuestas__</p>' +
  '<button class="btn-success btn-sm" data-toggle="modal" data-target="#myModal">Respuesta</button>'+
  '</div>';



  $(document).ready(cargarPagina);
