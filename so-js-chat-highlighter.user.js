// ==UserScript==
// @name SOJSChatHighlight
// @description Syntax Highlighting for code in StackOverflow JS chatroom!
// @match http://chat.stackoverflow.com/rooms/*
// @version 0.0.1
// ==/UserScript==
 
var main = function () {
  var highlight = function () {
      $(".message pre, .message code").addClass("language-javascript prettyprint");
      prettyPrint();
      $('.prettyprint .tag').removeClass('tag').addClass('htmlTag');
  }
 
  $(document.body).append($('<script>', { src: "http://www.dhar.fr/prettyprint-bookmarklet/lib/prettify.js", onload: highlight }));
  $(document.body).append($('<link>', { href: "http://www.dhar.fr/prettyprint-bookmarklet/lib/prettify.css", rel: 'stylesheet'}));
  $('head').append($('<style>', { type: 'text/css', html: '.message .prettyprint { background: #ffffff; border: 1px solid #f6f6f6; border-radius: 6px; }' }));
 
  $.post("/ws-auth", fkey({roomid: /\d+/.exec(location)[0] }), function (data) { 
      var socket = new WebSocket(data.url + "?l=99999999999");
      socket.addEventListener('message', highlight);
  });
};
 
var script = document.createElement('script');
script.type = "text/javascript";
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild(script);