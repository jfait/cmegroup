(function (h) {
  h.html5 = {};
  h.html5.version = '6.10.4906';
  h = h.utils.css;
  h(
    '.jwplayer '.slice(0, -1) +
      ' div span a img ul li video'.split(' ').join(', .jwplayer ') +
      ', .jwclick',
    {
      margin: 0,
      padding: 0,
      border: 0,
      color: '#000000',
      'font-size': '100%',
      font: 'inherit',
      'vertical-align': 'baseline',
      'background-color': 'transparent',
      'text-align': 'left',
      direction: 'ltr',
      '-webkit-tap-highlight-color': 'rgba(255, 255, 255, 0)',
    },
  );
  h('.jwplayer ul', { 'list-style': 'none' });
})(jwplayer);
(function (h) {
  var k = document;
  h.parseDimension = function (b) {
    return 'string' == typeof b
      ? '' === b
        ? 0
        : -1 < b.lastIndexOf('%')
        ? b
        : parseInt(b.replace('px', ''), 10)
      : b;
  };
  h.timeFormat = function (b) {
    if (0 < b) {
      var a = Math.floor(b / 3600),
        e = Math.floor((b - 3600 * a) / 60);
      b = Math.floor(b % 60);
      return (
        (a ? a + ':' : '') +
        (10 > e ? '0' : '') +
        e +
        ':' +
        (10 > b ? '0' : '') +
        b
      );
    }
    return '00:00';
  };
  h.bounds = function (b) {
    var a = { left: 0, right: 0, width: 0, height: 0, top: 0, bottom: 0 };
    if (!b || !k.body.contains(b)) return a;
    if (b.getBoundingClientRect) {
      b = b.getBoundingClientRect(b);
      var e = window.pageYOffset,
        g = window.pageXOffset;
      if (!b.width && !b.height && !b.left && !b.top) return a;
      a.left = b.left + g;
      a.right = b.right + g;
      a.top = b.top + e;
      a.bottom = b.bottom + e;
      a.width = b.right - b.left;
      a.height = b.bottom - b.top;
    } else {
      a.width = b.offsetWidth | 0;
      a.height = b.offsetHeight | 0;
      do (a.left += b.offsetLeft | 0), (a.top += b.offsetTop | 0);
      while ((b = b.offsetParent));
      a.right = a.left + a.width;
      a.bottom = a.top + a.height;
    }
    return a;
  };
  h.empty = function (b) {
    if (b) for (; 0 < b.childElementCount; ) b.removeChild(b.children[0]);
  };
})(jwplayer.utils);
(function (h) {
  var k = (h.stretching = {
    NONE: 'none',
    FILL: 'fill',
    UNIFORM: 'uniform',
    EXACTFIT: 'exactfit',
  });
  h.scale = function (b, a, e, g, c) {
    var d = '';
    a = a || 1;
    e = e || 1;
    g |= 0;
    c |= 0;
    if (1 !== a || 1 !== e) d = 'scale(' + a + ', ' + e + ')';
    if (g || c) d = 'translate(' + g + 'px, ' + c + 'px)';
    h.transform(b, d);
  };
  h.stretch = function (b, a, e, g, c, d) {
    if (!a || !e || !g || !c || !d) return !1;
    b = b || k.UNIFORM;
    var f = (2 * Math.ceil(e / 2)) / c,
      D = (2 * Math.ceil(g / 2)) / d,
      m = 'video' === a.tagName.toLowerCase(),
      s = !1,
      v = 'jw' + b.toLowerCase();
    switch (b.toLowerCase()) {
      case k.FILL:
        f > D ? (D = f) : (f = D);
        s = !0;
        break;
      case k.NONE:
        f = D = 1;
      case k.EXACTFIT:
        s = !0;
        break;
      default:
        f > D
          ? 0.95 < (c * D) / e
            ? ((s = !0), (v = 'jwexactfit'))
            : ((c *= D), (d *= D))
          : 0.95 < (d * f) / g
          ? ((s = !0), (v = 'jwexactfit'))
          : ((c *= f), (d *= f)),
          s &&
            ((f = (2 * Math.ceil(e / 2)) / c),
            (D = (2 * Math.ceil(g / 2)) / d));
    }
    m
      ? ((b = { left: '', right: '', width: '', height: '' }),
        s
          ? (e < c && (b.left = b.right = Math.ceil((e - c) / 2)),
            g < d && (b.top = b.bottom = Math.ceil((g - d) / 2)),
            (b.width = c),
            (b.height = d),
            h.scale(a, f, D, 0, 0))
          : ((s = !1), h.transform(a)),
        h.css.style(a, b))
      : (a.className =
          a.className.replace(/\s*jw(none|exactfit|uniform|fill)/g, '') +
          ' ' +
          v);
    return s;
  };
})(jwplayer.utils);
(function (h) {
  h.dfxp = function () {
    var k = jwplayer.utils.seconds;
    this.parse = function (b) {
      var a = [{ begin: 0, text: '' }];
      b = b.replace(/^\s+/, '').replace(/\s+$/, '');
      var e = b.split('\x3c/p\x3e'),
        g = b.split('\x3c/tt:p\x3e'),
        c = [];
      for (b = 0; b < e.length; b++)
        0 <= e[b].indexOf('\x3cp') &&
          ((e[b] = e[b]
            .substr(e[b].indexOf('\x3cp') + 2)
            .replace(/^\s+/, '')
            .replace(/\s+$/, '')),
          c.push(e[b]));
      for (b = 0; b < g.length; b++)
        0 <= g[b].indexOf('\x3ctt:p') &&
          ((g[b] = g[b]
            .substr(g[b].indexOf('\x3ctt:p') + 5)
            .replace(/^\s+/, '')
            .replace(/\s+$/, '')),
          c.push(g[b]));
      e = c;
      for (b = 0; b < e.length; b++) {
        g = e[b];
        c = {};
        try {
          var d = g.indexOf('begin\x3d"'),
            g = g.substr(d + 7),
            d = g.indexOf('" end\x3d"');
          c.begin = k(g.substr(0, d));
          g = g.substr(d + 7);
          d = g.indexOf('"');
          c.end = k(g.substr(0, d));
          d = g.indexOf('"\x3e');
          g = g.substr(d + 2);
          c.text = g;
        } catch (f) {}
        g = c;
        g.text &&
          (a.push(g),
          g.end && (a.push({ begin: g.end, text: '' }), delete g.end));
      }
      if (1 < a.length) return a;
      throw { message: 'Invalid DFXP file:' };
    };
  };
})(jwplayer.parsers);
(function (h) {
  h.srt = function () {
    var k = jwplayer.utils,
      b = k.seconds;
    this.parse = function (a, e) {
      var g = e ? [] : [{ begin: 0, text: '' }];
      a = k.trim(a);
      var c = a.split('\r\n\r\n');
      1 == c.length && (c = a.split('\n\n'));
      for (var d = 0; d < c.length; d++)
        if ('WEBVTT' != c[d]) {
          var f,
            h = c[d];
          f = {};
          var m = h.split('\r\n');
          1 == m.length && (m = h.split('\n'));
          try {
            h = 1;
            0 < m[0].indexOf(' --\x3e ') && (h = 0);
            var s = m[h].indexOf(' --\x3e ');
            0 < s &&
              ((f.begin = b(m[h].substr(0, s))),
              (f.end = b(m[h].substr(s + 5))));
            if (m[h + 1]) {
              f.text = m[h + 1];
              for (h += 2; h < m.length; h++) f.text += '\x3cbr/\x3e' + m[h];
            }
          } catch (v) {}
          f.text &&
            (g.push(f),
            f.end && !e && (g.push({ begin: f.end, text: '' }), delete f.end));
        }
      if (1 < g.length) return g;
      throw { message: 'Invalid SRT file' };
    };
  };
})(jwplayer.parsers);
(function (h) {
  var k = h.utils,
    b = h.events,
    a = b.state,
    e = window.clearInterval,
    g = !0,
    c = !1;
  h.html5.video = function (d, f) {
    function h(a, c) {
      O && Q.sendEvent(a, c);
    }
    function m() {}
    function s(c) {
      j(c);
      O &&
        x == a.PLAYING &&
        !P &&
        ((G = ((10 * d.currentTime) | 0) / 10),
        (A = g),
        h(b.JWPLAYER_MEDIA_TIME, { position: G, duration: t }));
    }
    function v() {
      h(b.JWPLAYER_MEDIA_META, {
        duration: d.duration,
        height: d.videoHeight,
        width: d.videoWidth,
      });
    }
    function u(a) {
      O &&
        (A || ((A = g), n()),
        'loadedmetadata' == a.type &&
          (d.muted && ((d.muted = c), (d.muted = g)), v()));
    }
    function j() {
      A &&
        0 < I &&
        !ha &&
        (q
          ? setTimeout(function () {
              0 < I && xa(I);
            }, 200)
          : xa(I));
    }
    function n() {
      L || ((L = g), h(b.JWPLAYER_MEDIA_BUFFER_FULL));
    }
    function B(c) {
      O &&
        !P &&
        (d.paused
          ? (d.currentTime == d.duration && 3 < d.duration) || Sa()
          : (!k.isFF() || !('play' == c.type && x == a.BUFFERING)) &&
            l(a.PLAYING));
    }
    function y() {
      O && (P || l(a.BUFFERING));
    }
    function p(a) {
      var c;
      if ('array' == k.typeOf(a) && 0 < a.length) {
        c = [];
        for (var b = 0; b < a.length; b++) {
          var d = a[b],
            e = {};
          e.label = d.label && d.label ? (d.label ? d.label : 0) : b;
          c[b] = e;
        }
      }
      return c;
    }
    function w(b, f) {
      K = V[Z];
      l(a.BUFFERING);
      e(W);
      W = setInterval(E, 100);
      I = 0;
      d.src !== K.file || H || J
        ? ((L = A = c), (t = f ? f : -1), (d.src = K.file), d.load())
        : (0 === b && ((I = -1), xa(b)), v(), d.play());
      G = d.currentTime;
      H && n();
      k.isIOS() && Q.getFullScreen() && (d.controls = !0);
      0 < b && xa(b);
    }
    function l(c) {
      if (!(c == a.PAUSED && x == a.IDLE) && !P && x != c) {
        var d = x;
        x = c;
        h(b.JWPLAYER_PLAYER_STATE, { oldstate: d, newstate: c });
      }
    }
    function E() {
      if (O) {
        var a;
        a = d.buffered;
        a =
          !a || !d.duration || 0 === a.length
            ? 0
            : a.end(a.length - 1) / d.duration;
        1 <= a && e(W);
        a != X &&
          ((X = a),
          h(b.JWPLAYER_MEDIA_BUFFER, { bufferPercent: Math.round(100 * X) }));
      }
    }
    function z(a) {
      h('fullscreenchange', { target: a.target, jwstate: ya });
    }
    f = f || '';
    var q = k.isMSIE(),
      H = k.isMobile(),
      J = k.isSafari(),
      C = {
        abort: m,
        canplay: u,
        canplaythrough: m,
        durationchange: function () {
          if (O) {
            var a = ((10 * d.duration) | 0) / 10;
            t != a && (t = a);
            ha && 0 < I && a > I && xa(I);
            s();
          }
        },
        emptied: m,
        ended: function () {
          O &&
            x != a.IDLE &&
            (e(W),
            (Z = -1),
            (ia = g),
            h(b.JWPLAYER_MEDIA_BEFORECOMPLETE),
            O && (l(a.IDLE), (ia = c), h(b.JWPLAYER_MEDIA_COMPLETE)));
        },
        error: function () {
          O &&
            (k.log('Error playing media: %o', d.error),
            h(b.JWPLAYER_MEDIA_ERROR, {
              message: 'Error loading media: File could not be played',
            }),
            l(a.IDLE));
        },
        loadeddata: m,
        loadedmetadata: u,
        loadstart: m,
        pause: B,
        play: B,
        playing: B,
        progress: j,
        ratechange: m,
        readystatechange: m,
        seeked: function () {
          !P && x != a.PAUSED && l(a.PLAYING);
        },
        seeking: q ? y : m,
        stalled: m,
        suspend: m,
        timeupdate: s,
        volumechange: function () {
          h(b.JWPLAYER_MEDIA_VOLUME, { volume: Math.round(100 * d.volume) });
          h(b.JWPLAYER_MEDIA_MUTE, { mute: d.muted });
        },
        waiting: y,
        webkitbeginfullscreen: function (a) {
          ya = !0;
          z(a);
          k.isIOS() && (d.controls = c);
        },
        webkitendfullscreen: function (a) {
          ya = !1;
          z(a);
          k.isIOS() && (d.controls = c);
        },
      },
      r,
      K,
      t,
      G,
      A = c,
      L,
      I = 0,
      P = c,
      x = a.IDLE,
      Y,
      W = -1,
      X = -1,
      O = c,
      V,
      Z = -1,
      ha = k.isAndroidNative(),
      ja = k.isIOS(7),
      Ta = [],
      ia = c,
      ya = null,
      Q = k.extend(this, new b.eventdispatcher(f));
    Q.load = function (a) {
      if (O) {
        V = a.sources;
        0 > Z && (Z = 0);
        if (V)
          for (var c = k.getCookies().qualityLabel, d = 0; d < V.length; d++)
            if ((V[d]['default'] && (Z = d), c && V[d].label == c)) {
              Z = d;
              break;
            }
        (c = p(V)) &&
          Q.sendEvent(b.JWPLAYER_MEDIA_LEVELS, {
            levels: c,
            currentQuality: Z,
          });
        w(a.starttime || 0, a.duration);
      }
    };
    Q.stop = function () {
      O && (e(W), d.removeAttribute('src'), q || d.load(), (Z = -1), l(a.IDLE));
    };
    Q.destroy = function () {
      e(W);
    };
    Q.play = function () {
      O && !P && d.play();
    };
    var Sa = (Q.pause = function () {
      O && (d.pause(), l(a.PAUSED));
    });
    Q.seekDrag = function (a) {
      O && ((P = a) ? d.pause() : d.play());
    };
    var xa = (Q.seek = function (a) {
        if (O)
          if (
            (!P &&
              0 === I &&
              h(b.JWPLAYER_MEDIA_SEEK, { position: G, offset: a }),
            A)
          ) {
            I = 0;
            try {
              d.currentTime = a;
            } catch (c) {
              I = a;
            }
          } else I = a;
      }),
      Fa = (Q.volume = function (a) {
        k.exists(a) &&
          ((d.volume = Math.min(Math.max(0, a / 100), 1)),
          (Y = 100 * d.volume));
      });
    Q.mute = function (a) {
      k.exists(a) || (a = !d.muted);
      a ? ((Y = 100 * d.volume), (d.muted = g)) : (Fa(Y), (d.muted = c));
    };
    Q.addCaptions = function (a) {
      if (k.isIOS() && d.addTextTrack) {
        var c = window.TextTrackCue;
        k.foreach(a, function (a, b) {
          if (b.data) {
            var e = d.addTextTrack(b.kind, b.label);
            k.foreach(b.data, function (a, d) {
              1 == a % 2 &&
                e.addCue(new c(d.begin, b.data[parseInt(a) + 1].begin, d.text));
            });
            Ta.push(e);
            e.mode = 'hidden';
          }
        });
      }
    };
    Q.resetCaptions = function () {};
    Q.fsCaptions = function (a) {
      if (k.isIOS() && d.addTextTrack) {
        var c = null;
        k.foreach(Ta, function (b, d) {
          !a && 'showing' == d.mode && (c = parseInt(b));
          a || (d.mode = 'hidden');
        });
        if (!a) return c;
      }
    };
    this.checkComplete = function () {
      return ia;
    };
    Q.detachMedia = function () {
      e(W);
      O = c;
      return d;
    };
    Q.attachMedia = function (d) {
      O = g;
      d || (A = c);
      ia && (l(a.IDLE), h(b.JWPLAYER_MEDIA_COMPLETE), (ia = c));
    };
    Q.setContainer = function (a) {
      r = a;
      a.appendChild(d);
    };
    Q.getContainer = function () {
      return r;
    };
    Q.remove = function () {
      d && (d.removeAttribute('src'), q || d.load());
      e(W);
      Z = -1;
      r === d.parentNode && r.removeChild(d);
    };
    Q.setVisibility = function (a) {
      a || ha
        ? k.css.style(r, { visibility: 'visible', opacity: 1 })
        : k.css.style(r, { visibility: '', opacity: 0 });
    };
    Q.resize = function (a, c, b) {
      return k.stretch(b, d, a, c, d.videoWidth, d.videoHeight);
    };
    Q.setControls = function (a) {
      d.controls = !!a;
    };
    Q.supportsFullscreen = function () {
      return !0;
    };
    Q.setFullScreen = function (a) {
      if ((a = !!a)) {
        try {
          var c = d.webkitEnterFullscreen || d.webkitEnterFullScreen;
          c && c.apply(d);
        } catch (b) {
          return !1;
        }
        return Q.getFullScreen();
      }
      (c = d.webkitExitFullscreen || d.webkitExitFullScreen) && c.apply(d);
      return a;
    };
    Q.getFullScreen = function () {
      return ya || d.webkitDisplayingFullscreen;
    };
    Q.audioMode = function () {
      if (!V) return c;
      var a = V[0].type;
      return 'oga' == a || 'aac' == a || 'mp3' == a || 'vorbis' == a;
    };
    Q.setCurrentQuality = function (a) {
      if (Z != a && ((a = parseInt(a, 10)), 0 <= a && V && V.length > a)) {
        Z = a;
        k.saveCookie('qualityLabel', V[a].label);
        h(b.JWPLAYER_MEDIA_LEVEL_CHANGED, { currentQuality: a, levels: p(V) });
        a = ((10 * d.currentTime) | 0) / 10;
        var c = ((10 * d.duration) | 0) / 10;
        0 >= c && (c = t);
        w(a, c);
      }
    };
    Q.getCurrentQuality = function () {
      return Z;
    };
    Q.getQualityLevels = function () {
      return p(V);
    };
    d || (d = document.createElement('video'));
    k.foreach(C, function (a, b) {
      d.addEventListener(a, b, c);
    });
    ja || ((d.controls = g), (d.controls = c));
    d.setAttribute('x-webkit-airplay', 'allow');
    O = g;
  };
})(jwplayer);
(function (h, k) {
  function b() {
    return !1;
  }
  function a() {}
  var e = h.jwplayer,
    g = e.utils,
    c = e.events,
    d = c.state,
    f = new g.scriptloader(
      h.location.protocol + '//www.youtube.com/iframe_api',
    ),
    D = g.isMobile(),
    m = g.isSafari();
  h.onYouTubeIframeAPIReady = function () {
    f = null;
  };
  e.html5.youtube = function (a) {
    function b(a) {
      h.YT && h.YT.loaded ? ((K = h.YT), j(a)) : setTimeout(b, 100);
    }
    function u() {
      z();
    }
    function j() {
      var c;
      if ((c = !!K))
        (c = G.parentNode),
          c || (P || (e(a).onReady(j), (P = !0)), (c = null)),
          (c = !!c);
      c && x && x.apply(r);
    }
    function n(b) {
      var e = { oldstate: L, newstate: b };
      L = b;
      clearInterval(W);
      b !== d.IDLE &&
        ((W = setInterval(B, 250)),
        b === d.PLAYING
          ? g.css('#' + a + ' .jwcontrols', { display: '' })
          : b === d.BUFFERING && y());
      r.sendEvent(c.JWPLAYER_PLAYER_STATE, e);
    }
    function B() {
      if (t && t.getPlayerState) {
        var a = t.getPlayerState();
        null !== a && void 0 !== a && a !== X && ((X = a), l({ data: a }));
        var b = K.PlayerState;
        a === b.PLAYING
          ? (y(),
            (a = {
              position: ((10 * t.getCurrentTime()) | 0) / 10,
              duration: t.getDuration(),
            }),
            r.sendEvent(c.JWPLAYER_MEDIA_TIME, a))
          : a === b.BUFFERING && y();
      }
    }
    function y() {
      var a = 0;
      t &&
        t.getVideoLoadedFraction &&
        (a = Math.round(100 * t.getVideoLoadedFraction()));
      I !== a &&
        ((I = a), r.sendEvent(c.JWPLAYER_MEDIA_BUFFER, { bufferPercent: a }));
    }
    function p() {
      var a = {
        duration: t.getDuration(),
        width: G.clientWidth,
        height: G.clientHeight,
      };
      r.sendEvent(c.JWPLAYER_MEDIA_META, a);
    }
    function w() {
      Y && (Y.apply(r), (Y = null));
    }
    function l(a) {
      var b = K.PlayerState;
      switch (a.data) {
        case b.ENDED:
          L != d.IDLE &&
            ((O = !0),
            r.sendEvent(c.JWPLAYER_MEDIA_BEFORECOMPLETE, void 0),
            n(d.IDLE),
            (O = !1),
            r.sendEvent(c.JWPLAYER_MEDIA_COMPLETE, void 0));
          break;
        case b.PLAYING:
          V = !1;
          Z &&
            ((Z = !1),
            p(),
            (a = {
              levels: r.getQualityLevels(),
              currentQuality: r.getCurrentQuality(),
            }),
            r.sendEvent(c.JWPLAYER_MEDIA_LEVELS, a));
          n(d.PLAYING);
          break;
        case b.PAUSED:
          n(d.PAUSED);
          break;
        case b.BUFFERING:
          n(d.BUFFERING);
          break;
        case b.CUED:
          n(d.IDLE);
      }
    }
    function E() {
      Z && r.play();
    }
    function z() {
      r.sendEvent(c.JWPLAYER_MEDIA_ERROR, {
        message: 'Error loading YouTube: Video could not be played',
      });
    }
    function q() {
      if (D || m)
        r.setVisibility(!0),
          g.css('#' + a + ' .jwcontrols', { display: 'none' });
    }
    function H() {
      clearInterval(W);
      if (t && t.stopVideo)
        try {
          t.stopVideo(), t.clearVideo();
        } catch (a) {}
    }
    function J() {
      H();
      G && A && A === G.parentNode && A.removeChild(G);
      x = Y = t = null;
    }
    function C(a) {
      Y = null;
      var c = g.youTubeID(a.sources[0].file);
      a.image || (a.image = 'http://i.ytimg.com/vi/' + c + '/0.jpg');
      r.setVisibility(!0);
      if (t)
        if (t.getPlayerState)
          if (t.getVideoData().video_id !== c) {
            V ? (H(), t.cueVideoById(c)) : t.loadVideoById(c);
            var b = t.getPlayerState(),
              d = K.PlayerState;
            (b === d.UNSTARTED || b === d.CUED) && q();
          } else 0 < t.getCurrentTime() && t.seekTo(0), p();
        else
          Y = function () {
            r.load(a);
          };
      else
        (x = function () {
          if (!c) throw { name: 'YouTubeID', message: 'Invalid YouTube ID' };
          if (!G.parentNode)
            throw {
              name: 'YouTubeVideoLayer',
              message: 'YouTube iFrame removed from DOM',
            };
          var a = {
            height: '100%',
            width: '100%',
            videoId: c,
            playerVars: g.extend(
              {
                autoplay: 0,
                controls: 0,
                showinfo: 0,
                rel: 0,
                modestbranding: 0,
                playsinline: 1,
                origin: location.protocol + '//' + location.hostname,
              },
              void 0,
            ),
            events: {
              onReady: w,
              onStateChange: l,
              onPlaybackQualityChange: E,
              onError: z,
            },
          };
          r.setVisibility(!0);
          t = new K.Player(G, a);
          G = t.getIframe();
          x = null;
          q();
        }),
          j();
    }
    var r = g.extend(this, new c.eventdispatcher('html5.youtube')),
      K = h.YT,
      t = null,
      G = k.createElement('div'),
      A,
      L = d.IDLE,
      I = -1,
      P = !1,
      x = null,
      Y = null,
      W = -1,
      X = -1,
      O = !1,
      V = D || m,
      Z = !0;
    !K &&
      f &&
      (f.addEventListener(c.COMPLETE, b),
      f.addEventListener(c.ERROR, u),
      f.load());
    G.id = a + '_youtube';
    r.init = function (a) {
      C(a);
    };
    r.destroy = function () {
      J();
      A = G = K = r = null;
    };
    r.getElement = function () {
      return G;
    };
    r.load = function (a) {
      n(d.BUFFERING);
      C(a);
      r.play();
    };
    r.stop = function () {
      H();
      n(d.IDLE);
    };
    r.play = function () {
      V || (t.playVideo && t.playVideo());
    };
    r.pause = function () {
      V || (t.pauseVideo && t.pauseVideo());
    };
    r.seek = function (a) {
      V || (t.seekTo && t.seekTo(a));
    };
    r.volume = function (a) {
      t && t.setVolume(a);
    };
    r.mute = function (a) {
      t && a && t.setVolume(0);
    };
    r.detachMedia = function () {
      return k.createElement('video');
    };
    r.attachMedia = function () {
      O &&
        (n(d.IDLE), r.sendEvent(c.JWPLAYER_MEDIA_COMPLETE, void 0), (O = !1));
    };
    r.setContainer = function (a) {
      A = a;
      a.appendChild(G);
      r.setVisibility(!0);
    };
    r.getContainer = function () {
      return A;
    };
    r.supportsFullscreen = function () {
      return !(
        !A ||
        (!A.requestFullscreen &&
          !A.requestFullScreen &&
          !A.webkitRequestFullscreen &&
          !A.webkitRequestFullScreen &&
          !A.webkitEnterFullscreen &&
          !A.webkitEnterFullScreen &&
          !A.mozRequestFullScreen &&
          !A.msRequestFullscreen)
      );
    };
    r.remove = function () {
      J();
    };
    r.setVisibility = function (a) {
      a
        ? (g.css.style(G, { display: 'block' }),
          g.css.style(A, { visibility: 'visible', opacity: 1 }))
        : !D && !m && g.css.style(A, { opacity: 0 });
    };
    r.resize = function (a, c, b) {
      return g.stretch(b, G, a, c, G.clientWidth, G.clientHeight);
    };
    r.checkComplete = function () {
      return O;
    };
    r.getCurrentQuality = function () {
      if (t) {
        if (t.getAvailableQualityLevels) {
          var a = t.getPlaybackQuality();
          return t.getAvailableQualityLevels().indexOf(a);
        }
        return -1;
      }
    };
    r.getQualityLevels = function () {
      if (t) {
        var a = [];
        if (t.getAvailableQualityLevels)
          for (var c = t.getAvailableQualityLevels(), b = c.length; b--; )
            a.push({ label: c[b] });
        return a;
      }
    };
    r.setCurrentQuality = function (a) {
      if (t && t.getAvailableQualityLevels) {
        var c = t.getAvailableQualityLevels();
        c.length && t.setPlaybackQuality(c[c.length - a - 1]);
      }
    };
  };
  e.html5.youtube.prototype = {
    seekDrag: a,
    setFullScreen: b,
    getFullScreen: b,
    setControls: a,
    audioMode: b,
  };
})(window, document);
(function (h) {
  var k = h.utils,
    b = k.css,
    a = h.events,
    e = 80,
    g = 30;
  h.html5.adskipbutton = function (c, d, f, h) {
    function m(a) {
      0 > w || ((a = f.replace(/xx/gi, Math.ceil(w - a))), u(a));
    }
    function s(a, c) {
      if ('number' == k.typeOf(z)) w = z;
      else if ('%' == z.slice(-1)) {
        var b = parseFloat(z.slice(0, -1));
        c && !isNaN(b) && (w = (c * b) / 100);
      } else 'string' == k.typeOf(z) ? (w = k.seconds(z)) : isNaN(z) || (w = z);
    }
    function v() {
      l && C.sendEvent(a.JWPLAYER_AD_SKIPPED);
    }
    function u(a) {
      a = a || h;
      var c = p.getContext('2d');
      c.clearRect(0, 0, e, g);
      n(c, 0, 0, e, g, 5, !0, !1, !1);
      n(c, 0, 0, e, g, 5, !1, !0, !1);
      c.fillStyle = '#979797';
      c.globalAlpha = 1;
      var b = p.height / 2,
        d = p.width / 2;
      c.textAlign = 'center';
      c.font = 'Bold 12px Sans-Serif';
      a === h &&
        ((d -= q.width),
        c.drawImage(
          q,
          p.width - (p.width - c.measureText(h).width) / 2 - 4,
          (g - q.height) / 2,
        ));
      c.fillText(a, d, b + 4);
    }
    function j(a) {
      a = a || h;
      var c = p.getContext('2d');
      c.clearRect(0, 0, e, g);
      n(c, 0, 0, e, g, 5, !0, !1, !0);
      n(c, 0, 0, e, g, 5, !1, !0, !0);
      c.fillStyle = '#FFFFFF';
      c.globalAlpha = 1;
      var b = p.height / 2,
        d = p.width / 2;
      c.textAlign = 'center';
      c.font = 'Bold 12px Sans-Serif';
      a === h &&
        ((d -= q.width),
        c.drawImage(
          H,
          p.width - (p.width - c.measureText(h).width) / 2 - 4,
          (g - q.height) / 2,
        ));
      c.fillText(a, d, b + 4);
    }
    function n(a, c, b, d, e, f, j, h, x) {
      'undefined' == typeof h && (h = !0);
      'undefined' === typeof f && (f = 5);
      a.beginPath();
      a.moveTo(c + f, b);
      a.lineTo(c + d - f, b);
      a.quadraticCurveTo(c + d, b, c + d, b + f);
      a.lineTo(c + d, b + e - f);
      a.quadraticCurveTo(c + d, b + e, c + d - f, b + e);
      a.lineTo(c + f, b + e);
      a.quadraticCurveTo(c, b + e, c, b + e - f);
      a.lineTo(c, b + f);
      a.quadraticCurveTo(c, b, c + f, b);
      a.closePath();
      h &&
        ((a.strokeStyle = 'white'), (a.globalAlpha = x ? 1 : 0.25), a.stroke());
      j && ((a.fillStyle = '#000000'), (a.globalAlpha = 0.5), a.fill());
    }
    function B(a, c) {
      var b = document.createElement(a);
      c && (b.className = c);
      return b;
    }
    var y,
      p,
      w = -1,
      l = !1,
      E,
      z = 0,
      q,
      H,
      J = !1,
      C = k.extend(this, new a.eventdispatcher());
    C.updateSkipTime = function (a, c) {
      s(a, c);
      0 <= w &&
        (b.style(y, { visibility: E ? 'visible' : 'hidden' }),
        0 < w - a
          ? (m(a), l && ((l = !1), (y.style.cursor = 'default')))
          : l ||
            (l || ((l = !0), (y.style.cursor = 'pointer')), J ? j() : u()));
    };
    this.reset = function (a) {
      l = !1;
      z = a;
      s(0, 0);
      m(0);
    };
    C.show = function () {
      E = !0;
      0 < w && b.style(y, { visibility: 'visible' });
    };
    C.hide = function () {
      E = !1;
      b.style(y, { visibility: 'hidden' });
    };
    this.element = function () {
      return y;
    };
    q = new Image();
    q.src =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAICAYAAAArzdW1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ODkzMWI3Ny04YjE5LTQzYzMtOGM2Ni0wYzdkODNmZTllNDYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDI0OTcxRkE0OEM2MTFFM0I4MTREM0ZBQTFCNDE3NTgiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDI0OTcxRjk0OEM2MTFFM0I4MTREM0ZBQTFCNDE3NTgiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDA5ZGQxNDktNzdkMi00M2E3LWJjYWYtOTRjZmM2MWNkZDI0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQ4OTMxYjc3LThiMTktNDNjMy04YzY2LTBjN2Q4M2ZlOWU0NiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqAZXX0AAABYSURBVHjafI2BCcAwCAQ/kr3ScRwjW+g2SSezCi0kYHpwKLy8JCLDbWaGTM+MAFzuVNXhNiTQsh+PS9QhZ7o9JuFMeUVNwjsamDma4K+3oy1cqX/hxyPAAAQwNKV27g9PAAAAAElFTkSuQmCC';
    q.className = 'jwskipimage jwskipout';
    H = new Image();
    H.src =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAICAYAAAArzdW1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ODkzMWI3Ny04YjE5LTQzYzMtOGM2Ni0wYzdkODNmZTllNDYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDI0OTcxRkU0OEM2MTFFM0I4MTREM0ZBQTFCNDE3NTgiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDI0OTcxRkQ0OEM2MTFFM0I4MTREM0ZBQTFCNDE3NTgiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDA5ZGQxNDktNzdkMi00M2E3LWJjYWYtOTRjZmM2MWNkZDI0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQ4OTMxYjc3LThiMTktNDNjMy04YzY2LTBjN2Q4M2ZlOWU0NiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvgIj/QAAABYSURBVHjadI6BCcAgDAS/0jmyih2tm2lHSRZJX6hQQ3w4FP49LKraSHV3ZLDzAuAi3cwaqUhSfvft+EweznHneUdTzPGRmp5hEJFhAo3LaCnjn7blzCvAAH9YOSCL5RZKAAAAAElFTkSuQmCC';
    H.className = 'jwskipimage jwskipover';
    y = B('div', 'jwskip');
    y.id = c + '_skipcontainer';
    p = B('canvas');
    y.appendChild(p);
    C.width = p.width = e;
    C.height = p.height = g;
    y.appendChild(H);
    y.appendChild(q);
    b.style(y, { visibility: 'hidden', bottom: d });
    y.addEventListener('mouseover', function () {
      J = !0;
      l && j();
    });
    y.addEventListener('mouseout', function () {
      J = !1;
      l && u();
    });
    k.isMobile()
      ? new k.touch(y).addEventListener(k.touchEvents.TAP, v)
      : y.addEventListener('click', v);
  };
  b('.jwskip', {
    position: 'absolute',
    float: 'right',
    display: 'inline-block',
    width: e,
    height: g,
    right: 10,
  });
  b('.jwskipimage', { position: 'relative', display: 'none' });
})(window.jwplayer);
(function (h) {
  var k = h.html5,
    b = h.utils,
    a = h.events,
    e = a.state,
    g = h.parsers,
    c = b.css,
    d = b.isAndroid(4, !0),
    f = 'playing',
    D = document;
  k.captions = function (c, k) {
    function v(a) {
      b.log('CAPTIONS(' + a + ')');
    }
    function u(a) {
      (I = a.fullscreen) ? (j(), setTimeout(j, 500)) : p(!0);
    }
    function j() {
      var a = q.offsetHeight,
        c = q.offsetWidth;
      0 !== a && 0 !== c && C.resize(c, Math.round(0.94 * a));
    }
    function n(a, c) {
      b.ajax(
        a,
        function (a) {
          var b = a.responseXML ? a.responseXML.firstChild : null;
          G++;
          if (b) {
            'xml' == g.localName(b) && (b = b.nextSibling);
            for (; b.nodeType == b.COMMENT_NODE; ) b = b.nextSibling;
          }
          b =
            b && 'tt' == g.localName(b)
              ? new h.parsers.dfxp()
              : new h.parsers.srt();
          try {
            var d = b.parse(a.responseText);
            K < t.length && (t[c].data = d);
            p(!1);
          } catch (e) {
            v(e.message + ': ' + t[c].file);
          }
          G == t.length && (0 < A && (l(A), (A = -1)), y());
        },
        B,
        !0,
      );
    }
    function B(a) {
      G++;
      v(a);
      G == t.length && (0 < A && (l(A), (A = -1)), y());
    }
    function y() {
      for (var c = [], b = 0; b < t.length; b++) c.push(t[b]);
      P.sendEvent(a.JWPLAYER_CAPTIONS_LOADED, { captionData: c });
    }
    function p(a) {
      t.length
        ? r == f && 0 < L
          ? (C.show(),
            I ? u({ fullscreen: !0 }) : (w(), a && setTimeout(w, 500)))
          : C.hide()
        : C.hide();
    }
    function w() {
      C.resize();
    }
    function l(c) {
      0 < c
        ? ((K = c - 1),
          (L = c | 0),
          K >= t.length ||
            (t[K].data
              ? C.populate(t[K].data)
              : G == t.length
              ? (v('file not loaded: ' + t[K].file),
                0 !== L && E(a.JWPLAYER_CAPTIONS_CHANGED, t, 0),
                (L = 0))
              : (A = c),
            p(!1)))
        : ((L = 0), p(!1));
    }
    function E(a, c, b) {
      P.sendEvent(a, { type: a, tracks: c, track: b });
    }
    function z() {
      for (var a = [{ label: 'Off' }], c = 0; c < t.length; c++)
        a.push({ label: t[c].label });
      return a;
    }
    var q,
      H = {
        back: !0,
        color: '#FFFFFF',
        fontSize: 15,
        fontFamily: 'Arial,sans-serif',
        fontOpacity: 100,
        backgroundColor: '#000',
        backgroundOpacity: 100,
        edgeStyle: null,
        windowColor: '#FFFFFF',
        windowOpacity: 0,
      },
      J = { fontStyle: 'normal', fontWeight: 'normal', textDecoration: 'none' },
      C,
      r,
      K,
      t = [],
      G = 0,
      A = -1,
      L = 0,
      I = !1,
      P = new a.eventdispatcher();
    b.extend(this, P);
    this.element = function () {
      return q;
    };
    this.getCaptionsList = function () {
      return z();
    };
    this.getCurrentCaptions = function () {
      return L;
    };
    this.setCurrentCaptions = function (c) {
      0 <= c &&
        L != c &&
        c <= t.length &&
        (l(c),
        (c = z()),
        b.saveCookie('captionLabel', c[L].label),
        E(a.JWPLAYER_CAPTIONS_CHANGED, c, L));
    };
    q = D.createElement('div');
    q.id = c.id + '_caption';
    q.className = 'jwcaptions';
    c.jwAddEventListener(a.JWPLAYER_PLAYER_STATE, function (a) {
      switch (a.newstate) {
        case e.IDLE:
          r = 'idle';
          p(!1);
          break;
        case e.PLAYING:
          (r = f), p(!1);
      }
    });
    c.jwAddEventListener(a.JWPLAYER_PLAYLIST_ITEM, function () {
      K = 0;
      t = [];
      C.update(0);
      G = 0;
      for (
        var e = c.jwGetPlaylist()[c.jwGetPlaylistIndex()].tracks,
          f = [],
          j = 0,
          h = '',
          g = 0,
          h = '',
          j = 0;
        j < e.length;
        j++
      )
        (h = e[j].kind.toLowerCase()),
          ('captions' == h || 'subtitles' == h) && f.push(e[j]);
      L = 0;
      if (!d) {
        for (j = 0; j < f.length; j++)
          if ((h = f[j].file))
            f[j].label || (f[j].label = j.toString()),
              t.push(f[j]),
              n(t[j].file, j);
        for (j = 0; j < t.length; j++)
          if (t[j]['default']) {
            g = j + 1;
            break;
          }
        e = b.getCookies();
        if ((h = e.captionLabel)) {
          e = z();
          for (j = 0; j < e.length; j++)
            if (h == e[j].label) {
              g = j;
              break;
            }
        }
        0 < g && l(g);
        p(!1);
        E(a.JWPLAYER_CAPTIONS_LIST, z(), L);
      }
    });
    c.jwAddEventListener(a.JWPLAYER_MEDIA_ERROR, v);
    c.jwAddEventListener(a.JWPLAYER_ERROR, v);
    c.jwAddEventListener(a.JWPLAYER_READY, function () {
      b.foreach(H, function (a, c) {
        k &&
          (void 0 !== k[a]
            ? (c = k[a])
            : void 0 !== k[a.toLowerCase()] && (c = k[a.toLowerCase()]));
        J[a] = c;
      });
      C = new h.html5.captions.renderer(J, q);
      p(!1);
    });
    c.jwAddEventListener(a.JWPLAYER_MEDIA_TIME, function (a) {
      C.update(a.position);
    });
    c.jwAddEventListener(a.JWPLAYER_FULLSCREEN, u);
    c.jwAddEventListener(a.JWPLAYER_RESIZE, function () {
      p(!1);
    });
  };
  c('.jwcaptions', {
    position: 'absolute',
    cursor: 'pointer',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  });
})(jwplayer);
(function (h) {
  var k = h.utils,
    b = k.css.style;
  h.html5.captions.renderer = function (a, e) {
    function h(a) {
      a = a || '';
      n = 'hidden';
      b(m, { visibility: n });
      v.innerHTML = a;
      a.length && ((n = 'visible'), setTimeout(c, 16));
    }
    function c() {
      if ('visible' === n) {
        var c = m.clientWidth,
          d = Math.pow(c / 400, 0.6),
          e = a.fontSize * d;
        b(v, {
          maxWidth: c + 'px',
          fontSize: Math.round(e) + 'px',
          lineHeight: Math.round(1.4 * e) + 'px',
          padding: Math.round(1 * d) + 'px ' + Math.round(8 * d) + 'px',
        });
        a.windowOpacity &&
          b(s, {
            padding: Math.round(5 * d) + 'px',
            borderRadius: Math.round(5 * d) + 'px',
          });
        b(m, { visibility: n });
      }
    }
    function d() {
      for (var a = -1, c = 0; c < D.length; c++)
        if (D[c].begin <= j && (c == D.length - 1 || D[c + 1].begin >= j)) {
          a = c;
          break;
        }
      -1 == a ? h('') : a != u && ((u = a), h(D[c].text));
    }
    function f(a, c, b) {
      b = k.hexToRgba('#000000', b);
      'dropshadow' === a
        ? (c.textShadow = '0 2px 1px ' + b)
        : 'raised' === a
        ? (c.textShadow =
            '0 0 5px ' + b + ', 0 1px 5px ' + b + ', 0 2px 5px ' + b)
        : 'depressed' === a
        ? (c.textShadow = '0 -2px 1px ' + b)
        : 'uniform' === a &&
          (c.textShadow =
            '-2px 0 1px ' +
            b +
            ',2px 0 1px ' +
            b +
            ',0 -2px 1px ' +
            b +
            ',0 2px 1px ' +
            b +
            ',-1px 1px 1px ' +
            b +
            ',1px 1px 1px ' +
            b +
            ',1px -1px 1px ' +
            b +
            ',1px 1px 1px ' +
            b);
    }
    var D,
      m,
      s,
      v,
      u,
      j,
      n = 'visible',
      B = -1;
    this.hide = function () {
      clearInterval(B);
      b(m, { display: 'none' });
    };
    this.populate = function (a) {
      u = -1;
      D = a;
      d();
    };
    this.resize = function () {
      c();
    };
    this.show = function () {
      b(m, { display: 'block' });
      c();
      clearInterval(B);
      B = setInterval(c, 250);
    };
    this.update = function (a) {
      j = a;
      D && d();
    };
    var y = a.fontOpacity,
      p = a.windowOpacity,
      w = a.edgeStyle,
      l = a.backgroundColor,
      E = { display: 'inline-block' },
      z = {
        color: k.hexToRgba(k.rgbHex(a.color), y),
        display: 'inline-block',
        fontFamily: a.fontFamily,
        fontStyle: a.fontStyle,
        fontWeight: a.fontWeight,
        textAlign: 'center',
        textDecoration: a.textDecoration,
        wordWrap: 'break-word',
      };
    p && (E.backgroundColor = k.hexToRgba(k.rgbHex(a.windowColor), p));
    f(w, z, y);
    a.back
      ? (z.backgroundColor = k.hexToRgba(k.rgbHex(l), a.backgroundOpacity))
      : null === w && f('uniform', z);
    m = document.createElement('div');
    s = document.createElement('div');
    v = document.createElement('span');
    b(m, {
      display: 'block',
      height: 'auto',
      position: 'absolute',
      bottom: '20px',
      textAlign: 'center',
      width: '100%',
    });
    b(s, E);
    b(v, z);
    s.appendChild(v);
    m.appendChild(s);
    e.appendChild(m);
  };
})(jwplayer);
(function (h) {
  function k(a) {
    return a
      ? parseInt(a.width, 10) + 'px ' + parseInt(a.height, 10) + 'px'
      : '0 0';
  }
  var b = h.html5,
    a = h.utils,
    e = h.events,
    g = e.state,
    c = a.css,
    d = a.transitionStyle,
    f = a.isMobile(),
    D = a.isAndroid(4, !0),
    m = 'button',
    s = 'text',
    v = 'slider',
    u = 'none',
    j = '100%',
    n = !1,
    B = !0,
    y = null,
    p = '',
    w = { display: u },
    l = { display: 'block' },
    E = { display: p },
    z = 'array',
    q = window,
    H = document;
  b.controlbar = function (d, C) {
    function r(a, c, b) {
      return { name: a, type: c, className: b };
    }
    function K(b) {
      c.block(aa);
      var e = b.duration == Number.POSITIVE_INFINITY,
        j = 0 === b.duration && 0 !== b.position && a.isSafari() && !f;
      e || j
        ? (U.setText(
            d.jwGetPlaylist()[d.jwGetPlaylistIndex()].title || 'Live broadcast',
          ),
          ja(!1))
        : (F.elapsed &&
            ((e = a.timeFormat(b.position)), (F.elapsed.innerHTML = e)),
          F.duration &&
            ((e = a.timeFormat(b.duration)), (F.duration.innerHTML = e)),
          0 < b.duration ? Ga(b.position / b.duration) : Ga(0),
          (ra = b.duration),
          (sa = b.position),
          ma || U.setText());
    }
    function t() {
      var a = d.jwGetMute();
      Ha = d.jwGetVolume() / 100;
      ia('mute', a || 0 === Ha);
      Ua(a ? 0 : Ha);
    }
    function G() {
      c.style([F.hd, F.cc], w);
      c.style(F.cast, I() ? E : w);
      Za();
      ba();
    }
    function A(a) {
      Pa = a.currentQuality | 0;
      F.hd &&
        (F.hd.querySelector('button').className =
          2 === ga.length && 0 === Pa ? 'off' : p);
      na && 0 <= Pa && na.setActive(a.currentQuality);
    }
    function L(a) {
      fa &&
        ((Ia = a.track | 0),
        F.cc &&
          (F.cc.querySelector('button').className =
            2 === fa.length && 0 === Ia ? 'off' : p),
        oa && 0 <= Ia && oa.setActive(a.track));
    }
    function I() {
      var a = h.cast;
      return a && a.available && a.available();
    }
    function P(a) {
      if (F.cast) {
        var b = I();
        c.style(F.cast, b ? E : w);
        var d = F.cast.className.replace(/\s*jwcancast/, '');
        b && (d += ' jwcancast');
        F.cast.className = d;
      }
      x(a || ka);
    }
    function x(a) {
      ka = a;
      F.cast &&
        (F.cast.querySelector('button').className = a.active ? p : 'off');
      ba();
    }
    function Y() {
      la = a.extend({}, ta, $.getComponentSettings('controlbar'), C);
      Ja = T('background').height;
      var b = ua ? 0 : la.margin;
      c.style(R, {
        height: Ja,
        bottom: b,
        left: b,
        right: b,
        'max-width': ua ? p : la.maxwidth,
      });
      c(W('.jwtext'), {
        font: la.fontsize + 'px/' + T('background').height + 'px ' + la.font,
        color: la.fontcolor,
        'font-weight': la.fontweight,
      });
      c(W('.jwoverlay'), { bottom: Ja });
    }
    function W(a) {
      return '#' + aa + (a ? ' ' + a : p);
    }
    function X() {
      return H.createElement('span');
    }
    function O(b, d, e, f, j) {
      var h = X(),
        t = T(b);
      f = f ? ' left center' : ' center';
      var g = k(t);
      h.className = 'jw' + b;
      h.innerHTML = '\x26nbsp;';
      if (t && t.src)
        return (
          (e = e
            ? {
                background: "url('" + t.src + "') repeat-x " + f,
                'background-size': g,
                height: j ? t.height : p,
              }
            : {
                background: "url('" + t.src + "') no-repeat" + f,
                'background-size': g,
                width: t.width,
                height: j ? t.height : p,
              }),
          (h.skin = t),
          c(W((j ? '.jwvertical ' : p) + '.jw' + b), a.extend(e, d)),
          (F[b] = h)
        );
    }
    function V(a, b, d, e) {
      b &&
        b.src &&
        (c(a, {
          width: b.width,
          background: 'url(' + b.src + ') no-repeat center',
          'background-size': k(b),
        }),
        d.src &&
          !f &&
          c(a + ':hover,' + a + '.off:hover', {
            background: 'url(' + d.src + ') no-repeat center',
            'background-size': k(d),
          }),
        e &&
          e.src &&
          c(a + '.off', {
            background: 'url(' + e.src + ') no-repeat center',
            'background-size': k(e),
          }));
    }
    function Z(a) {
      return function (c) {
        yb[a] && (yb[a](), f && U.sendEvent(e.JWPLAYER_USER_ACTION));
        c.preventDefault && c.preventDefault();
      };
    }
    function ha(c) {
      a.foreach(lb, function (a, b) {
        a != c && ('cc' == a && M(), 'hd' == a && S(), b.hide());
      });
    }
    function ja(a) {
      R &&
        F.alt &&
        (void 0 === a && (a = R.parentNode && 320 <= R.parentNode.clientWidth),
        a && !ma ? c.style(Va, E) : c.style(Va, w));
    }
    function Ta() {
      !ua && !ma && (c.block(aa), wa.show(), Ka('volume', wa), ha('volume'));
    }
    function ia(c, b) {
      a.exists(b) || (b = !mb[c]);
      F[c] &&
        ((F[c].className =
          'jw' + c + (b ? ' jwtoggle jwtoggling' : ' jwtoggling')),
        setTimeout(function () {
          F[c].className = F[c].className.replace(' jwtoggling', p);
        }, 100));
      mb[c] = b;
    }
    function ya() {
      ga &&
        2 < ga.length &&
        (nb && (clearTimeout(nb), (nb = void 0)),
        c.block(aa),
        na.show(),
        Ka('hd', na),
        ha('hd'));
    }
    function Q() {
      fa &&
        2 < fa.length &&
        (ob && (clearTimeout(ob), (ob = void 0)),
        c.block(aa),
        oa.show(),
        Ka('cc', oa),
        ha('cc'));
    }
    function Sa(a) {
      0 <= a && a < ga.length && (d.jwSetCurrentQuality(a), S(), na.hide());
    }
    function xa(a) {
      0 <= a && a < fa.length && (d.jwSetCurrentCaptions(a), M(), oa.hide());
    }
    function Fa() {
      2 == fa.length && xa((Ia + 1) % 2);
    }
    function Ca() {
      2 == ga.length && Sa((Pa + 1) % 2);
    }
    function Da(a) {
      a.preventDefault();
      H.onselectstart = function () {
        return n;
      };
    }
    function Ea(a) {
      cb();
      za = a;
      q.addEventListener('mouseup', Qa, n);
    }
    function cb() {
      q.removeEventListener('mouseup', Qa);
      za = y;
    }
    function vb() {
      F.timeRail.className = 'jwrail';
      d.jwGetState() != g.IDLE &&
        (d.jwSeekDrag(B),
        Ea('time'),
        Wa(),
        U.sendEvent(e.JWPLAYER_USER_ACTION));
    }
    function kb(c) {
      if (za) {
        var b = F[za].querySelector('.jwrail'),
          b = a.bounds(b),
          b = c.x / b.width;
        100 < b && (b = 100);
        c.type == a.touchEvents.DRAG_END
          ? (d.jwSeekDrag(n),
            (F.timeRail.className = 'jwrail'),
            cb(),
            db.time(b),
            Xa())
          : (Ga(b), 500 < sa - pb && ((pb = sa), db.time(b)));
        U.sendEvent(e.JWPLAYER_USER_ACTION);
      }
    }
    function Oa(c) {
      var b = F.time.querySelector('.jwrail'),
        b = a.bounds(b);
      c = c.x / b.width;
      100 < c && (c = 100);
      d.jwGetState() != g.IDLE &&
        (db.time(c), U.sendEvent(e.JWPLAYER_USER_ACTION));
    }
    function wb(a) {
      return function (c) {
        c.button ||
          ((F[a + 'Rail'].className = 'jwrail'),
          'time' === a
            ? d.jwGetState() != g.IDLE && (d.jwSeekDrag(B), Ea(a))
            : Ea(a));
      };
    }
    function Qa(c) {
      if (za && !c.button) {
        var b = F[za].querySelector('.jwrail'),
          e = a.bounds(b),
          b = za,
          e = F[b].vertical
            ? (e.bottom - c.pageY) / e.height
            : (c.pageX - e.left) / e.width;
        'mouseup' == c.type
          ? ('time' == b && d.jwSeekDrag(n),
            (F[b + 'Rail'].className = 'jwrail'),
            cb(),
            db[b.replace('H', p)](e))
          : ('time' == za ? Ga(e) : Ua(e),
            500 < sa - pb && ((pb = sa), db[za.replace('H', p)](e)));
        return !1;
      }
    }
    function Wa(a) {
      a && N.apply(this, arguments);
      pa && ra && !ua && !f && (c.block(aa), pa.show(), Ka('time', pa));
    }
    function Xa() {
      q.removeEventListener('mousemove', Qa);
      pa && pa.hide();
    }
    function N(c) {
      La = a.bounds(R);
      if ((Ya = a.bounds(eb)) && 0 !== Ya.width)
        (c = c.pageX ? c.pageX - Ya.left : c.x),
          pa.positionX(Math.round(c)),
          xb((ra * c) / Ya.width);
    }
    function Aa() {
      a.foreach(fb, function (a, b) {
        var d = {};
        '%' === b.position.toString().slice(-1)
          ? (d.left = b.position)
          : 0 < ra
          ? ((d.left = ((100 * b.position) / ra).toFixed(2) + '%'),
            (d.display = null))
          : ((d.left = 0), (d.display = 'none'));
        c.style(b.element, d);
      });
    }
    function qa() {
      ob = setTimeout(oa.hide, 500);
    }
    function qb() {
      nb = setTimeout(na.hide, 500);
    }
    function Ra(a, b, d, e) {
      if (!f) {
        var j = a.element();
        b.appendChild(j);
        b.addEventListener('mousemove', d, n);
        e
          ? b.addEventListener('mouseout', e, n)
          : b.addEventListener('mouseout', a.hide, n);
        c.style(j, { left: '50%' });
      }
    }
    function Ba(c, b, d, j) {
      if (f) {
        var h = c.element();
        b.appendChild(h);
        new a.touch(b).addEventListener(a.touchEvents.TAP, function () {
          var a = d;
          'cc' == j
            ? (2 == fa.length && (a = Fa),
              gb
                ? (M(), c.hide())
                : ((gb = setTimeout(function () {
                    c.hide();
                    gb = void 0;
                  }, 4e3)),
                  a()),
              U.sendEvent(e.JWPLAYER_USER_ACTION))
            : 'hd' == j &&
              (2 == ga.length && (a = Ca),
              hb
                ? (S(), c.hide())
                : ((hb = setTimeout(function () {
                    c.hide();
                    hb = void 0;
                  }, 4e3)),
                  a()),
              U.sendEvent(e.JWPLAYER_USER_ACTION));
        });
      }
    }
    function $a(d) {
      var e = X();
      e.className = 'jwgroup jw' + d;
      Ma[d] = e;
      if (da[d]) {
        var e = da[d],
          h = Ma[d];
        if (e && 0 < e.elements.length)
          for (var t = 0; t < e.elements.length; t++) {
            var g;
            a: {
              g = e.elements[t];
              var B = d;
              switch (g.type) {
                case s:
                  B = void 0;
                  g = g.name;
                  var B = {},
                    q = T(('alt' == g ? 'elapsed' : g) + 'Background');
                  if (q.src) {
                    var r = X();
                    r.id = aa + '_' + g;
                    'elapsed' == g || 'duration' == g
                      ? ((r.className = 'jwtext jw' + g + ' jwhidden'),
                        Va.push(r))
                      : (r.className = 'jwtext jw' + g);
                    B.background = 'url(' + q.src + ') repeat-x center';
                    B['background-size'] = k(T('background'));
                    c.style(r, B);
                    r.innerHTML = 'alt' != g ? '00:00' : p;
                    B = F[g] = r;
                  } else B = null;
                  g = B;
                  break a;
                case m:
                  if ('blank' != g.name) {
                    g = g.name;
                    q = B;
                    if (
                      !T(g + 'Button').src ||
                      (f && ('mute' == g || 0 === g.indexOf('volume'))) ||
                      (D && /hd|cc/.test(g))
                    )
                      g = y;
                    else {
                      var B = X(),
                        r = X(),
                        l = void 0,
                        l = rb,
                        x = O(l.name);
                      x || ((x = X()), (x.className = 'jwblankDivider'));
                      l.className && (x.className += ' ' + l.className);
                      l = x;
                      x = H.createElement('button');
                      B.style += ' display:inline-block';
                      B.className = 'jw' + g + ' jwbuttoncontainer';
                      'left' == q
                        ? (B.appendChild(r), B.appendChild(l))
                        : (B.appendChild(l), B.appendChild(r));
                      f
                        ? 'hd' != g &&
                          'cc' != g &&
                          new a.touch(x).addEventListener(
                            a.touchEvents.TAP,
                            Z(g),
                          )
                        : x.addEventListener('click', Z(g), n);
                      x.innerHTML = '\x26nbsp;';
                      x.tabIndex = -1;
                      r.appendChild(x);
                      q = T(g + 'Button');
                      r = T(g + 'ButtonOver');
                      l = T(g + 'ButtonOff');
                      V(W('.jw' + g + ' button'), q, r, l);
                      (q = Eb[g]) &&
                        V(
                          W('.jw' + g + '.jwtoggle button'),
                          T(q + 'Button'),
                          T(q + 'ButtonOver'),
                        );
                      g = F[g] = B;
                    }
                    break a;
                  }
                  break;
                case v:
                  B = void 0;
                  l = g.name;
                  if (f && 0 === l.indexOf('volume')) B = void 0;
                  else {
                    g = X();
                    var r = 'volume' == l,
                      G = l + ('time' == l ? 'Slider' : p) + 'Cap',
                      q = r ? 'Top' : 'Left',
                      B = r ? 'Bottom' : 'Right',
                      x = O(G + q, y, n, n, r),
                      z = O(G + B, y, n, n, r),
                      K;
                    K = l;
                    var A = r,
                      E = q,
                      C = B,
                      P = X(),
                      Y = ['Rail', 'Buffer', 'Progress'],
                      I = void 0,
                      L = void 0;
                    P.className = 'jwrail';
                    for (var J = 0; J < Y.length; J++) {
                      var L = 'time' == K ? 'Slider' : p,
                        ja = K + L + Y[J],
                        M = O(ja, y, !A, 0 === K.indexOf('volume'), A),
                        N = O(ja + 'Cap' + E, y, n, n, A),
                        Q = O(ja + 'Cap' + C, y, n, n, A),
                        R = T(ja + 'Cap' + E),
                        U = T(ja + 'Cap' + C);
                      if (M) {
                        var S = X();
                        S.className = 'jwrailgroup ' + Y[J];
                        N && S.appendChild(N);
                        S.appendChild(M);
                        Q &&
                          (S.appendChild(Q),
                          (Q.className += ' jwcap' + (A ? 'Bottom' : 'Right')));
                        c(W('.jwrailgroup.' + Y[J]), {
                          'min-width': A ? p : R.width + U.width,
                        });
                        S.capSize = A ? R.height + U.height : R.width + U.width;
                        c(W('.' + M.className), {
                          left: A ? p : R.width,
                          right: A ? p : U.width,
                          top: A ? R.height : p,
                          bottom: A ? U.height : p,
                          height: A ? 'auto' : p,
                        });
                        2 == J && (I = S);
                        2 == J && !A
                          ? ((M = X()),
                            (M.className = 'jwprogressOverflow'),
                            M.appendChild(S),
                            (F[ja] = M),
                            P.appendChild(M))
                          : ((F[ja] = S), P.appendChild(S));
                      }
                    }
                    if ((E = O(K + L + 'Thumb', y, n, n, A)))
                      c(W('.' + E.className), {
                        opacity: 'time' == K ? 0 : 1,
                        'margin-top': A ? E.skin.height / -2 : p,
                      }),
                        (E.className += ' jwthumb'),
                        (A && I ? I : P).appendChild(E);
                    f
                      ? ((A = new a.touch(P)),
                        A.addEventListener(a.touchEvents.DRAG_START, vb),
                        A.addEventListener(a.touchEvents.DRAG, kb),
                        A.addEventListener(a.touchEvents.DRAG_END, kb),
                        A.addEventListener(a.touchEvents.TAP, Oa))
                      : ((I = K),
                        'volume' == I && !A && (I += 'H'),
                        P.addEventListener('mousedown', wb(I), n));
                    'time' == K &&
                      !f &&
                      (P.addEventListener('mousemove', Wa, n),
                      P.addEventListener('mouseout', Xa, n));
                    K = F[K + 'Rail'] = P;
                    P = T(G + q);
                    G = T(G + q);
                    g.className = 'jwslider jw' + l;
                    x && g.appendChild(x);
                    g.appendChild(K);
                    z &&
                      (r && (z.className += ' jwcapBottom'), g.appendChild(z));
                    c(W('.jw' + l + ' .jwrail'), {
                      left: r ? p : P.width,
                      right: r ? p : G.width,
                      top: r ? P.height : p,
                      bottom: r ? G.height : p,
                      width: r ? j : p,
                      height: r ? 'auto' : p,
                    });
                    F[l] = g;
                    g.vertical = r;
                    'time' == l
                      ? ((pa = new b.overlay(aa + '_timetooltip', $)),
                        (ib = new b.thumbs(aa + '_thumb')),
                        (jb = H.createElement('div')),
                        (jb.className = 'jwoverlaytext'),
                        (sb = H.createElement('div')),
                        (B = ib.element()),
                        sb.appendChild(B),
                        sb.appendChild(jb),
                        pa.setContents(sb),
                        (eb = K),
                        xb(0),
                        (B = pa.element()),
                        K.appendChild(B),
                        F.timeSliderRail || c.style(F.time, w),
                        F.timeSliderThumb &&
                          c.style(F.timeSliderThumb, {
                            'margin-left': T('timeSliderThumb').width / -2,
                          }),
                        (B = T('timeSliderCue')),
                        (q = { 'z-index': 1 }),
                        B && B.src
                          ? (O('timeSliderCue'),
                            (q['margin-left'] = B.width / -2))
                          : (q.display = u),
                        c(W('.jwtimeSliderCue'), q),
                        va(0),
                        Ga(0),
                        Ga(0),
                        va(0))
                      : 0 === l.indexOf('volume') &&
                        ((l = g),
                        (x = 'volume' + (r ? p : 'H')),
                        (z = r ? 'vertical' : 'horizontal'),
                        c(W('.jw' + x + '.jw' + z), {
                          width:
                            T(x + 'Rail', r).width +
                            (r
                              ? 0
                              : T(x + 'Cap' + q).width +
                                T(x + 'RailCap' + q).width +
                                T(x + 'RailCap' + B).width +
                                T(x + 'Cap' + B).width),
                          height: r
                            ? T(x + 'Cap' + q).height +
                              T(x + 'Rail').height +
                              T(x + 'RailCap' + q).height +
                              T(x + 'RailCap' + B).height +
                              T(x + 'Cap' + B).height
                            : p,
                        }),
                        (l.className += ' jw' + z));
                    B = g;
                  }
                  g = B;
                  break a;
              }
              g = void 0;
            }
            g &&
              ('volume' == e.elements[t].name && g.vertical
                ? ((wa = new b.overlay(aa + '_volumeOverlay', $)),
                  wa.setContents(g))
                : h.appendChild(g));
          }
      }
    }
    function ba() {
      clearTimeout(zb);
      zb = setTimeout(U.redraw, 0);
    }
    function Za() {
      !tb &&
      1 < d.jwGetPlaylist().length &&
      (!H.querySelector('#' + d.id + ' .jwplaylist') || d.jwGetFullscreen())
        ? (c.style(F.next, E), c.style(F.prev, E))
        : (c.style(F.next, w), c.style(F.prev, w));
    }
    function Ka(c, b) {
      La || (La = a.bounds(R));
      b.constrainX(La, !0);
    }
    function va(a) {
      F.timeSliderBuffer &&
        ((a = Math.min(Math.max(0, a), 1)),
        c.style(F.timeSliderBuffer, {
          width: (100 * a).toFixed(1) + '%',
          opacity: 0 < a ? 1 : 0,
        }));
    }
    function Na(a, b) {
      if (F[a]) {
        var d = F[a].vertical,
          e = a + ('time' === a ? 'Slider' : p),
          f = 100 * Math.min(Math.max(0, b), 1) + '%',
          g = F[e + 'Progress'],
          e = F[e + 'Thumb'],
          j;
        g &&
          ((j = {}),
          d ? ((j.height = f), (j.bottom = 0)) : (j.width = f),
          'volume' !== a && (j.opacity = 0 < b || za ? 1 : 0),
          c.style(g, j));
        e && ((j = {}), d ? (j.top = 0) : (j.left = f), c.style(e, j));
      }
    }
    function Ua(a) {
      Na('volume', a);
      Na('volumeH', a);
    }
    function Ga(a) {
      Na('time', a);
    }
    function T(a) {
      var c = 'controlbar',
        b = a;
      0 === a.indexOf('volume') &&
        (0 === a.indexOf('volumeH')
          ? (b = a.replace('volumeH', 'volume'))
          : (c = 'tooltip'));
      return (a = $.getSkinElement(c, b))
        ? a
        : { width: 0, height: 0, src: p, image: void 0, ready: n };
    }
    function M() {
      clearTimeout(gb);
      gb = void 0;
    }
    function S() {
      clearTimeout(hb);
      hb = void 0;
    }
    function ca(c) {
      c = new h.parsers.srt().parse(c.responseText, !0);
      if (a.typeOf(c) !== z) return ea('Invalid data');
      U.addCues(c);
    }
    function ea(c) {
      a.log('Cues failed to load: ' + c);
    }
    var $,
      rb = r('divider', 'divider'),
      ta = {
        margin: 8,
        maxwidth: 800,
        font: 'Arial,sans-serif',
        fontsize: 11,
        fontcolor: 15658734,
        fontweight: 'bold',
        layout: {
          left: {
            position: 'left',
            elements: [
              r('play', m),
              r('prev', m),
              r('next', m),
              r('elapsed', s),
            ],
          },
          center: { position: 'center', elements: [r('time', v), r('alt', s)] },
          right: {
            position: 'right',
            elements: [
              r('duration', s),
              r('hd', m),
              r('cc', m),
              r('mute', m),
              r('volume', v),
              r('volumeH', v),
              r('cast', m),
              r('fullscreen', m),
            ],
          },
        },
      },
      la,
      da,
      F,
      Ja,
      R,
      aa,
      ra,
      sa,
      ga,
      Pa,
      fa,
      Ia,
      Ha,
      ka = {},
      wa,
      La,
      eb,
      Ya,
      pa,
      sb,
      ib,
      jb,
      nb,
      hb,
      na,
      ob,
      gb,
      oa,
      zb,
      ab = -1,
      ua = n,
      ma = n,
      tb = n,
      ub = n,
      za = y,
      pb = 0,
      fb = [],
      bb,
      Eb = { play: 'pause', mute: 'unmute', fullscreen: 'normalscreen' },
      mb = { play: n, mute: n, fullscreen: n },
      yb = {
        play: function () {
          mb.play ? d.jwPause() : d.jwPlay();
        },
        mute: function () {
          var a = !mb.mute;
          d.jwSetMute(a);
          !a && 0 === Ha && d.jwSetVolume(20);
          t();
        },
        fullscreen: function () {
          d.jwSetFullscreen();
        },
        next: function () {
          d.jwPlaylistNext();
        },
        prev: function () {
          d.jwPlaylistPrev();
        },
        hd: Ca,
        cc: Fa,
        cast: function () {
          ka.active ? d.jwStopCasting() : d.jwStartCasting();
        },
      },
      db = {
        time: function (a) {
          bb
            ? ((a = bb.position),
              (a =
                '%' === a.toString().slice(-1)
                  ? (ra * parseFloat(a.slice(0, -1))) / 100
                  : parseFloat(a)))
            : (a *= ra);
          d.jwSeek(a);
        },
        volume: function (a) {
          Ua(a);
          0.1 > a && (a = 0);
          0.9 < a && (a = 1);
          d.jwSetVolume(100 * a);
        },
      },
      lb = {},
      Va = [],
      U = a.extend(this, new e.eventdispatcher()),
      xb,
      Ab,
      Fb = function (a) {
        c.style(pa.element(), { width: a });
        Ka('time', pa);
      };
    xb = function (b) {
      var d = ib.updateTimeline(b, Fb);
      if (bb) {
        if ((b = bb.text) && b !== Ab)
          (Ab = b), c.style(pa.element(), { width: 32 < b.length ? 160 : p });
      } else (b = a.timeFormat(b)), d || c.style(pa.element(), { width: p });
      jb.innerHTML !== b && (jb.innerHTML = b);
      Ka('time', pa);
    };
    U.setText = function (a) {
      c.block(aa);
      var b = F.alt,
        d = F.time;
      F.timeSliderRail ? c.style(d, a ? w : l) : c.style(d, w);
      b && (c.style(b, a ? l : w), (b.innerHTML = a || p));
      ba();
    };
    var Ma = {};
    U.redraw = function (b) {
      c.block(aa);
      b && U.visible && U.show(B);
      Y();
      var d = top !== window.self && a.isMSIE();
      b = ka.active;
      c.style(F.fullscreen, { display: ua || b || ub || d ? u : p });
      c.style(F.volumeH, { display: ua || ma ? 'block' : u });
      (d = la.maxwidth | 0) &&
        R.parentNode &&
        a.isIE() &&
        (!ua && R.parentNode.clientWidth > d + (la.margin | 0)
          ? c.style(R, { width: d })
          : c.style(R, { width: p }));
      wa && c.style(wa.element(), { display: !ua && !ma ? 'block' : u });
      c.style(F.hd, {
        display: !ua && !b && !ma && ga && 1 < ga.length && na ? p : u,
      });
      c.style(F.cc, {
        display: !ua && !ma && fa && 1 < fa.length && oa ? p : u,
      });
      Aa();
      c.unblock(aa);
      U.visible &&
        ((b = T('capLeft')),
        (d = T('capRight')),
        (b = {
          left: Math.round(a.parseDimension(Ma.left.offsetWidth) + b.width),
          right: Math.round(a.parseDimension(Ma.right.offsetWidth) + d.width),
        }),
        c.style(Ma.center, b));
    };
    U.audioMode = function (a) {
      void 0 !== a && a !== ua && ((ua = !!a), ba());
      return ua;
    };
    U.instreamMode = function (a) {
      void 0 !== a && a !== ma && ((ma = !!a), c.style(F.cast, ma ? w : E));
      return ma;
    };
    U.adMode = function (a) {
      if (void 0 !== a && a !== tb) {
        tb = !!a;
        if (a) {
          var b = Va,
            d = b.indexOf(F.elapsed);
          -1 < d && b.splice(d, 1);
          b = Va;
          d = b.indexOf(F.duration);
          -1 < d && b.splice(d, 1);
        } else
          (b = Va),
            (d = F.elapsed),
            -1 === b.indexOf(d) && b.push(d),
            (b = Va),
            (d = F.duration),
            -1 === b.indexOf(d) && b.push(d);
        c.style([F.cast, F.elapsed, F.duration], a ? w : E);
        Za();
      }
      return tb;
    };
    U.hideFullscreen = function (a) {
      void 0 !== a && a !== ub && ((ub = !!a), ba());
      return ub;
    };
    U.element = function () {
      return R;
    };
    U.margin = function () {
      return parseInt(la.margin, 10);
    };
    U.height = function () {
      return Ja;
    };
    U.show = function (b) {
      if (!U.visible || b)
        (U.visible = !0),
          c.style(R, { display: 'inline-block' }),
          (La = a.bounds(R)),
          ja(),
          c.block(aa),
          t(),
          ba(),
          clearTimeout(ab),
          (ab = -1),
          (ab = setTimeout(function () {
            c.style(R, { opacity: 1 });
          }, 0));
    };
    U.showTemp = function () {
      this.visible ||
        ((R.style.opacity = 0), (R.style.display = 'inline-block'));
    };
    U.hideTemp = function () {
      this.visible || (R.style.display = u);
    };
    U.addCues = function (b) {
      a.foreach(b, function (a, b) {
        if (b.text) {
          var c = b.begin,
            d = b.text;
          if (/^[\d\.]+%?$/.test(c.toString())) {
            var e = O('timeSliderCue'),
              f = F.timeSliderRail,
              j = { position: c, text: d, element: e };
            e &&
              f &&
              (f.appendChild(e),
              e.addEventListener(
                'mouseover',
                function () {
                  bb = j;
                },
                !1,
              ),
              e.addEventListener(
                'mouseout',
                function () {
                  bb = y;
                },
                !1,
              ),
              fb.push(j));
          }
          Aa();
        }
      });
    };
    U.hide = function () {
      U.visible &&
        ((U.visible = !1),
        c.style(R, { opacity: 0 }),
        clearTimeout(ab),
        (ab = -1),
        (ab = setTimeout(function () {
          c.style(R, { display: u });
        }, 250)));
    };
    F = {};
    aa = d.id + '_controlbar';
    ra = sa = 0;
    R = X();
    R.id = aa;
    R.className = 'jwcontrolbar';
    $ = d.skin;
    da = $.getComponentLayout('controlbar');
    da || (da = ta.layout);
    a.clearCss(W());
    c.block(aa + 'build');
    Y();
    var Bb = O('capLeft'),
      Cb = O('capRight'),
      Db = O(
        'background',
        {
          position: 'absolute',
          left: T('capLeft').width,
          right: T('capRight').width,
          'background-repeat': 'repeat-x',
        },
        B,
      );
    Db && R.appendChild(Db);
    Bb && R.appendChild(Bb);
    $a('left');
    $a('center');
    $a('right');
    R.appendChild(Ma.left);
    R.appendChild(Ma.center);
    R.appendChild(Ma.right);
    F.hd &&
      ((na = new b.menu('hd', aa + '_hd', $, Sa)),
      f ? Ba(na, F.hd, ya, 'hd') : Ra(na, F.hd, ya, qb),
      (lb.hd = na));
    F.cc &&
      ((oa = new b.menu('cc', aa + '_cc', $, xa)),
      f ? Ba(oa, F.cc, Q, 'cc') : Ra(oa, F.cc, Q, qa),
      (lb.cc = oa));
    F.mute &&
      F.volume &&
      F.volume.vertical &&
      ((wa = new b.overlay(aa + '_volumeoverlay', $)),
      wa.setContents(F.volume),
      Ra(wa, F.mute, Ta),
      (lb.volume = wa));
    c.style(Ma.right, { right: T('capRight').width });
    Cb && R.appendChild(Cb);
    c.unblock(aa + 'build');
    d.jwAddEventListener(e.JWPLAYER_MEDIA_TIME, K);
    d.jwAddEventListener(e.JWPLAYER_PLAYER_STATE, function (a) {
      switch (a.newstate) {
        case g.BUFFERING:
        case g.PLAYING:
          F.timeSliderThumb && c.style(F.timeSliderThumb, { opacity: 1 });
          ia('play', B);
          break;
        case g.PAUSED:
          za || ia('play', n);
          break;
        case g.IDLE:
          ia('play', n),
            F.timeSliderThumb && c.style(F.timeSliderThumb, { opacity: 0 }),
            F.timeRail && (F.timeRail.className = 'jwrail'),
            va(0),
            K({ position: 0, duration: 0 });
      }
    });
    d.jwAddEventListener(e.JWPLAYER_PLAYLIST_ITEM, function (b) {
      if (!ma) {
        b = d.jwGetPlaylist()[b.index].tracks;
        var c = n,
          e = F.timeSliderRail;
        a.foreach(fb, function (a, b) {
          e.removeChild(b.element);
        });
        fb.length = 0;
        if (a.typeOf(b) == z && !f)
          for (var j = 0; j < b.length; j++)
            if (
              (!c &&
                b[j].file &&
                b[j].kind &&
                'thumbnails' == b[j].kind.toLowerCase() &&
                (ib.load(b[j].file), (c = B)),
              b[j].file && b[j].kind && 'chapters' == b[j].kind.toLowerCase())
            ) {
              var g = b[j].file;
              g ? a.ajax(g, ca, ea, B) : (fb.length = 0);
            }
        c || ib.load();
      }
    });
    d.jwAddEventListener(e.JWPLAYER_MEDIA_MUTE, t);
    d.jwAddEventListener(e.JWPLAYER_MEDIA_VOLUME, t);
    d.jwAddEventListener(e.JWPLAYER_MEDIA_BUFFER, function (a) {
      va(a.bufferPercent / 100);
    });
    d.jwAddEventListener(e.JWPLAYER_FULLSCREEN, function (a) {
      ia('fullscreen', a.fullscreen);
      Za();
      U.visible && U.show(B);
    });
    d.jwAddEventListener(e.JWPLAYER_PLAYLIST_LOADED, G);
    d.jwAddEventListener(e.JWPLAYER_MEDIA_LEVELS, function (a) {
      ga = a.levels;
      if (!ma && ga && 1 < ga.length && na) {
        c.style(F.hd, E);
        na.clearOptions();
        for (var b = 0; b < ga.length; b++) na.addOption(ga[b].label, b);
        A(a);
      } else c.style(F.hd, w);
      ba();
    });
    d.jwAddEventListener(e.JWPLAYER_MEDIA_LEVEL_CHANGED, A);
    d.jwAddEventListener(e.JWPLAYER_CAPTIONS_LIST, function (a) {
      fa = a.tracks;
      if (!ma && fa && 1 < fa.length && oa) {
        c.style(F.cc, E);
        oa.clearOptions();
        for (var b = 0; b < fa.length; b++) oa.addOption(fa[b].label, b);
        L(a);
      } else c.style(F.cc, w);
      ba();
    });
    d.jwAddEventListener(e.JWPLAYER_CAPTIONS_CHANGED, L);
    d.jwAddEventListener(e.JWPLAYER_RESIZE, function () {
      La = a.bounds(R);
      0 < La.width && U.show(B);
    });
    d.jwAddEventListener(e.JWPLAYER_CAST_AVAILABLE, P);
    d.jwAddEventListener(e.JWPLAYER_CAST_SESSION, x);
    f ||
      (R.addEventListener(
        'mouseover',
        function () {
          q.addEventListener('mousedown', Da, n);
        },
        !1,
      ),
      R.addEventListener(
        'mouseout',
        function () {
          q.removeEventListener('mousedown', Da);
          H.onselectstart = null;
        },
        !1,
      ));
    setTimeout(t, 0);
    G();
    U.visible = !1;
    P();
  };
  c('span.jwcontrolbar', {
    position: 'absolute',
    margin: 'auto',
    opacity: 0,
    display: u,
  });
  c('span.jwcontrolbar span', { height: j });
  a.dragStyle('span.jwcontrolbar span', u);
  c('span.jwcontrolbar .jwgroup', { display: 'inline' });
  c(
    'span.jwcontrolbar span, span.jwcontrolbar .jwgroup button,span.jwcontrolbar .jwleft',
    { position: 'relative', float: 'left' },
  );
  c('span.jwcontrolbar .jwright', { position: 'relative', float: 'right' });
  c('span.jwcontrolbar .jwcenter', { position: 'absolute' });
  c('span.jwcontrolbar buttoncontainer,span.jwcontrolbar button', {
    display: 'inline-block',
    height: j,
    border: u,
    cursor: 'pointer',
  });
  c(
    'span.jwcontrolbar .jwcapRight,span.jwcontrolbar .jwtimeSliderCapRight,span.jwcontrolbar .jwvolumeCapRight',
    { right: 0, position: 'absolute' },
  );
  c('span.jwcontrolbar .jwcapBottom', { bottom: 0, position: 'absolute' });
  c('span.jwcontrolbar .jwtime', {
    position: 'absolute',
    height: j,
    width: j,
    left: 0,
  });
  c('span.jwcontrolbar .jwthumb', {
    position: 'absolute',
    height: j,
    cursor: 'pointer',
  });
  c('span.jwcontrolbar .jwrail', { position: 'absolute', cursor: 'pointer' });
  c('span.jwcontrolbar .jwrailgroup', { position: 'absolute', width: j });
  c('span.jwcontrolbar .jwrailgroup span', { position: 'absolute' });
  c('span.jwcontrolbar .jwdivider+.jwdivider', { display: u });
  c('span.jwcontrolbar .jwtext', { padding: '0 5px', 'text-align': 'center' });
  c('span.jwcontrolbar .jwcast', { display: u });
  c('span.jwcontrolbar .jwcast.jwcancast', { display: 'block' });
  c('span.jwcontrolbar .jwalt', { display: u, overflow: 'hidden' });
  c(
    'span.jwcontrolbar .jwalt',
    { position: 'absolute', left: 0, right: 0, 'text-align': 'left' },
    B,
  );
  c('span.jwcontrolbar .jwoverlaytext', { padding: 3, 'text-align': 'center' });
  c('span.jwcontrolbar .jwvertical *', { display: 'block' });
  c('span.jwcontrolbar .jwvertical .jwvolumeProgress', { height: 'auto' }, B);
  c('span.jwcontrolbar .jwprogressOverflow', {
    position: 'absolute',
    overflow: 'hidden',
  });
  d('span.jwcontrolbar', 'opacity .25s, background .25s, visibility .25s');
  d(
    'span.jwcontrolbar button',
    'opacity .25s, background .25s, visibility .25s',
  );
  d('span.jwcontrolbar .jwtoggling', u);
})(window.jwplayer);
(function (h) {
  var k = h.utils,
    b = h.events,
    a = b.state,
    e = h.playlist,
    g = !0,
    c = !1;
  h.html5.controller = function (d, f) {
    function D() {
      return d.getVideo();
    }
    function m(a) {
      r.sendEvent(a.type, a);
    }
    function s(a) {
      u(g);
      switch (k.typeOf(a)) {
        case 'string':
          var c = new e.loader();
          c.addEventListener(b.JWPLAYER_PLAYLIST_LOADED, function (a) {
            s(a.playlist);
          });
          c.addEventListener(b.JWPLAYER_ERROR, function (a) {
            s([]);
            a.message = 'Could not load playlist: ' + a.message;
            m(a);
          });
          c.load(a);
          break;
        case 'object':
        case 'array':
          d.setPlaylist(new h.playlist(a));
          break;
        case 'number':
          d.setItem(a);
      }
    }
    function v(e) {
      k.exists(e) || (e = g);
      if (!e) return j();
      try {
        0 <= E && (s(E), (E = -1));
        if (
          !z &&
          ((z = g), r.sendEvent(b.JWPLAYER_MEDIA_BEFOREPLAY), (z = c), J)
        ) {
          J = c;
          q = null;
          return;
        }
        if (d.state == a.IDLE) {
          if (0 === d.playlist.length) return c;
          D().load(d.playlist[d.item]);
        } else d.state == a.PAUSED && D().play();
        return g;
      } catch (f) {
        r.sendEvent(b.JWPLAYER_ERROR, f), (q = null);
      }
      return c;
    }
    function u(e) {
      q = null;
      try {
        return d.state != a.IDLE ? D().stop() : e || (H = g), z && (J = g), g;
      } catch (j) {
        r.sendEvent(b.JWPLAYER_ERROR, j);
      }
      return c;
    }
    function j(e) {
      q = null;
      k.exists(e) || (e = g);
      if (!e) return v();
      try {
        switch (d.state) {
          case a.PLAYING:
          case a.BUFFERING:
            D().pause();
            break;
          default:
            z && (J = g);
        }
        return g;
      } catch (j) {
        r.sendEvent(b.JWPLAYER_ERROR, j);
      }
      return c;
    }
    function n(a) {
      k.css.block(d.id + '_next');
      s(a);
      v();
      k.css.unblock(d.id + '_next');
    }
    function B() {
      n(d.item + 1);
    }
    function y() {
      d.state == a.IDLE &&
        (H
          ? (H = c)
          : ((q = y),
            d.repeat
              ? B()
              : d.item == d.playlist.length - 1
              ? ((E = 0),
                u(g),
                setTimeout(function () {
                  r.sendEvent(b.JWPLAYER_PLAYLIST_COMPLETE);
                }, 0))
              : B()));
    }
    function p(a) {
      return function () {
        l ? w(a, arguments) : C.push({ method: a, arguments: arguments });
      };
    }
    function w(a, b) {
      var c = [],
        d;
      for (d = 0; d < b.length; d++) c.push(b[d]);
      a.apply(this, c);
    }
    var l = c,
      E = -1,
      z = c,
      q,
      H = c,
      J,
      C = [],
      r = k.extend(this, new b.eventdispatcher(d.id, d.config.debug));
    this.play = p(v);
    this.pause = p(j);
    this.seek = p(function (b) {
      d.state != a.PLAYING && v(g);
      D().seek(b);
    });
    this.stop = function () {
      d.state == a.IDLE && (H = g);
      p(u)();
    };
    this.load = p(s);
    this.next = p(B);
    this.prev = p(function () {
      n(d.item - 1);
    });
    this.item = p(n);
    this.setVolume = p(d.setVolume);
    this.setMute = p(d.setMute);
    this.setFullscreen = p(function (a) {
      f.fullscreen(a);
    });
    this.detachMedia = function () {
      try {
        return d.getVideo().detachMedia();
      } catch (a) {
        return null;
      }
    };
    this.attachMedia = function (a) {
      try {
        d.getVideo().attachMedia(a), 'function' == typeof q && q();
      } catch (b) {
        return null;
      }
    };
    this.setCurrentQuality = p(function (a) {
      D().setCurrentQuality(a);
    });
    this.getCurrentQuality = function () {
      return D() ? D().getCurrentQuality() : -1;
    };
    this.getQualityLevels = function () {
      return D() ? D().getQualityLevels() : null;
    };
    this.setCurrentCaptions = p(function (a) {
      f.setCurrentCaptions(a);
    });
    this.getCurrentCaptions = function () {
      return f.getCurrentCaptions();
    };
    this.getCaptionsList = function () {
      return f.getCaptionsList();
    };
    this.checkBeforePlay = function () {
      return z;
    };
    this.playerReady = function (a) {
      if (!l) {
        f.completeSetup();
        r.sendEvent(a.type, a);
        h.utils.exists(h.playerReady) && h.playerReady(a);
        d.addGlobalListener(m);
        f.addGlobalListener(m);
        r.sendEvent(h.events.JWPLAYER_PLAYLIST_LOADED, {
          playlist: h(d.id).getPlaylist(),
        });
        r.sendEvent(h.events.JWPLAYER_PLAYLIST_ITEM, { index: d.item });
        s();
        d.autostart && !k.isMobile() && v();
        for (l = g; 0 < C.length; ) (a = C.shift()), w(a.method, a.arguments);
      }
    };
    d.addEventListener(b.JWPLAYER_MEDIA_BUFFER_FULL, function () {
      D().play();
    });
    d.addEventListener(b.JWPLAYER_MEDIA_COMPLETE, function () {
      setTimeout(y, 25);
    });
    d.addEventListener(b.JWPLAYER_MEDIA_ERROR, function (a) {
      a = k.extend({}, a);
      a.type = b.JWPLAYER_ERROR;
      r.sendEvent(a.type, a);
    });
  };
})(jwplayer);
(function (h) {
  h.html5.defaultskin = function () {
    return h.utils.parseXML(
      '\x3c?xml version\x3d"1.0" ?\x3e\x3cskin author\x3d"JW Player" name\x3d"Six" target\x3d"6.7" version\x3d"3.0"\x3e\x3ccomponents\x3e\x3ccomponent name\x3d"controlbar"\x3e\x3csettings\x3e\x3csetting name\x3d"margin" value\x3d"10"/\x3e\x3csetting name\x3d"maxwidth" value\x3d"800"/\x3e\x3csetting name\x3d"fontsize" value\x3d"11"/\x3e\x3csetting name\x3d"fontweight" value\x3d"normal"/\x3e\x3csetting name\x3d"fontcase" value\x3d"normal"/\x3e\x3csetting name\x3d"fontcolor" value\x3d"0xd2d2d2"/\x3e\x3c/settings\x3e\x3celements\x3e\x3celement name\x3d"background" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAeCAYAAADtlXTHAAAANklEQVR4AWMUFRW/x2RiYqLI9O3bNwam////MzAxAAGcAImBWf9RuRAxnFyEUQgDCLKATLCDAFb+JfgLDLOxAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"capLeft" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAeCAYAAAARgF8NAAAAr0lEQVR4AWNhAAJRUXEFIFUOxNZAzMOABFiAkkpAeh0fH5+IgoKCKBsQoCgA4lJeXl5ReXl5qb9//zJ8+/aNAV2Btbi4uOifP39gYhgKeFiBAEjjUAAFlCn4/5+gCf9pbwVhNwxhKxAm/KdDZA16E778/v37DwsLKwsuBUdfvXopISUlLYpLQc+vX78snz17yigqKibAAgQoCuTlFe4+fPggCKio9OnTJzZAMW5kBQAEFD9DdqDrQQAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"capRight" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAeCAYAAAARgF8NAAAArklEQVR4Ad2TMQrCQBBF/y5rYykEa++QxibRK3gr0dt4BPUSLiTbKMYUSlgt3IFxyogJsRHFB6/7/A+7jIqiYYZnvLgV56IzcRyPUOMuOOcGVVWNAcxUmk4ZNZRS0Fojz/O9936lkmTCaICIgrV2Z9CCMaYHoK/RQWfAMHcEAP7QxPsNAP/BBDN/+7N+uoEoEIBba0NRHM8A1i8vSUJZni4hhAOAZdPxXsWNuBCzB0E+V9jBVxF8AAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"playButton" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAeCAQAAACcJxZuAAAAtElEQVR4AWOgLRgFnAyiDPwMzMRrkHuwuCSdQZ14Tbpv9v/cf2UN8ZoMHu5/uP/l/h9EazK4sx8Cn+7/RpQmg+v74RBo11eCmgwu7keFd/d/wavJ4PR+THhj/6f9N1ZODWTgxKLhyH7scMvK3iCsGvbtx4Tz1oZn4HTSjv2ocObakAy8nt60HwGnrA3KIBisa/dD4IS1/lDFBJLGiv0r9ves9YUpJpz4Ji72hiomNXnTH4wCAAxXpSnKMgKaAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"playButtonOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAeCAQAAACcJxZuAAAAtElEQVR4AWOgLRgFPAwyDCIMLMRr0Hhws6SLwYR4TTZv/v/8f+UZ8ZocHv5/+P/l/x9Ea3K48x8Cn/7/RpQmh+v/4RBo11eCmhwu/keFd/9/wavJ4fR/THjj/6f/Nx5OzWHgwaLhyH/scMuj3lysGvb9x4Tznod343TSjv+ocObzkG68nt70HwGnPA/qJhisa/9D4ITn/lDFBJLGiv8r/vc894UpJpz4Jt7yhiomNXnTH4wCAHC8wQF60KqlAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"pauseButton" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAeCAQAAACcJxZuAAAAYElEQVR4AWOgNRgFPAwqDAZAqAJkofPhgBFJg8r/2VDBVIY7GHwoYEG24RmchcnHpoHhDxDj4WNq+I0m+ZvqGn6hSf6iuoafaJI/SbaB7hroHw9f/sBZ6HzSkzdtwSgAADNtJoABsotOAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"pauseButtonOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAeCAQAAACcJxZuAAAAWklEQVR4AWOgNRgFAgwGDA5AaABkofOxAoP/UMBggMGHAxZkG57BWeh87BoY/gAxHj6mht9okr+pruEXmuQvqmv4iSb5k2Qb6K6B/vHw4Q+chc4nPXnTFowCADYgMi8+iyldAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"prevButton" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAeCAQAAACLBYanAAAAmElEQVR4AWMYMDAKeBgkgBgGmBn4GUQZONEVqfzfz6ACV6Bekv5gMYMcuiKDR/sZDGAKrqz5sf/lfgZdDEW39jPYQxR82/94/y0gZDDAUHR+f3rpjZWf99/efx4CsSk6sj+pbMvKI/vhEJuiXWDrQjNmr921HwyxKVoPd3hAxsS16/evx+JwleUoQeCbMRkRBIQDk/5gFAAAvD5I9xunLg8AAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"prevButtonOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAeCAQAAACLBYanAAAAmUlEQVR4AWMYMDAKBBgUgBgGWBhEGGQYeNAVGfz/z2AAV2BS0vXgJoMGuiKHR/8ZHGAKrjz78f/lfwYbDEW3/jOEQBR8+//4/y0gZHDAUHT+f/qcGw8//7/9/zwEYlN05H/S3C2PjvyHQ2yKdoGtC+2e/XzXfzDEpmg93OEB3ROfr/+/HovDDZajBIFv9+RbDBpEByb9wSgAAHeuVc8xgA8jAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"nextButton" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAeCAQAAABgMj2kAAAAlUlEQVR4AWOgAxgFnAyiDPwMzHA+D4MEEKMAuQeLS9IZ1OHKVP7vZ1BBVaL7cv+P/VfWwJUZPNrPYICqxODW/lv7H+//BlNmfwtTyfn9EHh7/+f9N1aml57HVHJkPwJuWZlUdgRTya79EDh7bWgGyKJdGEp01+9fv3/i2oAMmHPXYyiRm7zYNwPZ08vBniYcdDQHowAA/MZI93f1cSkAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"nextButtonOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAeCAQAAABgMj2kAAAAlUlEQVR4AWOgAxgFPAwyDCIMLHC+AIMCEKMAjQc3S7oYTODKDP7/ZzBAVWLz8v+P/1eewZU5PPrP4ICqxOHW/1v/H///BlMWcgtTyfn/EHj7/+f/Nx6mzzmPqeTIfwTc8ihp7hFMJbv+Q+Ds56HdIIt2YSixWf9//f+JzwO6Yc5dj6FEY/It325kTy8He5pw0NEcjAIAWP9Vz4mR7dgAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"elapsedBackground" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAeCAYAAAAPSW++AAAAD0lEQVQoU2NgGAWjYKQAAALuAAGL6/H9AAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"durationBackground" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAeCAYAAAAPSW++AAAAD0lEQVQoU2NgGAWjYKQAAALuAAGL6/H9AAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"timeSliderCapLeft" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAeCAYAAADpYKT6AAAAFElEQVR42mP4//8/AwwzjHIGhgMAcFgNAkNCQTAAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"timeSliderCapRight" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAeCAYAAADpYKT6AAAAFElEQVR42mP4//8/AwwzjHIGhgMAcFgNAkNCQTAAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"timeSliderRail" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAeCAYAAADtlXTHAAAALklEQVQI12NgIBmIior/ZxIVFWNgAgI4wcjAxMgI4zIyMkJYYMUM////5yXJCgBxnwX/1bpOMAAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"timeSliderRailCapLeft" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAnUlEQVR42t3NSwrCMBSF4TsQBHHaaklJKRTalKZJ+lAXoTPBDTlyUYprKo6PN4F2D3rgm/yQG/rfRdHuwp5smsNdCImiKKFUAx/OaSpR1xpNYwKK4/2rLBXa1s1CnIxxsLZbhGhtD+eGBSWJePt7fX9YUFXVVylzdN2IYTgGBGCVZfmDQWuDcTyB/ACsOdz8Kf7jQ/P8C7ZhW/rlfQGDz0pa/ncctQAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"timeSliderRailCapRight" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAn0lEQVR42t3MTwqCQBTH8bcIgmirJYoiCOowzh8ds0PULjpRqw5VdCZr/WueMJfwC5/NezOP1lcUHWbv5V0o1LYSVVUjTXP4xYM4KTWYEB2ybFlcSSmLoK4F4vj4JmN6BFpbHs5krUNgzMDDLw3DCQHfTZL0Q85NYH0/Is9LNI240Tie0XUaRVGyJ4AN+Rs//qKUuQPYEgdg7+2WF2voDzqVSl5A2koAAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"timeSliderBuffer" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAeCAYAAADtlXTHAAAAKElEQVQI12NgIA/IyMj9Z2JhYWFgAgIGJkZGRhDBwMDEwMAI5TKQDwCHIAF/C8ws/gAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"timeSliderBufferCapLeft" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAY0lEQVR42uXJyxGAIAxFUfrgI5CgzajdqlWxQffxaeiCzJyZ5MYMNtb6zTl/OhfuP2BZQ4h1mpLEmOWPCMd3pESSM2vE0YiKdBqJuDEXUT0yzydIp7GUZYMKAhr7Y4cLHjPGvMB5JcRMsOVwAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"timeSliderBufferCapRight" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAYElEQVQoz+WLyxGAIAwF6YM/CdqMlCtdcRHvMSIw9sCb2ctuIsQaU8pUpfQppT6mdC6QtZ6McYUPUpMhIHkP9EYOuUmASAOOV5OIkQYAWLvc6Mf3HuNOncKkIW8mT7HOHpUUJcPzmTX0AAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"timeSliderProgress" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAeCAQAAABHnLxMAAAAH0lEQVQI12NgIAT+/2e6x8D0k4HpOxj9AJM/CWpjAACWQgi68LWdTgAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"timeSliderProgressCapLeft" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAQAAABOdxw2AAAARUlEQVQYV2NkgANG+jP/+zJkMtgCmf99vi38KPQTJPpq6xsvqIKznxh4ocwjCOaebQyeUOZmX4YFDEJQw9b4QQ2DAfoyAVkTEmC7RwxJAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"timeSliderProgressCapRight" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAQAAABOdxw2AAAASklEQVQYV8XLIRKAMAxE0R4QbhrXoQqJxWJxCGZqaKs/m1yi+80TSUqzRmNjCd48jMoqXnhvEU+iTzyImrgT+UFG1exv1q2YY95+oTIxx/xENX8AAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"timeSliderThumb" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAeCAQAAACP8FaaAAABMElEQVR4AeWSv0rzYBjFfy1NlU5RKC3dCjqZDwRXEapOuuik+BfbNLdUeg86pHSrm1Z3G3w7VAdbB+sNFFKIZ1FCjTjL95wQOOd3IC/vE/6vSZEmQ5Z5KUtGLhWjshYLbHCIKx2wLmcp/cJzOFTb/vtoGk7D8bDtc4GjNP2J/+ENzFv0FBnpORpHA4OnVBWwKFANTD96jKkfBYYqRVFyVC5bCr/pqsWmKDZHd8Okwv2IY1HyuL0wqRCE1EUp/lR4mFAT1XNym/iJ7pBTCpBnp5l4yGaLXVFsVqh1zCzuGGoiNuQoUcG7NjPYU1oSxVKrzDZuw+++BtPe5Oal4eOypdQWRVfNoswa+5xTl87YkysrjW3DpsQyDquSw5KcjXB83TlFeYoU9LbltO7ff5i/Mh+pOuncDFLYKwAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"timeSliderCue" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAeCAYAAAAl+Z4RAAAAcUlEQVQ4y2NgGAWjYBTgBaKi4llAfASKs0jWbGNj96S1tf03CIPYJBkCsrW6uu53bm7+fxAGsUFiJBmQlpbxOzMz5z8Ig9hAsaMkecHIyORJUlLq78TElN8gNlAsm9RwyAbZCsSHgDhzNFmNglGAHwAAo/gvURVBmFAAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"hdButtonOff" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAeCAYAAADQBxWhAAABf0lEQVR42u2VvUoDQRSFA0awMIVCsv+z/1oE8yOE9MYmtb2P4AspSOyECFZqtU9gbZvK6CNoNZ6zMMuSQpxdEAJbHC737pz59mbmblpSyn9XA22gDXRLod2uMYfWkKwh+uc60LVtO9J1RWXBn4N1oNL3QxkEEcwuzYybOWMh07QJ4xqK/ryuBQ3DWEZRoowdx3FfhAgkI3NVp7IsO5xMpnPDsFae59NHvzaURgWlWpblPEOSkbmqQzfQK2DT8fj0HB0rrz40jlOqgA4Go1m/f3LJWIYC8uQ4nkSX94vF3S5qX8qrDU2SlCqgOMMrAK4Zy1B27nlCIj4i34G+lbcC9ChXuSNeFEbmpZe5RZdv+BU4ZjM8V159aJoe5yp3JIS/eaZcv7dcPhzghc6Qr3DZlLc6FOelRoTn9OvI4DKxw2rQXs/84KzRyLPhTSSQGzIyV2OBdYzIYz4rgKxjn88/Q4fD0QUNNT6BBL5zH50Pfhvahzo1RH+7+WtroA10O6E/bVCWtAEB8p4AAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"hdButton" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAeCAQAAAB6Dt0qAAABPUlEQVR4Ae2SsUrDUBiF/0EFfYK8Rl4g5BUUHGILRWghUHAQHJzaUcjSgB1EtCApliDoUApSKggZRFSUQsVAawspElz1OunxhwtZcm0Ht9LzQfLByVluLs145lkkjXQyyPwTg3uNv0tFKzuR+MAkIlF2eJyKPhBjRBMZYyBIp1SMEV6nMgIZlIoZQkJuIw7RiMll36XN5e31k0AkramYdiGhQjPsohlSgT13GTy8WXurR0mrmt5BQla+ZJ/mS2SxF8+GT7joLRRvvmWrnAaQULbi1R4rHmXZi/VhAO9laev6R7bKaQcSsv3+Lfw+2ey548B/t/Yz3pVs1dMWJORW4xaqfEzsfEwrO2te5ytpFVPjHJJntPnZ5jc708M9muwS1c/Ra8LHNGrKK6FlnENRxyQOPjcc0v5z/Wc68/wCXWlzVKUYIC4AAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"ccButtonOff" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAeCAYAAADQBxWhAAABzUlEQVR42u1Uu0oDQRQVTCMopMjmtZvdJPswKCQbC6tYCEqMBDUGrf2NCDF+gmXEyiZWiTb+gMTGxtrGwmh8IOKjUoLjueNGfCBk10rYC4eZOey5Z+7M3O1zww033Og5BCGQA9oAcw6uz9kxbYfDIpMk2TGg58Z2TJmixFg0GueIRBQWDIZ5BX5/kIli5AcfCIS6PIH0nLdlGoupLB7XmCxHyegymTSXa7UdoVBYHBVFqQEDMjozzfRCvd7w5fNzKfD74ElHevumEHKEQiJD4nmYz4JvwWirWt30YiO36fTYNKotgj8Hv1GprPvAP1obtm+qqjqBhC/l8toAkh18uqs7rK8ZY/0Yj8AT90o80LG09k01TQe48Bnw4O6asqzw5DjGXVR2Qt9iPLb4Dh07NnGvqhq0jkwNQvehTCYSI0tIeIWqtq1jfAA/bhiJFcxvcPzVUmlVwPwJVZLWvqmuD3MgGYlbGHPN5qE3m52JYU0PifhTGEwRn8lMaFjvYVNdrXNT7BjGX1tGkvgL/dYyxMv0vTNTahH02ocY1cBEpTbgeL8z41eeNKSn6+jZNJUyiyT4y28Q+gvK07MpWsEDDAJDzsH1nj433HDjX8YbqHFYmhICTLsAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"ccButton" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAeCAQAAAB6Dt0qAAABWElEQVR4AWMY5mAUsDJIMBgy2DE44IR2QHkJoDoMINHQ/eTbl//44JNvDd1AzRjA8N63p/+f4IVP/9/7BrQZA9g9/H+fIHz4H+hsDOBw6z8EnvqZsJ6vznDCkke3/h/9Hr2ap9Z08oqnMFkGByxaL/+HwMiVafNufFl+hWvmiR+BC/IX3/yy4Bz/nJN/wbLYtZ75D4In/3GV7n56/v+1/zd/H/rGkHPgJYh94/fp/2B57FqP/AfBg/84SlY/O/L/8P+JLze/Z8je8PrI/0P/Jrza+Rcsj13r3v8guO9/+LKEhZu+9lzmn7zrl++c9BWbv7WfE5iy/S9YHrvWbf8hcP+P0FVsVSo9y57s+L/vm/9ytiqtvhVANlgWq1a79f8hcDPQR9eBAbIHyN7y/yyQfQnEhkCskWM4/9uq/4TgfKxJQiK6e/a3pf/xwZlfo4AJkZLkP6zBKAAAGMt/2TouFxQAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"muteButton" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAeCAQAAACY0sZTAAABZ0lEQVR4AWMYjGAUMDEwMzCSpoUxju+kDQMXAW1AaRYGdiCGsFjchd/OWmELFMGrhd1a4UUTAy+QzXLSdKMhA1+Z/tuF0qIMTLjdz9tp+27ly/0M4kBbWGdqv1/gJcMgdLz6YAA2u9gYhBgkGGR2pH3ZfWf/1f0Mshdsk8UZBDYlXMthEJhqfbuVgQ9Tk9D//SD4dv/F/eeBkEHuaNjjegYBT/k78xiEOcWuLWIQxtQkcWI/MmSQYhC/shioUPjUAhB5cgFWTQf3I0MGaQ6JwyBNIofBmsAkpvN27UeGDPI349dXMghEKu2byyAsKLZ/IYMQzoBoTNm4e8v+LcCA2GBoKsQgcDFjcRqDwBr7dU0MfLiDnCfaavHKdaAgZ2ZgXWd4cZ6eJIPQ5YYZXgzseCNXQ35GPSRyt+lVaTLwTTA9NJdTmIGJ2GTEzMCSKPZifoklpj14jTDj6jJj4CI5nYOzxkCCUQAAMVp+znQAUSsAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"muteButtonOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAeCAQAAACY0sZTAAABfUlEQVR4AWMYjGAUsDJwMLCQpoXRTnZZIoM0AzMBZQzcDCIMXEAWC5Dk0tZ6fK0uFyiCBzAziCh5Xd7PoAJkc64I7QxhUPWLf/yQ3xjoTByAjUExrvzB+5f/GewYOBn4cgOf3ddxYNDftH1OCza7BBgMGBwYfCas/fjnzv+r/xn8NiXYGTJoTZ25ZymDTn7W8UMMapiaDP6Dwdv/F/+fB0KGgJXtF3YyaGp7XLrLYMhqce4hgyGmJocT/5EhgxuD7ZknDEYMJgcfMBgzGB8AkZiaDv5HhgzuLPa7nwBNN90N1gQmMZ236z8yZAjcN3H+JgZNM+8tQOdxWm17yGCAMyBSV6//s+X/lv8Mvv2BChoM2hsXd89n0GnKn7+PQRV3kCvYlsx6v+4/gy0DOwNvU8SJO1LWDAb791bUMgjji1xhMc/u3QzKoMid6hPtxaCakrbzDqsBAytxyYgZmFQ5bfXu3Q1Lx7QHrxHykgWRDFJAA0gCLAzsQC0DCUYBAC3AlmbNhvr6AAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"unmuteButton" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAeCAQAAACY0sZTAAAAiklEQVR4AWMYWWAUMDKwMLADMUla2K0VnjUx8BKvhYmBt83m3cp3+xnEiFHOxiDEIMEgsz3l6+5H++/sB7KJAEL/94Pgu/1X918GQuI0SZzcjwSJ1XRgPxIk1nnb9iNBoCYSAqI6ZdXOtfvXAjWREuQ84VZzVi4DBjmJkassN7GegZe8ZDQSwSgAAJ/LQok1XVtuAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"unmuteButtonOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAeCAQAAACY0sZTAAAAjUlEQVR4AWMYWWAUMDJwM4gwcJGihZlBRMnr0l4GZeK1sDEoxpQ+eP/uP4MVMcoFGAwYHBh8+ld/+vPo/53/QDYRwOA/GLz7f/X/ZSAkTpPDyf9IkFhNB/4jQWKdt+0/EgRqIiEgElct/7P2/1qgJlKCXMG6eNL7Zf8ZLEmLXGFhj5bdDMrkJaORCEYBAOZEUGMjl+JZAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"castButtonOff" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAQCAQAAAC8EZeQAAABOElEQVQoz2NgYGDgYJBgUMALJYBqgEDiP0EAVAoECv//vyIAgaZCFL74z2CBw1qLFyBZsELp//+f/meQY8AOFMCyYIX8J9ovnmIQwa3wIVghO4MogzzMX9gV3gMrFPl0++aWhUmc0gycDEzYFd4CKxT9/uLe/2f/H1zq9GPgZ2DGpvAaWCEfg1Zc9PptF//e+r40h0EAw1SgwksQE7/cOzFfz6Ep/9Tncz8mRDJwYyo8B7X61ZX/d16VRTVknP198JGKEtCtQgyyiHD8//80WCGvoO6M6Ud/H3vj7HZo5Yn/c9oZJJ9uRo3A42CFwq8Pergv6jv6f/l6d697vzddZlDcmHrr/xEUCIprsf//jx1j07z7aN9HLu2Xlw/+lpVl4GWQwkw9HAxiwFjhBQa7GDAERIAk1qAHAOge4gtynPL2AAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"castButton" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAQCAYAAAAWGF8bAAABy0lEQVQ4y2NggAAOIJYAYgUKsATUHDCQENnz/z+lGGooGCiABESXPaAIQ12KbOB9kKAFiV61AOmD6oUbKA129tJ7IEE5BtKAApJeuIH8ApNPtAvPOHsKyBYhy8Ald+EGsgOxKBDLo8cUSQYuug03UER406fbggtubuEtX5jEyM4pDRTjBGImUgwUXngLbqCo8LbvL4SX3v8vvPrFf6GlDy9xp3b6gYIBiJmJNnDBDbiBfECsxeGeEC3Qunmb8Lyrf4UX3/nOW7U0ByguQIRLIQbOv4bkwi1f7gEjZT6Lkr4Dd1JLvvDMC5+F51z+wZM9MRIoz02UgXOvoHj5FSgMgN5+xRleFsUd35ghPPfyb6EpJx4xS6sqQcNUCIhlsaVDsIFzLsEN5GXkFdTlK503XXjmud9CM869YTV0dhOYeGSl8OyL//kqFrUD1UgKrXy6GV+2E551AW6gsNDa1wfZTD3c+aqW9AnPOv9foGn9ejYTdy/hFY9/C3bvvgxUo8jXtDFVGJi9gJbixLC8LAayQWjGmWMMLGyawssePhKeeuIjIwe3tvDaV5eFZ5z+zSwmB/IqLxBLEVPagAgxaA7hhSZyMWjsi0DZRCd2ANcuONhZFnJlAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"fullscreenButton" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAeCAQAAACC7ibdAAAA5ElEQVR4Ae3KsUrzYBhH8RPIFAJ5O3/ig5COgVyHW7N09x7aXSrESafuHeLi0A6iGEX+Y3edLMqnpe7egfbFMZCMXfo762GH9gIijIx8W0rcMQ9tU/3oL9KOGXdYLOuNfOS0CrGLyVr/fZ1zMht9a6VXqV6JjFa9efmiZ43PDoqnCqMh8BGS4IjpT8vTMYY7NiIaooHhsNnovqRPTA9HSOCjwT6ro+Jy8qV3PZT0aJUt9VavdadbnY9IaJUv9KiF5jqZYIQd87V80/rfAEdAq/RKvht9VEPrmmNS8m0ZRkTAzuz9AlNJVl+tEWchAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"fullscreenButtonOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAeCAQAAACC7ibdAAAA5klEQVR4Ae3MIUzDUACE4b8VlU1FaQWEBPlQna+oxqHm0dTicShQcyWZwSBWEgohEIKcB8UKAZbhcZXHmsw1eZUz+357OdZow8HHkJItSwiwcodmUWuFpO852s2nzUJtZFh5mPNyrq+23nE4Lv4007templIsYon1ZtedXKzkz/XGDocXBw8QiICBqPq9JJ9ogODT4d/aIgw4+KhYkBAzBbe6qLD/NR7+UX5q089VsRYpVN9NHPd605nBSFWWaknlZroqMTg9Yyv1TZqto+JcLBKrtR2q+96aHCxCkjIlqUYfBzWZuMfAHJlDLF+xFEAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"normalscreenButton" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAeCAQAAACC7ibdAAAA50lEQVR4Ae3KsU6DUBhA4QMNAtsNFcJLyKBx8mXYmNxkculDuJG4OOOmcbr/QNS1xKaJqxJjTJpUk84KuHW4d+nY76yHvV1zxlx8AiZYeJeHBKgmX14wte1qXZ1l98VG/8iyJMQo+ZJVvdGddPohx8co7eRThvWmQOFa5ncZWtSnRwQ4GEVvMvQh62oW2+YDItK+BIW3PTt4KJJxiPrVyJnF39Wv/EdkmQlOsqd6IUOkGLmou+JVv0ifdfabfKVbaXVTt0KCUfhczmWur4rj7LFCYTRhelte5yiC8xgPbHuIj4sztrdbfxJjV3K8mZ7yAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"normalscreenButtonOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAeCAQAAACC7ibdAAAA7ElEQVR4Ae3Sr07DUBzF8e+daKaaiaYNAoH8uc43pK+AmsHimETxDAQBQZVkCQhAUFMBewkUCG4W/ib4haTykCYzmFszuc+xX3lYtw3HAEdEQsqQHvGekWKz6qFh3Jfbl9+Znta/WmrekBFU/GjRLvWuN11UJASVXh/yetVxjRH1xM/qNm+3D0lxBOVP6vaiTz8xBgSNyCkpKTBiHP84YoyiC8gZETSY2LfXCjlBjnRretk26kZJUISd1I+679YbJ7NqoTvd6Ly9FQVB2ay51pX262x65jGChoyPmoMKI901YujLMxKi1TnXa+MPEjlkhvYbWGMAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"volumeCapLeft" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAeCAYAAADpYKT6AAAAFElEQVR42mP4//8/AwwzjHIGhgMAcFgNAkNCQTAAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"volumeCapRight" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAeCAYAAADpYKT6AAAAFElEQVR42mP4//8/AwwzjHIGhgMAcFgNAkNCQTAAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"volumeRail" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAeCAYAAABaKIzgAAAASElEQVRYCe3BsQ3AMAwDQRIW4Cqlkf031AZKVkg6An8nAQCAH3zOPQpQe28lqJcS1FpLCcpWhJKsBGVbCaq7lcAzcwkAAHz0AE0SB2llBfTtAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"volumeRailCapLeft" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAeCAYAAAALvL+DAAAAeElEQVR42tWKQQqDMBBFB3cFt9oQQ0wniW51b5f2ti30ZLX1AN+ZQA/hhwfz/zw6eZrmmoWn8NUyCh9jLJzzoLY1L2sd+v6GEBikmh7MCTHmYvyYI1LKBeo69/Y+SBkKtCz3SaztPxKAal0fs5ry2Emjo3ARajpNDtqHL/b2HUUVAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"volumeRailCapRight" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAeCAYAAAALvL+DAAAAeUlEQVQYV9WKOw7CMBBEV3RItAmWYzlmbUMLfSjDbUHiZASFfpj1LTLSW+18RLarrjt+yZPUFoQQ4ZwHgw+5SEqKcTzB+4C+dy/JuUK1wAouVimlwlDNtvgxOMOIMWEYwrsFZtgu03S/Cp/Vmnl+3ADshOdA9s1sSn8goC/6ib5oHgAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"volumeProgress" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAeCAQAAADwIURrAAAALElEQVRIx2NgGAWjYBSMRMD4/z/1DWW5TQOXsnwdMoZ+GyouHQWjYBSMTAAAnO8GxIQ7mhMAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"volumeProgressCapLeft" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAeCAQAAAChtXcIAAAANUlEQVQY02NkgAJGOjH+9zEkAxm/JrzJ/wYSufTxLx9Y6shHBghj10SGPKji9RMYkhjp6EIAcaIN1SJ2FnYAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"volumeProgressCapRight" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAeCAQAAAChtXcIAAAANklEQVQYV2NgoCP4//F/H5hx5/+z/78mABnn/5//f+kzkHHkPxCCGLv+A+FEIGP9p/UgFXQFAHkZGwN2fDIsAAAAAElFTkSuQmCC"/\x3e\x3c/elements\x3e\x3c/component\x3e\x3ccomponent name\x3d"display"\x3e\x3csettings\x3e\x3csetting name\x3d"bufferrotation" value\x3d"90"/\x3e\x3csetting name\x3d"bufferinterval" value\x3d"125"/\x3e\x3csetting name\x3d"fontcase" value\x3d"normal"/\x3e\x3csetting name\x3d"fontcolor" value\x3d"0xffffff"/\x3e\x3csetting name\x3d"fontsize" value\x3d"11"/\x3e\x3csetting name\x3d"fontweight" value\x3d"normal"/\x3e\x3c/settings\x3e\x3celements\x3e\x3celement name\x3d"background" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAA0CAYAAACQGfi1AAAAYklEQVR4Ae2VwQ2AMAwD/cgKVRbJuAyH+mOBfMMQyBKCuwWsxoaLtfKQkaiqtAZ0t5yEzMSMOUCa15+IAGZqgO+AFTFTSmZFnyyZv+kfjEYH+ABlIhz7Cx4n4GROtPd5ycgNe0AqrojABCoAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"backgroundOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAA0CAYAAACQGfi1AAAAY0lEQVR4Ae2VsQ2AQAwDXWSFF91Pkf1rxkAZIm0YAllCcF7Aiu3/i7WOU0ZFZm6rQXfLaiCzYkbuC+b1EWHATM3iHbAiZkrJrIiSP/ObQjQ6gAcg8w/AsV/w2AEmE1HVVTLqBmJaKtrlUvCnAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"capLeft" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAA0CAYAAACHO2h8AAAA4UlEQVR4Ae2XwUoDMRRFT17GTscIMoWOqwF1WUSFIv6Autf/X5TuxG6FBkOeHfAHpk+GLnI+4HBzLzyI44/l8uoBeAVugJqRuIMA4L1t24+u685DCGci4hhJBdwPkr7vL3POLsaIqnKM6G2xaJuUksPAILquqtlMFayiuYhzYDMJIygi+2qonloi0CkTldXK/NOXXVYrZRs6UgyUjsrxL6d28sP2b4n0xJ62z1nVHbCutolx/4MRH8LFt6o+Nc28tqTyq9Xd5273RUrpVsSL915gvNCt188MbLebR+Dl2K/oL+WmRveI4jXNAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"capLeftOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAA0CAYAAACHO2h8AAAA5ElEQVR4Ae2XMU7DQBBF346sIDAUDoqprNBCm4Im3IPcAE7EEbgId6BF6akQjheZGTYSF7DXQi7mSdM+zf4vjbSBP1arqy2wA26BUwZSJAHAY1VVT3VdX5RluZDEYBGwPUqaprlUVYkxYmaMEe2Wy+q873shgwK4KYrFiRnkis5EgkCeScjHRQNaw2xuG4HNYiNvzeufPmxvzcPOz8jIwDPy4++n9t8P22Qb2cye1qqahhAkt7W3GLvvKep/+Uyo/igYY0fW6+vXtv16/kgcDl2nagkYOmGzuePIfv9+DzyM/Yr+AujSfWZZzzLnAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"capRight" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAA0CAYAAACHO2h8AAAA20lEQVR4Ae2XQUrEQBBFX4e29QJDVgFv4Cb7wSt4Ps8wLtw5B3A97mfmAFlkkbaZMpAynkBiBRGpd4Ci6j/4UGGzqR9ZjgBn4AV4A4ht29YsZJomzTnXXdfd9X2/A55iKYWlhJmU0nXTNAl4mIedwnZ7/4wBkcvH8Xh6jaqYiDFdAbcRFAtVFQJwU7ESPuh7zPrX3wj0T2zk1lz/+mG7NQ/bnpFixDPy8veq/dViW20j/W+drTOAmK2JXEbgbDrt628bhqEA+x+dpjMiMuY8lFLed8DB+orugQPAJ8i7bEsKl1PuAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"capRightOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAA0CAYAAACHO2h8AAAA2UlEQVR4Ae3XwUkEMRTG8X8eIaLgwYXF0xRgKYsVWIIVrR1sI3uwANkSvMxhDhOzRoZ5pgOZSZiDvF8Bjy/vgwdx+/3jO8tdgQtwAs4A7nB4/mShuYgx5r7v4zAMR+DNp5RYyjknIYTbrutugNcy7ENYQVUpoZimSXa7h3vgxatSxfsQgCcPdZNEnAB3QiM26G/V9bdPBLp9ImvN6t9y2daaLbtiR0ol25Edfzu1mx62Zon0v91sVZ2Bq1Ap5+8f4FL1tLkYC+C06mla5CLGcUzp6wicm31FfwHzmG90m7lXIAAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"bufferIcon" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAA0CAQAAABI31KIAAABGElEQVR4Ae3Rr0pEQRSA8Zl1b1uDQTAt4j8QES1qURZvEf8lfYJVsfoAisYFq9mgyfUFVptgMtk3CAaD6DN8HoYbFhk9w9x0Yc6XDsv8LrNj0vgnTZo05LzzyR7m/wxafQC+sDHQENkv6DsG2uFV2i62nDc+2C82SybVwqAX+tIzxlOdzBUEPTnosTy0wgM9lryQpS7pVwutetAiN3RZU481mJYaf0PX9KR7rALNMCtNaVC3PLTALXesYpSGlatFVDFonnNOmfQeGKHFOqNhUIcr6cwLtdiVNkIgy6WDLrxQ7qBNrApJy0J1mCu2CY6k4qKMCbJFM/TPHvzeASfS8cBvtbhXazvosPzzN2lL4/GQXoISlKAqQz+eXnU2Tp6C2QAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"bufferIconOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAA0CAQAAABI31KIAAABGElEQVR4Ae3Rr0pEQRSA8Zl1b1uDQTAt4j8QES1qURZvEf8lfYJVsfoAisYFq9mgyfUFVptgMtk3CAaD6DN8HoYbFhk9w9x0Yc6XDsv8LrNj0vgnTZo05LzzyR7m/wxafQC+sDHQENkv6DsG2uFV2i62nDc+2C82SybVwqAX+tIzxlOdzBUEPTnosTy0wgM9lryQpS7pVwutetAiN3RZU481mJYaf0PX9KR7rALNMCtNaVC3PLTALXesYpSGlatFVDFonnNOmfQeGKHFOqNhUIcr6cwLtdiVNkIgy6WDLrxQ7qBNrApJy0J1mCu2CY6k4qKMCbJFM/TPHvzeASfS8cBvtbhXazvosPzzN2lL4/GQXoISlKAqQz+eXnU2Tp6C2QAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"errorIcon" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAA0CAQAAABI31KIAAAB3ElEQVR42u2Tv0sCYRzGv5WFJIVgkEVLSy1ObWGDUE0OgdRYtBZC/QENFv0DDTW0FEYJGkgEBUZCEFxYlJpnEMSpUxpBNAkiT++rlb+uvNOpuOcz3Pt+j3vgeN8PkRYtWv5Z2qmb0d58kXl7ZXuFzM3W6E3jybfUW+8E6ZupaaXB3ZNnPGPnlAbZruF02ebTuRRSSOds89TVaE0bWYJiEhIjiaBIFjZpKKaF1TSePknDuUamRmo6dKPRzCNKRDO6UepQW9NCAxseCXHGlHvKzZ8SNjw0wN6oSqfFIWXvwSE72YsrKWtxkEHdsQ/5hRjuCpCNbMVVDEdXNKzmGhhnlqT8DYrwoq+1lJ9ZIqNyu0aERAhXn/Cir3UIQoJGlJpndm2KuPyGF5V2IlxbyszTmybi7xcowYvK9/H3/sn65hXsEnBeBi8q3wuKzGN2PeQCKIcff+Xkoa55zK4zMYCTCubcs+7KSQBn3DzdL3Ytrt3iuIpXRvXsFs516vnFruuMH8oI/Whewa4gDmsY8435aqfBH81jdoWzXtTi8Dm8cvOwrHkFu/zwyJDBi+yc/aCMecyuUH4f6rjOTy9Xm9cXiRxgTyX7iESor7LIQENk5XdYFVb2lYG0aNHyF/MB+x5LQiE6gt8AAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"errorIconOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAA0CAQAAABI31KIAAAB3ElEQVR42u2Tv0sCYRzGv5WFJIVgkEVLSy1ObWGDUE0OgdRYtBZC/QENFv0DDTW0FEYJGkgEBUZCEFxYlJpnEMSpUxpBNAkiT++rlb+uvNOpuOcz3Pt+j3vgeN8PkRYtWv5Z2qmb0d58kXl7ZXuFzM3W6E3jybfUW+8E6ZupaaXB3ZNnPGPnlAbZruF02ebTuRRSSOds89TVaE0bWYJiEhIjiaBIFjZpKKaF1TSePknDuUamRmo6dKPRzCNKRDO6UepQW9NCAxseCXHGlHvKzZ8SNjw0wN6oSqfFIWXvwSE72YsrKWtxkEHdsQ/5hRjuCpCNbMVVDEdXNKzmGhhnlqT8DYrwoq+1lJ9ZIqNyu0aERAhXn/Cir3UIQoJGlJpndm2KuPyGF5V2IlxbyszTmybi7xcowYvK9/H3/sn65hXsEnBeBi8q3wuKzGN2PeQCKIcff+Xkoa55zK4zMYCTCubcs+7KSQBn3DzdL3Ytrt3iuIpXRvXsFs516vnFruuMH8oI/Whewa4gDmsY8435aqfBH81jdoWzXtTi8Dm8cvOwrHkFu/zwyJDBi+yc/aCMecyuUH4f6rjOTy9Xm9cXiRxgTyX7iESor7LIQENk5XdYFVb2lYG0aNHyF/MB+x5LQiE6gt8AAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"playIcon" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAA0CAQAAABI31KIAAABHUlEQVR4Ae2Vu0oDQRRAB2xSWVmmtQncLzFREUUsnW/wJ0SCWgQV8TUQBBEsjlgIFoJFCsFCCT5QgwZFtPGtncUWIcTZnd2pAnNOf2Bn5t5VgUCge8mpPtWrevxD+cbi1KTq948VXvjlbMM/Jk2aPPPjHZM7Ip88Y3JLy0e+M8fkmnYfMsbkkk7v+Uodkzr/2+AzVUxOsXvDh3NMToj3inenmByT7AVviTGp4WadV85XK0WVs4SOcHd3rVyyhg5xc91M6NhPOyDZFTOuEw97n3iXzZh2uv497C6YUe38ILFQMSM61Yjs0Om8Gdaph3abdmfNkM60RrZoWTaDOvNi2yRyxpQsETcKVapMm6JHJCI/tzTgEfH4QXYxgUDgD+1pwmmFlV3oAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"playIconOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAA0CAQAAABI31KIAAABHklEQVR4Ae2VvUpDQRBGt7BMaekD5AEsU0zvL6KI76CdL6FDUItgIYJNEERIoVgIFoKFhWChBBNRYwwZRBv/tfostgghuXf37lSBPac/cHd35ppIJDK45MyIGTZDRk2+UVteNaP6WOEVf7hu62PUQgsv+FXHqAnrszJGD+go+AmO0R26bQfGqI5en/CdOUZV9LeBr0wxukKy9/j0jtEl0r3Fh1eMLuC2hndnjM7hZxVvuHksLZpcQugM/h42i0uJoVP4uSMLnPppJ3C7LfPsPOxjpLslc+x1/UdIdlNm2ftBHqC/JZnhTCNSQa8bMs2Zh3Yf3a7JFAetkT10LMokBy+2XVhZJgIjlkIZZazIuCJiya/Xx9QR/Q8yEokMFv9/Ax7UXjl24wAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"replayIcon" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAA0CAQAAABI31KIAAADOElEQVR4Ae2VUWhbVRjH/0nqdk0m0eTGITVZNsmiZCLTlooNPoWlbk27lzmGSIeyh7YgFSYaGO2yDZk4GMi65kG9d6kkbfCuyf1bqZmmlsYxCK51KwxkrpM4qBRla18cIngvw0qgN7ea1/z+L4fDn4/vO+c730G9NGjQQIALj8CKumn+afjIQWyDHRbUxTO/8w/Ojux9Bc0Q6gn27B3eoRZM5Zm2l7EVm/5bMAsEiPAjiFiFun7hXa5MjJ7Y1gI3mjYaxA5vZzSdmJeWlfvqz/xHFd7jr5+fP+rYgU0wpQlibE8peV+9yyVWeJuLVapwleU4tsCEh9B8sn8lt8SbBprJvHUEXrOMmuCVj61o9h81fXEhEY/GHAf09QOVlaF3N4fgNDsjCzxnBn7jDU3T2TfexE64IeC5G9Q1lz/7/vY2iBs5aHtndCm/wAXmUtvb8ShsD/pogdf46bm2CJ7Qr16THY87t0Iwzsf77ch1/sBCdmcYjrVuaZ4813UAPjwMC3SXsztS+ujqWTxp1E9CV8ct9Sq/56EeOGGpemtb1t6a9bXdq7nbvKV2dRjlJKaOl1lm+gICsME47x1jsu5LHYeIdfEXpCu8wsE43KiFezCu+woS/FiX4KxSYon7YhBQC2FfTPfNKghiXUIldYYzdLfChlpYxRbd952KkEGgr9Uii3z6JbNAnhbd941hoOBF5RIv8WC3SWmbuzt130XD0vyfSFOc4gfvwIVauD48qvs+Njxs8URikpOckmtevw2Br2Tdd9Lw+oVIR15VeZl91Q1Z3UXOvp7LVJlXI4YNaYHvdHKCE7ye3fXvE6l2OHaFr43rntNJ+IxHrj0czeQVFjifCrbDCRuqi3IG2+dTBSrM5MNR2GuOkcMD48xymotZrcAAXBBghQ0C3Aj09Sxmp5nlOA8PwAOLyWDrPZbhGL/kMufkkff2xx5rferFQ/vPx+fkZW13jBn2D8KrOc1H7av9ci7NNIu8yVX+xT95T1sVqe/J+dffhldzYUPD/4U9Q8lR9TNWa5RDyeej8BhkY/Qd7Y72Jk5Jw4qkSuqwckrqTbTuhc/44zb/IEOagtpK/N8fdoMGDf4G6kd7103/csoAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"replayIconOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAA0CAQAAABI31KIAAADTElEQVR4Ae2VX2xTZRjGH1iBzDMrU6lxLdOFhLJ/CepwTWCJiUSTDTdilikxJmAo2GlJ9I7EsCgkw6jRG5ALtZNJy7QDiwxK0dZllSypssqatCHIMKdzM4uEnUUrtj2P57uAULNzOtltf8/Nl3OevHnf73u/70WJxVKiRAWqcD/KsGjsvyScb6EBZizFoth4nX9zJNn6KtZCwhLcNU9NcpJasPw3o80vogbl/y/YUkiwoRHNcMsUSvMGlX/6zz3SCiuWLzSIGXVbnN5gXJ7566b6K29J5ix///PwMWk9ylGUZVj93M5o6qZ6g9OUeY0TBZI5x9ggKlGEFbDvP6Jkp3lFR8PX93yEOpQXy6a2L6Bo9suaTv/2tv/ZPdLey7ylWKZnYEULLFhWbG+q3/f8waSmiPLKB3gSVkh4OkmhsdyHkZoO2Bay0eYtzulcggl+PVXTiYdggmBjgpf42XjzDqwRRy+OAo/eVwNJP5+675Pj/JkhZW0XVt7uFvvQePte1ONezSFclo4d0fjFH7FOr9Ol9l1X1Yv8idt6Ybmj6SRUofL2XSt76Zm57DVeVdt36eVkO3o2xhi9k9gAE/TzXn88LXxHz8KGeWkMyaMc5T4/rDDCus8vfCEZjZgXx0gmyijb3JBghNTmFr6RDByYl5ZofpjDfKANJhhR9mCr8P2QR4tOoG/zYYa57vligVa1Ct93uoEcJzLneZ4vvIEKGHFPx+vCd0K3tMZP5SCDfNeLKhjx8HvHhO8T3c22vRMc4hCDaTQZFGdC07m08O3XPX5p8+6AeooX2F3QkAUsgaW79wJPMaBu3g1Jr9XqD6ZO8iTHlYY7rkhBmJUNXZdmhedgCvX6w8C8yenLDTLE+JS9ExaY/lOUxd4ZnwpxkL7cJifMhs/Ids8Av2SEE4pWYBOqIKEMJlTAiqbu3gklov0d4HYPqo2H03LUugI+HucZznAs/fFXW92VbWu2bnvzsH8sPcMz2h8fXzuNWs1Z/KntOtKX9dLLMK9wjnlmOautwhTf+nIvf446zYUFPf5P7OxJ9atfsFD97Ek97kS1TjZ64+gxpyt4QD6U8age9VDmgOwKbnChXn9wFxuQDrRocmir1ai4y+lfokSJfwEhAcqxd5L4JgAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3c/elements\x3e\x3c/component\x3e\x3ccomponent name\x3d"dock"\x3e\x3csettings\x3e\x3csetting name\x3d"iconalpha" value\x3d"1"/\x3e\x3csetting name\x3d"iconalphaactive" value\x3d"1"/\x3e\x3csetting name\x3d"iconalphaover" value\x3d"1"/\x3e\x3c/settings\x3e\x3celements\x3e\x3celement name\x3d"button" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAgCAYAAABpRpp6AAAAxklEQVR4Ae2YsQ3CMBBF7+yIximQSERSMgYNI1AxJgswAaMkLREpEnQ2Z6Chooqwpf+k65+evhtzXW8LIjrp7fUcpcmod9U7v2Sbpjm2bVtaa5kSRERC13V13/ePIpatqk05zzOHEChFWImOKnyIwk7EMyXMJyTrOUOZAeGlKd4byUtYCZjEN9gwCuPRYRKYBCbx18JLJ0bh3IQJk/gFHh0Ko3BWwqOID8YYpoTx3ofoap0r18y0WymspCo7DLf7NE2X7L5bnyz7UgI6sO7WAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"buttonOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAgCAYAAABpRpp6AAAAzklEQVR4Ae2YMU7FMBAFx04osQvyRQIX4nfcgRZOAxW3oMqRkhKbBkWyjVfiCiD7a0dKPxq9dZHxdLq9Al6AB8DRJl/ACryOwPM8z0/LsvhhGCwNklLK27bd7fv+LcLnabrxx3HYUgotYoyx4liFH0XYpZQtDfMb0orrSGeo8L8Il9Jd4dL5JFRYN6xHp5PQSegkLuwd/uPEWrg3YXQSenRaWAtfVOGYUs62QsPkiriK8Brj571z3ot0q7IxhgB8iPBbCMHU7wxcN/679f0HQzRYj4Eg/3AAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"buttonActive" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAgCAYAAABpRpp6AAAAwUlEQVR4Ae2YsQ3CMBBFD8e0CVESUcFMpGMKapgAKvagymKWiF3RxMe/IUDn6J70I5dPX98u4odhvyWiG3JCdqSTiEzI3eNz7fv+0nVdW1WVI4VkEEI4IB8RHjXLCg6II4TPXmbgADOTZhwQV0+F4ekPmDBzcQ2zTcKEC9+wXTqbhE3CJrGyd5jpp1jDxb0SNgm7dNawNbyqhudlydkBUkwG4irCU0rzsa6bVqt0BinFN44vEX7EGDfIiHOj/Hfr8wvCZ0/Xf6TpeQAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"divider" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAgCAYAAAA1zNleAAAAD0lEQVQoU2NgGAWjADcAAAIgAAEeEYatAAAAAElFTkSuQmCC"/\x3e\x3c/elements\x3e\x3c/component\x3e\x3ccomponent name\x3d"playlist"\x3e\x3csettings\x3e\x3csetting name\x3d"backgroundcolor" value\x3d"0x3c3c3e"/\x3e\x3csetting name\x3d"fontcolor" value\x3d"0x848489"/\x3e\x3csetting name\x3d"fontsize" value\x3d"11"/\x3e\x3csetting name\x3d"fontweight" value\x3d"normal"/\x3e\x3csetting name\x3d"activecolor" value\x3d"0xb2b2b6"/\x3e\x3csetting name\x3d"overcolor" value\x3d"0xb2b2b6"/\x3e\x3csetting name\x3d"titlecolor" value\x3d"0xb9b9be"/\x3e\x3csetting name\x3d"titlesize" value\x3d"12"/\x3e\x3csetting name\x3d"titleweight" value\x3d"bold"/\x3e\x3csetting name\x3d"titleactivecolor" value\x3d"0xececf4"/\x3e\x3csetting name\x3d"titleovercolor" value\x3d"0xececf4"/\x3e\x3c/settings\x3e\x3celements\x3e\x3celement name\x3d"item" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABMAQMAAAASt2oTAAAAA1BMVEU8PD44mUV6AAAAFklEQVR4AWMYMmAUjIJRMApGwSgYBQAHuAABIqNCjAAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"itemActive" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABMAQMAAAASt2oTAAAAA1BMVEUvLzHXqQRQAAAAFklEQVR4AWMYMmAUjIJRMApGwSgYBQAHuAABIqNCjAAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"itemImage" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAA2CAMAAAAPkWzgAAAAk1BMVEU0NDcVFRcWFhgXFxknJyozMzYyMjUlJSgrKy4jIyYZGRssLC8YGBobGx0kJCcuLjAiIiQaGhwjIyUpKSwkJCYaGh0nJykiIiUgICIwMDMqKi0cHB8lJScdHSAtLTAuLjEdHR8VFRgxMTQvLzIvLzEoKCsZGRwqKiwbGx4gICMoKCofHyImJigmJikhISMeHiAhISRWJqoOAAAA/klEQVR4Ae3VNYLDMBQG4X8kme2QwwzLfP/TbeO0qfQ6zQW+coRxQqYl4HEJSEACEvA8NQamRkCoF40kNUxMgC3gc0lrtiZAB1BKuSOPDIzcXroB0EtL3hQXuIHLNboDC+aRgRnQ6GUAjtBEBmrgdcwA/OCyuMATraOvBiB3HBQTOJ8KZp5QwwXoA3xFBdrVjpPnHVgBfQfjqMChZSoAugDMwCsqUMFeAHwEwMFnXKDkshGAz5YAEOIC2fpbAqhUAMDG4AcO3HUAahkAHYykOQATC6Bsf7M7UNotswLwmR2wAviTHVAAHA2BMXCWIaDC7642wIMSkIAEJCABxv0D1B4Kmtm5dvAAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"divider" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANIAAAABCAIAAAAkUWeUAAAAEUlEQVR42mPQ1zccRaOIzggAmuR1T+nadMkAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"sliderRail" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAABCAYAAADErm6rAAAAHklEQVQI12NgIABERcX/Kymp/FdWVkXBIDGQHCH9AAmVCvfMHD66AAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"sliderCapTop" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAKCAYAAACuaZ5oAAAAEUlEQVQoU2NgGAWjYBQMfQAAA8oAAZphnjsAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"sliderCapBottom" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAKCAYAAACuaZ5oAAAAEUlEQVQoU2NgGAWjYBQMfQAAA8oAAZphnjsAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"sliderRailCapTop" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAECAYAAACUY/8YAAAAX0lEQVR42q2P4QqAIAyEewktLUy3pKevVwvpAdZO+q9Qgw+OO25jQ88YM2blUAp4dW71epfvyuXcLCGsFWh4yD4fsHY6vV8kRpKUGFQND9kfHxQsJNqEOYOq4Wl2t/oPXdoiX8vd60IAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"sliderRailCapBottom" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAECAYAAACUY/8YAAAAXElEQVQY02NgIADExCQ+KSmp/FdWVkXBIDGg3BcGSoG0tMxGWVl5DAtAYiA5ii2wsbE1ALr0A8hAkKtBGMQGiYHkKLbg////TK6uboYg1wIN/QzCIDZIDCRHSD8AB2YrZ5n2CLAAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"sliderThumb" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAABCAAAAADhxTF3AAAAAnRSTlMA/1uRIrUAAAAUSURBVHjaY/oPA49unT+yaz2cCwAcKhapymVMMwAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"sliderThumbCapBottom" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAECAQAAAA+ajeTAAAAMElEQVQI12NgwACPPt76f/7/kf+7/q//yEAMeNQH19DHQBy41Xf+/ZH3u4hVjh8AAJAYGojU8tLHAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"sliderThumbCapTop" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAECAQAAAA+ajeTAAAANUlEQVQI12NgoAbY2rf+49KPs/uIVH54wrH/h/7v+L/y//QJRGm4/PHa/7NALdv+L/6MKQsAZV8ZczFGWjAAAAAASUVORK5CYII\x3d"/\x3e\x3c/elements\x3e\x3c/component\x3e\x3ccomponent name\x3d"tooltip"\x3e\x3csettings\x3e\x3csetting name\x3d"fontcase" value\x3d"normal"/\x3e\x3csetting name\x3d"fontcolor" value\x3d"0xacacac"/\x3e\x3csetting name\x3d"fontsize" value\x3d"11"/\x3e\x3csetting name\x3d"fontweight" value\x3d"normal"/\x3e\x3csetting name\x3d"activecolor" value\x3d"0xffffff"/\x3e\x3csetting name\x3d"overcolor" value\x3d"0xffffff"/\x3e\x3c/settings\x3e\x3celements\x3e\x3celement name\x3d"background" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAACCAYAAABsfz2XAAAAEUlEQVR4AWOwtnV8RgomWQMAWvcm6W7AcF8AAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"arrow" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAADCAYAAACnI+4yAAAAEklEQVR42mP4//8/AymYgeYaABssa5WUTzsyAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"capTop" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAECAYAAAC6Jt6KAAAAHUlEQVR42mMUFRU/wUACYHR1935GkgZrW0faagAAqHQGCWgiU9QAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"capBottom" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAECAYAAAC6Jt6KAAAAGElEQVR42mOwtnV8RgpmoL0GUVHxE6RgAO7IRsl4Cw8cAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"capLeft" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAACCAYAAACUn8ZgAAAAFklEQVR42mMQFRU/YW3r+AwbZsAnCQBUPRWHq8l/fAAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"capRight" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAACCAYAAACUn8ZgAAAAFklEQVR42mOwtnV8hg2LioqfYMAnCQBwXRWHw2Rr1wAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"capTopLeft" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAECAYAAABCxiV9AAAAPklEQVR4XmMQFRVnBeIiIN4FxCeQMQOQU6ijq3/VycXjiau79zNkDJLcZWvv9MTGzumZta0jCgZJnkAXhPEBnhkmTDF7/FAAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"capTopRight" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAECAYAAABCxiV9AAAAPklEQVR42mMQFRU/gYZ3A3ERELMyuLp7P0PGTi4eT3R09a8CJbMYrG0dnyFjGzunZ7b2Tk+AkrswJGEYZAUA8XwmRnLnEVMAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"capBottomLeft" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAECAYAAABCxiV9AAAAMUlEQVR4AWMQFRU/YW3r+AwbBknusrSye4JLslBdQ/uqpbX9E2ySrEBcBMS7QVYgYwAWViWcql/T2AAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"capBottomRight" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAECAYAAABCxiV9AAAANUlEQVR42mOwtnV8hg2LioqfYMAmYWll9wQouQtD0tLa/om6hvZVoGQ2A0g7Gt4NxEVAzAoAZzolltlSH50AAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"menuOption" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAARCAYAAADkIz3lAAAAcklEQVQoz2NgGLFAVFRcDoh3AfFnKC2HVaGYmMQeSUnp/7Kycv9BNJB/AJeJn+XlFf8rKir/V1BQ+g/k/8SqEGjKPhkZuf/Kyqr/QTSQfwirQm9vX3WQYqCVX0G0p6e3BlaF////ZwJiLiDmgdJMwzr2ANEWKw6VGUzBAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"menuOptionOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAARCAYAAADkIz3lAAAAcklEQVQoz2NgGLFAVFRcDoh3AfFnKC2HVaGYmMQeSUnp/7Kycv9BNJB/AJeJn+XlFf8rKir/V1BQ+g/k/8SqEGjKPhkZuf/Kyqr/QTSQfwirQm9vX3WQYqCVX0G0p6e3BlaF////ZwJiLiDmgdJMwzr2ANEWKw6VGUzBAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"menuOptionActive" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAARCAQAAABOKvVuAAAAdElEQVR4AWOgJ5BhcGQIBWIZhJCsW+6jS7+/P7rklssgBxN0un/59f+n/1//f3SVwQUmGPrs+6P/IPj8N0M4TNBl/+Vr/0Hw4FUGN5igkm3ursvnf+y6bJ/LoAwTZGZQY/BgCANiNSCbASHMwcANxMy09DcAxqMsxkMxUYIAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"volumeCapTop" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAFCAYAAAB1j90SAAAAE0lEQVR42mP4//8/AzmYYQRoBADgm9EvDrkmuwAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"volumeCapBottom" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAFCAYAAAB1j90SAAAAE0lEQVR42mP4//8/AzmYYQRoBADgm9EvDrkmuwAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"volumeRailCapTop" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAECAYAAAC+0w63AAAAXklEQVR42n2NWwqAIBRE3YSmJT4KafW1tZAWMN2RPkSojwPDPO5VAFSP1lMRDqG+UJexN4524bJ2hvehQU2P2efQGHs6tyCEhBhzg5oes7+PlcWUVuS8Nah5QLK77z7Bcm/CZuJM1AAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"volumeRailCapBottom" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAECAYAAAC+0w63AAAAWklEQVQI12NgQAJiYhKfVFXV/6upaaBgkBhQ7gsDLiAtLbNRXl4RQyNIDCSHU6ONja0B0OQPIIUgW0AYxAaJgeRwavz//z+Tq6ubIch0oOLPIAxig8RAcshqARVfK+sjJ8UzAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"volumeRail" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAA0CAYAAAC6qQkaAAAAXklEQVR42mP5//8/AwyIiUn85+bmZmBkZGRABiA1X79+ZXj16gVcgoUBDaBrwiWGoZFYMCg0MpKnkZFxCPlxVONw0MjIyDgaOCM7AdC7lBuNjtGiY1TjqMbRwooijQBUhw3jnmCdzgAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"volumeProgress" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAA0CAAAAACfwlbGAAAAAnRSTlMA/1uRIrUAAAAmSURBVHgBY/gPBPdunT+yaw2IBeY+BHHXwbmPQNz1w5w7yh3lAgBeJpPWLirUWgAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"volumeProgressCapTop" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAECAQAAAAU2sY8AAAANElEQVQI12NgIA5s7Vv/cenH2X1YpA5POPb/0P8d/1f+nz4BQ/Lyx2v/zwKlt/1f/BkmBgDJshlzy7m4BgAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"volumeProgressCapBottom" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAECAQAAAAU2sY8AAAAL0lEQVQI12NggIJHH2/9P///yP9d/9d/ZkAHjybCJScyYIJbE85/OvJp1wQG4gAADBkams/Cpm0AAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"volumeThumb" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAQCAQAAACMnYaxAAAA/klEQVR4AYXQoW7CUBjF8f9IYWkgq2l2k8llrmJBTOBxsyQlJENs4236CDhEywNUIEGh12WZuYDC4W9A3B2zhTVLds8VJ+fnPv5/FzQIaHGptNQaWn4ooM0DA56VgVpbi1hEk2vSvNjbozu6vc0LUi1NCQFXDBflwW/9p7L1B78oGRJJCOnN8o3/OMvGz3J6EiLStdX0K2tLKiFm8n6qY3XiVYL5C98cLxL90dLWcWkZSYjpZ0Uds4K+hIg7nqblOU1LxlojCDF0GWfz1a5ylVvtsrmoi5EQ0OGGhEdNE2WslmjpSND5VAy3mu6VRM1o0fm+Dx8SEWOUWC3UIvoCCFqphCwr/x8AAAAASUVORK5CYII\x3d"/\x3e\x3c/elements\x3e\x3c/component\x3e\x3c/components\x3e\x3c/skin\x3e',
    );
  };
})(jwplayer);
(function (h) {
  var k = h.html5,
    b = h.utils,
    a = h.events,
    e = a.state,
    g = b.css,
    c = b.isMobile(),
    d = document,
    f = '.jwpreview',
    D = !0,
    m = !1;
  k.display = function (h, v) {
    function u(d) {
      if (V && (h.jwGetControls() || h.jwGetState() == e.PLAYING)) V(d);
      else if (
        ((!c || !h.jwGetControls()) && O.sendEvent(a.JWPLAYER_DISPLAY_CLICK),
        h.jwGetControls())
      ) {
        var j = new Date().getTime();
        Z && 500 > j - Z
          ? (h.jwSetFullscreen(), (Z = void 0))
          : (Z = new Date().getTime());
        var f = b.bounds(z.parentNode.querySelector('.jwcontrolbar')),
          g = b.bounds(z),
          j = f.left - 10 - g.left,
          B = f.left + 30 - g.left,
          t = g.bottom - 40,
          r = g.bottom,
          q = f.right - 30 - g.left,
          f = f.right + 10 - g.left;
        if (c && !(d.x >= j && d.x <= B && d.y >= t && d.y <= r)) {
          if (d.x >= q && d.x <= f && d.y >= t && d.y <= r) {
            h.jwSetFullscreen();
            return;
          }
          O.sendEvent(a.JWPLAYER_DISPLAY_CLICK);
          if (I) return;
        }
        switch (h.jwGetState()) {
          case e.PLAYING:
          case e.BUFFERING:
            h.jwPause();
            break;
          default:
            h.jwPlay();
        }
      }
    }
    function j(a, b) {
      X.showicons &&
        (a || b
          ? (x.setRotation(
              'buffer' == a ? parseInt(X.bufferrotation, 10) : 0,
              parseInt(X.bufferinterval, 10),
            ),
            x.setIcon(a),
            x.setText(b))
          : x.hide());
    }
    function n(a) {
      C != a
        ? (C && E(f, m),
          (C = a)
            ? ((a = new Image()), a.addEventListener('load', p, m), (a.src = C))
            : (g('#' + z.id + ' ' + f, { 'background-image': '' }),
              E(f, m),
              (r = K = 0)))
        : C && !I && E(f, D);
      y(h.jwGetState());
    }
    function B(a) {
      clearTimeout(ha);
      ha = setTimeout(function () {
        y(a.newstate);
      }, 100);
    }
    function y(a) {
      a = Y ? Y : h ? h.jwGetState() : e.IDLE;
      if (a != W)
        switch (((W = a), x && x.setRotation(0), a)) {
          case e.IDLE:
            !A &&
              !L &&
              (C && !t && E(f, D),
              (a = !0),
              h._model && !1 === h._model.config.displaytitle && (a = !1),
              j('play', J && a ? J.title : ''));
            break;
          case e.BUFFERING:
            A = m;
            G.error && G.error.setText();
            L = m;
            j('buffer');
            break;
          case e.PLAYING:
            j();
            break;
          case e.PAUSED:
            j('play');
        }
    }
    function p() {
      r = this.width;
      K = this.height;
      y(h.jwGetState());
      l();
      C && g('#' + z.id + ' ' + f, { 'background-image': 'url(' + C + ')' });
    }
    function w(a) {
      A = D;
      j('error', a.message);
    }
    function l() {
      0 < z.clientWidth * z.clientHeight &&
        b.stretch(h.jwGetStretching(), q, z.clientWidth, z.clientHeight, r, K);
    }
    function E(a, b) {
      g('#' + z.id + ' ' + a, {
        opacity: b ? 1 : 0,
        visibility: b ? 'visible' : 'hidden',
      });
    }
    var z,
      q,
      H,
      J,
      C,
      r,
      K,
      t = m,
      G = {},
      A = m,
      L = m,
      I,
      P,
      x,
      Y,
      W,
      X = b.extend(
        {
          showicons: D,
          bufferrotation: 45,
          bufferinterval: 100,
          fontcolor: '#ccc',
          overcolor: '#fff',
          fontsize: 15,
          fontweight: '',
        },
        h.skin.getComponentSettings('display'),
        v,
      ),
      O = new a.eventdispatcher(),
      V,
      Z;
    b.extend(this, O);
    this.clickHandler = u;
    var ha;
    this.forceState = function (a) {
      Y = a;
      y(a);
      this.show();
    };
    this.releaseState = function (a) {
      Y = null;
      y(a);
      this.show();
    };
    this.hidePreview = function (a) {
      t = a;
      E(f, !a);
      a && (I = !0);
    };
    this.setHiding = function () {
      I = !0;
    };
    this.element = function () {
      return z;
    };
    this.redraw = l;
    this.show = function (a) {
      if (x && (a || (Y ? Y : h ? h.jwGetState() : e.IDLE) != e.PLAYING))
        clearTimeout(P),
          (P = void 0),
          (z.style.display = 'block'),
          x.show(),
          (I = !1);
    };
    this.hide = function () {
      x && (x.hide(), (I = !0));
    };
    this.setAlternateClickHandler = function (a) {
      V = a;
    };
    this.revertAlternateClickHandler = function () {
      V = void 0;
    };
    z = d.createElement('div');
    z.id = h.id + '_display';
    z.className = 'jwdisplay';
    q = d.createElement('div');
    q.className = 'jwpreview jw' + h.jwGetStretching();
    z.appendChild(q);
    h.jwAddEventListener(a.JWPLAYER_PLAYER_STATE, B);
    h.jwAddEventListener(a.JWPLAYER_PLAYLIST_ITEM, function () {
      A = m;
      G.error && G.error.setText();
      var a = (J = h.jwGetPlaylist()[h.jwGetPlaylistIndex()]) ? J.image : '';
      W = void 0;
      n(a);
    });
    h.jwAddEventListener(a.JWPLAYER_PLAYLIST_COMPLETE, function () {
      L = D;
      j('replay');
      var a = h.jwGetPlaylist()[0];
      n(a.image);
    });
    h.jwAddEventListener(a.JWPLAYER_MEDIA_ERROR, w);
    h.jwAddEventListener(a.JWPLAYER_ERROR, w);
    c
      ? ((H = new b.touch(z)), H.addEventListener(b.touchEvents.TAP, u))
      : z.addEventListener('click', u, m);
    H = {
      font:
        X.fontweight +
        ' ' +
        X.fontsize +
        'px/' +
        (parseInt(X.fontsize, 10) + 3) +
        'px Arial, Helvetica, sans-serif',
      color: X.fontcolor,
    };
    x = new k.displayicon(z.id + '_button', h, H, { color: X.overcolor });
    z.appendChild(x.element());
    B({ newstate: e.IDLE });
  };
  g('.jwdisplay', {
    position: 'absolute',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  });
  g('.jwdisplay ' + f, {
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: '#000 no-repeat center',
    overflow: 'hidden',
    opacity: 0,
  });
  b.transitionStyle('.jwdisplay, .jwdisplay *', 'opacity .25s, color .25s');
})(jwplayer);
(function (h) {
  var k = h.utils,
    b = k.css,
    a = document,
    e = 'none',
    g = '100%';
  h.html5.displayicon = function (c, d, f, D) {
    function m(b, c, d, e) {
      var j = a.createElement('div');
      j.className = b;
      c && c.appendChild(j);
      y && s(j, b, '.' + b, d, e);
      return j;
    }
    function s(a, c, e, j, f) {
      var g = v(c);
      'replayIcon' == c && !g.src && (g = v('playIcon'));
      g.src
        ? ((j = k.extend({}, j)),
          0 < c.indexOf('Icon') && (C = g.width | 0),
          (j.width = g.width),
          (j['background-image'] = 'url(' + g.src + ')'),
          (j['background-size'] = g.width + 'px ' + g.height + 'px'),
          (j['float'] = 'none'),
          (f = k.extend({}, f)),
          g.overSrc && (f['background-image'] = 'url(' + g.overSrc + ')'),
          k.isMobile() || b('#' + d.id + ' .jwdisplay:hover ' + e, f),
          b.style(y, { display: 'table' }))
        : b.style(y, { display: 'none' });
      j && b.style(a, j);
      J = g;
    }
    function v(a) {
      var b = B.getSkinElement('display', a);
      a = B.getSkinElement('display', a + 'Over');
      return b
        ? ((b.overSrc = a && a.src ? a.src : ''), b)
        : { src: '', overSrc: '', width: 0, height: 0 };
    }
    function u() {
      var a = E || 0 === C;
      b.style(z, { display: z.innerHTML && a ? '' : e });
      K = a ? 30 : 0;
      j();
    }
    function j() {
      clearTimeout(r);
      0 < K-- && (r = setTimeout(j, 33));
      var a = 'px ' + g,
        c = Math.ceil(Math.max(J.width, k.bounds(y).width - l.width - w.width)),
        a = { 'background-size': [w.width + a, c + a, l.width + a].join(', ') };
      y.parentNode &&
        (a.left = 1 == y.parentNode.clientWidth % 2 ? '0.5px' : '');
      b.style(y, a);
    }
    function n() {
      A = (A + G) % 360;
      k.rotate(q, A);
    }
    var B = d.skin,
      y,
      p,
      w,
      l,
      E,
      z,
      q,
      H = {},
      J,
      C = 0,
      r = -1,
      K = 0;
    this.element = function () {
      return y;
    };
    this.setText = function (b) {
      var c = z.style;
      z.innerHTML = b ? b.replace(':', ':\x3cbr\x3e') : '';
      c.height = '0';
      c.display = 'block';
      if (b)
        for (
          ;
          2 <
          Math.floor(
            z.scrollHeight /
              a.defaultView
                .getComputedStyle(z, null)
                .lineHeight.replace('px', ''),
          );

        )
          z.innerHTML = z.innerHTML.replace(/(.*) .*$/, '$1...');
      c.height = '';
      c.display = '';
      u();
    };
    this.setIcon = function (a) {
      var b = H[a];
      b || ((b = m('jwicon')), (b.id = y.id + '_' + a));
      s(b, a + 'Icon', '#' + b.id);
      y.contains(q) ? y.replaceChild(b, q) : y.appendChild(b);
      q = b;
    };
    var t,
      G = 0,
      A;
    this.setRotation = function (a, b) {
      clearInterval(t);
      A = 0;
      G = a | 0;
      0 === G ? n() : (t = setInterval(n, b));
    };
    var L = (this.hide = function () {
      y.style.opacity = 0;
      y.style.cursor = '';
    });
    this.show = function () {
      y.style.opacity = 1;
      y.style.cursor = 'pointer';
    };
    y = m('jwdisplayIcon');
    y.id = c;
    p = v('background');
    w = v('capLeft');
    l = v('capRight');
    E = 0 < w.width * l.width;
    var I = {
      'background-image':
        'url(' + w.src + '), url(' + p.src + '), url(' + l.src + ')',
      'background-position': 'left,center,right',
      'background-repeat': 'no-repeat',
      padding: '0 ' + l.width + 'px 0 ' + w.width + 'px',
      height: p.height,
      'margin-top': p.height / -2,
    };
    b('#' + c, I);
    k.isMobile() ||
      (p.overSrc &&
        (I['background-image'] =
          'url(' +
          w.overSrc +
          '), url(' +
          p.overSrc +
          '), url(' +
          l.overSrc +
          ')'),
      b(
        '.jw-tab-focus #' + c + ', #' + d.id + ' .jwdisplay:hover ' + ('#' + c),
        I,
      ));
    z = m('jwtext', y, f, D);
    q = m('jwicon', y);
    d.jwAddEventListener(h.events.JWPLAYER_RESIZE, j);
    L();
    u();
  };
  b('.jwplayer .jwdisplayIcon', {
    display: 'table',
    position: 'relative',
    'margin-left': 'auto',
    'margin-right': 'auto',
    top: '50%',
    float: 'none',
  });
  b('.jwplayer .jwdisplayIcon div', {
    position: 'relative',
    display: 'table-cell',
    'vertical-align': 'middle',
    'background-repeat': 'no-repeat',
    'background-position': 'center',
  });
  b('.jwplayer .jwdisplayIcon div', { 'vertical-align': 'middle' }, !0);
  b('.jwplayer .jwdisplayIcon .jwtext', {
    color: '#fff',
    padding: '0 1px',
    'max-width': '300px',
    'overflow-y': 'hidden',
    'text-align': 'center',
    '-webkit-user-select': e,
    '-moz-user-select': e,
    '-ms-user-select': e,
    'user-select': e,
  });
})(jwplayer);
(function (h) {
  var k = h.html5,
    b = h.utils,
    a = b.css,
    e = b.bounds,
    g = '.jwdockbuttons',
    c = document,
    d = 'none',
    f = 'block';
  k.dock = function (h, m) {
    function s(a) {
      return !a || !a.src
        ? {}
        : {
            background: 'url(' + a.src + ') center',
            'background-size': a.width + 'px ' + a.height + 'px',
          };
    }
    function v(c, d) {
      var e = n(c);
      a(u('.' + c), b.extend(s(e), { width: e.width }));
      return j('div', c, d);
    }
    function u(a) {
      return '#' + p + ' ' + (a ? a : '');
    }
    function j(a, b, d) {
      a = c.createElement(a);
      b && (a.className = b);
      d && d.appendChild(a);
      return a;
    }
    function n(a) {
      return (a = w.getSkinElement('dock', a))
        ? a
        : { width: 0, height: 0, src: '' };
    }
    function B() {
      a(g + ' .capLeft, ' + g + ' .capRight', { display: l ? f : d });
    }
    var y = b.extend(
        {},
        { iconalpha: 0.75, iconalphaactive: 0.5, iconalphaover: 1, margin: 8 },
        m,
      ),
      p = h.id + '_dock',
      w = h.skin,
      l = 0,
      E = {},
      z = {},
      q,
      H,
      J,
      C = this;
    C.redraw = function () {
      e(q);
    };
    C.element = function () {
      return q;
    };
    C.offset = function (b) {
      a(u(), { 'margin-left': b });
    };
    C.hide = function () {
      C.visible &&
        ((C.visible = !1),
        (q.style.opacity = 0),
        clearTimeout(J),
        (J = setTimeout(function () {
          q.style.display = d;
        }, 250)));
    };
    C.showTemp = function () {
      C.visible || ((q.style.opacity = 0), (q.style.display = f));
    };
    C.hideTemp = function () {
      C.visible || (q.style.display = d);
    };
    C.show = function () {
      !C.visible &&
        l &&
        ((C.visible = !0),
        (q.style.display = f),
        clearTimeout(J),
        (J = setTimeout(function () {
          q.style.opacity = 1;
        }, 0)));
    };
    C.addButton = function (c, d, f, g) {
      if (!E[g]) {
        var h = j('div', 'divider', H),
          t = j('div', 'button', H),
          r = j('div', null, t);
        r.id = p + '_' + g;
        r.innerHTML = '\x26nbsp;';
        a('#' + r.id, { 'background-image': c });
        'string' == typeof f && (f = new Function(f));
        b.isMobile()
          ? new b.touch(t).addEventListener(b.touchEvents.TAP, function (a) {
              f(a);
            })
          : t.addEventListener('click', function (a) {
              f(a);
              a.preventDefault();
            });
        E[g] = { element: t, label: d, divider: h, icon: r };
        if (d) {
          var n = new k.overlay(r.id + '_tooltip', w, !0);
          c = j('div');
          c.id = r.id + '_label';
          c.innerHTML = d;
          a('#' + c.id, { padding: 3 });
          n.setContents(c);
          if (!b.isMobile()) {
            var m;
            t.addEventListener(
              'mouseover',
              function () {
                clearTimeout(m);
                var c = z[g],
                  d,
                  j;
                d = e(E[g].icon);
                c.offsetX(0);
                j = e(q);
                a('#' + c.element().id, {
                  left: d.left - j.left + d.width / 2,
                });
                d = e(c.element());
                j.left > d.left && c.offsetX(j.left - d.left + 8);
                n.show();
                b.foreach(z, function (a, b) {
                  a != g && b.hide();
                });
              },
              !1,
            );
            t.addEventListener(
              'mouseout',
              function () {
                m = setTimeout(n.hide, 100);
              },
              !1,
            );
            q.appendChild(n.element());
            z[g] = n;
          }
        }
        l++;
        B();
      }
    };
    C.removeButton = function (a) {
      if (E[a]) {
        H.removeChild(E[a].element);
        H.removeChild(E[a].divider);
        var b = document.getElementById('' + p + '_' + a + '_tooltip');
        b && q.removeChild(b);
        delete E[a];
        l--;
        B();
      }
    };
    C.numButtons = function () {
      return l;
    };
    C.visible = !1;
    q = j('div', 'jwdock');
    H = j('div', 'jwdockbuttons');
    q.appendChild(H);
    q.id = p;
    var r = n('button'),
      K = n('buttonOver'),
      t = n('buttonActive');
    r &&
      (a(u(), { height: r.height, padding: y.margin }),
      a(g, { height: r.height }),
      a(
        u('div.button'),
        b.extend(s(r), { width: r.width, cursor: 'pointer', border: d }),
      ),
      a(u('div.button:hover'), s(K)),
      a(u('div.button:active'), s(t)),
      a(u('div.button\x3ediv'), { opacity: y.iconalpha }),
      a(u('div.button:hover\x3ediv'), { opacity: y.iconalphaover }),
      a(u('div.button:active\x3ediv'), { opacity: y.iconalphaactive }),
      a(u('.jwoverlay'), { top: y.margin + r.height }),
      v('capLeft', H),
      v('capRight', H),
      v('divider'));
    setTimeout(function () {
      e(q);
    });
  };
  a('.jwdock', { opacity: 0, display: d });
  a('.jwdock \x3e *', { height: '100%', float: 'left' });
  a('.jwdock \x3e .jwoverlay', { height: 'auto', float: d, 'z-index': 99 });
  a(g + ' div.button', { position: 'relative' });
  a(g + ' \x3e *', { height: '100%', float: 'left' });
  a(g + ' .divider', { display: d });
  a(g + ' div.button ~ .divider', { display: f });
  a(g + ' .capLeft, ' + g + ' .capRight', { display: d });
  a(g + ' .capRight', { float: 'right' });
  a(g + ' div.button \x3e div', {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    margin: 5,
    position: 'absolute',
    'background-position': 'center',
    'background-repeat': 'no-repeat',
  });
  b.transitionStyle('.jwdock', 'background .25s, opacity .25s');
  b.transitionStyle('.jwdock .jwoverlay', 'opacity .25s');
  b.transitionStyle(g + ' div.button div', 'opacity .25s');
})(jwplayer);
(function (h) {
  var k = h.html5,
    b = h.utils,
    a = h.events,
    e = a.state,
    g = h.playlist;
  k.instream = function (c, d, f, h) {
    function m(a) {
      B(a.type, a);
      I && c.jwInstreamDestroy(!1, x);
    }
    function s(a) {
      B(a.type, a);
      j();
    }
    function v(a) {
      B(a.type, a);
    }
    function u() {
      A && A.releaseState(x.jwGetState());
      t.play();
    }
    function j() {
      if (l && E + 1 < l.length) {
        E++;
        var d = l[E];
        w = new g.item(d);
        I.setPlaylist([d]);
        var e;
        z && (e = z[E]);
        q = b.extend(p, e);
        t.load(I.playlist[0]);
        H.reset(q.skipoffset || -1);
        P = setTimeout(function () {
          B(a.JWPLAYER_PLAYLIST_ITEM, { index: E }, !0);
        }, 0);
      } else
        P = setTimeout(function () {
          B(a.JWPLAYER_PLAYLIST_COMPLETE, {}, !0);
          c.jwInstreamDestroy(!0, x);
        }, 0);
    }
    function n(a) {
      a.width &&
        a.height &&
        (A && A.releaseState(x.jwGetState()), f.resizeMedia());
    }
    function B(a, b) {
      b = b || {};
      p.tag && !b.tag && (b.tag = p.tag);
      x.sendEvent(a, b);
    }
    function y() {
      G && G.redraw();
      A && A.redraw();
    }
    var p = {
        controlbarseekable: 'never',
        controlbarpausable: !0,
        controlbarstoppable: !0,
        loadingmessage: 'Loading ad',
        playlistclickable: !0,
        skipoffset: null,
        tag: null,
      },
      w,
      l,
      E = 0,
      z,
      q = {
        controlbarseekable: 'never',
        controlbarpausable: !1,
        controlbarstoppable: !1,
      },
      H,
      J,
      C,
      r,
      K,
      t,
      G,
      A,
      L,
      I,
      P = -1,
      x = b.extend(this, new a.eventdispatcher());
    c.jwAddEventListener(a.JWPLAYER_RESIZE, y);
    c.jwAddEventListener(a.JWPLAYER_FULLSCREEN, function (a) {
      y();
      !a.fullscreen &&
        b.isIPad() &&
        (I.state === e.PAUSED ? A.show(!0) : I.state === e.PLAYING && A.hide());
    });
    x.init = function () {
      J = h.detachMedia();
      t = new k.video(J, 'instream');
      t.addGlobalListener(v);
      t.addEventListener(a.JWPLAYER_MEDIA_META, n);
      t.addEventListener(a.JWPLAYER_MEDIA_COMPLETE, j);
      t.addEventListener(a.JWPLAYER_MEDIA_BUFFER_FULL, u);
      t.addEventListener(a.JWPLAYER_MEDIA_ERROR, m);
      t.addEventListener(a.JWPLAYER_MEDIA_TIME, function (a) {
        H && H.updateSkipTime(a.position, a.duration);
      });
      t.attachMedia();
      t.mute(d.mute);
      t.volume(d.volume);
      I = new k.model({}, t);
      I.setVolume(d.volume);
      I.setMute(d.mute);
      K = d.playlist[d.item];
      C = J.currentTime;
      h.checkBeforePlay() || 0 === C
        ? ((C = 0), (r = e.PLAYING))
        : (r =
            c.jwGetState() === e.IDLE || d.getVideo().checkComplete()
              ? e.IDLE
              : e.PLAYING);
      r == e.PLAYING && J.pause();
      A = new k.display(x);
      A.forceState(e.BUFFERING);
      L = document.createElement('div');
      L.id = x.id + '_instream_container';
      b.css.style(L, { width: '100%', height: '100%' });
      L.appendChild(A.element());
      G = new k.controlbar(x);
      G.instreamMode(!0);
      L.appendChild(G.element());
      c.jwGetControls() ? (G.show(), A.show()) : (G.hide(), A.hide());
      f.setupInstream(L, G, A, I);
      y();
      x.jwInstreamSetText(p.loadingmessage);
    };
    x.load = function (d, j) {
      if (b.isAndroid(2.3))
        m({
          type: a.JWPLAYER_ERROR,
          message:
            'Error loading instream: Cannot play instream on Android 2.3',
        });
      else {
        B(a.JWPLAYER_PLAYLIST_ITEM, { index: E }, !0);
        var h = 10 + b.bounds(L.parentNode).bottom - b.bounds(G.element()).top;
        'array' === b.typeOf(d) &&
          (j && ((z = j), (j = j[E])), (l = d), (d = l[E]));
        q = b.extend(p, j);
        w = new g.item(d);
        I.setPlaylist([d]);
        H = new k.adskipbutton(c.id, h, q.skipMessage, q.skipText);
        H.addEventListener(a.JWPLAYER_AD_SKIPPED, s);
        H.reset(q.skipoffset || -1);
        c.jwGetControls() ? H.show() : H.hide();
        h = H.element();
        L.appendChild(h);
        I.addEventListener(a.JWPLAYER_ERROR, m);
        A.setAlternateClickHandler(function (d) {
          d = d || {};
          d.hasControls = !!c.jwGetControls();
          B(a.JWPLAYER_INSTREAM_CLICK, d);
          d.hasControls
            ? I.state === e.PAUSED
              ? x.jwInstreamPlay()
              : x.jwInstreamPause()
            : b.isAndroid() && I.state !== e.PAUSED && x.jwInstreamPause();
        });
        b.isMSIE() && J.parentElement.addEventListener('click', A.clickHandler);
        f.addEventListener(a.JWPLAYER_AD_SKIPPED, s);
        t.load(I.playlist[0]);
      }
    };
    x.jwInstreamDestroy = function (c) {
      if (I) {
        clearTimeout(P);
        P = -1;
        t.detachMedia();
        h.attachMedia();
        if (r !== e.IDLE) {
          var j = b.extend({}, K);
          j.starttime = C;
          d.getVideo().load(j);
        } else d.getVideo().stop();
        x.resetEventListeners();
        t.resetEventListeners();
        I.resetEventListeners();
        if (G)
          try {
            G.element().parentNode.removeChild(G.element());
          } catch (g) {}
        A &&
          (J &&
            J.parentElement &&
            J.parentElement.removeEventListener('click', A.clickHandler),
          A.revertAlternateClickHandler());
        B(
          a.JWPLAYER_INSTREAM_DESTROYED,
          { reason: c ? 'complete' : 'destroyed' },
          !0,
        );
        r == e.PLAYING && J.play();
        f.destroyInstream(t.audioMode());
        I = null;
      }
    };
    x.jwInstreamAddEventListener = function (a, b) {
      x.addEventListener(a, b);
    };
    x.jwInstreamRemoveEventListener = function (a, b) {
      x.removeEventListener(a, b);
    };
    x.jwInstreamPlay = function () {
      t.play(!0);
      d.state = e.PLAYING;
      A.show();
    };
    x.jwInstreamPause = function () {
      t.pause(!0);
      d.state = e.PAUSED;
      c.jwGetControls() && A.show();
    };
    x.jwInstreamSeek = function (a) {
      t.seek(a);
    };
    x.jwInstreamSetText = function (a) {
      G.setText(a);
    };
    x.jwInstreamState = function () {
      return d.state;
    };
    x.setControls = function (a) {
      a ? H.show() : H.hide();
    };
    x.jwPlay = function () {
      'true' == q.controlbarpausable.toString().toLowerCase() &&
        x.jwInstreamPlay();
    };
    x.jwPause = function () {
      'true' == q.controlbarpausable.toString().toLowerCase() &&
        x.jwInstreamPause();
    };
    x.jwStop = function () {
      'true' == q.controlbarstoppable.toString().toLowerCase() &&
        (c.jwInstreamDestroy(!1, x), c.jwStop());
    };
    x.jwSeek = function (a) {
      switch (q.controlbarseekable.toLowerCase()) {
        case 'always':
          x.jwInstreamSeek(a);
          break;
        case 'backwards':
          I.position > a && x.jwInstreamSeek(a);
      }
    };
    x.jwSeekDrag = function (a) {
      I.seekDrag(a);
    };
    x.jwGetPosition = function () {};
    x.jwGetDuration = function () {};
    x.jwGetWidth = c.jwGetWidth;
    x.jwGetHeight = c.jwGetHeight;
    x.jwGetFullscreen = c.jwGetFullscreen;
    x.jwSetFullscreen = c.jwSetFullscreen;
    x.jwGetVolume = function () {
      return d.volume;
    };
    x.jwSetVolume = function (a) {
      I.setVolume(a);
      c.jwSetVolume(a);
    };
    x.jwGetMute = function () {
      return d.mute;
    };
    x.jwSetMute = function (a) {
      I.setMute(a);
      c.jwSetMute(a);
    };
    x.jwGetState = function () {
      return !I ? e.IDLE : I.state;
    };
    x.jwGetPlaylist = function () {
      return [w];
    };
    x.jwGetPlaylistIndex = function () {
      return 0;
    };
    x.jwGetStretching = function () {
      return d.config.stretching;
    };
    x.jwAddEventListener = function (a, b) {
      x.addEventListener(a, b);
    };
    x.jwRemoveEventListener = function (a, b) {
      x.removeEventListener(a, b);
    };
    x.jwSetCurrentQuality = function () {};
    x.jwGetQualityLevels = function () {
      return [];
    };
    x.jwGetControls = function () {
      return c.jwGetControls();
    };
    x.skin = c.skin;
    x.id = c.id + '_instream';
    return x;
  };
})(window.jwplayer);
(function (h) {
  var k = h.utils,
    b = k.css,
    a = h.events.state,
    e = (h.html5.logo = function (g, c) {
      function d(b) {
        k.exists(b) && b.stopPropagation && b.stopPropagation();
        if (!u || !m.link)
          f.jwGetState() == a.IDLE || f.jwGetState() == a.PAUSED
            ? f.jwPlay()
            : f.jwPause();
        u &&
          m.link &&
          (f.jwPause(),
          f.jwSetFullscreen(!1),
          window.open(m.link, m.linktarget));
      }
      var f = g,
        D = f.id + '_logo',
        m,
        s,
        v = e.defaults,
        u = !1;
      this.resize = function () {};
      this.element = function () {
        return s;
      };
      this.offset = function (a) {
        b('#' + D + ' ', { 'margin-bottom': a });
      };
      this.position = function () {
        return m.position;
      };
      this.margin = function () {
        return parseInt(m.margin);
      };
      this.hide = function (a) {
        if (m.hide || a)
          (u = !1), (s.style.visibility = 'hidden'), (s.style.opacity = 0);
      };
      this.show = function () {
        u = !0;
        s.style.visibility = 'visible';
        s.style.opacity = 1;
      };
      var j = 'o';
      f.edition &&
        ((j = f.edition()),
        (j =
          'pro' == j
            ? 'p'
            : 'premium' == j
            ? 'r'
            : 'ads' == j
            ? 'a'
            : 'free' == j
            ? 'f'
            : 'o'));
      if ('o' == j || 'f' == j)
        v.link =
          'http://www.longtailvideo.com/jwpabout/?a\x3dl\x26v\x3d' +
          h.version +
          '\x26m\x3dh\x26e\x3d' +
          j;
      m = k.extend({}, v, c);
      m.hide = 'true' == m.hide.toString();
      s = document.createElement('img');
      s.className = 'jwlogo';
      s.id = D;
      if (m.file) {
        var v = /(\w+)-(\w+)/.exec(m.position),
          j = {},
          n = m.margin;
        3 == v.length ? ((j[v[1]] = n), (j[v[2]] = n)) : (j.top = j.right = n);
        b('#' + D + ' ', j);
        s.src = (m.prefix ? m.prefix : '') + m.file;
        k.isMobile()
          ? new k.touch(s).addEventListener(k.touchEvents.TAP, d)
          : (s.onclick = d);
      } else s.style.display = 'none';
      return this;
    });
  e.defaults = {
    prefix: k.repo(),
    file: 'logo.png',
    linktarget: '_top',
    margin: 8,
    hide: !1,
    position: 'top-right',
  };
  b('.jwlogo', { cursor: 'pointer', position: 'absolute' });
})(jwplayer);
(function (h) {
  var k = h.html5,
    b = h.utils,
    a = b.css;
  k.menu = function (e, g, c, d) {
    function f(a) {
      return !a || !a.src
        ? {}
        : {
            background: 'url(' + a.src + ') no-repeat left',
            'background-size': a.width + 'px ' + a.height + 'px',
          };
    }
    function h(a, b) {
      return function () {
        B(a);
        v && v(b);
      };
    }
    function m(a, b) {
      var c = document.createElement('div');
      a && (c.className = a);
      b && b.appendChild(c);
      return c;
    }
    function s(a) {
      return (a = c.getSkinElement('tooltip', a))
        ? a
        : { width: 0, height: 0, src: void 0 };
    }
    var v = d,
      u = new k.overlay(g + '_overlay', c);
    d = b.extend(
      {
        fontcase: void 0,
        fontcolor: '#cccccc',
        fontsize: 11,
        fontweight: void 0,
        activecolor: '#ffffff',
        overcolor: '#ffffff',
      },
      c.getComponentSettings('tooltip'),
    );
    var j,
      n = [];
    this.element = function () {
      return u.element();
    };
    this.addOption = function (a, c) {
      var d = m('jwoption', j);
      d.id = g + '_option_' + c;
      d.innerHTML = a;
      b.isMobile()
        ? new b.touch(d).addEventListener(b.touchEvents.TAP, h(n.length, c))
        : d.addEventListener('click', h(n.length, c));
      n.push(d);
    };
    this.clearOptions = function () {
      for (; 0 < n.length; ) j.removeChild(n.pop());
    };
    var B = (this.setActive = function (a) {
      for (var b = 0; b < n.length; b++) {
        var c = n[b];
        c.className = c.className.replace(' active', '');
        b == a && (c.className += ' active');
      }
    });
    this.show = u.show;
    this.hide = u.hide;
    this.offsetX = u.offsetX;
    this.positionX = u.positionX;
    this.constrainX = u.constrainX;
    j = m('jwmenu');
    j.id = g;
    var y = s('menuTop' + e);
    e = s('menuOption');
    var p = s('menuOptionOver'),
      w = s('menuOptionActive');
    if (y && y.image) {
      var l = new Image();
      l.src = y.src;
      l.width = y.width;
      l.height = y.height;
      j.appendChild(l);
    }
    e &&
      ((y = '#' + g + ' .jwoption'),
      a(
        y,
        b.extend(f(e), {
          height: e.height,
          color: d.fontcolor,
          'padding-left': e.width,
          font:
            d.fontweight + ' ' + d.fontsize + 'px Arial,Helvetica,sans-serif',
          'line-height': e.height,
          'text-transform': 'upper' == d.fontcase ? 'uppercase' : void 0,
        }),
      ),
      a(y + ':hover', b.extend(f(p), { color: d.overcolor })),
      a(y + '.active', b.extend(f(w), { color: d.activecolor })));
    u.setContents(j);
  };
  a('.' + 'jwmenu jwoption'.replace(/ /g, ' .'), {
    cursor: 'pointer',
    'white-space': 'nowrap',
    position: 'relative',
  });
})(jwplayer);
(function (h) {
  var k = h.html5,
    b = h.utils,
    a = h.events;
  k.model = function (e, g) {
    function c(a) {
      var b = u[a.type];
      if (b && b.length) {
        for (var c = !1, e = 0; e < b.length; e++) {
          var j = b[e].split('-\x3e'),
            g = j[0],
            j = j[1] || g;
          d[j] !== a[g] && ((d[j] = a[g]), (c = !0));
        }
        c && d.sendEvent(a.type, a);
      } else d.sendEvent(a.type, a);
    }
    var d = this,
      f,
      D = { html5: g || new k.video(null, 'default') },
      m = b.getCookies(),
      s = { controlbar: {}, display: {} },
      v = {
        autostart: !1,
        controls: !0,
        fullscreen: !1,
        height: 320,
        mobilecontrols: !1,
        mute: !1,
        playlist: [],
        playlistposition: 'none',
        playlistsize: 180,
        playlistlayout: 'extended',
        repeat: !1,
        stretching: b.stretching.UNIFORM,
        width: 480,
        volume: 90,
      },
      u = {};
    u[a.JWPLAYER_MEDIA_MUTE] = ['mute'];
    u[a.JWPLAYER_MEDIA_VOLUME] = ['volume'];
    u[a.JWPLAYER_PLAYER_STATE] = ['newstate-\x3estate'];
    u[a.JWPLAYER_MEDIA_BUFFER] = ['bufferPercent-\x3ebuffer'];
    u[a.JWPLAYER_MEDIA_TIME] = ['position', 'duration'];
    d.setVideo = function (a) {
      if (a !== f) {
        if (f) {
          f.removeGlobalListener(c);
          var b = f.getContainer();
          b && (f.remove(), a.setContainer(b));
        }
        f = a;
        f.volume(d.volume);
        f.mute(d.mute);
        f.addGlobalListener(c);
      }
    };
    d.destroy = function () {
      f && (f.removeGlobalListener(c), f.destroy());
    };
    d.getVideo = function () {
      return f;
    };
    d.seekDrag = function (a) {
      f.seekDrag(a);
    };
    d.setFullscreen = function (b) {
      b = !!b;
      b != d.fullscreen &&
        ((d.fullscreen = b),
        d.sendEvent(a.JWPLAYER_FULLSCREEN, { fullscreen: b }));
    };
    d.setPlaylist = function (c) {
      d.playlist = b.filterPlaylist(c, !1, d.androidhls);
      0 === d.playlist.length
        ? d.sendEvent(a.JWPLAYER_ERROR, {
            message: 'Error loading playlist: No playable sources found',
          })
        : (d.sendEvent(a.JWPLAYER_PLAYLIST_LOADED, {
            playlist: h(d.id).getPlaylist(),
          }),
          (d.item = -1),
          d.setItem(0));
    };
    d.setItem = function (c) {
      var e = !1;
      c == d.playlist.length || -1 > c
        ? ((c = 0), (e = !0))
        : (c = -1 == c || c > d.playlist.length ? d.playlist.length - 1 : c);
      if (e || c !== d.item) {
        d.item = c;
        d.sendEvent(a.JWPLAYER_PLAYLIST_ITEM, { index: d.item });
        e = d.playlist[c];
        c = D.html5;
        if (d.playlist.length) {
          var j = e.sources[0];
          if ('youtube' === j.type || b.isYouTube(j.file))
            (c = D.youtube),
              c !== f &&
                (c && c.destroy(), (c = D.youtube = new k.youtube(d.id)));
        }
        d.setVideo(c);
        c.init && c.init(e);
      }
    };
    d.setVolume = function (e) {
      d.mute && 0 < e && d.setMute(!1);
      e = Math.round(e);
      d.mute || b.saveCookie('volume', e);
      c({ type: a.JWPLAYER_MEDIA_VOLUME, volume: e });
      f.volume(e);
    };
    d.setMute = function (e) {
      b.exists(e) || (e = !d.mute);
      b.saveCookie('mute', e);
      c({ type: a.JWPLAYER_MEDIA_MUTE, mute: e });
      f.mute(e);
    };
    d.componentConfig = function (a) {
      return s[a];
    };
    b.extend(d, new a.eventdispatcher());
    var j = d,
      n = b.extend({}, v, m, e);
    b.foreach(n, function (a, c) {
      n[a] = b.serialize(c);
    });
    j.config = n;
    b.extend(
      d,
      { id: e.id, state: a.state.IDLE, duration: -1, position: 0, buffer: 0 },
      d.config,
    );
    d.playlist = [];
    d.setItem(0);
  };
})(jwplayer);
(function (h) {
  var k = h.utils,
    b = k.css,
    a = k.transitionStyle,
    e = 'top',
    g = 'bottom',
    c = 'right',
    d = 'left',
    f = document,
    D = {
      fontcase: void 0,
      fontcolor: '#ffffff',
      fontsize: 12,
      fontweight: void 0,
      activecolor: '#ffffff',
      overcolor: '#ffffff',
    };
  h.html5.overlay = function (a, h, v) {
    function u(a) {
      return '#' + w + (a ? ' .' + a : '');
    }
    function j(a, b) {
      var c = f.createElement('div');
      a && (c.className = a);
      b && b.appendChild(c);
      return c;
    }
    function n(a, c) {
      var d;
      d = (d = l.getSkinElement('tooltip', a))
        ? d
        : { width: 0, height: 0, src: '', image: void 0, ready: !1 };
      var e = j(c, z);
      b.style(e, B(d));
      return [e, d];
    }
    function B(a) {
      return {
        background: 'url(' + a.src + ') center',
        'background-size': a.width + 'px ' + a.height + 'px',
      };
    }
    function y(a, j) {
      j || (j = '');
      var f = n('cap' + a + j, 'jwborder jw' + a + (j ? j : '')),
        h = f[0],
        f = f[1],
        q = k.extend(B(f), {
          width: a == d || j == d || a == c || j == c ? f.width : void 0,
          height: a == e || j == e || a == g || j == g ? f.height : void 0,
        });
      q[a] = (a == g && !E) || (a == e && E) ? H.height : 0;
      j && (q[j] = 0);
      b.style(h, q);
      h = {};
      q = {};
      f = {
        left: f.width,
        right: f.width,
        top: (E ? H.height : 0) + f.height,
        bottom: (E ? 0 : H.height) + f.height,
      };
      j &&
        ((h[j] = f[j]),
        (h[a] = 0),
        (q[a] = f[a]),
        (q[j] = 0),
        b(u('jw' + a), h),
        b(u('jw' + j), q),
        (C[a] = f[a]),
        (C[j] = f[j]));
    }
    var p = this,
      w = a,
      l = h,
      E = v,
      z,
      q,
      H,
      J;
    a = k.extend({}, D, l.getComponentSettings('tooltip'));
    var C = {};
    p.element = function () {
      return z;
    };
    p.setContents = function (a) {
      k.empty(q);
      q.appendChild(a);
    };
    p.positionX = function (a) {
      b.style(z, { left: Math.round(a) });
    };
    p.constrainX = function (a, c) {
      if (p.showing && 0 !== a.width && p.offsetX(0)) {
        c && b.unblock();
        var d = k.bounds(z);
        0 !== d.width &&
          (d.right > a.right
            ? p.offsetX(a.right - d.right)
            : d.left < a.left && p.offsetX(a.left - d.left));
      }
    };
    p.offsetX = function (a) {
      a = Math.round(a);
      var c = z.clientWidth;
      0 !== c &&
        (b.style(z, { 'margin-left': Math.round(-c / 2) + a }),
        b.style(J, { 'margin-left': Math.round(-H.width / 2) - a }));
      return c;
    };
    p.borderWidth = function () {
      return C.left;
    };
    p.show = function () {
      p.showing = !0;
      b.style(z, { opacity: 1, visibility: 'visible' });
    };
    p.hide = function () {
      p.showing = !1;
      b.style(z, { opacity: 0, visibility: 'hidden' });
    };
    z = j('.jwoverlay'.replace('.', ''));
    z.id = w;
    h = n('arrow', 'jwarrow');
    J = h[0];
    H = h[1];
    b.style(J, {
      position: 'absolute',
      bottom: E ? void 0 : 0,
      top: E ? 0 : void 0,
      width: H.width,
      height: H.height,
      left: '50%',
    });
    y(e, d);
    y(g, d);
    y(e, c);
    y(g, c);
    y(d);
    y(c);
    y(e);
    y(g);
    h = n('background', 'jwback');
    b.style(h[0], {
      left: C.left,
      right: C.right,
      top: C.top,
      bottom: C.bottom,
    });
    q = j('jwcontents', z);
    b(u('jwcontents') + ' *', {
      color: a.fontcolor,
      font: a.fontweight + ' ' + a.fontsize + 'px Arial,Helvetica,sans-serif',
      'text-transform': 'upper' == a.fontcase ? 'uppercase' : void 0,
    });
    E && k.transform(u('jwarrow'), 'rotate(180deg)');
    b.style(z, {
      padding:
        C.top +
        1 +
        'px ' +
        C.right +
        'px ' +
        (C.bottom + 1) +
        'px ' +
        C.left +
        'px',
    });
    p.showing = !1;
  };
  b('.jwoverlay', { position: 'absolute', visibility: 'hidden', opacity: 0 });
  b('.jwoverlay .jwcontents', { position: 'relative', 'z-index': 1 });
  b(
    '.jwoverlay .jwborder',
    { position: 'absolute', 'background-size': '100% 100%' },
    !0,
  );
  b('.jwoverlay .jwback', {
    position: 'absolute',
    'background-size': '100% 100%',
  });
  a('.jwoverlay', 'opacity .25s, visibility .25s');
})(jwplayer);
(function (h) {
  var k = h.html5,
    b = h.utils;
  k.player = function (a) {
    function e() {
      for (var a = D.playlist, b = [], c = 0; c < a.length; c++)
        b.push(g(a[c]));
      return b;
    }
    function g(a) {
      var c = {
        description: a.description,
        file: a.file,
        image: a.image,
        mediaid: a.mediaid,
        title: a.title,
      };
      b.foreach(a, function (a, b) {
        c[a] = b;
      });
      c.sources = [];
      c.tracks = [];
      0 < a.sources.length &&
        b.foreach(a.sources, function (a, b) {
          c.sources.push({
            file: b.file,
            type: b.type ? b.type : void 0,
            label: b.label,
            default: b['default'] ? !0 : !1,
          });
        });
      0 < a.tracks.length &&
        b.foreach(a.tracks, function (a, b) {
          c.tracks.push({
            file: b.file,
            kind: b.kind ? b.kind : void 0,
            label: b.label,
            default: b['default'] ? !0 : !1,
          });
        });
      !a.file && 0 < a.sources.length && (c.file = a.sources[0].file);
      return c;
    }
    function c() {
      f.jwPlay = s.play;
      f.jwPause = s.pause;
      f.jwStop = s.stop;
      f.jwSeek = s.seek;
      f.jwSetVolume = s.setVolume;
      f.jwSetMute = s.setMute;
      f.jwLoad = function (a) {
        s.load(a);
      };
      f.jwPlaylistNext = s.next;
      f.jwPlaylistPrev = s.prev;
      f.jwPlaylistItem = s.item;
      f.jwSetFullscreen = s.setFullscreen;
      f.jwResize = m.resize;
      f.jwSeekDrag = D.seekDrag;
      f.jwGetQualityLevels = s.getQualityLevels;
      f.jwGetCurrentQuality = s.getCurrentQuality;
      f.jwSetCurrentQuality = s.setCurrentQuality;
      f.jwGetCaptionsList = s.getCaptionsList;
      f.jwGetCurrentCaptions = s.getCurrentCaptions;
      f.jwSetCurrentCaptions = s.setCurrentCaptions;
      f.jwGetSafeRegion = m.getSafeRegion;
      f.jwForceState = m.forceState;
      f.jwReleaseState = m.releaseState;
      f.jwGetPlaylistIndex = d('item');
      f.jwGetPosition = d('position');
      f.jwGetDuration = d('duration');
      f.jwGetBuffer = d('buffer');
      f.jwGetWidth = d('width');
      f.jwGetHeight = d('height');
      f.jwGetFullscreen = d('fullscreen');
      f.jwGetVolume = d('volume');
      f.jwGetMute = d('mute');
      f.jwGetState = d('state');
      f.jwGetStretching = d('stretching');
      f.jwGetPlaylist = e;
      f.jwGetControls = d('controls');
      f.jwDetachMedia = s.detachMedia;
      f.jwAttachMedia = s.attachMedia;
      f.jwPlayAd = function (a) {
        var b = h(f.id).plugins;
        b.vast && b.vast.jwPlayAd(a);
      };
      f.jwPauseAd = function () {
        var a = h(f.id).plugins;
        a.googima && a.googima.jwPauseAd();
      };
      f.jwDestroyGoogima = function () {
        var a = h(f.id).plugins;
        a.googima && a.googima.jwDestroyGoogima();
      };
      f.jwInitInstream = function () {
        f.jwInstreamDestroy();
        u = new k.instream(f, D, m, s);
        u.init();
      };
      f.jwLoadItemInstream = function (a, b) {
        if (!u) throw 'Instream player undefined';
        u.load(a, b);
      };
      f.jwLoadArrayInstream = function (a, b) {
        if (!u) throw 'Instream player undefined';
        u.load(a, b);
      };
      f.jwSetControls = function (a) {
        m.setControls(a);
        u && u.setControls(a);
      };
      f.jwInstreamPlay = function () {
        u && u.jwInstreamPlay();
      };
      f.jwInstreamPause = function () {
        u && u.jwInstreamPause();
      };
      f.jwInstreamState = function () {
        return u ? u.jwInstreamState() : '';
      };
      f.jwInstreamDestroy = function (a, b) {
        if ((b = b || u)) b.jwInstreamDestroy(a || !1), b === u && (u = void 0);
      };
      f.jwInstreamAddEventListener = function (a, b) {
        u && u.jwInstreamAddEventListener(a, b);
      };
      f.jwInstreamRemoveEventListener = function (a, b) {
        u && u.jwInstreamRemoveEventListener(a, b);
      };
      f.jwPlayerDestroy = function () {
        m && m.destroy();
        D && D.destroy();
        v && v.resetEventListeners();
      };
      f.jwInstreamSetText = function (a) {
        u && u.jwInstreamSetText(a);
      };
      f.jwIsBeforePlay = function () {
        return s.checkBeforePlay();
      };
      f.jwIsBeforeComplete = function () {
        return D.getVideo().checkComplete();
      };
      f.jwSetCues = m.addCues;
      f.jwAddEventListener = s.addEventListener;
      f.jwRemoveEventListener = s.removeEventListener;
      f.jwDockAddButton = m.addButton;
      f.jwDockRemoveButton = m.removeButton;
    }
    function d(a) {
      return function () {
        return D[a];
      };
    }
    var f = this,
      D,
      m,
      s,
      v,
      u;
    D = new k.model(a);
    f.id = D.id;
    f._model = D;
    b.css.block(f.id);
    m = new k.view(f, D);
    s = new k.controller(D, m);
    c();
    f.initializeAPI = c;
    v = new k.setup(D, m);
    v.addEventListener(h.events.JWPLAYER_READY, function (a) {
      s.playerReady(a);
      b.css.unblock(f.id);
    });
    v.addEventListener(h.events.JWPLAYER_ERROR, function (a) {
      b.log('There was a problem setting up the player: ', a);
      b.css.unblock(f.id);
    });
    v.start();
  };
})(window.jwplayer);
(function (h) {
  var k = {
      size: 180,
      backgroundcolor: '#333333',
      fontcolor: '#999999',
      overcolor: '#CCCCCC',
      activecolor: '#CCCCCC',
      titlecolor: '#CCCCCC',
      titleovercolor: '#FFFFFF',
      titleactivecolor: '#FFFFFF',
      fontweight: 'normal',
      titleweight: 'normal',
      fontsize: 11,
      titlesize: 13,
    },
    b = jwplayer.events,
    a = jwplayer.utils,
    e = a.css,
    g = a.isMobile(),
    c = document;
  h.playlistcomponent = function (d, f) {
    function D(a) {
      return '#' + n.id + (a ? ' .' + a : '');
    }
    function m(a, b) {
      var d = c.createElement(a);
      b && (d.className = b);
      return d;
    }
    function s(a) {
      return function () {
        l = a;
        v.jwPlaylistItem(a);
        v.jwPlay(!0);
      };
    }
    var v = d,
      u = v.skin,
      j = a.extend({}, k, v.skin.getComponentSettings('playlist'), f),
      n,
      B,
      y,
      p,
      w = -1,
      l,
      E,
      z = 76,
      q = {
        background: void 0,
        divider: void 0,
        item: void 0,
        itemOver: void 0,
        itemImage: void 0,
        itemActive: void 0,
      },
      H,
      J = this;
    J.element = function () {
      return n;
    };
    J.redraw = function () {
      E && E.redraw();
    };
    J.show = function () {
      a.show(n);
    };
    J.hide = function () {
      a.hide(n);
    };
    n = m('div', 'jwplaylist');
    n.id = v.id + '_jwplayer_playlistcomponent';
    H = 'basic' == v._model.playlistlayout;
    B = m('div', 'jwlistcontainer');
    n.appendChild(B);
    a.foreach(q, function (a) {
      q[a] = u.getSkinElement('playlist', a);
    });
    H && (z = 32);
    q.divider && (z += q.divider.height);
    var C = 0,
      r = 0,
      K = 0;
    a.clearCss(D());
    e(D(), { 'background-color': j.backgroundcolor });
    e(D('jwlist'), {
      'background-image': q.background ? ' url(' + q.background.src + ')' : '',
    });
    e(D('jwlist *'), {
      color: j.fontcolor,
      font: j.fontweight + ' ' + j.fontsize + 'px Arial, Helvetica, sans-serif',
    });
    q.itemImage
      ? ((C = (z - q.itemImage.height) / 2 + 'px '),
        (r = q.itemImage.width),
        (K = q.itemImage.height))
      : ((r = (4 * z) / 3), (K = z));
    q.divider &&
      e(D('jwplaylistdivider'), {
        'background-image': 'url(' + q.divider.src + ')',
        'background-size': '100% ' + q.divider.height + 'px',
        width: '100%',
        height: q.divider.height,
      });
    e(D('jwplaylistimg'), {
      height: K,
      width: r,
      margin: C ? C + '0 ' + C + C : '0 5px 0 0',
    });
    e(D('jwlist li'), {
      'background-image': q.item ? 'url(' + q.item.src + ')' : '',
      height: z,
      overflow: 'hidden',
      'background-size': '100% ' + z + 'px',
      cursor: 'pointer',
    });
    C = { overflow: 'hidden' };
    '' !== j.activecolor && (C.color = j.activecolor);
    q.itemActive && (C['background-image'] = 'url(' + q.itemActive.src + ')');
    e(D('jwlist li.active'), C);
    e(D('jwlist li.active .jwtitle'), { color: j.titleactivecolor });
    e(D('jwlist li.active .jwdescription'), { color: j.activecolor });
    C = { overflow: 'hidden' };
    '' !== j.overcolor && (C.color = j.overcolor);
    q.itemOver && (C['background-image'] = 'url(' + q.itemOver.src + ')');
    g ||
      (e(D('jwlist li:hover'), C),
      e(D('jwlist li:hover .jwtitle'), { color: j.titleovercolor }),
      e(D('jwlist li:hover .jwdescription'), { color: j.overcolor }));
    e(D('jwtextwrapper'), { height: z, position: 'relative' });
    e(D('jwtitle'), {
      overflow: 'hidden',
      display: 'inline-block',
      height: H ? z : 20,
      color: j.titlecolor,
      'font-size': j.titlesize,
      'font-weight': j.titleweight,
      'margin-top': H ? '0 10px' : 10,
      'margin-left': 10,
      'margin-right': 10,
      'line-height': H ? z : 20,
    });
    e(D('jwdescription'), {
      display: 'block',
      'font-size': j.fontsize,
      'line-height': 18,
      'margin-left': 10,
      'margin-right': 10,
      overflow: 'hidden',
      height: 36,
      position: 'relative',
    });
    v.jwAddEventListener(b.JWPLAYER_PLAYLIST_LOADED, function () {
      B.innerHTML = '';
      for (var b = v.jwGetPlaylist(), c = [], d = 0; d < b.length; d++)
        b[d]['ova.hidden'] || c.push(b[d]);
      if ((y = c)) {
        b = m('ul', 'jwlist');
        b.id = n.id + '_ul' + Math.round(1e7 * Math.random());
        p = b;
        for (b = 0; b < y.length; b++) {
          var f = b,
            c = y[f],
            d = m('li', 'jwitem'),
            j = void 0;
          d.id = p.id + '_item_' + f;
          0 < f
            ? ((j = m('div', 'jwplaylistdivider')), d.appendChild(j))
            : ((f = q.divider ? q.divider.height : 0),
              (d.style.height = z - f + 'px'),
              (d.style['background-size'] = '100% ' + (z - f) + 'px'));
          f = m('div', 'jwplaylistimg jwfill');
          j = void 0;
          c['playlist.image'] && q.itemImage
            ? (j = c['playlist.image'])
            : c.image && q.itemImage
            ? (j = c.image)
            : q.itemImage && (j = q.itemImage.src);
          j &&
            !H &&
            (e('#' + d.id + ' .jwplaylistimg', { 'background-image': j }),
            d.appendChild(f));
          f = m('div', 'jwtextwrapper');
          j = m('span', 'jwtitle');
          j.innerHTML = c && c.title ? c.title : '';
          f.appendChild(j);
          c.description &&
            !H &&
            ((j = m('span', 'jwdescription')),
            (j.innerHTML = c.description),
            f.appendChild(j));
          d.appendChild(f);
          c = d;
          g
            ? new a.touch(c).addEventListener(a.touchEvents.TAP, s(b))
            : (c.onclick = s(b));
          p.appendChild(c);
        }
        w = v.jwGetPlaylistIndex();
        B.appendChild(p);
        E = new h.playlistslider(n.id + '_slider', v.skin, n, p);
      }
    });
    v.jwAddEventListener(b.JWPLAYER_PLAYLIST_ITEM, function (a) {
      0 <= w &&
        ((c.getElementById(p.id + '_item_' + w).className = 'jwitem'),
        (w = a.index));
      c.getElementById(p.id + '_item_' + a.index).className = 'jwitem active';
      a = v.jwGetPlaylistIndex();
      a != l &&
        ((l = -1),
        E &&
          E.visible() &&
          E.thumbPosition(a / (v.jwGetPlaylist().length - 1)));
    });
    v.jwAddEventListener(b.JWPLAYER_RESIZE, function () {
      J.redraw();
    });
    return this;
  };
  e('.jwplaylist', { position: 'absolute', width: '100%', height: '100%' });
  a.dragStyle('.jwplaylist', 'none');
  e('.jwplaylist .jwplaylistimg', {
    position: 'relative',
    width: '100%',
    float: 'left',
    margin: '0 5px 0 0',
    background: '#000',
    overflow: 'hidden',
  });
  e('.jwplaylist .jwlist', {
    position: 'absolute',
    width: '100%',
    'list-style': 'none',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
  });
  e('.jwplaylist .jwlistcontainer', {
    position: 'absolute',
    overflow: 'hidden',
    width: '100%',
    height: '100%',
  });
  e('.jwplaylist .jwlist li', { width: '100%' });
  e('.jwplaylist .jwtextwrapper', { overflow: 'hidden' });
  e('.jwplaylist .jwplaylistdivider', { position: 'absolute' });
  g && a.transitionStyle('.jwplaylist .jwlist', 'top .35s');
})(jwplayer.html5);
(function (h) {
  function k() {
    var a = [],
      b;
    for (b = 0; b < arguments.length; b++)
      a.push('.jwplaylist .' + arguments[b]);
    return a.join(',');
  }
  var b = jwplayer.utils,
    a = b.touchEvents,
    e = b.css,
    g = document,
    c = window;
  h.playlistslider = function (d, f, h, k) {
    function s(a) {
      return '#' + z.id + (a ? ' .' + a : '');
    }
    function v(a, b, c, d) {
      var f = g.createElement('div');
      a &&
        ((f.className = a),
        b &&
          e(s(a), {
            'background-image': b.src ? b.src : void 0,
            'background-repeat': d ? 'repeat-y' : 'no-repeat',
            height: d ? void 0 : b.height,
          }));
      c && c.appendChild(f);
      return f;
    }
    function u(a) {
      return (a = l.getSkinElement('playlist', a))
        ? a
        : { width: 0, height: 0, src: void 0 };
    }
    function j(a) {
      if (t)
        return (
          (a = a ? a : c.event),
          V(C - (a.detail ? -1 * a.detail : a.wheelDelta / 40) / 10),
          a.stopPropagation && a.stopPropagation(),
          a.preventDefault ? a.preventDefault() : (a.returnValue = !1),
          (a.cancelBubble = !0),
          (a.cancel = !0),
          !1
        );
    }
    function n(a) {
      0 == a.button && (J = !0);
      g.onselectstart = function () {
        return !1;
      };
      c.addEventListener('mousemove', y, !1);
      c.addEventListener('mouseup', w, !1);
    }
    function B(a) {
      V(C - (2 * a.deltaY) / E.clientHeight);
    }
    function y(a) {
      if (J || 'click' == a.type) {
        var c = b.bounds(q),
          d = H.clientHeight / 2;
        V((a.pageY - c.top - d) / (c.height - d - d));
      }
    }
    function p(a) {
      return function (b) {
        0 < b.button ||
          (V(C + 0.05 * a),
          (r = setTimeout(function () {
            K = setInterval(function () {
              V(C + 0.05 * a);
            }, 50);
          }, 500)));
      };
    }
    function w() {
      J = !1;
      c.removeEventListener('mousemove', y);
      c.removeEventListener('mouseup', w);
      g.onselectstart = void 0;
      clearTimeout(r);
      clearInterval(K);
    }
    var l = f,
      E = k,
      z,
      q,
      H,
      J,
      C = 0,
      r,
      K;
    f = b.isMobile();
    var t = !0,
      G,
      A,
      L,
      I,
      P,
      x,
      Y,
      W,
      X;
    this.element = function () {
      return z;
    };
    this.visible = function () {
      return t;
    };
    var O = (this.redraw = function () {
        clearTimeout(X);
        X = setTimeout(function () {
          if (E && E.clientHeight) {
            var a = E.parentNode.clientHeight / E.clientHeight;
            0 > a && (a = 0);
            1 < a
              ? (t = !1)
              : ((t = !0),
                e(s('jwthumb'), {
                  height: Math.max(q.clientHeight * a, P.height + x.height),
                }));
            e(s(), { visibility: t ? 'visible' : 'hidden' });
            E &&
              (E.style.width = t
                ? E.parentElement.clientWidth - L.width + 'px'
                : '');
          } else X = setTimeout(O, 10);
        }, 0);
      }),
      V = (this.thumbPosition = function (a) {
        isNaN(a) && (a = 0);
        C = Math.max(0, Math.min(1, a));
        e(s('jwthumb'), { top: Y + (q.clientHeight - H.clientHeight) * C });
        k &&
          (k.style.top =
            Math.min(0, z.clientHeight - k.scrollHeight) * C + 'px');
      });
    z = v('jwslider', null, h);
    z.id = d;
    d = new b.touch(E);
    f
      ? d.addEventListener(a.DRAG, B)
      : (z.addEventListener('mousedown', n, !1),
        z.addEventListener('click', y, !1));
    G = u('sliderCapTop');
    A = u('sliderCapBottom');
    L = u('sliderRail');
    d = u('sliderRailCapTop');
    h = u('sliderRailCapBottom');
    I = u('sliderThumb');
    P = u('sliderThumbCapTop');
    x = u('sliderThumbCapBottom');
    Y = G.height;
    W = A.height;
    e(s(), { width: L.width });
    e(s('jwrail'), { top: Y, bottom: W });
    e(s('jwthumb'), { top: Y });
    G = v('jwslidertop', G, z);
    A = v('jwsliderbottom', A, z);
    q = v('jwrail', null, z);
    H = v('jwthumb', null, z);
    f ||
      (G.addEventListener('mousedown', p(-1), !1),
      A.addEventListener('mousedown', p(1), !1));
    v('jwrailtop', d, q);
    v('jwrailback', L, q, !0);
    v('jwrailbottom', h, q);
    e(s('jwrailback'), { top: d.height, bottom: h.height });
    v('jwthumbtop', P, H);
    v('jwthumbback', I, H, !0);
    v('jwthumbbottom', x, H);
    e(s('jwthumbback'), { top: P.height, bottom: x.height });
    O();
    E &&
      !f &&
      (E.addEventListener('mousewheel', j, !1),
      E.addEventListener('DOMMouseScroll', j, !1));
    return this;
  };
  e(k('jwslider'), {
    position: 'absolute',
    height: '100%',
    visibility: 'hidden',
    right: 0,
    top: 0,
    cursor: 'pointer',
    'z-index': 1,
    overflow: 'hidden',
  });
  e(k('jwslider') + ' *', {
    position: 'absolute',
    width: '100%',
    'background-position': 'center',
    'background-size': '100% 100%',
    overflow: 'hidden',
  });
  e(k('jwslidertop', 'jwrailtop', 'jwthumbtop'), { top: 0 });
  e(k('jwsliderbottom', 'jwrailbottom', 'jwthumbbottom'), { bottom: 0 });
})(jwplayer.html5);
(function (h) {
  var k = jwplayer.utils,
    b = k.css,
    a = document,
    e = 'none';
  h.rightclick = function (b, c) {
    function d(b) {
      var c = a.createElement('div');
      c.className = b.replace('.', '');
      return c;
    }
    function f() {
      s || (v.style.display = e);
    }
    var D,
      m = k.extend(
        {
          aboutlink:
            'http://www.longtailvideo.com/jwpabout/?a\x3dr\x26v\x3d' +
            h.version +
            '\x26m\x3dh\x26e\x3do',
          abouttext: 'About JW Player ' + h.version + '...',
        },
        c,
      ),
      s = !1,
      v,
      u;
    this.element = function () {
      return v;
    };
    this.destroy = function () {
      a.removeEventListener('mousedown', f, !1);
    };
    D = a.getElementById(b.id);
    v = d('.jwclick');
    v.id = b.id + '_menu';
    v.style.display = e;
    D.oncontextmenu = function (a) {
      if (!s) {
        null == a && (a = window.event);
        var b = null != a.target ? a.target : a.srcElement,
          c = k.bounds(D),
          b = k.bounds(b);
        v.style.display = e;
        v.style.left =
          (a.offsetX ? a.offsetX : a.layerX) + b.left - c.left + 'px';
        v.style.top = (a.offsetY ? a.offsetY : a.layerY) + b.top - c.top + 'px';
        v.style.display = 'block';
        a.preventDefault();
      }
    };
    v.onmouseover = function () {
      s = !0;
    };
    v.onmouseout = function () {
      s = !1;
    };
    a.addEventListener('mousedown', f, !1);
    u = d('.jwclick_item');
    u.innerHTML = m.abouttext;
    u.onclick = function () {
      window.top.location = m.aboutlink;
    };
    v.appendChild(u);
    D.appendChild(v);
  };
  b(
    '.jwclick',
    {
      'background-color': '#FFF',
      '-webkit-border-radius': 5,
      '-moz-border-radius': 5,
      'border-radius': 5,
      height: 'auto',
      border: '1px solid #bcbcbc',
      'font-family': '"MS Sans Serif", "Geneva", sans-serif',
      'font-size': 10,
      width: 320,
      '-webkit-box-shadow':
        '5px 5px 7px rgba(0,0,0,.10), 0px 1px 0px rgba(255,255,255,.3) inset',
      '-moz-box-shadow':
        '5px 5px 7px rgba(0,0,0,.10), 0px 1px 0px rgba(255,255,255,.3) inset',
      'box-shadow':
        '5px 5px 7px rgba(0,0,0,.10), 0px 1px 0px rgba(255,255,255,.3) inset',
      position: 'absolute',
      'z-index': 999,
    },
    !0,
  );
  b(
    '.jwclick div',
    {
      padding: '8px 21px',
      margin: '0px',
      'background-color': '#FFF',
      border: 'none',
      'font-family': '"MS Sans Serif", "Geneva", sans-serif',
      'font-size': 10,
      color: 'inherit',
    },
    !0,
  );
  b(
    '.jwclick_item',
    { padding: '8px 21px', 'text-align': 'left', cursor: 'pointer' },
    !0,
  );
  b(
    '.jwclick_item:hover',
    { 'background-color': '#595959', color: '#FFF' },
    !0,
  );
  b('.jwclick_item a', { 'text-decoration': e, color: '#000' }, !0);
  b(
    '.jwclick hr',
    { width: '100%', padding: 0, margin: 0, border: '1px #e9e9e9 solid' },
    !0,
  );
})(jwplayer.html5);
(function (h) {
  var k = h.html5,
    b = h.utils,
    a = h.events,
    e = 2,
    g = 4;
  k.setup = function (c, d) {
    function f() {
      for (var a = 0; a < w.length; a++) {
        var b = w[a],
          c;
        a: {
          if ((c = b.depends)) {
            c = c.toString().split(',');
            for (var d = 0; d < c.length; d++)
              if (!j[c[d]]) {
                c = !1;
                break a;
              }
          }
          c = !0;
        }
        if (c) {
          w.splice(a, 1);
          try {
            b.method(), f();
          } catch (e) {
            v(e.message);
          }
          return;
        }
      }
      0 < w.length && !y && setTimeout(f, 500);
    }
    function D() {
      j[e] = !0;
    }
    function m(a) {
      v('Error loading skin: ' + a);
    }
    function s() {
      p && ((p.onload = null), (p = p.onerror = null));
      clearTimeout(l);
      j[g] = !0;
    }
    function v(b) {
      y = !0;
      B.sendEvent(a.JWPLAYER_ERROR, { message: b });
      u.setupError(b);
    }
    var u = d,
      j = {},
      n,
      B = new a.eventdispatcher(),
      y = !1,
      p,
      w = [
        {
          name: 1,
          method: function () {
            c.edition && 'invalid' == c.edition()
              ? v('Error setting up player: Invalid license key')
              : (j[1] = !0);
          },
          depends: !1,
        },
        {
          name: e,
          method: function () {
            n = new k.skin();
            n.load(c.config.skin, D, m);
          },
          depends: 1,
        },
        {
          name: 3,
          method: function () {
            var a = b.typeOf(c.config.playlist);
            'array' === a
              ? ((a = new h.playlist(c.config.playlist)),
                c.setPlaylist(a),
                0 === c.playlist.length || 0 === c.playlist[0].sources.length
                  ? v('Error loading playlist: No playable sources found')
                  : (j[3] = !0))
              : v('Playlist type not supported: ' + a);
          },
          depends: 1,
        },
        {
          name: g,
          method: function () {
            var a = c.playlist[c.item].image;
            a
              ? ((p = new Image()),
                (p.onload = s),
                (p.onerror = s),
                (p.src = a),
                clearTimeout(l),
                (l = setTimeout(s, 500)))
              : s();
          },
          depends: 3,
        },
        {
          name: 5,
          method: function () {
            u.setup(n);
            j[5] = !0;
          },
          depends: g + ',' + e,
        },
        {
          name: 6,
          method: function () {
            j[6] = !0;
          },
          depends: '5,3',
        },
        {
          name: 7,
          method: function () {
            B.sendEvent(a.JWPLAYER_READY);
            j[7] = !0;
          },
          depends: 6,
        },
      ],
      l = -1;
    b.extend(this, B);
    this.start = f;
  };
})(jwplayer);
(function (h) {
  h.skin = function () {
    var k = {},
      b = !1;
    this.load = function (a, e, g) {
      new h.skinloader(
        a,
        function (a) {
          b = !0;
          k = a;
          'function' == typeof e && e();
        },
        function (a) {
          'function' == typeof g && g(a);
        },
      );
    };
    this.getSkinElement = function (a, e) {
      a = a.toLowerCase();
      e = e.toLowerCase();
      if (b)
        try {
          return k[a].elements[e];
        } catch (g) {
          jwplayer.utils.log('No such skin component / element: ', [a, e]);
        }
      return null;
    };
    this.getComponentSettings = function (a) {
      a = a.toLowerCase();
      return b && k && k[a] ? k[a].settings : null;
    };
    this.getComponentLayout = function (a) {
      a = a.toLowerCase();
      if (b) {
        var e = k[a].layout;
        if (e && (e.left || e.right || e.center)) return k[a].layout;
      }
      return null;
    };
  };
})(jwplayer.html5);
(function (h) {
  var k = jwplayer.utils,
    b = k.foreach,
    a = 'Skin formatting error';
  h.skinloader = function (e, g, c) {
    function d(b) {
      u = b;
      k.ajax(
        k.getAbsolutePath(p),
        function (b) {
          try {
            k.exists(b.responseXML) && D(b.responseXML);
          } catch (c) {
            n(a);
          }
        },
        function (a) {
          n(a);
        },
      );
    }
    function f(a, b) {
      return a ? a.getElementsByTagName(b) : null;
    }
    function D(a) {
      var b = f(a, 'skin')[0];
      a = f(b, 'component');
      var c = b.getAttribute('target'),
        b = parseFloat(b.getAttribute('pixelratio'));
      0 < b && (E = b);
      k.versionCheck(c) || n('Incompatible player version');
      if (0 === a.length) j(u);
      else
        for (c = 0; c < a.length; c++) {
          var d = v(a[c].getAttribute('name')),
            b = { settings: {}, elements: {}, layout: {} },
            e = f(f(a[c], 'elements')[0], 'element');
          u[d] = b;
          for (var g = 0; g < e.length; g++) s(e[g], d);
          if ((d = f(a[c], 'settings')[0]) && 0 < d.childNodes.length) {
            d = f(d, 'setting');
            for (e = 0; e < d.length; e++) {
              var g = d[e].getAttribute('name'),
                h = d[e].getAttribute('value');
              /color$/.test(g) && (h = k.stringToColor(h));
              b.settings[v(g)] = h;
            }
          }
          if ((d = f(a[c], 'layout')[0]) && 0 < d.childNodes.length) {
            d = f(d, 'group');
            for (e = 0; e < d.length; e++) {
              h = d[e];
              g = { elements: [] };
              b.layout[v(h.getAttribute('position'))] = g;
              for (var l = 0; l < h.attributes.length; l++) {
                var p = h.attributes[l];
                g[p.name] = p.value;
              }
              h = f(h, '*');
              for (l = 0; l < h.length; l++) {
                p = h[l];
                g.elements.push({ type: p.tagName });
                for (var y = 0; y < p.attributes.length; y++) {
                  var w = p.attributes[y];
                  g.elements[l][v(w.name)] = w.value;
                }
                k.exists(g.elements[l].name) ||
                  (g.elements[l].name = p.tagName);
              }
            }
          }
          B = !1;
          m();
        }
    }
    function m() {
      clearInterval(y);
      w ||
        (y = setInterval(function () {
          var a = !0;
          b(u, function (c, d) {
            'properties' != c &&
              b(d.elements, function (b) {
                (u[v(c)] ? u[v(c)].elements[v(b)] : null).ready || (a = !1);
              });
          });
          a && !B && (clearInterval(y), j(u));
        }, 100));
    }
    function s(a, b) {
      b = v(b);
      var c = new Image(),
        d = v(a.getAttribute('name')),
        e = a.getAttribute('src');
      if (0 !== e.indexOf('data:image/png;base64,'))
        var f = k.getAbsolutePath(p),
          e = [f.substr(0, f.lastIndexOf('/')), b, e].join('/');
      u[b].elements[d] = { height: 0, width: 0, src: '', ready: !1, image: c };
      c.onload = function () {
        var a = b,
          e = u[v(a)] ? u[v(a)].elements[v(d)] : null;
        e
          ? ((e.height = Math.round((c.height / E) * l)),
            (e.width = Math.round((c.width / E) * l)),
            (e.src = c.src),
            (e.ready = !0),
            m())
          : k.log('Loaded an image for a missing element: ' + a + '.' + d);
      };
      c.onerror = function () {
        w = !0;
        m();
        n('Skin image not found: ' + this.src);
      };
      c.src = e;
    }
    function v(a) {
      return a ? a.toLowerCase() : '';
    }
    var u = {},
      j = g,
      n = c,
      B = !0,
      y,
      p = e,
      w = !1,
      l = (jwplayer.utils.isMobile(), 1),
      E = 1;
    'string' != typeof p || '' === p
      ? D(h.defaultskin())
      : 'xml' != k.extension(p)
      ? n('Skin not a valid file type')
      : new h.skinloader('', d, n);
  };
})(jwplayer.html5);
(function (h) {
  var k = h.utils,
    b = h.events,
    a = k.css;
  h.html5.thumbs = function (e) {
    function g(a) {
      s = null;
      try {
        a = new h.parsers.srt().parse(a.responseText, !0);
      } catch (b) {
        c(b.message);
        return;
      }
      if ('array' !== k.typeOf(a)) return c('Invalid data');
      D = a;
    }
    function c(a) {
      s = null;
      k.log('Thumbnails could not be loaded: ' + a);
    }
    function d(b, c, d) {
      b.onload = null;
      c.width || ((c.width = b.width), (c.height = b.height));
      c['background-image'] = b.src;
      a.style(f, c);
      d && d(c.width);
    }
    var f,
      D,
      m,
      s,
      v,
      u = {},
      j,
      n = new b.eventdispatcher();
    k.extend(this, n);
    f = document.createElement('div');
    f.id = e;
    this.load = function (b) {
      a.style(f, { display: 'none' });
      s &&
        ((s.onload = null),
        (s.onreadystatechange = null),
        (s.onerror = null),
        s.abort && s.abort(),
        (s = null));
      j && (j.onload = null);
      b
        ? ((m = b.split('?')[0].split('/').slice(0, -1).join('/')),
          (s = k.ajax(b, g, c, !0)))
        : ((D = v = j = null), (u = {}));
    };
    this.element = function () {
      return f;
    };
    this.updateTimeline = function (a, b) {
      if (D) {
        for (var e = 0; e < D.length && a > D[e].end; ) e++;
        e === D.length && e--;
        e = D[e].text;
        a: {
          var f = e;
          if (f && f !== v) {
            v = f;
            0 > f.indexOf('://') && (f = m ? m + '/' + f : f);
            var g = {
              display: 'block',
              margin: '0 auto',
              'background-position': '0 0',
              width: 0,
              height: 0,
            };
            if (0 < f.indexOf('#xywh'))
              try {
                var h = /(.+)\#xywh=(\d+),(\d+),(\d+),(\d+)/.exec(f),
                  f = h[1];
                g['background-position'] = -1 * h[2] + 'px ' + -1 * h[3] + 'px';
                g.width = h[4];
                g.height = h[5];
              } catch (k) {
                c('Could not parse thumbnail');
                break a;
              }
            var n = u[f];
            n
              ? d(n, g, b)
              : ((n = new Image()),
                (n.onload = function () {
                  d(n, g, b);
                }),
                (u[f] = n),
                (n.src = f));
            j && (j.onload = null);
            j = n;
          }
        }
        return e;
      }
    };
  };
})(jwplayer);
(function (h) {
  var k = h.jwplayer,
    b = k.html5,
    a = k.utils,
    e = k.events,
    g = e.state,
    c = a.css,
    d = a.bounds,
    f = a.isMobile(),
    D = a.isIPad(),
    m = a.isIPod(),
    s = document,
    v = 'aspectMode',
    u = [
      'fullscreenchange',
      'webkitfullscreenchange',
      'mozfullscreenchange',
      'MSFullscreenChange',
    ],
    j = !0,
    n = !j,
    B = 'hidden',
    y = 'none',
    p = 'block';
  b.view = function (w, l) {
    function E(b) {
      b = a.between(l.position + b, 0, this.getDuration());
      this.seek(b);
    }
    function z(b) {
      b = a.between(this.getVolume() + b, 0, 100);
      this.setVolume(b);
    }
    function q(a) {
      var b;
      b = a.ctrlKey || a.metaKey ? !1 : l.controls ? !0 : !1;
      if (!b) return !0;
      M.adMode() || (ia(), A());
      b = k(w.id);
      switch (a.keyCode) {
        case 27:
          b.setFullscreen(n);
          break;
        case 13:
        case 32:
          b.play();
          break;
        case 37:
          M.adMode() || E.call(b, -5);
          break;
        case 39:
          M.adMode() || E.call(b, 5);
          break;
        case 38:
          z.call(b, 10);
          break;
        case 40:
          z.call(b, -10);
          break;
        case 77:
          b.setMute();
          break;
        case 70:
          b.setFullscreen();
          break;
        default:
          if (48 <= a.keyCode && 59 >= a.keyCode) {
            var c = ((a.keyCode - 48) / 10) * b.getDuration();
            b.seek(c);
          }
      }
      if (/13|32|37|38|39|40/.test(a.keyCode)) return a.preventDefault(), !1;
    }
    function H() {
      var a = !Ha;
      Ha = !1;
      a && ka.sendEvent(e.JWPLAYER_VIEW_TAB_FOCUS, { hasFocus: !0 });
      M.adMode() || (ia(), A());
    }
    function J() {
      Ha = !1;
      ka.sendEvent(e.JWPLAYER_VIEW_TAB_FOCUS, { hasFocus: !1 });
    }
    function C() {
      var a = d(N),
        b = Math.round(a.width),
        c = Math.round(a.height);
      if (s.body.contains(N)) {
        if (b && c && (b !== Za || c !== Ka))
          (Za = b),
            (Ka = c),
            S && S.redraw(),
            clearTimeout(sa),
            (sa = setTimeout(Z, 50)),
            ka.sendEvent(e.JWPLAYER_RESIZE, { width: b, height: c });
      } else
        h.removeEventListener('resize', C),
          f && h.removeEventListener('orientationchange', C);
      return a;
    }
    function r(a) {
      a &&
        (a.element().addEventListener('mousemove', I, n),
        a.element().addEventListener('mouseout', P, n));
    }
    function K() {}
    function t() {
      clearTimeout(Ba);
      Ba = setTimeout(Ca, 10);
    }
    function G(a, b) {
      var c = s.createElement(a);
      b && (c.className = b);
      return c;
    }
    function A() {
      clearTimeout(Ba);
      Ba = setTimeout(Ca, $a);
    }
    function L() {
      clearTimeout(Ba);
      var a = w.jwGetState();
      if (a === g.PLAYING || a === g.PAUSED || T)
        Da(), ga || (Ba = setTimeout(Ca, $a));
    }
    function I() {
      clearTimeout(Ba);
      ga = j;
    }
    function P() {
      ga = n;
    }
    function x(a) {
      ka.sendEvent(a.type, a);
    }
    function Y() {
      var a = k.cast;
      return a && a.available && a.available();
    }
    function W(a) {
      if (a.done) X();
      else {
        if (!a.complete) {
          M.adMode() || (M.instreamMode(!0), M.adMode(!0), M.show(!0));
          M.setText(a.message);
          var b = a.onClick;
          void 0 !== b &&
            S.setAlternateClickHandler(function () {
              b(a);
            });
          void 0 !== a.onSkipAd && ca && ca.setSkipoffset(a, a.onSkipAd);
        }
        ca && ca.adChanged(a);
      }
    }
    function X() {
      M.setText('');
      M.adMode(!1);
      M.instreamMode(!1);
      M.show(!0);
      ca && (ca.adsEnded(), ca.setState(w.jwGetState()));
      S.revertAlternateClickHandler();
    }
    function O(b, d, e) {
      var f = N.className,
        g,
        h,
        k = w.id + '_view';
      c.block(k);
      if ((e = !!e))
        (f = f.replace(/\s*aspectMode/, '')),
          N.className !== f && (N.className = f),
          c.style(N, { display: p }, e);
      a.exists(b) && a.exists(d) && ((l.width = b), (l.height = d));
      e = { width: b };
      -1 == f.indexOf(v) && (e.height = d);
      c.style(N, e, !0);
      S && S.redraw();
      M && M.redraw(j);
      $ &&
        ($.offset(
          M && 0 <= $.position().indexOf('bottom')
            ? M.height() + M.margin()
            : 0,
        ),
        setTimeout(function () {
          ea &&
            ea.offset(
              'top-left' == $.position()
                ? $.element().clientWidth + $.margin()
                : 0,
            );
        }, 500));
      V(d);
      g = l.playlistsize;
      h = l.playlistposition;
      if (la && g && ('right' == h || 'bottom' == h))
        la.redraw(),
          (f = { display: p }),
          (e = {}),
          (f[h] = 0),
          (e[h] = g),
          'right' == h ? (f.width = g) : (f.height = g),
          c.style(Ra, f),
          c.style(Aa, e);
      Z(b, d);
      c.unblock(k);
    }
    function V(a) {
      var b = d(N);
      da =
        0 < a.toString().indexOf('%') || 0 === b.height
          ? n
          : 'bottom' == l.playlistposition
          ? b.height <= 40 + l.playlistsize
          : 40 >= b.height;
      M &&
        (da
          ? (M.audioMode(j), Da(), S.hidePreview(j), S && S.hide(), Ea(n))
          : (M.audioMode(n), Qa(w.jwGetState())));
      $ && da && xa();
      N.style.backgroundColor = da ? 'transparent' : '#000';
    }
    function Z(a, b) {
      if (!a || isNaN(Number(a))) {
        if (!ba) return;
        a = ba.clientWidth;
      }
      if (!b || isNaN(Number(b))) {
        if (!ba) return;
        b = ba.clientHeight;
      }
      l.getVideo().resize(a, b, l.stretching) &&
        (clearTimeout(sa), (sa = setTimeout(Z, 250)));
    }
    function ha(a) {
      if (a.target === N || N.contains(a.target))
        void 0 !== a.jwstate
          ? (a = a.jwstate)
          : Ia
          ? ((a =
              s.currentFullScreenElement ||
              s.webkitCurrentFullScreenElement ||
              s.mozFullScreenElement ||
              s.msFullscreenElement),
            (a = !!(a && a.id === w.id)))
          : (a = l.getVideo().getFullScreen()),
          Ia ? ja(N, a) : Ta(a);
    }
    function ja(b, d) {
      a.removeClass(b, 'jwfullscreen');
      d
        ? (a.addClass(b, 'jwfullscreen'),
          c.style(s.body, { 'overflow-y': B }),
          A())
        : c.style(s.body, { 'overflow-y': '' });
      M && M.redraw();
      S && S.redraw();
      ea && ea.redraw();
      Z();
      Ta(d);
    }
    function Ta(a) {
      l.setFullscreen(a);
      a
        ? (clearTimeout(sa), (sa = setTimeout(Z, 200)))
        : D && w.jwGetState() == g.PAUSED && setTimeout(Fa, 500);
    }
    function ia() {
      M && l.controls && (T ? Na.show() : M.show());
    }
    function ya() {
      R !== j &&
        M &&
        !da &&
        !l.getVideo().audioMode() &&
        (T ? Na.hide() : M.hide());
    }
    function Q() {
      ea && !da && l.controls && ea.show();
    }
    function Sa() {
      ea && !aa && !l.getVideo().audioMode() && ea.hide();
    }
    function xa() {
      $ && (!l.getVideo().audioMode() || da) && $.hide(da);
    }
    function Fa() {
      S && l.controls && !da && (!m || w.jwGetState() == g.IDLE) && S.show();
      (!f || !l.fullscreen) && l.getVideo().setControls(n);
    }
    function Ca() {
      clearTimeout(Ba);
      if (R !== j) {
        Ja = n;
        var b = w.jwGetState();
        (!l.controls || b != g.PAUSED) && ya();
        l.controls || Sa();
        b != g.IDLE && b != g.PAUSED && (Sa(), xa());
        a.addClass(N, 'jw-user-inactive');
      }
    }
    function Da() {
      if (R !== n) {
        Ja = j;
        if (l.controls || da) ia(), Q();
        rb.hide && $ && !da && $.show();
        a.removeClass(N, 'jw-user-inactive');
      }
    }
    function Ea(a) {
      a = a && !da;
      l.getVideo().setVisibility(a);
    }
    function cb() {
      aa = j;
      wa(n);
      l.controls && Q();
    }
    function vb() {
      ca && ca.setState(w.jwGetState());
    }
    function kb() {}
    function Oa(a) {
      aa = n;
      clearTimeout(eb);
      eb = setTimeout(function () {
        Qa(a.newstate);
      }, 100);
    }
    function wb() {
      ya();
    }
    function Qa(a) {
      if (l.getVideo().isCaster)
        S && (S.show(), S.hidePreview(n)),
          c.style(ba, { visibility: B, opacity: 0 }),
          M && (M.show(), M.hideFullscreen(j));
      else {
        switch (a) {
          case g.PLAYING:
            R = l.getVideo().isCaster !== j ? null : j;
            (T ? Ga : l).getVideo().audioMode()
              ? (Ea(n),
                S.hidePreview(da),
                S.setHiding(j),
                M && (Da(), M.hideFullscreen(j)),
                Q())
              : (Ea(j),
                Z(),
                S.hidePreview(j),
                M && M.hideFullscreen(!l.getVideo().supportsFullscreen()));
            break;
          case g.IDLE:
            Ea(n);
            da || (S.hidePreview(n), Fa(), Q(), M && M.hideFullscreen(n));
            break;
          case g.BUFFERING:
            Fa();
            Ca();
            f && Ea(j);
            break;
          case g.PAUSED:
            Fa(), Da();
        }
        $ && !da && $.show();
      }
    }
    function Wa(a) {
      return '#' + w.id + (a ? ' .' + a : '');
    }
    function Xa(a, b) {
      c(a, { display: b ? p : y });
    }
    var N,
      Aa,
      qa,
      qb,
      Ra,
      Ba = -1,
      $a = f ? 4e3 : 2e3,
      ba,
      Za,
      Ka,
      va,
      Na,
      Ua,
      Ga,
      T = n,
      M,
      S,
      ca,
      ea,
      $,
      rb = a.extend({}, l.componentConfig('logo')),
      ta,
      la,
      da,
      F = n,
      Ja = n,
      R = null,
      aa,
      ra,
      sa = -1,
      ga = n,
      Pa,
      fa,
      Ia = !1,
      Ha = !1,
      ka = a.extend(this, new e.eventdispatcher());
    this.getCurrentCaptions = function () {
      return ta.getCurrentCaptions();
    };
    this.setCurrentCaptions = function (a) {
      ta.setCurrentCaptions(a);
    };
    this.getCaptionsList = function () {
      return ta.getCaptionsList();
    };
    this.setup = function (d) {
      if (!F) {
        w.skin = d;
        Aa = G('span', 'jwmain');
        Aa.id = w.id + '_view';
        ba = G('span', 'jwvideo');
        ba.id = w.id + '_media';
        qa = G('span', 'jwcontrols');
        va = G('span', 'jwinstream');
        Ra = G('span', 'jwplaylistcontainer');
        qb = G('span', 'jwaspect');
        d = l.height;
        var q = l.componentConfig('controlbar'),
          B = l.componentConfig('display');
        V(d);
        ta = new b.captions(w, l.captions);
        ta.addEventListener(e.JWPLAYER_CAPTIONS_LIST, x);
        ta.addEventListener(e.JWPLAYER_CAPTIONS_CHANGED, x);
        ta.addEventListener(e.JWPLAYER_CAPTIONS_LOADED, K);
        qa.appendChild(ta.element());
        S = new b.display(w, B);
        S.addEventListener(e.JWPLAYER_DISPLAY_CLICK, function (a) {
          x(a);
          f ? (Ja ? Ca() : Da()) : Oa({ newstate: w.jwGetState() });
          Ja && A();
        });
        da && S.hidePreview(j);
        qa.appendChild(S.element());
        $ = new b.logo(w, rb);
        qa.appendChild($.element());
        ea = new b.dock(w, l.componentConfig('dock'));
        qa.appendChild(ea.element());
        w.edition && !f
          ? (ra = new b.rightclick(w, {
              abouttext: l.abouttext,
              aboutlink: l.aboutlink,
            }))
          : f || (ra = new b.rightclick(w, {}));
        l.playlistsize &&
          l.playlistposition &&
          l.playlistposition != y &&
          ((la = new b.playlistcomponent(w, {})), Ra.appendChild(la.element()));
        M = new b.controlbar(w, q);
        M.addEventListener(e.JWPLAYER_USER_ACTION, A);
        qa.appendChild(M.element());
        m && ya();
        Y() && ka.forceControls(j);
        Aa.appendChild(ba);
        Aa.appendChild(qa);
        Aa.appendChild(va);
        N.appendChild(Aa);
        N.appendChild(qb);
        N.appendChild(Ra);
        l.getVideo().setContainer(ba);
        l.addEventListener('fullscreenchange', ha);
        for (d = u.length; d--; ) s.addEventListener(u[d], ha, n);
        h.removeEventListener('resize', C);
        h.addEventListener('resize', C, n);
        f &&
          (h.removeEventListener('orientationchange', C),
          h.addEventListener('orientationchange', C, n));
        k(w.id).onAdPlay(function () {
          M.adMode(!0);
          Qa(g.PLAYING);
          A();
        });
        k(w.id).onAdSkipped(function () {
          M.adMode(!1);
        });
        k(w.id).onAdComplete(function () {
          M.adMode(!1);
        });
        k(w.id).onAdError(function () {
          M.adMode(!1);
        });
        w.jwAddEventListener(e.JWPLAYER_PLAYER_READY, kb);
        w.jwAddEventListener(e.JWPLAYER_PLAYER_STATE, Oa);
        w.jwAddEventListener(e.JWPLAYER_MEDIA_ERROR, wb);
        w.jwAddEventListener(e.JWPLAYER_PLAYLIST_COMPLETE, cb);
        w.jwAddEventListener(e.JWPLAYER_PLAYLIST_ITEM, vb);
        w.jwAddEventListener(e.JWPLAYER_CAST_AVAILABLE, function () {
          Y() ? ka.forceControls(j) : ka.releaseControls();
        });
        w.jwAddEventListener(e.JWPLAYER_CAST_SESSION, function (a) {
          ca ||
            ((ca = new k.html5.castDisplay(w.id)),
            (ca.statusDelegate = function (a) {
              ca.setState(a.newstate);
            }));
          a.active
            ? (c.style(ta.element(), { display: 'none' }),
              ka.forceControls(j),
              ca.setState('connecting').setName(a.deviceName).show(),
              w.jwAddEventListener(e.JWPLAYER_PLAYER_STATE, ca.statusDelegate),
              w.jwAddEventListener(e.JWPLAYER_CAST_AD_CHANGED, W))
            : (w.jwRemoveEventListener(
                e.JWPLAYER_PLAYER_STATE,
                ca.statusDelegate,
              ),
              w.jwRemoveEventListener(e.JWPLAYER_CAST_AD_CHANGED, W),
              ca.hide(),
              M.adMode() && X(),
              c.style(ta.element(), { display: null }),
              Oa({ newstate: w.jwGetState() }),
              C());
        });
        Oa({ newstate: g.IDLE });
        f ||
          (qa.addEventListener('mouseout', t, n),
          qa.addEventListener('mousemove', L, n),
          a.isMSIE() &&
            (ba.addEventListener('mousemove', L, n),
            ba.addEventListener('click', S.clickHandler)));
        r(M);
        r(ea);
        r($);
        c('#' + N.id + '.' + v + ' .jwaspect', {
          'margin-top': l.aspectratio,
          display: p,
        });
        d = a.exists(l.aspectratio) ? parseFloat(l.aspectratio) : 100;
        q = l.playlistsize;
        c('#' + N.id + '.playlist-right .jwaspect', {
          'margin-bottom': -1 * q * (d / 100) + 'px',
        });
        c('#' + N.id + '.playlist-right .jwplaylistcontainer', {
          width: q + 'px',
          right: 0,
          top: 0,
          height: '100%',
        });
        c('#' + N.id + '.playlist-bottom .jwaspect', {
          'padding-bottom': q + 'px',
        });
        c('#' + N.id + '.playlist-bottom .jwplaylistcontainer', {
          width: '100%',
          height: q + 'px',
          bottom: 0,
        });
        c('#' + N.id + '.playlist-right .jwmain', { right: q + 'px' });
        c('#' + N.id + '.playlist-bottom .jwmain', { bottom: q + 'px' });
        setTimeout(function () {
          O(l.width, l.height);
        }, 0);
      }
    };
    var wa = (this.fullscreen = function (b) {
      a.exists(b) || (b = !l.fullscreen);
      b = !!b;
      b !== l.fullscreen &&
        (Ia
          ? (b ? Pa.apply(N) : fa.apply(s), ja(N, b))
          : l.getVideo().setFullScreen(b));
    });
    this.resize = function (a, b) {
      O(a, b, j);
      C();
    };
    this.resizeMedia = Z;
    var La = (this.completeSetup = function () {
        c.style(N, { opacity: 1 });
        h.onbeforeunload = function () {
          l.getVideo().isCaster || w.jwStop();
        };
      }),
      eb;
    this.setupInstream = function (a, b, d, e) {
      c.unblock();
      Xa(Wa('jwinstream'), j);
      Xa(Wa('jwcontrols'), n);
      va.appendChild(a);
      Na = b;
      Ua = d;
      Ga = e;
      Oa({ newstate: g.PLAYING });
      T = j;
      va.addEventListener('mousemove', L);
      va.addEventListener('mouseout', t);
    };
    this.destroyInstream = function () {
      c.unblock();
      Xa(Wa('jwinstream'), n);
      Xa(Wa('jwcontrols'), j);
      va.innerHTML = '';
      va.removeEventListener('mousemove', L);
      va.removeEventListener('mouseout', t);
      T = n;
    };
    this.setupError = function (a) {
      F = j;
      k.embed.errorScreen(N, a, l);
      La();
    };
    this.addButton = function (a, b, c, d) {
      ea && (ea.addButton(a, b, c, d), w.jwGetState() == g.IDLE && Q());
    };
    this.removeButton = function (a) {
      ea && ea.removeButton(a);
    };
    this.setControls = function (a) {
      var b = l.controls,
        c = !!a;
      l.controls = c;
      c != b &&
        (T
          ? a
            ? (Na.show(), Ua.show())
            : (Na.hide(), Ua.hide())
          : c
          ? Oa({ newstate: w.jwGetState() })
          : (Ca(), S && S.hide()),
        ka.sendEvent(e.JWPLAYER_CONTROLS, { controls: c }));
    };
    this.forceControls = function (a) {
      R = !!a;
      a ? Da() : Ca();
    };
    this.releaseControls = function () {
      R = null;
      Qa(w.jwGetState());
    };
    this.addCues = function (a) {
      M && M.addCues(a);
    };
    this.forceState = function (a) {
      S.forceState(a);
    };
    this.releaseState = function () {
      S.releaseState(w.jwGetState());
    };
    this.getSafeRegion = function () {
      var a = { x: 0, y: 0, width: 0, height: 0 };
      if (!l.controls) return a;
      M.showTemp();
      ea.showTemp();
      var b = d(Aa),
        c = b.top,
        e = T
          ? d(s.getElementById(w.id + '_instream_controlbar'))
          : d(M.element()),
        f = T ? n : 0 < ea.numButtons(),
        g = 0 === $.position().indexOf('top'),
        h = d($.element());
      f && ((f = d(ea.element())), (a.y = Math.max(0, f.bottom - c)));
      g && (a.y = Math.max(a.y, h.bottom - c));
      a.width = b.width;
      a.height = e.height ? (g ? e.top : h.top) - c - a.y : b.height - a.y;
      M.hideTemp();
      ea.hideTemp();
      return a;
    };
    this.destroy = function () {
      h.removeEventListener('resize', C);
      h.removeEventListener('orientationchange', C);
      for (var a = u.length; a--; ) s.removeEventListener(u[a], ha, n);
      l.removeEventListener('fullscreenchange', ha);
      N.removeEventListener('keydown', q, n);
      ra && ra.destroy();
      ca &&
        (w.jwRemoveEventListener(e.JWPLAYER_PLAYER_STATE, ca.statusDelegate),
        ca.destroy(),
        (ca = null));
      qa &&
        (qa.removeEventListener('mousemove', L),
        qa.removeEventListener('mouseout', t));
      ba &&
        (ba.removeEventListener('mousemove', L),
        ba.removeEventListener('click', S.clickHandler));
      T && this.destroyInstream();
    };
    N = G('div', 'jwplayer playlist-' + l.playlistposition);
    N.id = w.id;
    N.tabIndex = 0;
    N.onmousedown = function () {
      Ha = !0;
      ka.sendEvent(e.JWPLAYER_VIEW_TAB_FOCUS, { hasFocus: !1 });
    };
    N.onfocusin = H;
    N.addEventListener('focus', H);
    N.onfocusout = J;
    N.addEventListener('blur', J);
    N.addEventListener('keydown', q);
    Pa =
      N.requestFullscreen ||
      N.requestFullScreen ||
      N.webkitRequestFullscreen ||
      N.webkitRequestFullScreen ||
      N.webkitEnterFullscreen ||
      N.webkitEnterFullScreen ||
      N.mozRequestFullScreen ||
      N.msRequestFullscreen;
    fa =
      s.exitFullscreen ||
      s.cancelFullScreen ||
      s.webkitExitFullscreen ||
      s.webkitCancelFullScreen ||
      s.mozCancelFullScreen ||
      s.msExitFullscreen;
    Ia = Pa && fa;
    l.aspectratio &&
      (c.style(N, { display: 'inline-block' }),
      (N.className = N.className.replace('jwplayer', 'jwplayer ' + v)));
    O(l.width, l.height);
    var Ya = s.getElementById(w.id);
    Ya.parentNode.replaceChild(N, Ya);
  };
  c('.jwplayer', {
    position: 'relative',
    display: 'block',
    opacity: 0,
    'min-height': 0,
    '-webkit-transition': 'opacity .25s ease',
    '-moz-transition': 'opacity .25s ease',
    '-o-transition': 'opacity .25s ease',
  });
  c('.jwmain', {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    '-webkit-transition': 'opacity .25s ease',
    '-moz-transition': 'opacity .25s ease',
    '-o-transition': 'opacity .25s ease',
  });
  c('.jwvideo, .jwcontrols', {
    position: 'absolute',
    height: '100%',
    width: '100%',
    '-webkit-transition': 'opacity .25s ease',
    '-moz-transition': 'opacity .25s ease',
    '-o-transition': 'opacity .25s ease',
  });
  c('.jwvideo', { overflow: B, visibility: B, opacity: 0 });
  c('.jwvideo video', {
    background: 'transparent',
    height: '100%',
    width: '100%',
    position: 'absolute',
    margin: 'auto',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
  });
  c('.jwplaylistcontainer', {
    position: 'absolute',
    height: '100%',
    width: '100%',
    display: y,
  });
  c('.jwinstream', {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    display: 'none',
  });
  c('.jwaspect', { display: 'none' });
  c('.jwplayer.' + v, { height: 'auto' });
  c(
    '.jwplayer.jwfullscreen',
    {
      width: '100%',
      height: '100%',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      'z-index': 1e3,
      margin: 0,
      position: 'fixed',
    },
    j,
  );
  c('.jwplayer.jwfullscreen.jw-user-inactive', {
    cursor: 'none',
    '-webkit-cursor-visibility': 'auto-hide',
  });
  c(
    '.jwplayer.jwfullscreen .jwmain',
    { left: 0, right: 0, top: 0, bottom: 0 },
    j,
  );
  c('.jwplayer.jwfullscreen .jwplaylistcontainer', { display: y }, j);
  c('.jwplayer .jwuniform', { 'background-size': 'contain !important' });
  c('.jwplayer .jwfill', {
    'background-size': 'cover !important',
    'background-position': 'center',
  });
  c('.jwplayer .jwexactfit', { 'background-size': '100% 100% !important' });
})(window);
(function (h, k) {
  function b(a) {
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA' + s[a];
  }
  function a(a, b) {
    var c = k.createElement(a);
    b && e(c, b);
    return c;
  }
  function e(a, b) {
    b.join || (b = [b]);
    for (var c = 0; c < b.length; c++) b[c] && (b[c] = 'jwcast-' + b[c]);
    a.className = b.join(' ');
  }
  function g(a, b) {
    b.join || (b = [b]);
    for (var c = 0; c < b.length; c++) a.appendChild(b[c]);
  }
  var c = h.utils,
    d = h.html5,
    f = h.events,
    D = f.state,
    m = c.css,
    s = {
      wheel:
        'DgAAAA4CAYAAACohjseAAACiUlEQVR42u3aP2sTYRzAcZ87Md6mhE5GhRqli0NC22yNKO1iaStSY+ggdKggal6BDXRoUuwbEG1LpE4B30LAxEGbKYgO7SVoUhJD04hOusRv4ZlCwP5LevfDgw9kCnzD5Z4/95xqtVqideNLTQzjKV4gCxtNtNwaqBBGCg3UkcYz3EUIV+F1W6AHj7CFb1hAEIbbb1GFByjjAyZgSvkPXkMGW7gt7SETwQ8swpL0FFV4jjpuShsmTiOFz7gobRxUWEceXokDfQKf0CdxJhNFFT6JU7Ur2MUtiXNRhXdYlDrZnkERZyUGerCNcanLpYfISV0PGtjEpNTAGyjBkBq4ggWpWxYmGghIDRzEDgypgTG8lbyrtoZ5yYFZ3JccWMKg5MCfGJAcuHf5/ge6xwX8lnyLDmCn/SEzJChwCKX2YSIqKDCKbPtAHxcUGAdNOhBPkBYUmAZNOhDXUYMSEKdQBU06EAp1BAUEBnWLgg4EXmJJQOASXnVa0YdRcfma0NAN4U6BCpu44+LASd2g0BYIPEbexYHvdQOfOwdaqLh063AcFVj73bq3XBRnoYiZ/b58ySDposAkMlD/DNT8aGLUBXGjaMJ/0Beg9/Dd4etEH2qIHOUVdgHnHRh3DgUkjnoIIYUNh0V6sYHXUIcO1Eyso4BLDoi7jC94A/O4DgIZWEYdYycYN4YalmF04yjXNJpIwOrxOJdAE9PdPoznRxZFTPUgbgI2svD38jjlLMrI61DjmFcFU/iICmZhnMSB2DOYg41tJBGAOuSPFkASZdiYg8cpR5pHsIIGqkgjjghC6Eef1o8QIphHGlU0sIYRGE4/lB7DKnL4il/Yu/5gFzZyWEUMwzC7sXUv2l9q1CPRZSGkLwAAAABJRU5ErkJggg\x3d\x3d',
      display:
        'UAAAAC4AQMAAACo6KcpAAAABlBMVEV6enp6enqEWMsmAAAAAXRSTlMAQObYZgAAAEdJREFUeF7t2bEJACAMRcGAg7j/Fo6VTkvbIKSRe/XBH+DHLlaHK0qN7yAIgiAIgiAIgiAIgiAIgiAIgiAIgg0PZHfzbuUjPCPnO5qQcE/AAAAAAElFTkSuQmCC',
      pause:
        'CoAAAA2CAQAAAAb3sMwAAAAMElEQVR4Ae3MMQEAMAzDsIY/6AxB9/aRfyvt7GX2Ph8UCoVCoVAo9AiFQqFQKBQKfdYvoctOjDeGAAAAAElFTkSuQmCC',
      play:
        'DYAAAA2BAMAAAB+a3fuAAAAFVBMVEX///////////////////////////9nSIHRAAAABnRSTlMAP79AwMFfxd6iAAAAX0lEQVR4Xn3JQQGAABAEoaliFiPYYftHMMHBl55uQw455JBDDjnkkEMOOeSQQw455JBDDjnkkEMOOeSQQ+5O3HffW6hQoUKFChUqVKhQoUKFChUqVKhQoUKFChUqVKgfWHsiYI6VycIAAAAASUVORK5CYII\x3d',
      replay:
        'DQAAAA8CAYAAAApK5mGAAADkklEQVRoBd3BW2iVBRwA8P/cWHMsv9QilLCITLCU0khpST6JCEXrQbKMCgrKFwsfZq/LMnRRIdkFvBQUvmShgg9iV02zB7FScyWlqNHNqbCJ7PKLkFHp952dnZ3tfOv3ixgGSLAVt8b/ARIX9WADJsVIhsR/daIV42MkQiJdO5ZjdIwkSBR2Ek+gJkYCJIpzEE2Rd0gMzB7MibxCojRbcEtUGsZgJu7HYixVuh6sx6QYLrgSD+Fd/GhodKIV42Ko4B68h07Dpx3NGB3lgnnYpbJOYFoMBm7ANpW3D3NjMPAgzqqsn7EIVVEqVGOtymrHMtTGYKAeWxSvB3vxIh7ANIzFNUpzAa0YF4OFWuxUnFNYjkmRAomB6cX7uDHKAdX4QP/asRRXRAFIFO8TzI5yQov+bcO1UQQk+ncITVFumIce2XqxHFVRJCSy/YolqIlyQwOOy9aNR2KAkLhcJ1agIYYKVsvWi6eiBEj8owfrMDEGAVVYiMcjDa7HBdlejhIhcdF2TI9BQiP2uOgsro5LYa1sX6M2SoQ6zItBwmRsdrnn498wDuel68aMqDBMQZd0v6Mu+mCJbBsiJ7BdtkXRB7ul68HNkRNolO3D+BvGoke6HZEz+Fa6c6gJNMn2WOQMmmW7K/CSbBMiZ3CbbM8EPpKuLXIIo3BWujcCh6TbEjmFr6TbGfhDulcip7BJugOBbulaIqfwlnRHQ7bnIqewVrpjgU7pVkZOYaN0hwOnpFsfOYWt0u0LfCnd55FT+EG6zYEN0p1BdeQMEnRLtzKwTLZZkTO4V7bFgTtka4mcwTrZrgtU47R0P6E6cgINOCfdkeiDjbItipzAs7K1Rh/Mle0gaqLC0IBTsk2PPhiFI7ItiwrDKtl2xaXwqGwdmBoVgrvRJdv8uBRq0CbbISQxzDARJ2TbG1kwX2GfoT6GCa7CN7J1Y0YUgk0K+wJjY4hhAg4o7LXoD8bjuMIOY1oMETTiuMIOoj6KgTvRobDzaEZtlAnq8QK6FHYGU2IgcB+69e97LEJNlAh1eBrH9K8DjVEKPIxuxTmJVZiFmugHajEHa/Cb4nRiQQwGmtBpYM7hU7yNFjSjGSuwDrvRYWD+RGOUA25Hm8rZj8lRThiDd9Br+PTgVdTFUMFcfGfo7cHMGA4YhYXYr/x2YQGqohIwG2vwi9Idw2pMjzzBVCzBm/gYR3EaXbiA02jDDryOJ3FTlNFfAO8ENqnn13UAAAAASUVORK5CYII\x3d',
    },
    v = !1,
    u = 316 / 176;
  d.castDisplay = function (j) {
    function s() {
      if (A) {
        var a = A.element();
        a.parentNode && a.parentNode.removeChild(a);
        A.resetEventListeners();
        A = null;
      }
    }
    function y() {
      I && (I.parentNode && I.parentNode.removeChild(I), (I = null));
    }
    function p() {
      L && (L.parentNode && L.parentNode.removeChild(L), (L = null));
    }
    v ||
      (m('.jwplayer .jwcast-display', {
        display: 'none',
        position: 'absolute',
        width: '100%',
        height: '100%',
        'background-repeat': 'no-repeat',
        'background-size': 'auto',
        'background-position': '50% 50%',
        'background-image': b('display'),
      }),
      m('.jwplayer .jwcast-label', {
        position: 'absolute',
        left: 10,
        right: 10,
        bottom: '50%',
        'margin-bottom': 100,
        'text-align': 'center',
      }),
      m('.jwplayer .jwcast-label span', {
        'font-family':
          '"Karbon", "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
        'font-size': 20,
        'font-weight': 300,
        color: '#7a7a7a',
      }),
      m('.jwplayer span.jwcast-name', { color: '#ccc' }),
      m('.jwcast-button', {
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: 0,
        'background-repeat': 'no-repeat',
        'background-size': 'auto',
        'background-position': '50% 50%',
      }),
      m('.jwcast-wheel', { 'background-image': b('wheel') }),
      m('.jwcast-pause', { 'background-image': b('pause') }),
      m('.jwcast-play', { 'background-image': b('play') }),
      m('.jwcast-replay', { 'background-image': b('replay') }),
      m('.jwcast-paused .jwcast-play', { opacity: 1 }),
      m('.jwcast-playing .jwcast-pause', { opacity: 1 }),
      m('.jwcast-idle .jwcast-replay', { opacity: 1 }),
      c.cssKeyframes(
        'spin',
        'from {transform: rotate(0deg);} to {transform: rotate(360deg);}',
      ),
      m('.jwcast-connecting .jwcast-wheel, .jwcast-buffering .jwcast-wheel', {
        opacity: 1,
        '-webkit-animation': 'spin 1.5s linear infinite',
        animation: 'spin 1.5s linear infinite',
      }),
      m('.jwcast-companion', {
        position: 'absolute',
        'background-position': '50% 50%',
        'background-size': '316px 176px',
        'background-repeat': 'no-repeat',
        top: 0,
        left: 0,
        right: 0,
        bottom: 4,
      }),
      m('.jwplayer .jwcast-click-label', {
        'font-family':
          '"Karbon", "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
        'font-size': 14,
        'font-weight': 300,
        'text-align': 'center',
        position: 'absolute',
        left: 10,
        right: 10,
        top: '50%',
        color: '#ccc',
        'margin-top': 100,
        '-webkit-user-select': 'none',
        'user-select': 'none',
        cursor: 'pointer',
      }),
      m('.jwcast-paused .jwcast-click-label', {
        color: '#7a7a7a',
        cursor: 'default',
      }),
      (v = !0));
    var w = k.getElementById(j + '_display_button'),
      l = a('div', 'display'),
      E = a('div', ['pause', 'button']),
      z = a('div', ['play', 'button']),
      q = a('div', ['replay', 'button']),
      H = a('div', ['wheel', 'button']),
      J = a('div', 'label'),
      C = a('span'),
      r = a('span', 'name'),
      K = '#' + j + '_display.jwdisplay',
      t = -1,
      G = null,
      A = null,
      L = null,
      I = null;
    g(l, [H, E, z, q, J]);
    g(J, [C, r]);
    w.parentNode.insertBefore(l, w);
    this.statusDelegate = null;
    this.setName = function (a) {
      r.innerText = a || 'Google Cast';
      return this;
    };
    this.setState = function (a) {
      var b = 'Casting on ';
      if (null === G)
        if ('connecting' === a) b = 'Connecting to ';
        else if (a !== D.IDLE) {
          var c = h(j).getPlaylistItem().title || '';
          c && (b = b.replace('on', c + ' on'));
        }
      C.innerText = b;
      clearTimeout(t);
      a === D.IDLE &&
        ((t = setTimeout(function () {
          e(l, ['display', 'idle']);
        }, 3e3)),
        (a = ''));
      e(l, ['display', (a || '').toLowerCase()]);
      return this;
    };
    this.show = function () {
      m(K + ' .jwpreview', {
        'background-size': '316px 176px !important',
        opacity: 0.6,
        'margin-top': -2,
      });
      m(K + ' .jwdisplayIcon', { display: 'none !important' });
      m.style(l, { display: 'block' });
      return this;
    };
    this.hide = function () {
      c.clearCss(K + ' .jwpreview');
      m(K + ' .jwdisplayIcon', { display: '' });
      m.style(l, { display: 'none' });
      return this;
    };
    this.setSkipoffset = function (a, b) {
      if (null === A) {
        var e = k.getElementById(j + '_controlbar'),
          g = 10 + c.bounds(l).bottom - c.bounds(e).top;
        A = new d.adskipbutton(j, g | 0, a.skipMessage, a.skipText);
        A.addEventListener(f.JWPLAYER_AD_SKIPPED, function () {
          b(a);
        });
        A.reset(a.skipoffset || -1);
        A.show();
        e.parentNode.insertBefore(A.element(), e);
      } else A.reset(a.skipoffset || -1);
    };
    this.setCompanions = function (b) {
      var c,
        d,
        e,
        f = Number.MAX_VALUE,
        h = null;
      for (d = b.length; d--; )
        if (((c = b[d]), c.width && c.height && c.source))
          switch (c.type) {
            case 'html':
            case 'iframe':
            case 'application/x-shockwave-flash':
              break;
            default:
              (e = Math.abs(c.width / c.height - u)),
                e < f && ((f = e), 0.75 > e && (h = c));
          }
      (b = h)
        ? (null === L && ((L = a('div', 'companion')), g(l, L)),
          b.width / b.height > u
            ? ((c = 316), (d = (b.height * c) / b.width))
            : ((d = 176), (c = (b.width * d) / b.height)),
          m.style(L, {
            'background-image': b.source,
            'background-size': c + 'px ' + d + 'px',
          }))
        : p();
    };
    this.adChanged = function (b) {
      if (b.complete) A && A.reset(-1), (G = null);
      else {
        A &&
          (void 0 === b.skipoffset
            ? s()
            : (b.position || b.duration) &&
              A.updateSkipTime(b.position | 0, b.duration | 0));
        var c = b.tag + b.sequence;
        c !== G &&
          (m(K + ' .jwpreview', { opacity: 0 }),
          b.companions ? this.setCompanions(b.companions) : p(),
          b.clickthrough
            ? null === I &&
              ((I = a('div', 'click-label')),
              (I.innerText = 'Click here to learn more \x3e'),
              g(l, I))
            : y(),
          (G = c),
          this.setState(b.newstate));
      }
    };
    this.adsEnded = function () {
      s();
      p();
      y();
      m(K + ' .jwpreview', { opacity: 0.6 });
      G = null;
    };
    this.destroy = function () {
      this.hide();
      l.parentNode && l.parentNode.removeChild(l);
    };
  };
  var j = '.jwcast button';
  m(j, { opacity: 1 });
  m(j + ':hover', { opacity: 0.75 });
  j += '.off';
  m(j, { opacity: 0.75 });
  m(j + ':hover', { opacity: 1 });
})(jwplayer, document);
(function (h) {
  var k = jwplayer.utils.extend,
    b = h.logo;
  b.defaults.prefix = '';
  b.defaults.file =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHoAAAAyCAMAAACkjD/XAAACnVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJCQkSEhIAAAAaGhoAAAAiIiIrKysAAAAxMTEAAAA4ODg+Pj4AAABEREQAAABJSUkAAABOTk5TU1NXV1dcXFxiYmJmZmZqamptbW1xcXF0dHR3d3d9fX2AgICHh4eKioqMjIyOjo6QkJCSkpKUlJSWlpaYmJidnZ2enp6ioqKjo6OlpaWmpqanp6epqamqqqqurq6vr6+wsLCxsbG0tLS1tbW2tra3t7e6urq7u7u8vLy9vb2+vr6/v7/AwMDCwsLFxcXFxcXHx8fIyMjJycnKysrNzc3Ozs7Ozs7Pz8/Pz8/Q0NDR0dHR0dHS0tLU1NTV1dXW1tbW1tbW1tbX19fX19fa2trb29vb29vc3Nzc3Nzf39/f39/f39/f39/g4ODh4eHj4+Pj4+Pk5OTk5OTk5OTk5OTl5eXn5+fn5+fn5+fn5+fn5+fo6Ojo6Ojq6urq6urq6urr6+vr6+vr6+vt7e3t7e3t7e3t7e3u7u7u7u7v7+/v7+/w8PDw8PDw8PDw8PDy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL09PT09PT09PT09PT09PT09PT09PT29vb29vb29vb29vb29vb29vb29vb29vb39/f39/f39/f39/f39/f4+Pj4+Pj4+Pj5+fn5+fn5+fn5+fn5+fn5+fn5+fn6+vr6+vr6+vr6+vr6+vr6+vr8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz9/f39/f39/f39/f39/f39/f39/f39/f39/f3+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7///////////////9kpi5JAAAA33RSTlMAAQIDBAUGBwgJCgsMDQ4PEBESExQVFhYWFxcYGBgZGRoaGhsbHBwdHR4eHx8gISIiIyQmJicoKSoqKywtLi4uMDEyMjM0NTU2Njc5Ojo7Ozw9Pj5AQUJCQ0ZGSElKSktMTU5PUFFRUlRVVlZXWFpbXV5eX2BhYmVmZ2hpamtsbW5vcHFyc3R2d3h5enx9fn+BgoKDhIWGiYmKi4yNjo+QkZKTlJWWl5eYmZqbnJ2enp+goaKkpaamp6ipqqusra6vsLKzs7W2t7i5uru8vb6/wMHCwsPExcbHyMnJysvMVK8y+QAAB5FJREFUeNrFmP2f3EQdx8kmm2yy2WQzmZkjl3bJ2Rb12mtp8SiKiBUUxVKFVisIihV62CKCIoK0UvVK1bP07mitBeVJUVso0Duw1Xo9ET0f6JN47bV3u9+/xe83kyzr0+vlL7t8Xq9ubpLpvHfm+7i54P+UVkBp2gWdFpGNYtFA+NtALpYcxzZ1rSM0TSvgv5xse0wwu1joxDYLulE0dKTTSLcqfOvMQ1WzoHXAtCadsGXqBCsUnWDxNBzmlq51wLSuz0LmOcTWClZFfA1ghLUbrUwbdq396kAvK5s6HoFdlb8FuLONB66RlGnD5S8BwKkNoVMsFEw3XIOj97hmoX2updP5kml7jgLp/Ec8yzBKntwDMCnwa7TPtUrkWLrliW2gtC+0TdNhvdMAu1hJ19plYNcP0LGKiJp/HJTeEI5V8sjJ4PZ2mTp1rb7Pf5C5JbvCN0Cuha7jpE5WX9oeU6us8YlTUH8grFQC+QzkWuKVvdTJXuWO0Z5Nk2tNkWNdzgLed+4tdNWrkpPBI20ytVYwK+LrQLpPcHk3vIVm1ZCcDD7jt8fUGmYNoeLpJzKW+1vQYSjJyc72ZKbWSOqqhpn+99r/rn99WDDLbJViHZbJirkWtJDkZPArbhta2jFg7LdKV1ID9aWaz5CTzTD0pvB2aypB9xYPKtaUXEC7bKKjeA1dHyJTU+xbFgY/RiAKP2lYsm28RaJmAtfTs6c4xP9g0gycUqKpeDGLegZPl3MqTL6oWCdl9EIrOol20/U6zyzgVJzpeV6l7Dhl18VP1/N8v1r1vQoNSziH1nPKKMdBChbAiprheygfL65tZmxazguYXDoL8BcyqlhRb0W/M3Wy412YRTUd7SKEFIKzIBQ8DBhHewgSjkLB7GwS54wxwcoORqYQ+QyhFGA9VIYxnfCKq2VtE3k3wTB1taLx+FVCNTRyxnU4YQ/8WEY9M7PvkvJHsEsAam5srRRwH0YBhml14Zv7pRz62+LAD/jWE0vHINU6OUGXyc0Mt5GiLW/+6blV8eO4tY8B6t3qvBsZOnUy+HJgFaiuMELfhQ6RrAe4JZGvwxcFPLx69YZDZ1ciOrB03ayEd52vr0x6/zokhbxs+p5o7Oc3kfrkxFOrV392d+NWFaeaXvK652Cw+xTAo9cS5ar0vKcfy9BrgNRfMVN0SOh+gPfWtgN8L7kM6pcI2FSrJUtm7kc0KxlF2xcHd/1xWxxvmv1QLB9/5cJobDiKIxklcmI4ShJ5eJ/qOTSqU6/BBC4JN6boQSAN71Doi1Mnm+B0Rjlavgabo/GZ2V/LL8FRSehkkfzzYIouoqXf31jz3de7kq5DB6JP1a+vSUQnOXrRoujpn2XogumJpwCeBfhDV4qeAdK1QwqdOhkMqdAyyyk6HoHR3tmD4/UlI/DDBNFxHK1tDBDaNrHODU7KDzTW16Lr6nccHZGxHNt3Jao/RrSU8pPTeX+JPYj4NpAGkxsg16FoWP1xP5Bu8UwdYxSXJXRyJ0zeCtsegdsm4QsLBBwcHf3l+fF5hHbscnDh1LeSaGwvModnTl7ChVRuNiblxIkjR6bq+9+R9RzkO7cBadWCdZBroDaq/jgDqHMLMYtSr8jkpwl9aaOxF9bdDHsb9T5Ev/rkk6N398SIDj3X5zfDzi1bDpxdHNWWwcOchS27funeR+EOyTI0RcyKLIM20VPzyOObeh4LJsZ/hYnaRpgRsTwG9TPzLz5XhyOSDlzykDEKLsEYl08cG0W9eW+U4B1eZZmtY7J13PXCeHeg0MrPjlH8yLiJ/mYtfqIFvQVNTaez/cMrfwHHpJC7APZH0csAP5ARokPPwXyIoEjKaOnM7UIIOfKKrJEJvEAguhZHUY1sHb3vH1tCxyS0OvGtAL+/iMubQOlMXyKfA6U8i+I0PqWyecA3AmyVEmPhczxEdBUbOKwCsHsAtfNUDyZNdiNcLQld8cTYgQHScjExjNPvOf9RSsrZtt3uB3f2s0Dku35MyiY6z6LYjbMdx+HvO7pd11/egBtCvh7mFvs+P70Rl8L0yU8r7WROyXb5b77Dxemv+I7L82wmxoeY53U9+/K8HE1ZvBq4eGQfh1SNa0Keo5tZVCXwXs7KluUwIZjrMsrHTsB95f4B50JwztGURtHywsBjvGphtIUiFeb9Kn4pjzHXUOhmlXPI3Ug/5QH6BjS1uWpRRdLNku3YWPNw4RKVSSqfpKLq3k3bIZXMvFha+NjQqXqlhYxKa9EgFJGVqKCrqD2ZloJrql7Qgq4vw9DKfn0ahp73B+ln3hPQY/xKJEO1CC2P6T49UOP/fD+R5qphSBvAslttQb8YZr1os7/5ry0P8VDNoZK6T8pnZpdW4bb9ZWPQ2NPtlhxf/A5yPUApt+0/MP2uqy5nLkaKLyZycuOKCp13u9mWXXasol4staAPYyprN1p5CvkR1nD5pxz9jQDPu1Pvbii3yklQmr2U/LtDUr9Fngelp0NqwDsmirPtoLRWJdxOiQrp9Yr8XGiTk3XyxF2eFuw3+ju5aRJl1Yu+f+LMM1eiexc6/lK0QuWpYhkd3XT+UsfOXhd2WKpO6W/TO3BUO8H/BB7RwuB6W7b7AAAAAElFTkSuQmCC';
  h.logo = function (a, e) {
    'free' == a.edition()
      ? (e = null)
      : ((b.defaults.file = ''), (b.defaults.prefix = ''));
    k(this, new b(a, e));
  };
})(jwplayer.html5);
(function (h) {
  var k = h.html5,
    b = k.model;
  k.model = function (a, e) {
    var g = new h.utils.key(a.key),
      c = new b(a, e),
      d = c.componentConfig;
    c.edition = function () {
      return g.edition();
    };
    c.componentConfig = function (a) {
      return 'logo' == a ? c.logo : d(a);
    };
    return c;
  };
})(jwplayer);
(function (h) {
  var k = h.html5,
    b = k.player;
  k.player = function (a) {
    a = new b(a);
    var e;
    e = a._model.edition();
    if ('enterprise' === e || 'ads' === e)
      (e = new h.cast.controller(a, a._model)),
        (a.jwStartCasting = e.startCasting),
        (a.jwStopCasting = e.stopCasting);
    return a;
  };
  b.prototype.edition = function () {
    return this._model.edition();
  };
})(jwplayer);
(function (h) {
  var k = jwplayer.utils.extend,
    b = h.rightclick;
  h.rightclick = function (a, e) {
    if ('free' == a.edition())
      (e.aboutlink =
        'http://www.longtailvideo.com/jwpabout/?a\x3dr\x26v\x3d' +
        h.version +
        '\x26m\x3dh\x26e\x3df'),
        delete e.abouttext;
    else {
      if (!e.aboutlink) {
        var g =
            'http://www.longtailvideo.com/jwpabout/?a\x3dr\x26v\x3d' +
            h.version +
            '\x26m\x3dh\x26e\x3d',
          c = a.edition();
        e.aboutlink =
          g +
          ('pro' == c
            ? 'p'
            : 'premium' == c
            ? 'r'
            : 'enterprise' == c
            ? 'e'
            : 'ads' == c
            ? 'a'
            : 'f');
      }
      e.abouttext
        ? (e.abouttext += ' ...')
        : ((g = a.edition()),
          (g = g.charAt(0).toUpperCase() + g.substr(1)),
          (e.abouttext =
            'About JW Player ' + h.version + ' (' + g + ' edition)'));
    }
    k(this, new b(a, e));
  };
})(jwplayer.html5);
(function (h) {
  var k = h.view;
  h.view = function (b, a) {
    var e = new k(b, a),
      g = e.setup,
      c = a.edition();
    e.setup = function (a) {
      g(a);
    };
    'invalid' == c &&
      e.setupError('Error setting up player: Invalid license key');
    return e;
  };
})(window.jwplayer.html5);
