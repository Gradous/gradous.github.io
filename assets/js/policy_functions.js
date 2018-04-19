var superflag = false;
var ar1 = [];
var ar2 = [];

// Try to avoid javascript's crappy randomness
var recently_used = [];
// 20 first words, 20 second words
var MAX_QUEUE_LENGTH = 40;
var SPIN_RATE = 3;
var IMAGE_ROT = 0;
var TEXT_ROT = 0;

onload_f = function() {
	document.getElementById('titlebuzz').addEventListener('mousedown', superwords_start, false);
	document.getElementById('titlebuzz').addEventListener('mouseup', superwords_end, false);
	document.getElementById('titlebuzz').addEventListener('touchstart', superwords_start, false);
	document.getElementById('titlebuzz').addEventListener('touchend', superwords_end, false);
	document.getElementById('policyimage').style.height = 0;

	genwords();

	var xmlhttp = new XMLHttpRequest()
		xmlhttp.onload = function() {
			if (xmlhttp.readyState == 4 &&
					xmlhttp.status == 200) {
				window.ar1 = xmlhttp.response.split('\n')
			}
		}
	xmlhttp.open("get", 'firstwords.txt', false);
	xmlhttp.send();

	var xmlhttp2 = new XMLHttpRequest()
		xmlhttp2.onload = function() {
			if (xmlhttp2.readyState == 4 &&
					xmlhttp2.status == 200) {
				window.ar2 = xmlhttp2.response.split('\n')
			}
		}
	xmlhttp2.open("get", 'secondwords.txt', false);
	xmlhttp2.send();
	if (xmlhttp.readyState == 4 && xmlhttp2.readyState == 4)
		genwords();
};

genwords = function() {
	var str;
	str = genone();
	if (!(str === "e-" || str === "i")){
		str = str + " ";
	}
	str = str + gentwo();
	var d = document.getElementById('generatedword');
	d.innerHTML = str;
	d.setAttribute("title", str);
};

genone = function() {
	var choices;
	if (ar1 in window) {
		choices = window.ar1;
	}
	else {
		choices = ar1;
	}
	var c = choice(choices)
	return c;
};

gentwo = function() {
	var choices;
	if (ar2 in window) {
		choices = window.ar2;
	}
	else {
		choices = ar2;
	}
	var c = choice(choices)
	return c;
};

queue_add = function(word) {
	// remove element from queue (which is done in a shitty way)
	if (recently_used.length > MAX_QUEUE_LENGTH) {
		recently_used.shift();
	}
	recently_used.push(word);
};

choice = function(list) {
	var word;
	while (true) {
		word = list[Math.floor(Math.random() * (list.length - 1))].trim();
		// make sure we haven't used that word recently
		if (recently_used.indexOf(word) < 0) {
			//console.log(recently_used);
			break;
		}
	}
	// then add it to the queue so that it doesn't show up again for a while
	queue_add(word);
	return word;
};

special_func = function() {
	var pi = document.getElementById('policyimage');
	var h = parseInt(pi.style.height.split('%')[0]);
	if (h < 56)
		pi.style.height = (h + 1) + '%';

	IMAGE_ROT += SPIN_RATE;
	TEXT_ROT -= 5;
	rotate("policyimage", IMAGE_ROT);
	rotate("titlebuzz", TEXT_ROT);

	document.getElementById('spin').play();
	getRandomColor = function() {
		var letters = '0123456789ABCDEF'.split('');
		var color = '#';
		for (var i = 0; i < 6; i++ ) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	};
	document.getElementById('titlebuzz').innerHTML = "POLICY OVERLOAD!!!!!!";
	document.getElementById('titlebuzz').style.background = getRandomColor();
	document.getElementById('generatedword').style.color = getRandomColor();
};

superwords_start = function() {
	genwords();
	gen_timeout = setTimeout(function () {
			gen_int = setInterval("genwords()", 80);
			}, 750);
	warn_timeout = setTimeout(function () {
			warn_int = setInterval("special_func()", 20);
			}, 1750);
};

superwords_end = function() {
	if (typeof(gen_int) != "undefined")
		clearInterval(gen_int);
	if (typeof(warn_int) != "undefined")
		clearInterval(warn_int);
	if (typeof(gen_timeout) != "undefined")
		clearTimeout(gen_timeout);
	if (typeof(warn_timeout) != "undefined")
		clearTimeout(warn_timeout);
	document.getElementById('policyimage').style.height = '0%';
	rotate("policyimage", 0);
	rotate("titlebuzz", 0);
	document.getElementById('titlebuzz').innerHTML = "Build your own policy buzzwords!";
	document.getElementById('titlebuzz').style.background = "#fff";
	document.getElementById('generatedword').style.color = "#000";
	document.getElementById('spin').pause();
	document.getElementById('spin').currentTime = 0;
};

inspire = function() {
	var classes = document.getElementById("inspire_btn").classList;
	if (classes.contains("rainbow-wrapper")) {
		document.getElementById("inspire_btn").classList.remove("rainbow-wrapper");
		document.getElementById('policyimage').src = "assets/img/maximum_over_business.gif"
	}
	else {
		document.getElementById("inspire_btn").classList.add("rainbow-wrapper")
		document.getElementById('policyimage').src = "assets/img/inspired.png"
	}
}

rotate = function(id, degrees) {
	document.getElementById(id).style.transform = 'rotate('+degrees+'deg)'
};

