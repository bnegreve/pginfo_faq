// source code inspired from
// https://github.com/remy/permalink

(function () {

  'use strict';
  var className = 'anchor';
  var idcache = {};
  var count = 0;


  function permalink(){
    var $ = document.querySelectorAll.bind(document);

    var anchor = document.createElement('a');
    anchor.className = className;
    anchor.innerHTML = '<span></span>';
      [].forEach.call($('h1,h2,h3,h4,h5,h6'), function (el) {
	  if (!el.id) {
              // let's make one
              var id = (el.textContent||el.innerText).replace(/&.*?;/g, '').replace(/\s+/g, '-').replace(/[^\w\-]/g, '').toLowerCase();
              if (idcache[id]) {
		  id = id + '-' + count;
              }
              el.id = id;
              idcache[id] = 1;
	  }

	  var clone = anchor.cloneNode(true);
	  clone.href = '#' + el.id;
	  clone.innerHTML = el.innerHTML;
	  el.innerHTML = clone.outerHTML;
	  count = count + 1;
    });
  }

  if (document.querySelector && Function.prototype.bind) {
    permalink();
    if (window.location.hash && window.scrollY === 0) {
      // touching the location will cause the window to scroll
      window.location = window.location;
    }
  }
})();
