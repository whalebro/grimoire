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
	for (tag in tagSearchArr){
		for (tagCheck in tagListArr){
			if (tagCheck.toLowerCase().includes(tag.toLowerCase())){
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
  	for (li in lis){
  		var tagList = li.dataset.tags;
  		if (!doesTagListMatchTagSearch(query, tagList)){
  			li.classList.add("hide");
  		} else {
  			li.classList.remove("hide");
  		}
  	}
}

