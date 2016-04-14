
function getUrl(){  
	var url  =  location.href;
	return url.substring(0,url.indexOf("/",url.indexOf("//")+2));
}

$.ajaxDomain = function(config){
	$.ajax({
		url : getUrl()+"/proxy/xm?url="+encodeURIComponent(config.url+(config.url.indexOf('?')==-1?"?":"&")+config.data),
		success : config.success,
		error : config.error
	});
}