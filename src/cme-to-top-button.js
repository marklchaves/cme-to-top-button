// To Top Global
var cme_toTopButton = document.getElementById("cme_toTopBut");

/*
 * y: the y coordinate to scroll, 0 = top
 * duration: scroll duration in milliseconds; default is 0 (no transition)
 * element: the html element that should be scrolled; default is the main
 *          scrolling element
 */
function cme_scrollToY (y, duration = 0, element = document.scrollingElement) {
  // cancel if already on target position
  if (element.scrollTop === y) return;

  const cosParameter = (element.scrollTop - y) / 2;
  let scrollCount = 0, oldTimestamp = null;

  function step (newTimestamp) {
    if (oldTimestamp !== null) {
      // if duration is 0 scrollCount will be Infinity
      scrollCount += Math.PI * (newTimestamp - oldTimestamp) / duration;
      if (scrollCount >= Math.PI) return element.scrollTop = y;
      element.scrollTop = cosParameter + y + cosParameter * Math.cos(scrollCount);
    }
    oldTimestamp = newTimestamp;
    window.requestAnimationFrame(step);
  }
  window.requestAnimationFrame(step);
}

/*
 * duration: scroll duration in milliseconds; default is 0 (no transition)
 * this function is using the cme_scrollToY function
 */
function cme_scrollToTop(duration = 0) {
  cme_scrollToY(0, duration, document.scrollingElement);
}

/*
 * id: the id of the element as a string that should be scrolled to
 * duration: scroll duration in milliseconds; default is 0 (no transition)
 * this function is using the cme_scrollToY function on the main scrolling element
 */
function cme_scrollToId(id, duration = 0) {
  const offset = Math.round(document.getElementById(id).getBoundingClientRect().top);
	cme_scrollToY(document.scrollingElement.scrollTop + offset, duration);
}

/*
 * element: the node object that should be scrolled to
 * duration: scroll duration in milliseconds; default is 0 (no transition)
 * this function is using the cme_scrollToY function on the main scrolling element
 */
function cme_scrollToElement(element, duration = 0) {
	const offset = Math.round(element.getBoundingClientRect().top);
	cme_scrollToY(document.scrollingElement.scrollTop + offset, duration);
}

/*
 * When we scroll down 20px from the top of the document, 
 * show the button.
 */
function cme_handleButtonRender() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    cme_toTopButton.style.display = "block";
  } else {
    cme_toTopButton.style.display = "none";
  }
}

// When we detect a scroll, determine whether to render the button.
window.onscroll = function () {
  cme_handleButtonRender();
};
