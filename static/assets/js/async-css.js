/* Non-blocking stylesheets: <link media="print" data-async-css> switches to all once loaded */
(function(){var l=document.querySelectorAll("link[data-async-css]");for(var i=0;i<l.length;i++){(function(x){function on(){x.media="all"}if(x.sheet){on()}else{x.addEventListener("load",on)}})(l[i])}})();
