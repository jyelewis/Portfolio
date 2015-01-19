/*
	$(window).on('popstate', function(data){
		if(data.originalEvent.state != null)
		{
			//console.log(window.location.href.toString().split(window.location.host)[1]);
			console.log(':');
			console.log(data.originalEvent.state);
			loadPage(data.originalEvent.state, false);
		} else {
			console.log(data.originalEvent.state);
		}
	});
*/

$(document).ready(function(){
	if (window.history.pushState)
	{
		$("a").click(function(e){
			if(!$(this).hasClass('noAjax')) {
				e.preventDefault();
				loadPage($(this).attr('href'));
			}
		});
	}
});

function loadPage(url, addState){
	if (url == window.location.href.toString().split(window.location.host)[1])
	{
		return false;
	}
	$.ajax({
		url: url,
		data: {isAjax: '1'}
	}).done(function(data) {
		var upTime		= 400;
		var downTime	= 600;
		data = JSON.parse(data);
		if(typeof addState == 'undefined') {
			window.history.pushState(window.location.href.toString().split(window.location.host)[1], 'Jye Lewis\'s Portfolio - ' + $("title").text, url);	
		}
		$("title").text('Jye Lewis\'s Portfolio - ' + data.pageTitle);
		$('#contentContainer').prepend('<div class="bodyContent hidden new">' + data.body + '</div>');
		Cufon.refresh();
		$('.bodyContent.current').slideUp(upTime, function(){
			$(this).remove();
			$('.bodyContent.new').removeClass('new').slideDown(downTime, function(){
				$(this).addClass('current');
			});
		});
	});
	return true;
}