
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
	var fetchData = function fetchData(url, data, type, what) {
		var response = "";
		$.ajax({
			type: type,
			url: url,
			data: data,
			beforeSend: function(){
				$("#display").html("Loading up "+what+"!!!");
			},
			success: function(e){
				$("#display").html("Done Loading and waiting for Action!");
				console.log(e);
				response = e;
			},
			error: function(e){
				response = e
			}
		});
		return response;
	};
	$(document).ready(function(){
		var headlinesID = fetchData("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty", "", "GET", "Top Stories");
		// var
	});