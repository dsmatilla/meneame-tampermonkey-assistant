// ==UserScript==
// @name       Meneame personal assistant
// @namespace  http://dsmatilla.com
// @author     @dsmatilla
// @version    1.4.3
// @description  Menú con varias funcionalidades para mejorar la experiencia de usuario en meneame.net
// @include      https://*.meneame.net/*
// @grant       GM_getValue
// @grant       GM_setValue
// @downloadURL	http://dsmatilla.com/scripts/mpa.js
// @updateURL	http://dsmatilla.com/scripts/mpa.js
// @copyright  2013 Este script está protegido por la GFYL 1.00
//	The Go Fuck Yourself Public License, version 1.00
//
//	Article 1
//	You can go fuck yourself.
//
//	END OF ALL TERMS AND CONDITIONS
// ==/UserScript==

function mhMenu() { // Build HTML structure
	// Set div attributes
	var button, div, html, chkd, x, i;


	
	// Menu title to open/close
	button = document.createElement("div");
	button.setAttribute("id", "mh_button");
	button.className = "mh_button";
	button.style.display = "block";
	button.style.border = "0";
	button.style.position = "absolute";
	button.style.top = "0";
	button.style.right = "300px";
	button.style.height = "17px";
	button.style.padding = "4px";
	html = "<a id='mh_close' style='color: white; text-decoration: none;'>MNM Asistente personal</a>";
	button.innerHTML = html;
	document.getElementById('header-top').appendChild(button);
	document.getElementById("mh_close").addEventListener("click", mhSwitchVisibility, true);
	
	
	
	
	// Menu
	div = document.createElement("div");
	div.setAttribute("id", "mh_menu");
	div.className = "mh_menu";
	div.style.display = "block";
	div.style.border = "0";
	div.style.position = "fixed";
	div.style.top = "120px";
	div.style.right = "20px";

	// Create inner html
	html = "";
	html += "<fieldset>";
	html += "<label>MNM Asistente personal</label>";
	html += "<form id='mhForm'>"; 

	// Switch position
	if(GM_getValue('mh_switchposition')) { chkd="checked"; } else { chkd=""; }
		html += "<br /><input type='checkbox' id='mh_switchposition' " + chkd + "/> Cambiar posición"; 

	// Hide blank
	if(GM_getValue('mh_hideblank')) { chkd="checked"; } else { chkd=""; }
		html += "<br /><input type='checkbox' id='mh_hideblank' " + chkd + "/> Ocultar blanqueados";

	// Fixed top bar
	if(GM_getValue('mh_fixedtopbar')) { chkd="checked"; } else { chkd=""; }
		html += "<br /><input type='checkbox' id='mh_fixedtopbar' " + chkd + "/> Menú estático";

	// Neutral mode
	if(GM_getValue('mh_neutralmode')) { chkd="checked"; } else { chkd=""; }
		html += "<br /><input type='checkbox' id='mh_neutralmode' " + chkd + "/> Modo neutral"; 
    
	// Disable rounded avatars
	if(GM_getValue('mh_roundedavatars')) { chkd="checked"; } else { chkd=""; }
		html += "<br /><input type='checkbox' id='mh_roundedavatars' " + chkd + "/> Quitar avatares redondos"; 

	html += "</form>";
	html += "<br /><span style='float:right; font-size: 0.7em;'>Bugs y sugerencias - <a href='http://meneame.net/user/RickDeckard'>@RickDeckard</a></span>";
	html += "<br /><span style='float:right; font-size: 0.7em;'><a target='_blank' href='http://twitter.com/dsmatilla'>@dsmatilla</a></span>";    
	html += "</fieldset>";

	// Display div
	div.innerHTML = html;
	document.body.appendChild(div);
    
	// Add listener to each checkbox in mhForm
	x=document.getElementById("mhForm");
	for (i=0;i<x.length;i++) {
		x.elements[i].addEventListener("click", mhActions, true);
	}
}

function mhActions() { // Perform actions
	var i, com, x;
    
	// Save form values
	x=document.getElementById('mhForm');
	for (i=0;i<x.length;i++) {
		GM_setValue(x.elements[i].id, x.elements[i].checked);
	}
    
	// Menu visibility
	document.getElementById('mh_menu').style.display = GM_getValue('mh_menu_display');

	// Switch menu position
	if(GM_getValue('mh_switchposition')) {
		com = document.getElementById("mh_menu");
		com.style.left = '';
		com.style.right = '20px';
	} else {
		com = document.getElementById("mh_menu");
		com.style.right = '';
		com.style.left = '20px';
	}
	
	// Hide blank
	if(GM_getValue('mh_hideblank')) {
		com = document.getElementsByClassName("hidden");
		for (i=0; i<com.length; i++) { com[i].style.display = 'none'; }     
	} else {
		com = document.getElementsByClassName("hidden");
		for (i=0; i<com.length; i++) { com[i].style.display = 'block'; }
	}
    
	// fixed top bar
	if(GM_getValue('mh_fixedtopbar')) {
		com = document.getElementById("header");
		com.style.position = 'fixed';
		com.style.zIndex = 10;
		com = document.getElementById("container");
		com.style.marginTop = '105px';
		document.getElementById("notifier").addEventListener("click", mhChangeNotifierPanel, true);
	} else {
		com = document.getElementById("header");
		com.style.position = null;
		com.style.zIndex = null;
		com = document.getElementById("container");
		com.style.marginTop = '0';
		document.getElementById("notifier").removeEventListener("click", mhChangeNotifierPanel, true);
	}
	
	// Neutral mode
	if(GM_getValue('mh_neutralmode')) {
		com = document.getElementsByClassName("comment-info");
		for (i=0; i<com.length; i++) { com[i].style.display = 'none'; }     
		com = document.getElementsByClassName("avatar");
		for (i=0; i<com.length; i++) { com[i].style.display = 'none'; }   
	} else {
		com = document.getElementsByClassName("comment-info");
		for (i=0; i<com.length; i++) { com[i].style.display = null; }
		com = document.getElementsByClassName("avatar");
		for (i=0; i<com.length; i++) { com[i].style.display = null; } 
	}
    
	// Disable rounded avatars
	if(GM_getValue('mh_roundedavatars')) {
		com = document.getElementsByClassName("avatar");
		for (i=0; i<com.length; i++) { com[i].style.borderRadius = '0em'; }   
		for (i=0; i<com.length; i++) { com[i].style.MozBorderRadius = '0em'; }
		for (i=0; i<com.length; i++) { com[i].style.WebkitBorderRadius = '0em'; }        
	} else {
		com = document.getElementsByClassName("avatar");
		for (i=0; i<com.length; i++) { com[i].style.borderRadius = '50%'; }   
		for (i=0; i<com.length; i++) { com[i].style.MozBorderRadius = '50%'; }
		for (i=0; i<com.length; i++) { com[i].style.WebkitBorderRadius = '50%'; }       		
	}
}


// Misc functions
function mhSwitchVisibility() {
	if(document.getElementById("mh_menu").style.display == 'none') {
		document.getElementById("mh_menu").style.display = 'block';
		GM_setValue("mh_menu_display", 'block');
	} else {
		document.getElementById('mh_menu').style.display = 'none';
		GM_setValue('mh_menu_display', 'none');
	}
}

function mhChangeNotifierPanel() {
	document.getElementById('notifier_panel').style.zIndex = 12;
	document.getElementById('notifier_panel').style.position = 'fixed';
}

// Display menu & others
mhMenu();

// Perform actions
mhActions(); 
