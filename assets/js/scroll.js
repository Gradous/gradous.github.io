/* File: scroll.js 
 * - provides smooth scrolling function
 */
$(document).ready(function () {
	$(".scroll").on('click', function(event) {
		event.preventDefault();
		var section_id = $(this).attr("data-id");
		var scroll_offset = $(this).attr("scroll-offset");
		scroll_to_id("#" + section_id, 500, scroll_offset);
	});
});

function scroll_to_id(id, speed, spacing) {
	// this is how far extra we want above what we scroll to
	// https://stackoverflow.com/questions/894860/set-a-default-parameter-value-for-a-javascript-function
	spacing = typeof spacing !== 'undefined' ? spacing : 80;
	var offset = spacing;
	var target_offset = $(id).offset().top - offset;
	$('html,body').animate({scrollTop:target_offset}, speed);
}
