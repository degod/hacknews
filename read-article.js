
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};
$(document).ready(function(){
    var id = getUrlParameter('newsid');
	$.ajax({
		url: "https://hacker-news.firebaseio.com/v0/item/"+id+".json?print=pretty",
        type: "GET",
		beforeSend: function(){
			$("#display").html("Loading up Story!!!");
		},
		success: function(e){
            $("#display").html("Done Loading and waiting for Action!");
            console.log(e);
            $("#headlines").append(`
                <div>`+e.title+`</div>
            `);
        },
        error: function(e){
            console.log(e);
        }
    });
});