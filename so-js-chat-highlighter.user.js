// ==UserScript==
// @name SOJSChatHighlight
// @description Syntax Highlighting for code in StackOverflow JS chatroom!
// @match http://chat.stackoverflow.com/rooms/*
// @version 0.0.4
// ==/UserScript==
 
var main = function () {
  var highlight = function (event) {
      $(".message pre, .message code").addClass("lang-js prettyprint");
      prettyPrint();
      $('.prettyprint .tag').removeClass('tag').addClass('htmlTag');
  }
 
  $(document.body).append($('<link>', { href: "https://raw.github.com/phenomnomnominal/SO-JS-Chat-Highlighter/master/prettify.css", rel: 'stylesheet'}));
  $(document.body).append($('<script>', { src: "https://raw.github.com/phenomnomnominal/SO-JS-Chat-Highlighter/master/prettify.js", onload: highlight }));
  $('head').append($('<style>', { type: 'text/css', html: '.message .prettyprint { background: #ffffff; border: 1px solid #f6f6f6; border-radius: 6px; }' }));
 
  $(document).on('click', '.more-data', {}, highlight);
 
  $.post("/ws-auth", fkey({roomid: /\d+/.exec(location)[0] }), function (data) { 
      var socket = new WebSocket(data.url + "?l=99999999999");
      socket.addEventListener('message', highlight);
  });
};
 
var script = document.createElement('script');
script.type = "text/javascript";
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild(script);
