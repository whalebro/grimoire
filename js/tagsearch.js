function parseURLParams(url) {
    var queryStart = url.indexOf("?") + 1,
        queryEnd   = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

    if (query === url || query === "") {
        return;
    }

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=");
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) {
            parms[n] = [];
        }

        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
}

function getTagSearchFromURL(url){
	return parseURLParams(url).tagSearch[0];
}

function doesTagListMatchTagSearch(tagSearch, tagList){
	var tagListArr = tagList.split(',');
	var tagSearchArr = tagSearch.split('&');
	outer:
	for (var i = 0; i < tagSearchArr.length; i++){
		for (var j = 0; j < tagListArr.length; j++){
			if (tagListArr[j].trim().toLowerCase() === tagSearchArr[i].trim().toLowerCase()){
				continue outer;
			}
		}
		return false;
	}
	return true;
}


function runTagSearch(){
	var lis = document.getElementsByTagName("li");
  	var query = getTagSearchFromURL(window.location.search);
  	for (var i = 0; i < lis.length; i++){
  		var li = lis[i];
  		if (li.dataset && li.dataset.tags){
  			var tagList = li.dataset.tags;
	  		if (!doesTagListMatchTagSearch(query, tagList)){
	  			li.classList.add("hide");
	  		} else {
	  			li.classList.remove("hide");
	  		}
  		}
  	}
}


