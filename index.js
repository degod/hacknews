
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

    var request = new httpRequest();
    request.method = "GET";
    request.url = "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty";
    request.success = function(response) {
        console.log(response);
    };
    request.fail = function(error) {
        console.log(error);
    };
    request.send();

	// $.ajax({
	// 	url: "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty",
 //        type: "GET",
	// 	beforeSend: function(){
	// 		$("#display").html("Loading up Top Stories!!!");
	// 	},
	// 	success: function(e){
	// 		$("#display").html("Done Loading and waiting for Action!");
 //            headlinesIDs = e;
 //            for(var i=0; i<headlinesIDs.length; i++){
 //                var id = headlinesIDs[i];
 //                $.ajax({
 //                    url: "https://hacker-news.firebaseio.com/v0/item/"+id+".json?print=pretty",
 //                    type: "GET",
 //                    beforeSend: function(){
 //                        $("#display").html("Loading up Headlines!!!");
 //                    },
 //                    success: function(e){
 //                        $("#display").html("Done Loading and waiting for Action!");
 //                        $("#headlines").append(`
 //                            <a href="read-news.html?newsid=`+id+`.json?print=pretty">
 //                                `+e.title+` by `+e.by+`
 //                            </a><hr>
 //                        `);
 //                    },
 //                    error: function(e){
 //                        response = e
 //                    }
 //                });
 //            }
 //        },
 //        error: function(e){
 //            console.log(e);
 //        }
 //    });
});