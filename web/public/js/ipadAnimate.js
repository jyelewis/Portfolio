jQuery.fn.outerHTML = function(s) {
    return s
        ? this.before(s).remove()
        : jQuery("<p>").append(this.eq(0).clone()).html();
};

function rotateIpads(direction, time)
{
	$('.ipad').off();
	if($('#ipadsContainer .ipad').length > 3)
	{
		moveIpad(direction);
	}
	fromCenterIpad(direction, time);
	toCenterIpad(direction, time);
	hideIpad(direction, time*0.65);
	enterIpad(direction, time*0.65);
	setTimeout(rebindIpad, time);
}

function rebindIpad()
{
	$('.ipad.left').click(function(){
		rotateIpads('left', window.ipadTime);
	});
	$('.ipad.right').click(function(){
		rotateIpads('right', window.ipadTime);
	});
	$('.ipad.active').click(function(){
		openFancyBox($(this).children('.ipadContent').attr('data-image'));
	});
}

function openFancyBox(image)
{
	console.log(image)
	$("#fancyboxTrigger").attr('href', image);
	$("#fancyboxTrigger").click();
	
}

function fromCenterIpad(direction, time)
{
	if (direction == 'left')
	{
		var centerPos = '466px';
		var centerClass = 'right';
	} else {
		var centerPos = '0px';
		var centerClass = 'left';
	}

		var centerObj = $(".ipad.active");
	setTimeout(function(){
		centerObj.removeClass('active').addClass(centerClass);
	}, time/4);
	
	centerObj.animate({
		left: centerPos,
		top: '36px'
	}, time);
	centerObj.children('.ipadFrame').animate({
		width: '433px',
		height: '291px'
	}, time);
	centerObj.children('.ipadContent').animate({
		width: '350px',
		height: '221px',
		top: '35px',
		left: '42px'
	}, time);
}

function moveIpad(direction)
{
	if (direction == 'left')
	{
		if($('.ipad.left').prev().length == 0)
		{
			var obj = $('#ipadsContainer .ipad:last-child');
			$("#ipadsContainer").prepend(obj.outerHTML());
			$(obj).remove(); 
		}
	} else {
		if($('.ipad.right').next().length == 0)
		{
			var obj = $('#ipadsContainer .ipad:first-child');
			$("#ipadsContainer").append(obj.outerHTML());
			$(obj).remove(); 
		}
	}
}

function toCenterIpad(direction, time)
{
	if (direction == 'left')
	{
		var toCenter = $('.ipad.left');
	} else {
		var toCenter = $('.ipad.right');
	}
	setTimeout(function(){
		toCenter.addClass('active').removeClass('left').removeClass('right');
	}, time/4);
	toCenter.animate({
		top: '0px',
		left: '182px'
	}, time);
	toCenter.children('.ipadFrame').animate({
		width: '541px',
		height: '362px'
	}, time);
	toCenter.children('.ipadContent').animate({
		width: '435px',
		height: '278px',
		top: '42px',
		left: '53px'
	}, time);
}

function hideIpad(dir, time)
{
	if (dir == 'right')
	{
		var obj = $('.ipad.left');
		var leftPos = '-150px';
	} else {
		var obj = $('.ipad.right');
		var leftPos = '600px';
	}
	setTimeout(function(){
		obj.removeClass('left').removeClass('right')
	}, Math.floor(time/4));
	
	obj.animate({
		opacity: 0,
		left: leftPos,
		top: '42px'
	}, time);
	
	obj.children('.ipadFrame').animate({
		width: '324px',
		height: '218px'
	}, time);
	
	obj.children('.ipadContent').animate({
		width: '262px',
		height: '165px',
		top: '26px',
		left: '31px'
	}, time);
	setTimeout(function(){ obj.hide(); }, time);
}

function enterIpad(dir, time)
{
	if (dir == 'left')
	{
		var obj = $('.ipad.left').prev();
		var oldLeftPos = '-150px';
		var leftPos = '0px';
	} else {
		var obj = $('.ipad.right').next();
		var oldLeftPos = '600px';
		var leftPos = '466px';
	}
	setTimeout(function(){
		obj.addClass(dir);
	}, Math.floor(time/4));
	
	obj.css({
		opacity: 0,
		display: 'block',
		left: oldLeftPos,
		top: '42px'
	});
	obj.children('.ipadFrame').css({
		width: '324px',
		height: '218px'
	});
	obj.children('.ipadContent').css({
		width: '262px',
		height: '165px',
		top: '26px',
		left: '31px'
	});
	
	obj.animate({
		opacity: 1,
		left: leftPos,
		top: '36px'
	}, time);
	
	obj.children('.ipadFrame').animate({
		width: '433px',
		height: '291px'
	}, time);
	
	obj.children('.ipadContent').animate({
		width: '350px',
		height: '221px',
		top: '35px',
		left: '42px'
	}, time);
	
}