/* AI Playground for Climate Action: shared behavior.
   - Embed mode: ?embed=1 (or automatically when the page sits in an iframe;
     ?embed=0 forces the full shell). The class is set early by a one-line
     script in each page's <head>; this file handles the rest.
   - Height messages so a Hub (Ghost) page can size the iframe:
     window.parent.postMessage({ type: 'ter-playground:height', height: <px> }, '*')
   - 'Contents' disclosure on narrow screens.
   - Step-by-step walk-throughs: any element with [data-walkthrough] whose
     children are <section class="step" data-title="...">.
   Nothing here stores, sends or tracks anything a visitor does. */

(function () {
  'use strict';

  var root = document.documentElement;
  var isEmbed = root.classList.contains('embed');

  /* ---------- Embed mode: links ---------- */
  // Inside an iframe, any link that leaves the current page opens in a new
  // tab, so the visitor does not lose their place in the Hub story.
  function prepareLinks() {
    var links = document.querySelectorAll('a[href]');
    for (var i = 0; i < links.length; i++) {
      var a = links[i];
      var href = a.getAttribute('href');
      if (!href || href.charAt(0) === '#') continue;
      var external = /^https?:\/\//i.test(href);
      if (external || isEmbed) {
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener');
      }
    }
  }

  /* ---------- Height messages ---------- */
  var lastHeight = 0;
  function sendHeight() {
    if (window.parent === window) return;
    var h = Math.ceil(document.body.getBoundingClientRect().height);
    if (Math.abs(h - lastHeight) < 2) return;
    lastHeight = h;
    try {
      window.parent.postMessage({ type: 'ter-playground:height', height: h }, '*');
    } catch (e) { /* parent not reachable: the fixed iframe height applies */ }
  }
  function watchHeight() {
    if (window.parent === window) return;
    if ('ResizeObserver' in window) {
      new ResizeObserver(sendHeight).observe(document.body);
    } else {
      window.addEventListener('resize', sendHeight);
      setInterval(sendHeight, 1000);
    }
    window.addEventListener('load', sendHeight);
    sendHeight();
  }

  /* ---------- Contents disclosure ---------- */
  function setupContents() {
    var btn = document.querySelector('.contents-toggle');
    var nav = document.querySelector('.sidebar-nav');
    if (!btn || !nav) return;
    var mq = window.matchMedia('(max-width: 860px)');
    function apply() {
      if (mq.matches) {
        nav.hidden = btn.getAttribute('aria-expanded') !== 'true';
      } else {
        nav.hidden = false;
      }
    }
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
      btn.querySelector('.toggle-sign').textContent = open ? '+' : '−';
      apply();
    });
    if (mq.addEventListener) mq.addEventListener('change', apply); else mq.addListener(apply);
    apply();
  }

  /* ---------- Walk-through steps ---------- */
  function setupWalkthrough(container) {
    var steps = Array.prototype.slice.call(container.querySelectorAll(':scope > section.step'));
    if (!steps.length) return;
    var current = 0;
    var live = document.createElement('p');
    live.className = 'visually-hidden';
    live.setAttribute('aria-live', 'polite');
    container.parentNode.insertBefore(live, container);

    var progress = document.createElement('ol');
    progress.className = 'steps-progress';
    progress.setAttribute('aria-label', 'Steps');
    steps.forEach(function (step, i) {
      var li = document.createElement('li');
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = (i + 1) + '. ' + (step.getAttribute('data-title') || 'Step');
      b.addEventListener('click', function () { show(i, true); });
      li.appendChild(b);
      progress.appendChild(li);
    });
    container.parentNode.insertBefore(progress, container);
    var pills = progress.querySelectorAll('button');

    steps.forEach(function (step, i) {
      var nav = document.createElement('div');
      nav.className = 'step-nav';
      var prev = document.createElement('button');
      prev.type = 'button';
      prev.className = 'btn';
      prev.textContent = 'Back';
      prev.disabled = i === 0;
      prev.addEventListener('click', function () { show(i - 1, true); });
      nav.appendChild(prev);
      if (i < steps.length - 1) {
        var next = document.createElement('button');
        next.type = 'button';
        next.className = 'btn btn-primary';
        next.textContent = 'Next: ' + (steps[i + 1].getAttribute('data-title') || 'next step');
        next.addEventListener('click', function () { show(i + 1, true); });
        nav.appendChild(next);
      } else {
        var restart = document.createElement('button');
        restart.type = 'button';
        restart.className = 'btn';
        restart.textContent = 'Start again';
        restart.addEventListener('click', function () { show(0, true); });
        nav.appendChild(restart);
      }
      step.appendChild(nav);
    });

    function show(i, moveFocus) {
      if (i < 0 || i >= steps.length) return;
      current = i;
      steps.forEach(function (s, j) { s.hidden = j !== i; });
      for (var j = 0; j < pills.length; j++) {
        if (j === i) pills[j].setAttribute('aria-current', 'step'); else pills[j].removeAttribute('aria-current');
        pills[j].classList.toggle('done', j < i);
      }
      live.textContent = 'Step ' + (i + 1) + ' of ' + steps.length + ': ' + (steps[i].getAttribute('data-title') || '');
      if (moveFocus) {
        var h = steps[i].querySelector('h2');
        if (h) {
          h.setAttribute('tabindex', '-1');
          h.focus({ preventScroll: true });
        }
        var top = progress.getBoundingClientRect().top;
        if (top < 0) progress.scrollIntoView({ block: 'start' });
      }
      sendHeight();
      container.dispatchEvent(new CustomEvent('stepchange', { detail: { index: i } }));
    }
    show(0, false);
  }

  /* ---------- Small helpers shared by the pages ---------- */
  window.Playground = {
    isEmbed: isEmbed,
    sendHeight: sendHeight,
    el: function (tag, attrs, text) {
      var e = document.createElement(tag);
      if (attrs) for (var k in attrs) {
        if (k === 'class') e.className = attrs[k];
        else e.setAttribute(k, attrs[k]);
      }
      if (text != null) e.textContent = text;
      return e;
    }
  };

  function init() {
    prepareLinks();
    setupContents();
    var walks = document.querySelectorAll('[data-walkthrough]');
    for (var i = 0; i < walks.length; i++) setupWalkthrough(walks[i]);
    watchHeight();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
