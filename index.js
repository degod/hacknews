
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
    var headlinesIDs = [];
	$.ajax({
		url: "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty",
        type: "GET",
		beforeSend: function(){
			$("#display").html("Loading up Top Stories!!!");
		},
		success: function(e){
			$("#display").html("Done Loading and waiting for Action!");
            headlinesIDs = e;
            var headlines = [];
            for(var i=0; i<headlinesIDs.length; i++){
                var id = headlinesIDs[i];
                $.ajax({
                    url: "https://hacker-news.firebaseio.com/v0/item/"+id+".json?print=pretty",
                    type: "GET",
                    beforeSend: function(){
                        $("#display").html("Loading up Headlines!!!");
                    },
                    success: function(e){
                        $("#display").html("Done Loading and waiting for Action!");
                        $("#headlines").append(`
                            <a href="https://hacker-news.firebaseio.com/v0/item/`+id+`.json?print=pretty">
                                `+e.title+` by `+e.by+`
                            </a><hr>
                        `);
                    },
                    error: function(e){
                        response = e
                    }
                });
            }
            console.log(headlines);
        },
        error: function(e){
            console.log(e);
        }
    });
});
