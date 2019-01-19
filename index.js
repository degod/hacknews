
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
function httpRequest() {
    var ajax = null,
        response = null,
        self = this;

    this.method = null;
    this.url = null;
    this.async = true;
    this.data = null;

    this.send = function() {
        ajax.open(this.method, this.url, this.asnyc);
        ajax.send(this.data);
    };

    if(window.XMLHttpRequest) {
        ajax = new XMLHttpRequest();
    }
    else if(window.ActiveXObject) {
        try {
            ajax = new ActiveXObject("Msxml2.XMLHTTP.6.0");
        }
        catch(e) {
            try {
                ajax = new ActiveXObject("Msxml2.XMLHTTP.3.0");
            }
            catch(error) {
                self.fail("not supported");
            }
        }
    }

    if(ajax == null) {
        return false;
    }

    ajax.onreadystatechange = function() {
        if(this.readyState == 4) {
            if(this.status == 200) {
                self.success(this.responseText);
            }
            else {
                self.fail(this.status + " - " + this.statusText);
            }
        }
    };
}
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
