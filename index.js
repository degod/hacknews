
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
function timeSince(date) {
  switch (typeof time) {
    case 'number':
      break;
    case 'string':
      time = +new Date(time);
      break;
    case 'object':
      if (time.constructor === Date) time = time.getTime();
      break;
    default:
      time = +new Date();
  }
  var time_formats = [
    [60, 'seconds', 1], // 60
    [120, '1 minute ago', '1 minute from now'], // 60*2
    [3600, 'minutes', 60], // 60*60, 60
    [7200, '1 hour ago', '1 hour from now'], // 60*60*2
    [86400, 'hours', 3600], // 60*60*24, 60*60
    [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
    [604800, 'days', 86400], // 60*60*24*7, 60*60*24
    [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
    [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
    [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
    [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
    [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
    [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
    [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
    [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
  ];
  var seconds = (+new Date() - time) / 1000,
    token = 'ago',
    list_choice = 1;

  if (seconds == 0) {
    return 'Just now'
  }
  if (seconds < 0) {
    seconds = Math.abs(seconds);
    token = 'from now';
    list_choice = 2;
  }
  var i = 0,
    format;
  while (format = time_formats[i++])
    if (seconds < format[0]) {
      if (typeof format[2] == 'string')
        return format[list_choice];
      else
        return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
    }
  return time;
}

var headlinesIDs = [];
var page = getUrlParameter('paginate');
if(isNaN(page) || page == undefined || page == 0 || page == ""){
    page = 0;
}
var request = new httpRequest();
request.method = "GET";
request.url = "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty";
request.success = function(e) {
    printHeadlines(e);
};
request.send();

function printHeadlines(e){
    document.getElementById("display").innerHTML = "Done Loading and waiting for Action!";
    headlinesIDs = JSON.parse(e);
    var total = headlinesIDs.length;
    var pull = 30 + parseInt(page);
    if(total < 30){
        pull = total;
    }
    console.log("Page: "+page);
    console.log("Pull: "+pull);

    for(var i=page; i<pull; i++){
        var id = headlinesIDs[i];
        var request = new httpRequest();
        request.method = "GET";
        request.url = "https://hacker-news.firebaseio.com/v0/item/"+id+".json?print=pretty";
        request.success = function(e) {
            if(i == page)
                console.log(e);
            e = JSON.parse(e);
            var content = document.getElementById("headlines").innerHTML;
            document.getElementById("headlines").innerHTML = content+`
                `+(parseInt(i)+1)+`. &nbsp;<a href="index.html?newsid=`+id+`.json?print=pretty">
                    `+e.title+`
                </a> <a href="`+e.url+`">(`+e.url.split("/")[2].replace("www.", "")+`)</a><br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <small>`+e.score+` points by `+e.by+` `+timeSince(e.score)+` | `+e.kids.length+` comments</small><hr>
            `;
        };
        request.send();
    }
    if(pull < total){
        var content = document.getElementById("headlines").innerHTML;
        if(page == 0){
            document.getElementById("headlines").innerHTML = content+`
                <a href="index.html?paginate=`+pull+`">
                    See More ...
                </a><hr>
            `;
        }else{
            document.getElementById("headlines").innerHTML = content+`
                <div><a href="index.html?paginate=`+parseInt(page-30)+`">
                    << Previous Page
                </a><a href="index.html?paginate=`+pull+`" style="float:right">
                    Next Page >>
                </a></div><hr>
            `;
        }
    }
}
