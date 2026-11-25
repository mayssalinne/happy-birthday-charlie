/* ==========================================================================
   Charlie's Birthday — script.js
   You don't need to edit this file. All text, photos and songs
   live in content.js.
   ========================================================================== */
(function () {
  "use strict";

  var C = window.SITE_CONTENT || {};
  var SVG_NS = "http://www.w3.org/2000/svg";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- helpers ---------- */

  function get(path) {
    return path.split(".").reduce(function (o, k) { return o == null ? undefined : o[k]; }, C);
  }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function svgUse(id, cls) {
    var s = document.createElementNS(SVG_NS, "svg");
    if (cls) s.setAttribute("class", cls);
    s.setAttribute("aria-hidden", "true");
    var u = document.createElementNS(SVG_NS, "use");
    u.setAttribute("href", "#" + id);
    s.appendChild(u);
    return s;
  }
  function fmtTime(sec) {
    if (!isFinite(sec) || sec < 0) sec = 0;
    var m = Math.floor(sec / 60), s = Math.floor(sec % 60);
    return m + ":" + (s < 10 ? "0" : "") + s;
  }
  function filled(v) { return typeof v === "string" && v.trim() !== "" && v.trim() !== "#"; }

  /* ---------- 1. plain text bindings ---------- */

  document.querySelectorAll("[data-content]").forEach(function (node) {
    var v = get(node.getAttribute("data-content"));
    if (v != null) node.textContent = String(v).trim();
  });
  if (C.to) document.title = "Happy Birthday, " + C.to;

  /* ---------- 2. letter paragraphs ---------- */

  (function renderLetter() {
    var box = document.getElementById("letter-text");
    var body = (get("letter.body") || "").replace(/\r/g, "");
    body.split(/\n\s*\n/).map(function (p) { return p.replace(/\s*\n\s*/g, " ").trim(); })
      .filter(Boolean)
      .forEach(function (p) { box.appendChild(el("p", null, p)); });
  })();

  /* ---------- 3. museum: calendar page (October 2026, the 2nd circled) ---------- */

  (function renderCalendar() {
    var box = document.getElementById("calendar");
    if (!box) return;
    var year = 2026, month = 9, marked = 2;            // month is 0-based: 9 = October
    var first = new Date(year, month, 1).getDay();
    var days = new Date(year, month + 1, 0).getDate();
    box.appendChild(el("p", "calendar__month", "October " + year));
    var grid = el("div", "calendar__grid");
    "SMTWTFS".split("").forEach(function (d) { grid.appendChild(el("span", "calendar__dow", d)); });
    for (var i = 0; i < first; i++) grid.appendChild(el("span"));
    for (var d = 1; d <= days; d++) {
      var cell = el("span", "calendar__day", String(d));
      if (d === marked) {
        cell.classList.add("is-marked");
        var ring = document.createElementNS(SVG_NS, "svg");
        ring.setAttribute("class", "calendar__ring");
        ring.setAttribute("viewBox", "0 0 34 30");
        ring.setAttribute("aria-hidden", "true");
        var pth = document.createElementNS(SVG_NS, "path");
        pth.setAttribute("d", "M20 3C9 2 2 8 3 16s9 12 17 11 12-7 11-14S24 2 13 5");
        pth.setAttribute("fill", "none");
        pth.setAttribute("stroke", "#a8131e");
        pth.setAttribute("stroke-width", "1.8");
        pth.setAttribute("stroke-linecap", "round");
        ring.appendChild(pth);
        cell.appendChild(ring);
      }
      grid.appendChild(cell);
    }
    box.appendChild(grid);
  })();

  /* ---------- 3b. museum: the two candles ---------- */

  (function candles() {
    var btn = document.getElementById("candles");
    var card = document.getElementById("feature-card");
    var prompt = document.getElementById("candles-prompt");
    if (!btn) return;
    btn.setAttribute("aria-label", "Light the two candles");
    btn.addEventListener("click", function () {
      var lit = btn.getAttribute("aria-pressed") !== "true";
      btn.setAttribute("aria-pressed", String(lit));
      card.classList.toggle("is-lit", lit);
      prompt.textContent = lit ? get("museum.candles.litMessage") : get("museum.candles.prompt");
      btn.setAttribute("aria-label", lit ? "Blow out the candles" : "Light the two candles");
    });
  })();

  /* ---------- 3c. museum: the king ---------- */

  (function king() {
    var k = document.getElementById("king");
    var hint = document.getElementById("king-hint");
    if (!k) return;
    k.addEventListener("click", function () {
      var down = k.getAttribute("aria-pressed") !== "true";
      k.setAttribute("aria-pressed", String(down));
      hint.textContent = down ? "Game over." : get("museum.chess.prompt");
    });
  })();

  /* ---------- 4. playlist: liner notes + turntable ---------- */

  (function renderPlaylist() {
    var list = document.getElementById("tracklist");
    var vinyl = document.getElementById("vinyl");
    var vinylTrack = document.getElementById("vinyl-track");
    var now = document.getElementById("liner-now");
    var idle = now.textContent;
    var playerBox = document.getElementById("spotify-player");

    // turns any Spotify track link into the official embed player
    function trackId(link) {
      var m = /track[\/:]([A-Za-z0-9]{22})/.exec(link || "");
      return m ? m[1] : null;
    }
    function loadPlayer(song) {
      var id = trackId(song && song.spotify);
      if (!id) { playerBox.hidden = true; playerBox.replaceChildren(); return; }
      var current = playerBox.querySelector("iframe");
      var src = "https://open.spotify.com/embed/track/" + id + "?utm_source=generator&theme=0";
      if (current && current.src === src) { playerBox.hidden = false; return; }
      var f = el("iframe");
      f.src = src;
      f.title = "Listen to " + (song.title || "this song") + " on Spotify";
      f.loading = "lazy";
      f.allow = "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
      playerBox.replaceChildren(f);
      playerBox.hidden = false;
    }
    var songs = get("playlist.songs") || [];
    var rows = [];

    songs.forEach(function (s, i) {
      var li = el("li", "track");
      var pick = el("button", "track__pick");
      pick.type = "button";
      pick.setAttribute("aria-pressed", "false");
      pick.appendChild(el("span", "track__title", s.title || ""));
      if (filled(s.artist)) pick.appendChild(el("span", "track__artist", s.artist));
      li.appendChild(pick);

      var a = el("a", "track__link");
      a.appendChild(el("span", null, "Spotify"));
      a.appendChild(svgUse("i-arrow"));
      a.href = filled(s.spotify) ? s.spotify
        : "https://open.spotify.com/search/" + encodeURIComponent((s.title || "") + " " + (s.artist || ""));
      a.target = "_blank"; a.rel = "noopener";
      a.setAttribute("aria-label", "Listen to " + (s.title || "this song") + " on Spotify");
      li.appendChild(a);

      pick.addEventListener("click", function () {
        var already = li.classList.contains("is-active");
        rows.forEach(function (r) { r.li.classList.remove("is-active"); r.pick.setAttribute("aria-pressed", "false"); });
        if (already) {
          vinyl.classList.remove("is-spinning");
          vinylTrack.textContent = "C & A";
          now.textContent = idle;
          return;
        }
        li.classList.add("is-active");
        pick.setAttribute("aria-pressed", "true");
        vinyl.classList.add("is-spinning");
        vinylTrack.textContent = s.title;
        now.textContent = "On the turntable: " + s.title + (s.artist ? " — " + s.artist : "");
        loadPlayer(s);
      });

      rows.push({ li: li, pick: pick });
      list.appendChild(li);
    });

    // the first song with a Spotify track link is ready to play when the page opens
    var firstPlayable = songs.filter(function (s) { return trackId(s.spotify); })[0];
    if (firstPlayable) loadPlayer(firstPlayable);

    var full = document.getElementById("full-playlist");
    if (filled(get("playlist.fullPlaylistLink"))) { full.href = get("playlist.fullPlaylistLink"); full.hidden = false; }
  })();

  /* ---------- 5. cross-stitch pixel art ---------- */

  var PIXELS = {
    heart: [
      ".XX.XX.",
      "XXXXXXX",
      "XXXXXXX",
      ".XXXXX.",
      "..XXX..",
      "...X..."
    ],
    "mini-heart": [
      ".X.X.",
      "XXXXX",
      ".XXX.",
      "..X.."
    ],
    bow: [
      ".XXX.....XXX.",
      "X...X...X...X",
      "X....X.X....X",
      "X.....X.....X",
      "X....XXX....X",
      ".XXXX.X.XXXX.",
      ".....X.X.....",
      "....X...X....",
      "...X.....X..."
    ],
    flourish: [
      "XXXXXXXXXXXXXXXXXX",
      "X.................",
      "X..XXX............",
      "X.X...X...........",
      "X.X.X.X..X........",
      "X.X..X..X.X.......",
      "X..X.....X........",
      "X...XXX...........",
      "X......X..........",
      "X.......X.........",
      "X.X......X........",
      "XX.X......X.......",
      "X.X.......X.......",
      "X........X........",
      "X.................",
      "X.................",
      "X.................",
      "X................."
    ]
  };

  document.querySelectorAll("[data-pixel]").forEach(function (node) {
    var map = PIXELS[node.getAttribute("data-pixel")];
    if (!map) return;
    var w = map[0].length, h = map.length, size = 10;
    var svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("viewBox", "0 0 " + w * size + " " + h * size);
    svg.setAttribute("fill", "currentColor");
    map.forEach(function (row, y) {
      for (var x = 0; x < w; x++) {
        if (row[x] !== "X") continue;
        var r = document.createElementNS(SVG_NS, "rect");
        r.setAttribute("x", x * size + 1); r.setAttribute("y", y * size + 1);
        r.setAttribute("width", size - 2); r.setAttribute("height", size - 2);
        r.setAttribute("rx", 2.5);
        svg.appendChild(r);
      }
    });
    node.appendChild(svg);
  });

  /* ---------- 6. drawn frames (ribbon, scallop, lace) ---------- */

  function makeSvg(w, h) {
    var s = document.createElementNS(SVG_NS, "svg");
    s.setAttribute("viewBox", "0 0 " + w + " " + h);
    s.setAttribute("preserveAspectRatio", "none");
    return s;
  }
  function path(d, attrs) {
    var p = document.createElementNS(SVG_NS, "path");
    p.setAttribute("d", d);
    for (var k in attrs) p.setAttribute(k, attrs[k]);
    return p;
  }

  /* wavy ribbon around a rectangle, like the hand-drawn birthday card */
  function ribbonPath(w, h, amp, wave, phase) {
    var pts = [], step = 4;
    function edge(len, fn) {
      var n = Math.max(2, Math.round(len / wave)), wl = len / n;
      for (var d = 0; d <= len; d += step) pts.push(fn(d, amp * Math.sin((d / wl) * Math.PI * 2 + phase)));
    }
    edge(w, function (d, o) { return [d, o]; });
    edge(h, function (d, o) { return [w + o, d]; });
    edge(w, function (d, o) { return [w - d, h + o]; });
    edge(h, function (d, o) { return [o, h - d]; });
    return "M" + pts.map(function (p) { return p[0].toFixed(1) + " " + p[1].toFixed(1); }).join("L") + "Z";
  }

  function drawRibbon(node) {
    var w = node.clientWidth, h = node.clientHeight;
    if (!w || !h) return;
    var color = node.getAttribute("data-ribbon-color") || "currentColor";
    var small = w < 480;
    var s = makeSvg(w, h);
    s.style.color = color;
    var common = { fill: "none", stroke: "currentColor", "stroke-linejoin": "round", "stroke-linecap": "round" };
    s.appendChild(path(ribbonPath(w, h, small ? 5 : 7, small ? 34 : 46, 0), Object.assign({ "stroke-width": small ? 4.5 : 6 }, common)));
    s.appendChild(path(ribbonPath(w, h, small ? 3 : 4.5, small ? 34 : 46, 1.1), Object.assign({ "stroke-width": 1.4, opacity: ".55" }, common)));
    node.replaceChildren(s);
  }

  /* scalloped postage-stamp outline */
  function drawScallop(node) {
    var w = node.clientWidth, h = node.clientHeight;
    if (!w || !h) return;
    var target = 26;
    var nx = Math.max(2, Math.round(w / target)), ny = Math.max(2, Math.round(h / target));
    var rx = w / nx / 2, ry = h / ny / 2, d = "M0 0", i;
    for (i = 0; i < nx; i++) d += "a" + rx + " " + rx + " 0 0 1 " + rx * 2 + " 0";
    for (i = 0; i < ny; i++) d += "a" + ry + " " + ry + " 0 0 1 0 " + ry * 2;
    for (i = 0; i < nx; i++) d += "a" + rx + " " + rx + " 0 0 1 " + -rx * 2 + " 0";
    for (i = 0; i < ny; i++) d += "a" + ry + " " + ry + " 0 0 1 0 " + -ry * 2;
    var s = makeSvg(w, h);
    s.appendChild(path(d + "Z", { fill: "none", stroke: "currentColor", "stroke-width": 1.6 }));
    node.replaceChildren(s);
  }

  /* points spaced evenly along an ellipse */
  function ellipsePoints(cx, cy, rx, ry, spacing) {
    var samples = 720, pts = [], len = 0, prev = null, i, t;
    var raw = [];
    for (i = 0; i <= samples; i++) {
      t = (i / samples) * Math.PI * 2;
      var p = [cx + rx * Math.cos(t), cy + ry * Math.sin(t), t];
      if (prev) len += Math.hypot(p[0] - prev[0], p[1] - prev[1]);
      p.push(len); raw.push(p); prev = p;
    }
    var n = Math.max(8, Math.round(len / spacing)), seg = len / n, j = 0;
    for (i = 0; i < n; i++) {
      var target = i * seg;
      while (j < raw.length - 1 && raw[j][3] < target) j++;
      pts.push(raw[j]);
    }
    return pts;
  }

  function circle(cx, cy, r, attrs) {
    var c = document.createElementNS(SVG_NS, "circle");
    c.setAttribute("cx", cx.toFixed(1)); c.setAttribute("cy", cy.toFixed(1)); c.setAttribute("r", r.toFixed(1));
    for (var k in attrs) c.setAttribute(k, attrs[k]);
    return c;
  }
  function ellipse(cx, cy, rx, ry, attrs) {
    var e = document.createElementNS(SVG_NS, "ellipse");
    e.setAttribute("cx", cx); e.setAttribute("cy", cy); e.setAttribute("rx", rx.toFixed(1)); e.setAttribute("ry", ry.toFixed(1));
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }

  /* cut-paper lace oval, like the red "special day" card */
  function drawLace(node) {
    var w = node.clientWidth, h = node.clientHeight;
    if (!w || !h) return;
    var small = w < 420;
    var cream = "#fbf4ec", red = "#9e2330", pink = "#c9707b";
    var cx = w / 2, cy = h / 2;
    var R = small ? 10 : 17;                 // outer scallop radius
    var rx = cx - R, ry = cy - R;
    var s = makeSvg(w, h);
    s.setAttribute("preserveAspectRatio", "xMidYMid meet");

    // outer scallops
    ellipsePoints(cx, cy, rx, ry, R * 1.55).forEach(function (p) { s.appendChild(circle(p[0], p[1], R, { fill: cream })); });
    s.appendChild(ellipse(cx, cy, rx, ry, { fill: cream }));

    // eyelet holes just inside the scallops
    ellipsePoints(cx, cy, rx - 2, ry - 2, R * 1.55).forEach(function (p) { s.appendChild(circle(p[0], p[1], R * .28, { fill: red })); });

    // openwork band
    var b1 = R * 1.5, b2 = R * 3.1;
    s.appendChild(ellipse(cx, cy, rx - b1, ry - b1, { fill: pink }));
    ellipsePoints(cx, cy, rx - (b1 + b2) / 2, ry - (b1 + b2) / 2, R * 1.3).forEach(function (p, i) {
      var r = i % 2 ? R * .42 : R * .62;
      s.appendChild(circle(p[0], p[1], r, { fill: cream }));
    });
    s.appendChild(ellipse(cx, cy, rx - b2, ry - b2, { fill: cream }));

    // dotted bead ring
    ellipsePoints(cx, cy, rx - b2 - R * .75, ry - b2 - R * .75, R * .9).forEach(function (p) {
      s.appendChild(circle(p[0], p[1], R * .2, { fill: red }));
    });
    s.appendChild(ellipse(cx, cy, rx - b2 - R * 1.5, ry - b2 - R * 1.5, { fill: "none", stroke: red, "stroke-width": 1, opacity: ".5" }));

    node.replaceChildren(s);
  }

  var drawers = [
    ["[data-ribbon-frame]", drawRibbon],
    ["[data-scallop-frame]", drawScallop],
    ["[data-lace]", drawLace]
  ];
  var ro = "ResizeObserver" in window ? new ResizeObserver(function (entries) {
    entries.forEach(function (e) { e.target.__draw(e.target); });
  }) : null;
  drawers.forEach(function (d) {
    document.querySelectorAll(d[0]).forEach(function (node) {
      node.__draw = d[1];
      d[1](node);
      if (ro) ro.observe(node);
    });
  });
  if (!ro) window.addEventListener("resize", function () {
    drawers.forEach(function (d) { document.querySelectorAll(d[0]).forEach(d[1]); });
  });

  /* ---------- 7. opening envelope ---------- */

  var opening = document.getElementById("opening");
  var envelope = document.getElementById("envelope");
  var opened = false;

  function openLetter() {
    if (opened) return;
    opened = true;
    opening.classList.add("is-opening");
    envelope.classList.add("is-open");
    var wait = reduceMotion ? 50 : 1900;
    setTimeout(function () {
      opening.classList.add("is-leaving");
      document.body.classList.remove("is-locked");
      window.scrollTo(0, 0);
      // re-measure frames now that the page is visible
      drawers.forEach(function (d) { document.querySelectorAll(d[0]).forEach(d[1]); });
      var letter = document.getElementById("letter");
      letter.setAttribute("tabindex", "-1");
      letter.focus({ preventScroll: true });
      document.querySelector(".skip-link").hidden = true;
      setTimeout(function () { opening.hidden = true; }, reduceMotion ? 50 : 1150);
    }, wait);
  }

  document.getElementById("open-letter").addEventListener("click", openLetter);
  document.querySelectorAll("[data-open]").forEach(function (b) { b.addEventListener("click", openLetter); });
  document.querySelector(".skip-link").addEventListener("click", function (e) { e.preventDefault(); openLetter(); });

  document.getElementById("read-again").addEventListener("click", function () {
    document.getElementById("letter").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  });

  /* ---------- 8. scroll reveals ---------- */

  var revealables = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    revealables.forEach(function (n) { io.observe(n); });
  } else {
    revealables.forEach(function (n) { n.classList.add("is-visible"); });
  }

})();
