$(document).ready(function(){
	if(!$.browser.msie){
		$('#projectText').hide()
		$('#ipadsContainer').hide()
		$('#nav > ul > li').css('opacity', 0);
		$('#titleContainer').hide();
	}
});

$(window).load(function(){
	if(!$.browser.msie){
		setTimeout(function(){
			animateHead();
			animateBody();
		}, 500);
	}
});

function animateHead(){
	var timeDif = 0;
	$('#nav > ul > li').each(function(){
		setTimeout(fadeNav, timeDif, this);
		timeDif = timeDif + 300;
	}).css('opacity', 0);
	$('#titleContainer').hide();
	$('#titleContainer').fadeIn(1500);
}

function fadeNav(obj)
{
	$(obj).animate({
		'opacity': 1
	}, 1500);
}

function animateBody()
{
	$('#ipadsContainer').hide().fadeIn(2500);
	$('#projectText').hide()
	setTimeout(function(){ $('#projectText').hide().slideDown(1500); }, 500);
}