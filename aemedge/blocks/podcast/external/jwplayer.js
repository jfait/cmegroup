'undefined' == typeof jwplayer &&
  ((jwplayer = function (h) {
    if (jwplayer.api) return jwplayer.api.selectPlayer(h);
  }),
  (jwplayer.version = '6.10.4906'),
  (jwplayer.vid = document.createElement('video')),
  (jwplayer.audio = document.createElement('audio')),
  (jwplayer.source = document.createElement('source')),
  (function (h) {
    function c(f) {
      return function () {
        return a(f);
      };
    }
    function l(f, a, k, m, d) {
      return function () {
        var b, c;
        if (d) k(f);
        else {
          try {
            if ((b = f.responseXML))
              if (
                ((c = b.firstChild),
                b.lastChild && 'parsererror' === b.lastChild.nodeName)
              ) {
                m && m('Invalid XML', a, f);
                return;
              }
          } catch (g) {}
          if (b && c) return k(f);
          (b = e.parseXML(f.responseText)) && b.firstChild
            ? ((f = e.extend({}, f, { responseXML: b })), k(f))
            : m && m(f.responseText ? 'Invalid XML' : a, a, f);
        }
      };
    }
    var j = document,
      g = window,
      b = navigator,
      e = (h.utils = {});
    e.exists = function (f) {
      switch (typeof f) {
        case 'string':
          return 0 < f.length;
        case 'object':
          return null !== f;
        case 'undefined':
          return !1;
      }
      return !0;
    };
    e.styleDimension = function (f) {
      return f + (0 < f.toString().indexOf('%') ? '' : 'px');
    };
    e.getAbsolutePath = function (f, a) {
      e.exists(a) || (a = j.location.href);
      if (e.exists(f)) {
        var k;
        if (e.exists(f)) {
          k = f.indexOf('://');
          var m = f.indexOf('?');
          k = 0 < k && (0 > m || m > k);
        } else k = void 0;
        if (k) return f;
        k = a.substring(0, a.indexOf('://') + 3);
        var m = a.substring(k.length, a.indexOf('/', k.length + 1)),
          b;
        0 === f.indexOf('/')
          ? (b = f.split('/'))
          : ((b = a.split('?')[0]),
            (b = b.substring(k.length + m.length + 1, b.lastIndexOf('/'))),
            (b = b.split('/').concat(f.split('/'))));
        for (var d = [], c = 0; c < b.length; c++)
          b[c] &&
            e.exists(b[c]) &&
            '.' != b[c] &&
            ('..' == b[c] ? d.pop() : d.push(b[c]));
        return k + m + '/' + d.join('/');
      }
    };
    e.extend = function () {
      var f = Array.prototype.slice.call(arguments, 0);
      if (1 < f.length) {
        for (
          var a = f[0],
            k = function (f, m) {
              void 0 !== m && null !== m && (a[f] = m);
            },
            m = 1;
          m < f.length;
          m++
        )
          e.foreach(f[m], k);
        return a;
      }
      return null;
    };
    var n = (window.console = window.console || { log: function () {} });
    e.log = function () {
      var f = Array.prototype.slice.call(arguments, 0);
      'object' === typeof n.log ? n.log(f) : n.log.apply(n, f);
    };
    var a = (e.userAgentMatch = function (f) {
      return null !== b.userAgent.toLowerCase().match(f);
    });
    e.isFF = c(/firefox/i);
    e.isChrome = c(/chrome/i);
    e.isIPod = c(/iP(hone|od)/i);
    e.isIPad = c(/iPad/i);
    e.isSafari602 = c(/Macintosh.*Mac OS X 10_8.*6\.0\.\d* Safari/i);
    e.isIETrident = function (f) {
      return f
        ? ((f = parseFloat(f).toFixed(1)),
          a(RegExp('trident/.+rv:\\s*' + f, 'i')))
        : a(/trident/i);
    };
    e.isMSIE = function (f) {
      return f
        ? ((f = parseFloat(f).toFixed(1)), a(RegExp('msie\\s*' + f, 'i')))
        : a(/msie/i);
    };
    e.isIE = function (f) {
      return f
        ? ((f = parseFloat(f).toFixed(1)),
          11 <= f ? e.isIETrident(f) : e.isMSIE(f))
        : e.isMSIE() || e.isIETrident();
    };
    e.isSafari = function () {
      return a(/safari/i) && !a(/chrome/i) && !a(/chromium/i) && !a(/android/i);
    };
    e.isIOS = function (f) {
      return f
        ? a(RegExp('iP(hone|ad|od).+\\sOS\\s' + f, 'i'))
        : a(/iP(hone|ad|od)/i);
    };
    e.isAndroidNative = function (f) {
      return e.isAndroid(f, !0);
    };
    e.isAndroid = function (f, b) {
      return b && a(/chrome\/[123456789]/i) && !a(/chrome\/18/)
        ? !1
        : f
        ? (e.isInt(f) && !/\./.test(f) && (f = '' + f + '.'),
          a(RegExp('Android\\s*' + f, 'i')))
        : a(/Android/i);
    };
    e.isMobile = function () {
      return e.isIOS() || e.isAndroid();
    };
    e.saveCookie = function (f, a) {
      j.cookie = 'jwplayer.' + f + '\x3d' + a + '; path\x3d/';
    };
    e.getCookies = function () {
      for (var f = {}, a = j.cookie.split('; '), k = 0; k < a.length; k++) {
        var m = a[k].split('\x3d');
        0 === m[0].indexOf('jwplayer.') &&
          (f[m[0].substring(9, m[0].length)] = m[1]);
      }
      return f;
    };
    e.isInt = function (f) {
      return 0 === f % 1;
    };
    e.typeOf = function (f) {
      var a = typeof f;
      return 'object' === a
        ? !f
          ? 'null'
          : f instanceof Array
          ? 'array'
          : a
        : a;
    };
    e.translateEventResponse = function (f, a) {
      var k = e.extend({}, a);
      if (f == h.events.JWPLAYER_FULLSCREEN && !k.fullscreen)
        (k.fullscreen = 'true' === k.message), delete k.message;
      else if ('object' == typeof k.data) {
        var m = k.data;
        delete k.data;
        k = e.extend(k, m);
      } else
        'object' == typeof k.metadata &&
          e.deepReplaceKeyName(
            k.metadata,
            ['__dot__', '__spc__', '__dsh__', '__default__'],
            ['.', ' ', '-', 'default'],
          );
      e.foreach(['position', 'duration', 'offset'], function (f, m) {
        k[m] && (k[m] = Math.round(1e3 * k[m]) / 1e3);
      });
      return k;
    };
    e.flashVersion = function () {
      if (e.isAndroid()) return 0;
      var f = b.plugins,
        a;
      try {
        if ('undefined' !== f && (a = f['Shockwave Flash']))
          return parseInt(a.description.replace(/\D+(\d+)\..*/, '$1'), 10);
      } catch (k) {}
      if ('undefined' != typeof g.ActiveXObject)
        try {
          if ((a = new g.ActiveXObject('ShockwaveFlash.ShockwaveFlash')))
            return parseInt(
              a.GetVariable('$version').split(' ')[1].split(',')[0],
              10,
            );
        } catch (m) {}
      return 0;
    };
    e.getScriptPath = function (f) {
      for (var a = j.getElementsByTagName('script'), k = 0; k < a.length; k++) {
        var m = a[k].src;
        if (m && 0 <= m.indexOf(f)) return m.substr(0, m.indexOf(f));
      }
      return '';
    };
    e.deepReplaceKeyName = function (f, a, k) {
      switch (h.utils.typeOf(f)) {
        case 'array':
          for (var m = 0; m < f.length; m++)
            f[m] = h.utils.deepReplaceKeyName(f[m], a, k);
          break;
        case 'object':
          e.foreach(f, function (m, b) {
            var e;
            if (a instanceof Array && k instanceof Array) {
              if (a.length != k.length) return;
              e = a;
            } else e = [a];
            for (var d = m, c = 0; c < e.length; c++)
              d = d.replace(RegExp(a[c], 'g'), k[c]);
            f[d] = h.utils.deepReplaceKeyName(b, a, k);
            m != d && delete f[m];
          });
      }
      return f;
    };
    var d = (e.pluginPathType = { ABSOLUTE: 0, RELATIVE: 1, CDN: 2 });
    e.getPluginPathType = function (f) {
      if ('string' == typeof f) {
        f = f.split('?')[0];
        var a = f.indexOf('://');
        if (0 < a) return d.ABSOLUTE;
        var k = f.indexOf('/');
        f = e.extension(f);
        return 0 > a && 0 > k && (!f || !isNaN(f)) ? d.CDN : d.RELATIVE;
      }
    };
    e.getPluginName = function (f) {
      return f.replace(/^(.*\/)?([^-]*)-?.*\.(swf|js)$/, '$2');
    };
    e.getPluginVersion = function (f) {
      return f.replace(/[^-]*-?([^\.]*).*$/, '$1');
    };
    e.isYouTube = function (f) {
      return /^(http|\/\/).*(youtube\.com|youtu\.be)\/.+/.test(f);
    };
    e.youTubeID = function (f) {
      try {
        return /v[=\/]([^?&]*)|youtu\.be\/([^?]*)|^([\w-]*)$/i
          .exec(f)
          .slice(1)
          .join('')
          .replace('?', '');
      } catch (a) {
        return '';
      }
    };
    e.isRtmp = function (f, a) {
      return 0 === f.indexOf('rtmp') || 'rtmp' == a;
    };
    e.foreach = function (f, a) {
      var k, m;
      for (k in f)
        'function' == e.typeOf(f.hasOwnProperty)
          ? f.hasOwnProperty(k) && ((m = f[k]), a(k, m))
          : ((m = f[k]), a(k, m));
    };
    e.isHTTPS = function () {
      return 0 === g.location.href.indexOf('https');
    };
    e.repo = function () {
      var f =
        'http://p.jwpcdn.com/' +
        h.version.split(/\W/).splice(0, 2).join('/') +
        '/';
      try {
        e.isHTTPS() && (f = f.replace('http://', 'https://ssl.'));
      } catch (a) {}
      return f;
    };
    e.versionCheck = function (f) {
      f = ('0' + f).split(/\W/);
      var a = h.version.split(/\W/),
        k = parseFloat(f[0]),
        m = parseFloat(a[0]);
      return k > m || (k === m && parseFloat('0' + f[1]) > parseFloat(a[1]))
        ? !1
        : !0;
    };
    e.ajax = function (f, a, k, m) {
      var b,
        d = !1;
      0 < f.indexOf('#') && (f = f.replace(/#.*$/, ''));
      if (
        f &&
        0 <= f.indexOf('://') &&
        f.split('/')[2] != g.location.href.split('/')[2] &&
        e.exists(g.XDomainRequest)
      )
        (b = new g.XDomainRequest()),
          (b.onload = l(b, f, a, k, m)),
          (b.ontimeout = b.onprogress = function () {}),
          (b.timeout = 5e3);
      else if (e.exists(g.XMLHttpRequest)) {
        var c = (b = new g.XMLHttpRequest()),
          j = f;
        b.onreadystatechange = function () {
          if (4 === c.readyState)
            switch (c.status) {
              case 200:
                l(c, j, a, k, m)();
                break;
              case 404:
                k('File not found', j, c);
            }
        };
      } else return k && k('', f, b), b;
      b.overrideMimeType && b.overrideMimeType('text/xml');
      var n = f,
        h = b;
      b.onerror = function () {
        k('Error loading file', n, h);
      };
      try {
        b.open('GET', f, !0);
      } catch (G) {
        d = !0;
      }
      setTimeout(function () {
        if (d) k && k(f, f, b);
        else
          try {
            b.send();
          } catch (a) {
            k && k(f, f, b);
          }
      }, 0);
      return b;
    };
    e.parseXML = function (a) {
      var b;
      try {
        if (g.DOMParser) {
          if (
            ((b = new g.DOMParser().parseFromString(a, 'text/xml')),
            b.childNodes &&
              b.childNodes.length &&
              'parsererror' == b.childNodes[0].firstChild.nodeName)
          )
            return;
        } else
          (b = new g.ActiveXObject('Microsoft.XMLDOM')),
            (b.async = 'false'),
            b.loadXML(a);
      } catch (k) {
        return;
      }
      return b;
    };
    e.filterPlaylist = function (a, b, k) {
      var m = [],
        d,
        c,
        g,
        j;
      for (d = 0; d < a.length; d++)
        if (
          ((c = e.extend({}, a[d])),
          (c.sources = e.filterSources(c.sources, !1, k)),
          0 < c.sources.length)
        ) {
          for (g = 0; g < c.sources.length; g++)
            (j = c.sources[g]), j.label || (j.label = g.toString());
          m.push(c);
        }
      if (b && 0 === m.length)
        for (d = 0; d < a.length; d++)
          if (
            ((c = e.extend({}, a[d])),
            (c.sources = e.filterSources(c.sources, !0, k)),
            0 < c.sources.length)
          ) {
            for (g = 0; g < c.sources.length; g++)
              (j = c.sources[g]), j.label || (j.label = g.toString());
            m.push(c);
          }
      return m;
    };
    e.between = function (a, b, d) {
      return Math.max(Math.min(a, d), b);
    };
    e.filterSources = function (a, b, d) {
      var m, c;
      if (a) {
        c = [];
        for (var g = 0; g < a.length; g++) {
          var j = e.extend({}, a[g]),
            n = j.file,
            l = j.type;
          n &&
            ((j.file = n = e.trim('' + n)),
            l ||
              ((l = e.extension(n)), (j.type = l = e.extensionmap.extType(l))),
            b
              ? h.embed.flashCanPlay(n, l) &&
                (m || (m = l), l == m && c.push(j))
              : h.embed.html5CanPlay(n, l, d) &&
                (m || (m = l), l == m && c.push(j)));
        }
      }
      return c;
    };
    e.canPlayHTML5 = function (a) {
      a = e.extensionmap.types[a];
      return !!a && !!h.vid.canPlayType && !!h.vid.canPlayType(a);
    };
    e.seconds = function (a) {
      a = a.replace(',', '.');
      var b = a.split(':'),
        d = 0;
      's' == a.slice(-1)
        ? (d = parseFloat(a))
        : 'm' == a.slice(-1)
        ? (d = 60 * parseFloat(a))
        : 'h' == a.slice(-1)
        ? (d = 3600 * parseFloat(a))
        : 1 < b.length
        ? ((d = parseFloat(b[b.length - 1])),
          (d += 60 * parseFloat(b[b.length - 2])),
          3 == b.length && (d += 3600 * parseFloat(b[b.length - 3])))
        : (d = parseFloat(a));
      return d;
    };
    e.serialize = function (a) {
      return null === a
        ? null
        : 'true' == a.toString().toLowerCase()
        ? !0
        : 'false' == a.toString().toLowerCase()
        ? !1
        : isNaN(Number(a)) || 5 < a.length || 0 === a.length
        ? a
        : Number(a);
    };
    e.addClass = function (a, b) {
      a.className = a.className + ' ' + b;
    };
    e.removeClass = function (a, b) {
      a.className = a.className.replace(RegExp(' *' + b, 'g'), ' ');
    };
  })(jwplayer),
  (function (h) {
    function c(a) {
      var b = document.createElement('style');
      a && b.appendChild(document.createTextNode(a));
      b.type = 'text/css';
      document.getElementsByTagName('head')[0].appendChild(b);
      return b;
    }
    function l(a, m, d) {
      if (!b.exists(m)) return '';
      d = d ? ' !important' : '';
      return 'string' === typeof m && isNaN(m)
        ? /png|gif|jpe?g/i.test(m) && 0 > m.indexOf('url')
          ? 'url(' + m + ')'
          : m + d
        : 0 === m || 'z-index' === a || 'opacity' === a
        ? '' + m + d
        : /color/i.test(a)
        ? '#' + b.pad(m.toString(16).replace(/^0x/i, ''), 6) + d
        : Math.ceil(m) + 'px' + d;
    }
    function j(a, b) {
      for (var d = 0; d < a.length; d++) {
        var f = a[d],
          c,
          e;
        if (void 0 !== f && null !== f)
          for (c in b) {
            e = c;
            e = e.split('-');
            for (var g = 1; g < e.length; g++)
              e[g] = e[g].charAt(0).toUpperCase() + e[g].slice(1);
            e = e.join('');
            f.style[e] !== b[c] && (f.style[e] = b[c]);
          }
      }
    }
    function g(b) {
      var m = e[b].sheet,
        d,
        c,
        g;
      if (m) {
        d = m.cssRules;
        c = f[b];
        g = b;
        var j = a[g];
        g += ' { ';
        for (var n in j) g += n + ': ' + j[n] + '; ';
        g += '}';
        if (void 0 !== c && c < d.length && d[c].selectorText === b) {
          if (g === d[c].cssText) return;
          m.deleteRule(c);
        } else (c = d.length), (f[b] = c);
        try {
          m.insertRule(g, c);
        } catch (h) {}
      }
    }
    var b = h.utils,
      e = {},
      n,
      a = {},
      d = null,
      f = {};
    b.cssKeyframes = function (a, b) {
      var d = e.keyframes;
      d || ((d = c()), (e.keyframes = d));
      var d = d.sheet,
        f = '@keyframes ' + a + ' { ' + b + ' }';
      try {
        d.insertRule(f, d.cssRules.length);
      } catch (g) {}
      f = f.replace(/(keyframes|transform)/g, '-webkit-$1');
      try {
        d.insertRule(f, d.cssRules.length);
      } catch (j) {}
    };
    var q = (b.css = function (b, m, f) {
      a[b] || (a[b] = {});
      var j = a[b];
      f = f || !1;
      var h = !1,
        q,
        p;
      for (q in m)
        (p = l(q, m[q], f)),
          '' !== p
            ? p !== j[q] && ((j[q] = p), (h = !0))
            : void 0 !== j[q] && (delete j[q], (h = !0));
      if (h) {
        if (!e[b]) {
          m =
            (n && n.sheet && n.sheet.cssRules && n.sheet.cssRules.length) || 0;
          if (!n || 5e4 < m) n = c();
          e[b] = n;
        }
        null !== d ? (d.styleSheets[b] = a[b]) : g(b);
      }
    });
    q.style = function (a, b, f) {
      if (!(void 0 === a || null === a)) {
        void 0 === a.length && (a = [a]);
        var c = {},
          e;
        for (e in b) c[e] = l(e, b[e]);
        if (null !== d && !f) {
          b = (b = a.__cssRules) || {};
          for (var g in c) b[g] = c[g];
          a.__cssRules = b;
          0 > d.elements.indexOf(a) && d.elements.push(a);
        } else j(a, c);
      }
    };
    q.block = function (a) {
      null === d && (d = { id: a, styleSheets: {}, elements: [] });
    };
    q.unblock = function (a) {
      if (d && (!a || d.id === a)) {
        for (var b in d.styleSheets) g(b);
        for (a = 0; a < d.elements.length; a++)
          (b = d.elements[a]), j(b, b.__cssRules);
        d = null;
      }
    };
    b.clearCss = function (b) {
      for (var d in a) 0 <= d.indexOf(b) && delete a[d];
      for (var c in e) 0 <= c.indexOf(b) && g(c);
    };
    b.transform = function (a, b) {
      var d = {};
      b = b || '';
      d.transform = b;
      d['-webkit-transform'] = b;
      d['-ms-transform'] = b;
      d['-moz-transform'] = b;
      d['-o-transform'] = b;
      'string' === typeof a ? q(a, d) : q.style(a, d);
    };
    b.dragStyle = function (a, b) {
      q(a, {
        '-webkit-user-select': b,
        '-moz-user-select': b,
        '-ms-user-select': b,
        '-webkit-user-drag': b,
        'user-select': b,
        'user-drag': b,
      });
    };
    b.transitionStyle = function (a, b) {
      navigator.userAgent.match(/5\.\d(\.\d)? safari/i) ||
        q(a, {
          '-webkit-transition': b,
          '-moz-transition': b,
          '-o-transition': b,
          transition: b,
        });
    };
    b.rotate = function (a, d) {
      b.transform(a, 'rotate(' + d + 'deg)');
    };
    b.rgbHex = function (a) {
      a = String(a).replace('#', '');
      3 === a.length && (a = a[0] + a[0] + a[1] + a[1] + a[2] + a[2]);
      return '#' + a.substr(-6);
    };
    b.hexToRgba = function (a, b) {
      var d = 'rgb',
        c = [
          parseInt(a.substr(1, 2), 16),
          parseInt(a.substr(3, 2), 16),
          parseInt(a.substr(5, 2), 16),
        ];
      void 0 !== b && 100 !== b && ((d += 'a'), c.push(b / 100));
      return d + '(' + c.join(',') + ')';
    };
  })(jwplayer),
  (function (h) {
    var c = h.foreach,
      l = {
        mp4: 'video/mp4',
        ogg: 'video/ogg',
        oga: 'audio/ogg',
        vorbis: 'audio/ogg',
        webm: 'video/webm',
        aac: 'audio/mp4',
        mp3: 'audio/mpeg',
        hls: 'application/vnd.apple.mpegurl',
      },
      j = {
        mp4: l.mp4,
        f4v: l.mp4,
        m4v: l.mp4,
        mov: l.mp4,
        m4a: l.aac,
        f4a: l.aac,
        aac: l.aac,
        mp3: l.mp3,
        ogv: l.ogg,
        ogg: l.ogg,
        oga: l.vorbis,
        vorbis: l.vorbis,
        webm: l.webm,
        m3u8: l.hls,
        m3u: l.hls,
        hls: l.hls,
      },
      g = (h.extensionmap = {});
    c(j, function (b, c) {
      g[b] = { html5: c };
    });
    c(
      {
        flv: 'video',
        f4v: 'video',
        mov: 'video',
        m4a: 'video',
        m4v: 'video',
        mp4: 'video',
        aac: 'video',
        f4a: 'video',
        mp3: 'sound',
        smil: 'rtmp',
        m3u8: 'hls',
        hls: 'hls',
      },
      function (b, c) {
        g[b] || (g[b] = {});
        g[b].flash = c;
      },
    );
    g.types = l;
    g.mimeType = function (b) {
      var e;
      c(l, function (c, a) {
        !e && a == b && (e = c);
      });
      return e;
    };
    g.extType = function (b) {
      return g.mimeType(j[b]);
    };
  })(jwplayer.utils),
  (function (h) {
    var c = (h.loaderstatus = { NEW: 0, LOADING: 1, ERROR: 2, COMPLETE: 3 }),
      l = document;
    h.scriptloader = function (j) {
      function g(b) {
        a = c.ERROR;
        n.sendEvent(e.ERROR, b);
      }
      function b(b) {
        a = c.COMPLETE;
        n.sendEvent(e.COMPLETE, b);
      }
      var e = jwplayer.events,
        n = h.extend(this, new e.eventdispatcher()),
        a = c.NEW;
      this.load = function () {
        if (a == c.NEW) {
          var d = h.scriptloader.loaders[j];
          if (d && ((a = d.getStatus()), 2 > a)) {
            d.addEventListener(e.ERROR, g);
            d.addEventListener(e.COMPLETE, b);
            return;
          }
          var f = l.createElement('script');
          f.addEventListener
            ? ((f.onload = b), (f.onerror = g))
            : f.readyState &&
              (f.onreadystatechange = function (a) {
                ('loaded' == f.readyState || 'complete' == f.readyState) &&
                  b(a);
              });
          l.getElementsByTagName('head')[0].appendChild(f);
          f.src = j;
          a = c.LOADING;
          h.scriptloader.loaders[j] = this;
        }
      };
      this.getStatus = function () {
        return a;
      };
    };
    h.scriptloader.loaders = {};
  })(jwplayer.utils),
  (function (h) {
    h.trim = function (c) {
      return c.replace(/^\s*/, '').replace(/\s*$/, '');
    };
    h.pad = function (c, h, j) {
      for (j || (j = '0'); c.length < h; ) c = j + c;
      return c;
    };
    h.xmlAttribute = function (c, h) {
      for (var j = 0; j < c.attributes.length; j++)
        if (
          c.attributes[j].name &&
          c.attributes[j].name.toLowerCase() == h.toLowerCase()
        )
          return c.attributes[j].value.toString();
      return '';
    };
    h.extension = function (c) {
      if (!c || 'rtmp' == c.substr(0, 4)) return '';
      var h;
      h = c.match(/manifest\(format=(.*),audioTrack/);
      h = !h || !h[1] ? !1 : h[1].split('-')[0];
      if (h) return h;
      c = c
        .substring(c.lastIndexOf('/') + 1, c.length)
        .split('?')[0]
        .split('#')[0];
      if (-1 < c.lastIndexOf('.'))
        return c.substr(c.lastIndexOf('.') + 1, c.length).toLowerCase();
    };
    h.stringToColor = function (c) {
      c = c.replace(/(#|0x)?([0-9A-F]{3,6})$/gi, '$2');
      3 == c.length &&
        (c =
          c.charAt(0) +
          c.charAt(0) +
          c.charAt(1) +
          c.charAt(1) +
          c.charAt(2) +
          c.charAt(2));
      return parseInt(c, 16);
    };
  })(jwplayer.utils),
  (function (h) {
    var c = 'touchmove',
      l = 'touchstart';
    h.touch = function (j) {
      function g(d) {
        d.type == l
          ? ((a = !0), (f = e(k.DRAG_START, d)))
          : d.type == c
          ? a && (q || (b(k.DRAG_START, d, f), (q = !0)), b(k.DRAG, d))
          : (a && (q ? b(k.DRAG_END, d) : ((d.cancelBubble = !0), b(k.TAP, d))),
            (a = q = !1),
            (f = null));
      }
      function b(a, b, c) {
        if (
          d[a] &&
          (b.preventManipulation && b.preventManipulation(),
          b.preventDefault && b.preventDefault(),
          (b = c ? c : e(a, b)))
        )
          d[a](b);
      }
      function e(a, b) {
        var d = null;
        b.touches && b.touches.length
          ? (d = b.touches[0])
          : b.changedTouches &&
            b.changedTouches.length &&
            (d = b.changedTouches[0]);
        if (!d) return null;
        var c = n.getBoundingClientRect(),
          d = {
            type: a,
            target: n,
            x: d.pageX - window.pageXOffset - c.left,
            y: d.pageY,
            deltaX: 0,
            deltaY: 0,
          };
        a != k.TAP && f && ((d.deltaX = d.x - f.x), (d.deltaY = d.y - f.y));
        return d;
      }
      var n = j,
        a = !1,
        d = {},
        f = null,
        q = !1,
        k = h.touchEvents;
      document.addEventListener(c, g);
      document.addEventListener('touchend', function (d) {
        a && q && b(k.DRAG_END, d);
        a = q = !1;
        f = null;
      });
      document.addEventListener('touchcancel', g);
      j.addEventListener(l, g);
      j.addEventListener('touchend', g);
      this.addEventListener = function (a, b) {
        d[a] = b;
      };
      this.removeEventListener = function (a) {
        delete d[a];
      };
      return this;
    };
  })(jwplayer.utils),
  (function (h) {
    h.touchEvents = {
      DRAG: 'jwplayerDrag',
      DRAG_START: 'jwplayerDragStart',
      DRAG_END: 'jwplayerDragEnd',
      TAP: 'jwplayerTap',
    };
  })(jwplayer.utils),
  (function (h) {
    h.key = function (c) {
      var l, j, g;
      this.edition = function () {
        return g && g.getTime() < new Date().getTime() ? 'invalid' : l;
      };
      this.token = function () {
        return j;
      };
      h.exists(c) || (c = '');
      try {
        c = h.tea.decrypt(c, '36QXq4W@GSBV^teR');
        var b = c.split('/');
        (l = b[0])
          ? /^(free|pro|premium|enterprise|ads)$/i.test(l)
            ? ((j = b[1]),
              b[2] &&
                0 < parseInt(b[2]) &&
                ((g = new Date()), g.setTime(String(b[2]))))
            : (l = 'invalid')
          : (l = 'free');
      } catch (e) {
        l = 'invalid';
      }
    };
  })(jwplayer.utils),
  (function (h) {
    var c = (h.tea = {});
    c.encrypt = function (g, b) {
      if (0 == g.length) return '';
      var e = c.strToLongs(j.encode(g));
      1 >= e.length && (e[1] = 0);
      for (
        var n = c.strToLongs(j.encode(b).slice(0, 16)),
          a = e.length,
          d = e[a - 1],
          f = e[0],
          h,
          k = Math.floor(6 + 52 / a),
          m = 0;
        0 < k--;

      ) {
        m += 2654435769;
        h = (m >>> 2) & 3;
        for (var r = 0; r < a; r++)
          (f = e[(r + 1) % a]),
            (d =
              (((d >>> 5) ^ (f << 2)) + ((f >>> 3) ^ (d << 4))) ^
              ((m ^ f) + (n[(r & 3) ^ h] ^ d))),
            (d = e[r] += d);
      }
      e = c.longsToStr(e);
      return l.encode(e);
    };
    c.decrypt = function (g, b) {
      if (0 == g.length) return '';
      for (
        var e = c.strToLongs(l.decode(g)),
          h = c.strToLongs(j.encode(b).slice(0, 16)),
          a = e.length,
          d = e[a - 1],
          f = e[0],
          q,
          k = 2654435769 * Math.floor(6 + 52 / a);
        0 != k;

      ) {
        q = (k >>> 2) & 3;
        for (var m = a - 1; 0 <= m; m--)
          (d = e[0 < m ? m - 1 : a - 1]),
            (d =
              (((d >>> 5) ^ (f << 2)) + ((f >>> 3) ^ (d << 4))) ^
              ((k ^ f) + (h[(m & 3) ^ q] ^ d))),
            (f = e[m] -= d);
        k -= 2654435769;
      }
      e = c.longsToStr(e);
      e = e.replace(/\0+$/, '');
      return j.decode(e);
    };
    c.strToLongs = function (c) {
      for (var b = Array(Math.ceil(c.length / 4)), e = 0; e < b.length; e++)
        b[e] =
          c.charCodeAt(4 * e) +
          (c.charCodeAt(4 * e + 1) << 8) +
          (c.charCodeAt(4 * e + 2) << 16) +
          (c.charCodeAt(4 * e + 3) << 24);
      return b;
    };
    c.longsToStr = function (c) {
      for (var b = Array(c.length), e = 0; e < c.length; e++)
        b[e] = String.fromCharCode(
          c[e] & 255,
          (c[e] >>> 8) & 255,
          (c[e] >>> 16) & 255,
          (c[e] >>> 24) & 255,
        );
      return b.join('');
    };
    var l = {
        code:
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\x3d',
        encode: function (c, b) {
          var e,
            h,
            a,
            d,
            f = [],
            q = '',
            k,
            m,
            r = l.code;
          m = ('undefined' == typeof b ? 0 : b) ? j.encode(c) : c;
          k = m.length % 3;
          if (0 < k) for (; 3 > k++; ) (q += '\x3d'), (m += '\x00');
          for (k = 0; k < m.length; k += 3)
            (e = m.charCodeAt(k)),
              (h = m.charCodeAt(k + 1)),
              (a = m.charCodeAt(k + 2)),
              (d = (e << 16) | (h << 8) | a),
              (e = (d >> 18) & 63),
              (h = (d >> 12) & 63),
              (a = (d >> 6) & 63),
              (d &= 63),
              (f[k / 3] =
                r.charAt(e) + r.charAt(h) + r.charAt(a) + r.charAt(d));
          f = f.join('');
          return (f = f.slice(0, f.length - q.length) + q);
        },
        decode: function (c, b) {
          b = 'undefined' == typeof b ? !1 : b;
          var e,
            h,
            a,
            d,
            f,
            q = [],
            k,
            m = l.code;
          k = b ? j.decode(c) : c;
          for (var r = 0; r < k.length; r += 4)
            (e = m.indexOf(k.charAt(r))),
              (h = m.indexOf(k.charAt(r + 1))),
              (d = m.indexOf(k.charAt(r + 2))),
              (f = m.indexOf(k.charAt(r + 3))),
              (a = (e << 18) | (h << 12) | (d << 6) | f),
              (e = (a >>> 16) & 255),
              (h = (a >>> 8) & 255),
              (a &= 255),
              (q[r / 4] = String.fromCharCode(e, h, a)),
              64 == f && (q[r / 4] = String.fromCharCode(e, h)),
              64 == d && (q[r / 4] = String.fromCharCode(e));
          d = q.join('');
          return b ? j.decode(d) : d;
        },
      },
      j = {
        encode: function (c) {
          c = c.replace(/[\u0080-\u07ff]/g, function (b) {
            b = b.charCodeAt(0);
            return String.fromCharCode(192 | (b >> 6), 128 | (b & 63));
          });
          return (c = c.replace(/[\u0800-\uffff]/g, function (b) {
            b = b.charCodeAt(0);
            return String.fromCharCode(
              224 | (b >> 12),
              128 | ((b >> 6) & 63),
              128 | (b & 63),
            );
          }));
        },
        decode: function (c) {
          c = c.replace(
            /[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g,
            function (b) {
              b =
                ((b.charCodeAt(0) & 15) << 12) |
                ((b.charCodeAt(1) & 63) << 6) |
                (b.charCodeAt(2) & 63);
              return String.fromCharCode(b);
            },
          );
          return (c = c.replace(/[\u00c0-\u00df][\u0080-\u00bf]/g, function (
            b,
          ) {
            b = ((b.charCodeAt(0) & 31) << 6) | (b.charCodeAt(1) & 63);
            return String.fromCharCode(b);
          }));
        },
      };
  })(jwplayer.utils),
  (function (h) {
    h.events = {
      COMPLETE: 'COMPLETE',
      ERROR: 'ERROR',
      API_READY: 'jwplayerAPIReady',
      JWPLAYER_READY: 'jwplayerReady',
      JWPLAYER_FULLSCREEN: 'jwplayerFullscreen',
      JWPLAYER_RESIZE: 'jwplayerResize',
      JWPLAYER_ERROR: 'jwplayerError',
      JWPLAYER_SETUP_ERROR: 'jwplayerSetupError',
      JWPLAYER_MEDIA_BEFOREPLAY: 'jwplayerMediaBeforePlay',
      JWPLAYER_MEDIA_BEFORECOMPLETE: 'jwplayerMediaBeforeComplete',
      JWPLAYER_COMPONENT_SHOW: 'jwplayerComponentShow',
      JWPLAYER_COMPONENT_HIDE: 'jwplayerComponentHide',
      JWPLAYER_MEDIA_BUFFER: 'jwplayerMediaBuffer',
      JWPLAYER_MEDIA_BUFFER_FULL: 'jwplayerMediaBufferFull',
      JWPLAYER_MEDIA_ERROR: 'jwplayerMediaError',
      JWPLAYER_MEDIA_LOADED: 'jwplayerMediaLoaded',
      JWPLAYER_MEDIA_COMPLETE: 'jwplayerMediaComplete',
      JWPLAYER_MEDIA_SEEK: 'jwplayerMediaSeek',
      JWPLAYER_MEDIA_TIME: 'jwplayerMediaTime',
      JWPLAYER_MEDIA_VOLUME: 'jwplayerMediaVolume',
      JWPLAYER_MEDIA_META: 'jwplayerMediaMeta',
      JWPLAYER_MEDIA_MUTE: 'jwplayerMediaMute',
      JWPLAYER_MEDIA_LEVELS: 'jwplayerMediaLevels',
      JWPLAYER_MEDIA_LEVEL_CHANGED: 'jwplayerMediaLevelChanged',
      JWPLAYER_CAPTIONS_CHANGED: 'jwplayerCaptionsChanged',
      JWPLAYER_CAPTIONS_LIST: 'jwplayerCaptionsList',
      JWPLAYER_CAPTIONS_LOADED: 'jwplayerCaptionsLoaded',
      JWPLAYER_PLAYER_STATE: 'jwplayerPlayerState',
      state: {
        BUFFERING: 'BUFFERING',
        IDLE: 'IDLE',
        PAUSED: 'PAUSED',
        PLAYING: 'PLAYING',
      },
      JWPLAYER_PLAYLIST_LOADED: 'jwplayerPlaylistLoaded',
      JWPLAYER_PLAYLIST_ITEM: 'jwplayerPlaylistItem',
      JWPLAYER_PLAYLIST_COMPLETE: 'jwplayerPlaylistComplete',
      JWPLAYER_DISPLAY_CLICK: 'jwplayerViewClick',
      JWPLAYER_VIEW_TAB_FOCUS: 'jwplayerViewTabFocus',
      JWPLAYER_CONTROLS: 'jwplayerViewControls',
      JWPLAYER_USER_ACTION: 'jwplayerUserAction',
      JWPLAYER_INSTREAM_CLICK: 'jwplayerInstreamClicked',
      JWPLAYER_INSTREAM_DESTROYED: 'jwplayerInstreamDestroyed',
      JWPLAYER_AD_TIME: 'jwplayerAdTime',
      JWPLAYER_AD_ERROR: 'jwplayerAdError',
      JWPLAYER_AD_CLICK: 'jwplayerAdClicked',
      JWPLAYER_AD_COMPLETE: 'jwplayerAdComplete',
      JWPLAYER_AD_IMPRESSION: 'jwplayerAdImpression',
      JWPLAYER_AD_COMPANIONS: 'jwplayerAdCompanions',
      JWPLAYER_AD_SKIPPED: 'jwplayerAdSkipped',
      JWPLAYER_AD_PLAY: 'jwplayerAdPlay',
      JWPLAYER_AD_PAUSE: 'jwplayerAdPause',
      JWPLAYER_AD_META: 'jwplayerAdMeta',
      JWPLAYER_CAST_AVAILABLE: 'jwplayerCastAvailable',
      JWPLAYER_CAST_SESSION: 'jwplayerCastSession',
      JWPLAYER_CAST_AD_CHANGED: 'jwplayerCastAdChanged',
    };
  })(jwplayer),
  (function (h) {
    var c = h.utils;
    h.events.eventdispatcher = function (l, j) {
      function g(b, a, d) {
        if (b)
          for (var f = 0; f < b.length; f++) {
            var e = b[f];
            if (e) {
              null !== e.count && 0 === --e.count && delete b[f];
              try {
                e.listener(a);
              } catch (g) {
                c.log(
                  'Error handling "' +
                    d +
                    '" event listener [' +
                    f +
                    ']: ' +
                    g.toString(),
                  e.listener,
                  a,
                );
              }
            }
          }
      }
      var b, e;
      this.resetEventListeners = function () {
        b = {};
        e = [];
      };
      this.resetEventListeners();
      this.addEventListener = function (e, a, d) {
        try {
          c.exists(b[e]) || (b[e] = []),
            'string' == c.typeOf(a) && (a = new Function('return ' + a)()),
            b[e].push({ listener: a, count: d || null });
        } catch (f) {
          c.log('error', f);
        }
        return !1;
      };
      this.removeEventListener = function (e, a) {
        if (b[e]) {
          try {
            if (void 0 === a) {
              b[e] = [];
              return;
            }
            for (var d = 0; d < b[e].length; d++)
              if (b[e][d].listener.toString() == a.toString()) {
                b[e].splice(d, 1);
                break;
              }
          } catch (f) {
            c.log('error', f);
          }
          return !1;
        }
      };
      this.addGlobalListener = function (b, a) {
        try {
          'string' == c.typeOf(b) && (b = new Function('return ' + b)()),
            e.push({ listener: b, count: a || null });
        } catch (d) {
          c.log('error', d);
        }
        return !1;
      };
      this.removeGlobalListener = function (b) {
        if (b) {
          try {
            for (var a = e.length; a--; )
              e[a].listener.toString() == b.toString() && e.splice(a, 1);
          } catch (d) {
            c.log('error', d);
          }
          return !1;
        }
      };
      this.sendEvent = function (n, a) {
        c.exists(a) || (a = {});
        c.extend(a, { id: l, version: h.version, type: n });
        j && c.log(n, a);
        g(b[n], a, n);
        g(e, a, n);
      };
    };
  })(window.jwplayer),
  (function (h) {
    var c = {},
      l = {};
    h.plugins = function () {};
    h.plugins.loadPlugins = function (j, g) {
      l[j] = new h.plugins.pluginloader(new h.plugins.model(c), g);
      return l[j];
    };
    h.plugins.registerPlugin = function (j, g, b, e) {
      var n = h.utils.getPluginName(j);
      c[n] || (c[n] = new h.plugins.plugin(j));
      c[n].registerPlugin(j, g, b, e);
    };
  })(jwplayer),
  (function (h) {
    h.plugins.model = function (c) {
      this.addPlugin = function (l) {
        var j = h.utils.getPluginName(l);
        c[j] || (c[j] = new h.plugins.plugin(l));
        return c[j];
      };
      this.getPlugins = function () {
        return c;
      };
    };
  })(jwplayer),
  (function (h) {
    var c = jwplayer.utils,
      l = jwplayer.events;
    h.pluginmodes = { FLASH: 0, JAVASCRIPT: 1, HYBRID: 2 };
    h.plugin = function (j) {
      function g() {
        switch (c.getPluginPathType(j)) {
          case c.pluginPathType.ABSOLUTE:
            return j;
          case c.pluginPathType.RELATIVE:
            return c.getAbsolutePath(j, window.location.href);
        }
      }
      function b() {
        q = setTimeout(function () {
          n = c.loaderstatus.COMPLETE;
          k.sendEvent(l.COMPLETE);
        }, 1e3);
      }
      function e() {
        n = c.loaderstatus.ERROR;
        k.sendEvent(l.ERROR);
      }
      var n = c.loaderstatus.NEW,
        a,
        d,
        f,
        q,
        k = new l.eventdispatcher();
      c.extend(this, k);
      this.load = function () {
        if (n == c.loaderstatus.NEW)
          if (0 < j.lastIndexOf('.swf'))
            (a = j), (n = c.loaderstatus.COMPLETE), k.sendEvent(l.COMPLETE);
          else if (c.getPluginPathType(j) == c.pluginPathType.CDN)
            (n = c.loaderstatus.COMPLETE), k.sendEvent(l.COMPLETE);
          else {
            n = c.loaderstatus.LOADING;
            var d = new c.scriptloader(g());
            d.addEventListener(l.COMPLETE, b);
            d.addEventListener(l.ERROR, e);
            d.load();
          }
      };
      this.registerPlugin = function (b, e, g, j) {
        q && (clearTimeout(q), (q = void 0));
        f = e;
        g && j
          ? ((a = j), (d = g))
          : 'string' == typeof g
          ? (a = g)
          : 'function' == typeof g
          ? (d = g)
          : !g && !j && (a = b);
        n = c.loaderstatus.COMPLETE;
        k.sendEvent(l.COMPLETE);
      };
      this.getStatus = function () {
        return n;
      };
      this.getPluginName = function () {
        return c.getPluginName(j);
      };
      this.getFlashPath = function () {
        if (a)
          switch (c.getPluginPathType(a)) {
            case c.pluginPathType.ABSOLUTE:
              return a;
            case c.pluginPathType.RELATIVE:
              return 0 < j.lastIndexOf('.swf')
                ? c.getAbsolutePath(a, window.location.href)
                : c.getAbsolutePath(a, g());
          }
        return null;
      };
      this.getJS = function () {
        return d;
      };
      this.getTarget = function () {
        return f;
      };
      this.getPluginmode = function () {
        if ('undefined' != typeof a && 'undefined' != typeof d)
          return h.pluginmodes.HYBRID;
        if ('undefined' != typeof a) return h.pluginmodes.FLASH;
        if ('undefined' != typeof d) return h.pluginmodes.JAVASCRIPT;
      };
      this.getNewInstance = function (a, b, c) {
        return new d(a, b, c);
      };
      this.getURL = function () {
        return j;
      };
    };
  })(jwplayer.plugins),
  (function (h) {
    var c = h.utils,
      l = h.events,
      j = c.foreach;
    h.plugins.pluginloader = function (g, b) {
      function e() {
        f && m.sendEvent(l.ERROR, { message: q });
        d || ((d = !0), (a = c.loaderstatus.COMPLETE), m.sendEvent(l.COMPLETE));
      }
      function h() {
        k || e();
        if (!d && !f) {
          var a = 0,
            b = g.getPlugins();
          c.foreach(k, function (d) {
            d = c.getPluginName(d);
            var m = b[d];
            d = m.getJS();
            var g = m.getTarget(),
              m = m.getStatus();
            m == c.loaderstatus.LOADING || m == c.loaderstatus.NEW
              ? a++
              : d &&
                !c.versionCheck(g) &&
                ((f = !0), (q = 'Incompatible player version'), e());
          });
          0 === a && e();
        }
      }
      var a = c.loaderstatus.NEW,
        d = !1,
        f = !1,
        q,
        k = b,
        m = new l.eventdispatcher();
      c.extend(this, m);
      this.setupPlugins = function (a, b, d) {
        var e = { length: 0, plugins: {} },
          f = 0,
          m = {},
          h = g.getPlugins();
        j(b.plugins, function (g, j) {
          var k = c.getPluginName(g),
            n = h[k],
            l = n.getFlashPath(),
            q = n.getJS(),
            I = n.getURL();
          l &&
            ((e.plugins[l] = c.extend({}, j)),
            (e.plugins[l].pluginmode = n.getPluginmode()),
            e.length++);
          try {
            if (q && b.plugins && b.plugins[I]) {
              var r = document.createElement('div');
              r.id = a.id + '_' + k;
              r.style.position = 'absolute';
              r.style.top = 0;
              r.style.zIndex = f + 10;
              m[k] = n.getNewInstance(a, c.extend({}, b.plugins[I]), r);
              f++;
              a.onReady(d(m[k], r, !0));
              a.onResize(d(m[k], r));
            }
          } catch (P) {
            c.log('ERROR: Failed to load ' + k + '.');
          }
        });
        a.plugins = m;
        return e;
      };
      this.load = function () {
        if (!(c.exists(b) && 'object' != c.typeOf(b))) {
          a = c.loaderstatus.LOADING;
          j(b, function (a) {
            c.exists(a) &&
              ((a = g.addPlugin(a)),
              a.addEventListener(l.COMPLETE, h),
              a.addEventListener(l.ERROR, r));
          });
          var d = g.getPlugins();
          j(d, function (a, b) {
            b.load();
          });
        }
        h();
      };
      this.destroy = function () {
        m && (m.resetEventListeners(), (m = null));
      };
      var r = (this.pluginFailed = function () {
        f || ((f = !0), (q = 'File not found'), e());
      });
      this.getStatus = function () {
        return a;
      };
    };
  })(jwplayer),
  (function (h) {
    h.parsers = {
      localName: function (c) {
        return c
          ? c.localName
            ? c.localName
            : c.baseName
            ? c.baseName
            : ''
          : '';
      },
      textContent: function (c) {
        return c
          ? c.textContent
            ? h.utils.trim(c.textContent)
            : c.text
            ? h.utils.trim(c.text)
            : ''
          : '';
      },
      getChildNode: function (c, h) {
        return c.childNodes[h];
      },
      numChildren: function (c) {
        return c.childNodes ? c.childNodes.length : 0;
      },
    };
  })(jwplayer),
  (function (h) {
    var c = h.parsers;
    (c.jwparser = function () {}).parseEntry = function (l, j) {
      for (
        var g = [], b = [], e = h.utils.xmlAttribute, n = 0;
        n < l.childNodes.length;
        n++
      ) {
        var a = l.childNodes[n];
        if ('jwplayer' == a.prefix) {
          var d = c.localName(a);
          'source' == d
            ? (delete j.sources,
              g.push({
                file: e(a, 'file'),
                default: e(a, 'default'),
                label: e(a, 'label'),
                type: e(a, 'type'),
              }))
            : 'track' == d
            ? (delete j.tracks,
              b.push({
                file: e(a, 'file'),
                default: e(a, 'default'),
                kind: e(a, 'kind'),
                label: e(a, 'label'),
              }))
            : ((j[d] = h.utils.serialize(c.textContent(a))),
              'file' == d && j.sources && delete j.sources);
        }
        j.file || (j.file = j.link);
      }
      if (g.length) {
        j.sources = [];
        for (n = 0; n < g.length; n++)
          0 < g[n].file.length &&
            ((g[n]['default'] = 'true' == g[n]['default'] ? !0 : !1),
            g[n].label.length || delete g[n].label,
            j.sources.push(g[n]));
      }
      if (b.length) {
        j.tracks = [];
        for (n = 0; n < b.length; n++)
          0 < b[n].file.length &&
            ((b[n]['default'] = 'true' == b[n]['default'] ? !0 : !1),
            (b[n].kind = !b[n].kind.length ? 'captions' : b[n].kind),
            b[n].label.length || delete b[n].label,
            j.tracks.push(b[n]));
      }
      return j;
    };
  })(jwplayer),
  (function (h) {
    var c = jwplayer.utils,
      l = c.xmlAttribute,
      j = h.localName,
      g = h.textContent,
      b = h.numChildren,
      e = (h.mediaparser = function () {});
    e.parseGroup = function (h, a) {
      var d,
        f,
        q = [];
      for (f = 0; f < b(h); f++)
        if (((d = h.childNodes[f]), 'media' == d.prefix && j(d)))
          switch (j(d).toLowerCase()) {
            case 'content':
              l(d, 'duration') && (a.duration = c.seconds(l(d, 'duration')));
              0 < b(d) && (a = e.parseGroup(d, a));
              l(d, 'url') &&
                (a.sources || (a.sources = []),
                a.sources.push({
                  file: l(d, 'url'),
                  type: l(d, 'type'),
                  width: l(d, 'width'),
                  label: l(d, 'label'),
                }));
              break;
            case 'title':
              a.title = g(d);
              break;
            case 'description':
              a.description = g(d);
              break;
            case 'guid':
              a.mediaid = g(d);
              break;
            case 'thumbnail':
              a.image || (a.image = l(d, 'url'));
              break;
            case 'group':
              e.parseGroup(d, a);
              break;
            case 'subtitle':
              var k = {};
              k.file = l(d, 'url');
              k.kind = 'captions';
              if (0 < l(d, 'lang').length) {
                var m = k;
                d = l(d, 'lang');
                var r = {
                  zh: 'Chinese',
                  nl: 'Dutch',
                  en: 'English',
                  fr: 'French',
                  de: 'German',
                  it: 'Italian',
                  ja: 'Japanese',
                  pt: 'Portuguese',
                  ru: 'Russian',
                  es: 'Spanish',
                };
                d = r[d] ? r[d] : d;
                m.label = d;
              }
              q.push(k);
          }
      a.hasOwnProperty('tracks') || (a.tracks = []);
      for (f = 0; f < q.length; f++) a.tracks.push(q[f]);
      return a;
    };
  })(jwplayer.parsers),
  (function (h) {
    function c(b) {
      for (var a = {}, d = 0; d < b.childNodes.length; d++) {
        var c = b.childNodes[d],
          g = e(c);
        if (g)
          switch (g.toLowerCase()) {
            case 'enclosure':
              a.file = l.xmlAttribute(c, 'url');
              break;
            case 'title':
              a.title = j(c);
              break;
            case 'guid':
              a.mediaid = j(c);
              break;
            case 'pubdate':
              a.date = j(c);
              break;
            case 'description':
              a.description = j(c);
              break;
            case 'link':
              a.link = j(c);
              break;
            case 'category':
              a.tags = a.tags ? a.tags + j(c) : j(c);
          }
      }
      a = h.mediaparser.parseGroup(b, a);
      a = h.jwparser.parseEntry(b, a);
      return new jwplayer.playlist.item(a);
    }
    var l = jwplayer.utils,
      j = h.textContent,
      g = h.getChildNode,
      b = h.numChildren,
      e = h.localName;
    h.rssparser = {};
    h.rssparser.parse = function (j) {
      for (var a = [], d = 0; d < b(j); d++) {
        var f = g(j, d);
        if ('channel' == e(f).toLowerCase())
          for (var h = 0; h < b(f); h++) {
            var k = g(f, h);
            'item' == e(k).toLowerCase() && a.push(c(k));
          }
      }
      return a;
    };
  })(jwplayer.parsers),
  (function (h) {
    h.playlist = function (c) {
      var l = [];
      if ('array' == h.utils.typeOf(c))
        for (var j = 0; j < c.length; j++) l.push(new h.playlist.item(c[j]));
      else l.push(new h.playlist.item(c));
      return l;
    };
  })(jwplayer),
  (function (h) {
    var c = (h.item = function (l) {
      var j = jwplayer.utils,
        g = j.extend({}, c.defaults, l),
        b,
        e;
      g.tracks = l && j.exists(l.tracks) ? l.tracks : [];
      0 === g.sources.length && (g.sources = [new h.source(g)]);
      for (b = 0; b < g.sources.length; b++)
        (e = g.sources[b]['default']),
          (g.sources[b]['default'] = e ? 'true' == e.toString() : !1),
          (g.sources[b] = new h.source(g.sources[b]));
      if (g.captions && !j.exists(l.tracks)) {
        for (l = 0; l < g.captions.length; l++) g.tracks.push(g.captions[l]);
        delete g.captions;
      }
      for (b = 0; b < g.tracks.length; b++)
        g.tracks[b] = new h.track(g.tracks[b]);
      return g;
    });
    c.defaults = {
      description: void 0,
      image: void 0,
      mediaid: void 0,
      title: void 0,
      sources: [],
      tracks: [],
    };
  })(jwplayer.playlist),
  (function (h) {
    var c = jwplayer,
      l = c.utils,
      j = c.events,
      g = c.parsers;
    h.loader = function () {
      function b(b) {
        try {
          var c = b.responseXML.childNodes;
          b = '';
          for (var e = 0; e < c.length && !((b = c[e]), 8 != b.nodeType); e++);
          'xml' == g.localName(b) && (b = b.nextSibling);
          if ('rss' != g.localName(b)) n('Not a valid RSS feed');
          else {
            var k = new h(g.rssparser.parse(b));
            a.sendEvent(j.JWPLAYER_PLAYLIST_LOADED, { playlist: k });
          }
        } catch (m) {
          n();
        }
      }
      function c(a) {
        n(a.match(/invalid/i) ? 'Not a valid RSS feed' : '');
      }
      function n(b) {
        a.sendEvent(j.JWPLAYER_ERROR, {
          message: b ? b : 'Error loading file',
        });
      }
      var a = new j.eventdispatcher();
      l.extend(this, a);
      this.load = function (a) {
        l.ajax(a, b, c);
      };
    };
  })(jwplayer.playlist),
  (function (h) {
    var c = jwplayer.utils,
      l = { file: void 0, label: void 0, type: void 0, default: void 0 };
    h.source = function (j) {
      var g = c.extend({}, l);
      c.foreach(l, function (b) {
        c.exists(j[b]) && ((g[b] = j[b]), delete j[b]);
      });
      g.type &&
        0 < g.type.indexOf('/') &&
        (g.type = c.extensionmap.mimeType(g.type));
      'm3u8' == g.type && (g.type = 'hls');
      'smil' == g.type && (g.type = 'rtmp');
      return g;
    };
  })(jwplayer.playlist),
  (function (h) {
    var c = jwplayer.utils,
      l = { file: void 0, label: void 0, kind: 'captions', default: !1 };
    h.track = function (j) {
      var g = c.extend({}, l);
      j || (j = {});
      c.foreach(l, function (b) {
        c.exists(j[b]) && ((g[b] = j[b]), delete j[b]);
      });
      return g;
    };
  })(jwplayer.playlist),
  (function (h) {
    var c = (h.cast = {}),
      l = h.utils;
    c.adprovider = function (j, g) {
      function b() {
        f = { message: q, position: 0, duration: -1 };
      }
      function e(a, b) {
        var d = { command: a };
        void 0 !== b && (d.args = b);
        g.sendMessage(j, d, n, function (a) {
          c.error('message send error', a);
        });
      }
      function n() {}
      var a = new c.provider(j, g),
        d = l.extend(this, a),
        f,
        q = 'Loading ad',
        k = 0;
      d.init = function () {
        a.init();
        b();
      };
      d.destroy = function () {
        a.destroy();
      };
      d.updateModel = function (d, e) {
        (d.tag || d.newstate || d.sequence || d.companions) &&
          c.log('received ad change:', d);
        d.tag &&
          f.tag &&
          d.tag !== f.tag &&
          (c.error(
            'ad messages not received in order. new model:',
            d,
            'old model:',
            f,
          ),
          b());
        h.utils.extend(f, d);
        a.updateModel(d, e);
      };
      d.getAdModel = function () {
        var a = l.extend({}, f);
        a.message = 0 < f.duration ? this.getAdMessage() : q;
        return a;
      };
      d.resetAdModel = function () {
        b();
      };
      d.getAdMessage = function () {
        var a = f.message.replace(
          /xx/gi,
          '' + Math.min(f.duration | 0, Math.ceil(f.duration - f.position)),
        );
        f.podMessage &&
          1 < f.podcount &&
          (a =
            f.podMessage
              .replace(/__AD_POD_CURRENT__/g, '' + f.sequence)
              .replace(/__AD_POD_LENGTH__/g, '' + f.podcount) + a);
        return a;
      };
      d.skipAd = function (a) {
        e('skipAd', { tag: a.tag });
      };
      d.clickAd = function (a) {
        k = 1 * new Date();
        e('clickAd', { tag: a.tag });
      };
      d.timeSinceClick = function () {
        return 1 * new Date() - k;
      };
    };
  })(window.jwplayer),
  (function (h, c) {
    function l(a, b) {
      a[b] && (a[b] = g.getAbsolutePath(a[b]));
    }
    var j = c.cast,
      g = c.utils,
      b = c.events,
      e = b.state,
      n = {};
    j.NS = 'urn:x-cast:com.longtailvideo.jwplayer';
    j.availability = null;
    j.available = function (a) {
      a = a || j.availability;
      var b = h.chrome,
        c = 'available';
      b.cast &&
        b.cast.ReceiverAvailability &&
        (c = b.cast.ReceiverAvailability.AVAILABLE);
      return a === c;
    };
    j.controller = function (a, d) {
      var f, q;
      function k(a, b) {
        var d = { command: a };
        void 0 !== b && (d.args = b);
        w.sendMessage(j.NS, d, O, function (a) {
          j.log('error message', a);
          'Invalid namespace' === a.description && A();
        });
      }
      function m(a) {
        a = !!j.available(a.availability);
        N.available !== a && ((N.available = a), t(b.JWPLAYER_CAST_AVAILABLE));
      }
      function r(a) {
        j.log('existing session', a);
        w || ((K = a.session), K.addMessageListener(j.NS, x));
      }
      function x(e, f) {
        var g = JSON.parse(f);
        if (!g) throw 'Message not proper JSON';
        if (g.reconcile) {
          K.removeMessageListener(j.NS, x);
          var m = g.diff,
            h = K;
          if (!m.id || !g.appid || !g.pageUrl)
            (m.id = c().id),
              (g.appid = J.appid),
              (g.pageUrl = Q),
              (K = w = null);
          m.id === a.id &&
            g.appid === J.appid &&
            g.pageUrl === Q &&
            (w ||
              (a.jwInstreamState() && a.jwInstreamDestroy(!0),
              v(h),
              d.sendEvent(b.JWPLAYER_PLAYER_STATE, {
                oldstate: m.oldstate,
                newstate: m.newstate,
              })),
            H(g));
          K = null;
        }
      }
      function u(a) {
        N.active = !!a;
        a = N;
        var d;
        d = w && w.receiver ? w.receiver.friendlyName : '';
        a.deviceName = d;
        t(b.JWPLAYER_CAST_SESSION, {});
      }
      function t(a) {
        var b = g.extend({}, N);
        d.sendEvent(a, b);
      }
      function p(a) {
        var b = h.chrome;
        a.code !== b.cast.ErrorCode.CANCEL &&
          (j.log('Cast Session Error:', a, w),
          a.code === b.cast.ErrorCode.SESSION_ERROR && A());
      }
      function A() {
        w ? (B(), w.stop(F, G)) : F();
      }
      function G(a) {
        j.error('Cast Session Stop error:', a, w);
        F();
      }
      function v(m) {
        w = m;
        w.addMessageListener(j.NS, D);
        w.addUpdateListener(C);
        a.jwPause(!0);
        a.jwSetFullscreen(!1);
        M = d.getVideo();
        f = d.volume;
        q = d.mute;
        z = new j.provider(k);
        z.init();
        d.setVideo(z);
        a.jwPlay = function (a) {
          !1 === a ? z.pause() : z.play();
        };
        a.jwPause = function (b) {
          a.jwPlay(!!b);
        };
        a.jwLoad = function (a) {
          'number' === g.typeOf(a) && d.setItem(a);
          z.load(a);
        };
        a.jwPlaylistItem = function (a) {
          'number' === g.typeOf(a) && d.setItem(a);
          z.playlistItem(a);
        };
        a.jwPlaylistNext = function () {
          a.jwPlaylistItem(d.item + 1);
        };
        a.jwPlaylistPrev = function () {
          a.jwPlaylistItem(d.item - 1);
        };
        a.jwSetVolume = function (a) {
          g.exists(a) &&
            ((a = Math.min(Math.max(0, a), 100) | 0),
            R(a) &&
              ((a = Math.max(0, Math.min(a / 100, 1))),
              w.setReceiverVolumeLevel(a, I, function (a) {
                j.error('set volume error', a);
                I();
              })));
        };
        a.jwSetMute = function (a) {
          g.exists(a) || (a = !L.mute);
          P(a) &&
            w.setReceiverMuted(!!a, I, function (a) {
              j.error('set muted error', a);
              I();
            });
        };
        a.jwGetVolume = function () {
          return L.volume | 0;
        };
        a.jwGetMute = function () {
          return !!L.mute;
        };
        a.jwIsBeforePlay = function () {
          return !1;
        };
        var l = a.jwSetCurrentCaptions;
        a.jwSetCurrentCaptions = function (a) {
          l(a);
          z.sendCommand('caption', a);
        };
        a.jwSkipAd = function (a) {
          y &&
            (y.skipAd(a),
            (a = y.getAdModel()),
            (a.complete = !0),
            d.sendEvent(b.JWPLAYER_CAST_AD_CHANGED, a));
        };
        a.jwClickAd = function (f) {
          if (
            y &&
            300 < y.timeSinceClick() &&
            (y.clickAd(f), d.state !== e.PAUSED)
          ) {
            var g = { tag: f.tag };
            f.sequence && (g.sequence = f.sequence);
            f.podcount && (g.podcount = f.podcount);
            c(a.id).dispatchEvent(b.JWPLAYER_AD_CLICK, g);
            h.open(f.clickthrough);
          }
        };
        a.jwPlayAd = a.jwPauseAd = a.jwSetControls = a.jwForceState = a.jwReleaseState = a.jwSetFullscreen = a.jwDetachMedia = a.jwAttachMedia = O;
        var n = c(a.id).plugins;
        n.vast &&
          n.vast.jwPauseAd !== O &&
          ((S = { jwPlayAd: n.vast.jwPlayAd, jwPauseAd: n.vast.jwPauseAd }),
          (n.vast.jwPlayAd = n.vast.jwPauseAd = O));
        I();
        u(!0);
        m !== K && z.setup(E(), d);
      }
      function C(a) {
        j.log('Cast Session status', a);
        a
          ? I()
          : (z.sendEvent(b.JWPLAYER_PLAYER_STATE, {
              oldstate: d.state,
              newstate: e.BUFFERING,
            }),
            F());
      }
      function F() {
        w && (B(), (w = null));
        if (M) {
          delete a.jwSkipAd;
          delete a.jwClickAd;
          a.initializeAPI();
          var m = c(a.id).plugins;
          m.vast && g.extend(m.vast, S);
          d.volume = f;
          d.mute = q;
          d.setVideo(M);
          d.duration = 0;
          z && (z.destroy(), (z = null));
          y && (y.destroy(), (y = null));
          d.state !== e.IDLE
            ? g.isIPad() || g.isIPod()
              ? (a.jwStop(!0),
                M.sendEvent(b.JWPLAYER_PLAYER_STATE, {
                  oldstate: e.BUFFERING,
                  newstate: e.IDLE,
                }))
              : ((d.state = e.IDLE), a.jwPlay(!0), a.jwSeek(d.position))
            : M.sendEvent(b.JWPLAYER_PLAYER_STATE, {
                oldstate: e.BUFFERING,
                newstate: e.IDLE,
              });
          M = null;
        }
        u(!1);
      }
      function B() {
        w.removeUpdateListener(C);
        w.removeMessageListener(j.NS, D);
      }
      function D(a, b) {
        var d = JSON.parse(b);
        if (!d) throw 'Message not proper JSON';
        H(d);
      }
      function H(c) {
        if ('state' === c.type) {
          if (y && (c.diff.newstate || c.diff.position))
            y.destroy(),
              (y = null),
              d.setVideo(z),
              d.sendEvent(b.JWPLAYER_CAST_AD_CHANGED, { done: !0 });
          z.updateModel(c.diff, c.type);
          c = c.diff;
          void 0 !== c.item &&
            d.item !== c.item &&
            ((d.item = c.item),
            d.sendEvent(b.JWPLAYER_PLAYLIST_ITEM, { index: d.item }));
        } else if ('ad' === c.type) {
          null === y &&
            ((y = new j.adprovider(j.NS, w)), y.init(), d.setVideo(y));
          y.updateModel(c.diff, c.type);
          var e = y.getAdModel();
          c.diff.clickthrough && (e.onClick = a.jwClickAd);
          c.diff.skipoffset && (e.onSkipAd = a.jwSkipAd);
          d.sendEvent(b.JWPLAYER_CAST_AD_CHANGED, e);
          c.diff.complete && y.resetAdModel();
        } else
          'connection' === c.type
            ? !0 === c.closed && A()
            : j.error('received unhandled message', c.type, c);
      }
      function E() {
        var a = g.extend({}, d.config);
        a.cast = g.extend({ pageUrl: Q }, J);
        for (
          var b = 'base autostart controls fallback fullscreen width height mobilecontrols modes playlistlayout playlistposition playlistsize primary stretching sharing related ga skin logo listbar'.split(
              ' ',
            ),
            c = b.length;
          c--;

        )
          delete a[b[c]];
        b = a.plugins;
        delete a.plugins;
        for (var e in b)
          if (b.hasOwnProperty(e)) {
            var f = b[e];
            if (
              f.client &&
              (/[\.\/]/.test(f.client) && l(f, 'client'),
              -1 < f.client.indexOf('vast'))
            ) {
              c = a;
              f = g.extend({}, f);
              f.client = 'vast';
              delete f.companiondiv;
              if (f.schedule) {
                var m = void 0;
                for (m in f.schedule)
                  f.schedule.hasOwnProperty(m) &&
                    l(f.schedule[m].ad || f.schedule[m], 'tag');
              }
              l(f, 'tag');
              c.advertising = f;
            }
          }
        d.position && (a.position = d.position);
        0 < d.item && (a.item = d.item);
        a.captionLabel = g.getCookies().captionLabel;
        return a;
      }
      function I() {
        if (w && w.receiver) {
          var a = w.receiver.volume;
          if (a) {
            var b = (100 * a.level) | 0;
            P(!!a.muted);
            R(b);
          }
        }
      }
      function R(a) {
        var c = L.volume !== a;
        c &&
          ((L.volume = a), z.sendEvent(b.JWPLAYER_MEDIA_VOLUME, { volume: a }));
        return c;
      }
      function P(a) {
        var c = L.mute !== a;
        c && ((L.mute = a), z.sendEvent(b.JWPLAYER_MEDIA_MUTE, { mute: a }));
        return c;
      }
      function O() {}
      var w = null,
        N = { available: !1, active: !1, deviceName: '' },
        L = { volume: null, mute: null },
        Q = g.getAbsolutePath(h.location.href),
        J,
        z = null,
        y = null,
        M = null;
      f = d.volume;
      q = d.mute;
      var K = null,
        S = null;
      J = g.extend({}, n, d.cast);
      l(J, 'loadscreen');
      l(J, 'endscreen');
      l(J, 'logo');
      if (J.appid && (!h.cast || !h.cast.receiver))
        j.loader.addEventListener('availability', m),
          j.loader.addEventListener('session', r),
          j.loader.initialize(J.appid);
      this.startCasting = function () {
        w || a.jwInstreamState() || h.chrome.cast.requestSession(v, p);
      };
      this.stopCasting = A;
    };
    j.log = function () {
      if (j.debug) {
        var a = Array.prototype.slice.call(arguments, 0);
        console.log.apply(console, a);
      }
    };
    j.error = function () {
      var a = Array.prototype.slice.call(arguments, 0);
      console.error.apply(console, a);
    };
  })(window, jwplayer),
  (function (h, c) {
    function l() {
      c && c.cast && c.cast.isAvailable && !a.apiConfig
        ? ((a.apiConfig = new c.cast.ApiConfig(
            new c.cast.SessionRequest(m),
            e,
            n,
            c.cast.AutoJoinPolicy.ORIGIN_SCOPED,
          )),
          c.cast.initialize(a.apiConfig, b, g))
        : 15 > k++ && setTimeout(l, 1e3);
    }
    function j() {
      q && (q.resetEventListeners(), (q = null));
    }
    function g() {
      a.apiConfig = null;
    }
    function b() {}
    function e(b) {
      a.loader.sendEvent('session', { session: b });
      b.sendMessage(a.NS, { whoami: 1 });
    }
    function n(b) {
      a.availability = b;
      a.loader.sendEvent('availability', { availability: b });
    }
    window.chrome = c;
    var a = h.cast,
      d = h.utils,
      f = h.events,
      q,
      k = 0,
      m = null;
    a.loader = d.extend(
      {
        initialize: function (b) {
          m = b;
          null !== a.availability
            ? a.loader.sendEvent('availability', {
                availability: a.availability,
              })
            : c && c.cast
            ? l()
            : q ||
              ((q = new d.scriptloader(
                'https://www.gstatic.com/cv/js/sender/v1/cast_sender.js',
              )),
              q.addEventListener(f.ERROR, j),
              q.addEventListener(f.COMPLETE, l),
              q.load());
        },
      },
      new f.eventdispatcher('cast.loader'),
    );
  })(window.jwplayer, window.chrome || {}),
  (function (h) {
    function c(b) {
      return function () {
        return b;
      };
    }
    function l() {}
    var j = h.cast,
      g = h.utils,
      b = h.events,
      e = b.state;
    j.provider = function (h) {
      function a(a) {
        q.oldstate = q.newstate;
        q.newstate = a;
        d.sendEvent(b.JWPLAYER_PLAYER_STATE, {
          oldstate: q.oldstate,
          newstate: q.newstate,
        });
      }
      var d = g.extend(this, new b.eventdispatcher('cast.provider')),
        f = -1,
        q = {
          newstate: e.IDLE,
          oldstate: e.IDLE,
          buffer: 0,
          position: 0,
          duration: -1,
          audioMode: !1,
        };
      d.isCaster = !0;
      d.init = function () {};
      d.destroy = function () {
        clearTimeout(f);
        _castSession = null;
      };
      d.updateModel = function (a, c) {
        a.newstate &&
          ((q.newstate = a.newstate),
          (q.oldstate = a.oldstate || q.oldstate),
          d.sendEvent(b.JWPLAYER_PLAYER_STATE, {
            oldstate: q.oldstate,
            newstate: q.newstate,
          }));
        if ('ad' !== c) {
          if (void 0 !== a.position || void 0 !== a.duration)
            void 0 !== a.position && (q.position = a.position),
              void 0 !== a.duration && (q.duration = a.duration),
              d.sendEvent(b.JWPLAYER_MEDIA_TIME, {
                position: q.position,
                duration: q.duration,
              });
          void 0 !== a.buffer &&
            ((q.buffer = a.buffer),
            d.sendEvent(b.JWPLAYER_MEDIA_BUFFER, { bufferPercent: q.buffer }));
        }
      };
      d.supportsFullscreen = function () {
        return !1;
      };
      d.setup = function (b, c) {
        c.state && (q.newstate = c.state);
        void 0 !== c.buffer && (q.buffer = c.buffer);
        void 0 !== b.position && (q.position = b.position);
        void 0 !== b.duration && (q.duration = b.duration);
        a(e.BUFFERING);
        h('setup', b);
      };
      d.playlistItem = function (b) {
        a(e.BUFFERING);
        h('item', b);
      };
      d.load = function (b) {
        a(e.BUFFERING);
        h('load', b);
      };
      d.stop = function () {
        clearTimeout(f);
        f = setTimeout(function () {
          a(e.IDLE);
          h('stop');
        }, 0);
      };
      d.play = function () {
        h('play');
      };
      d.pause = function () {
        a(e.PAUSED);
        h('pause');
      };
      d.seek = function (c) {
        a(e.BUFFERING);
        d.sendEvent(b.JWPLAYER_MEDIA_SEEK, { position: q.position, offset: c });
        h('seek', c);
      };
      d.audioMode = function () {
        return q.audioMode;
      };
      d.sendCommand = function (a, b) {
        h(a, b);
      };
      d.detachMedia = function () {
        j.error('detachMedia called while casting');
        return document.createElement('video');
      };
      d.attachMedia = function () {
        j.error('attachMedia called while casting');
      };
      var k;
      d.setContainer = function (a) {
        k = a;
      };
      d.getContainer = function () {
        return k;
      };
      d.volume = d.mute = d.setControls = d.setCurrentQuality = d.remove = d.resize = d.seekDrag = d.addCaptions = d.resetCaptions = d.setVisibility = d.fsCaptions = l;
      d.setFullScreen = d.getFullScreen = d.checkComplete = c(!1);
      d.getWidth = d.getHeight = d.getCurrentQuality = c(0);
      d.getQualityLevels = c(['Auto']);
    };
  })(window.jwplayer),
  (function (h) {
    function c(a, b) {
      j.foreach(b, function (b, c) {
        var e = a[b];
        'function' == typeof e && e.call(a, c);
      });
    }
    function l(a, b, c) {
      var e = a.style;
      e.backgroundColor = '#000';
      e.color = '#FFF';
      e.width = j.styleDimension(c.width);
      e.height = j.styleDimension(c.height);
      e.display = 'table';
      e.opacity = 1;
      c = document.createElement('p');
      e = c.style;
      e.verticalAlign = 'middle';
      e.textAlign = 'center';
      e.display = 'table-cell';
      e.font = '15px/20px Arial, Helvetica, sans-serif';
      c.innerHTML = b.replace(':', ':\x3cbr\x3e');
      a.innerHTML = '';
      a.appendChild(c);
    }
    var j = h.utils,
      g = h.events,
      b = !0,
      e = !1,
      n = document,
      a = (h.embed = function (d) {
        function f() {
          if (!B)
            if (
              'array' === j.typeOf(u.playlist) &&
              2 > u.playlist.length &&
              (0 === u.playlist.length ||
                !u.playlist[0].sources ||
                0 === u.playlist[0].sources.length)
            )
              m();
            else if (!F)
              if ('string' === j.typeOf(u.playlist))
                (C = new h.playlist.loader()),
                  C.addEventListener(g.JWPLAYER_PLAYLIST_LOADED, function (a) {
                    u.playlist = a.playlist;
                    F = e;
                    f();
                  }),
                  C.addEventListener(g.JWPLAYER_ERROR, function (a) {
                    F = e;
                    m(a);
                  }),
                  (F = b),
                  C.load(u.playlist);
              else if (v.getStatus() == j.loaderstatus.COMPLETE) {
                for (var k = 0; k < u.modes.length; k++)
                  if (u.modes[k].type && a[u.modes[k].type]) {
                    var l = j.extend({}, u),
                      n = new a[u.modes[k].type](E, u.modes[k], l, v, d);
                    if (n.supportsConfig())
                      return (
                        n.addEventListener(g.ERROR, q),
                        n.embed(),
                        j.css('object.jwswf, .jwplayer:focus', {
                          outline: 'none',
                        }),
                        j.css('.jw-tab-focus:focus', {
                          outline: 'solid 2px #0B7EF4',
                        }),
                        c(d, l.events),
                        d
                      );
                  }
                var p;
                u.fallback
                  ? ((p = 'No suitable players found and fallback enabled'),
                    (D = setTimeout(function () {
                      r(p, b);
                    }, 10)),
                    j.log(p),
                    new a.download(E, u, m))
                  : ((p = 'No suitable players found and fallback disabled'),
                    r(p, e),
                    j.log(p),
                    E.parentNode.replaceChild(H, E));
              }
        }
        function q(a) {
          x(A + a.message);
        }
        function k(a) {
          d.dispatchEvent(g.JWPLAYER_ERROR, {
            message: 'Could not load plugin: ' + a.message,
          });
        }
        function m(a) {
          a && a.message
            ? x('Error loading playlist: ' + a.message)
            : x(A + 'No playable sources found');
        }
        function r(a, b) {
          D && (clearTimeout(D), (D = null));
          D = setTimeout(function () {
            D = null;
            d.dispatchEvent(g.JWPLAYER_SETUP_ERROR, {
              message: a,
              fallback: b,
            });
          }, 0);
        }
        function x(a) {
          B || (u.fallback ? ((B = b), l(E, a, u), r(a, b)) : r(a, e));
        }
        var u = new a.config(d.config),
          t = u.width,
          p = u.height,
          A = 'Error loading player: ',
          G = n.getElementById(d.id),
          v = h.plugins.loadPlugins(d.id, u.plugins),
          C,
          F = e,
          B = e,
          D = null,
          H = null;
        u.fallbackDiv && ((H = u.fallbackDiv), delete u.fallbackDiv);
        u.id = d.id;
        u.aspectratio
          ? (d.config.aspectratio = u.aspectratio)
          : delete d.config.aspectratio;
        var E = n.createElement('div');
        E.id = G.id;
        E.style.width = 0 < t.toString().indexOf('%') ? t : t + 'px';
        E.style.height = 0 < p.toString().indexOf('%') ? p : p + 'px';
        G.parentNode.replaceChild(E, G);
        this.embed = function () {
          B ||
            (v.addEventListener(g.COMPLETE, f),
            v.addEventListener(g.ERROR, k),
            v.load());
        };
        this.destroy = function () {
          v && (v.destroy(), (v = null));
          C && (C.resetEventListeners(), (C = null));
        };
        this.errorScreen = x;
        return this;
      });
    h.embed.errorScreen = l;
  })(jwplayer),
  (function (h) {
    function c(b) {
      if (b.playlist)
        for (var c = 0; c < b.playlist.length; c++)
          b.playlist[c] = new g(b.playlist[c]);
      else {
        var h = {};
        j.foreach(g.defaults, function (a) {
          l(b, h, a);
        });
        h.sources ||
          (b.levels
            ? ((h.sources = b.levels), delete b.levels)
            : ((c = {}),
              l(b, c, 'file'),
              l(b, c, 'type'),
              (h.sources = c.file ? [c] : [])));
        b.playlist = [new g(h)];
      }
    }
    function l(b, c, g) {
      j.exists(b[g]) && ((c[g] = b[g]), delete b[g]);
    }
    var j = h.utils,
      g = h.playlist.item;
    (h.embed.config = function (b) {
      var e = {
        fallback: !0,
        height: 270,
        primary: 'html5',
        width: 480,
        base: b.base ? b.base : j.getScriptPath('jwplayer.js'),
        aspectratio: '',
      };
      b = j.extend(e, h.defaults, b);
      var e = { type: 'html5', src: b.base + 'jwplayer.html5.js' },
        g = { type: 'flash', src: b.base + 'jwplayer.flash.swf' };
      b.modes = 'flash' == b.primary ? [g, e] : [e, g];
      b.listbar &&
        ((b.playlistsize = b.listbar.size),
        (b.playlistposition = b.listbar.position),
        (b.playlistlayout = b.listbar.layout));
      b.flashplayer && (g.src = b.flashplayer);
      b.html5player && (e.src = b.html5player);
      c(b);
      g = b.aspectratio;
      if ('string' != typeof g || !j.exists(g)) e = 0;
      else {
        var a = g.indexOf(':');
        -1 == a
          ? (e = 0)
          : ((e = parseFloat(g.substr(0, a))),
            (g = parseFloat(g.substr(a + 1))),
            (e = 0 >= e || 0 >= g ? 0 : 100 * (g / e) + '%'));
      }
      -1 == b.width.toString().indexOf('%')
        ? delete b.aspectratio
        : e
        ? (b.aspectratio = e)
        : delete b.aspectratio;
      return b;
    }).addConfig = function (b, e) {
      c(e);
      return j.extend(b, e);
    };
  })(jwplayer),
  (function (h) {
    var c = h.utils,
      l = document;
    h.embed.download = function (j, g, b) {
      function e(a, b) {
        for (var d = l.querySelectorAll(a), e = 0; e < d.length; e++)
          c.foreach(b, function (a, b) {
            d[e].style[a] = b;
          });
      }
      function h(a, b, c) {
        a = l.createElement(a);
        b && (a.className = 'jwdownload' + b);
        c && c.appendChild(a);
        return a;
      }
      var a = c.extend({}, g),
        d = a.width ? a.width : 480,
        f = a.height ? a.height : 320,
        q;
      g = g.logo ? g.logo : { prefix: c.repo(), file: 'logo.png', margin: 10 };
      var k,
        m,
        r,
        a = a.playlist,
        x,
        u = ['mp4', 'aac', 'mp3'];
      if (a && a.length) {
        x = a[0];
        q = x.sources;
        for (a = 0; a < q.length; a++) {
          var t = q[a],
            p = t.type ? t.type : c.extensionmap.extType(c.extension(t.file));
          t.file &&
            c.foreach(u, function (a) {
              p == u[a]
                ? ((k = t.file), (m = x.image))
                : c.isYouTube(t.file) && (r = t.file);
            });
        }
        k
          ? ((q = k),
            (b = m),
            j &&
              ((a = h('a', 'display', j)),
              h('div', 'icon', a),
              h('div', 'logo', a),
              q && a.setAttribute('href', c.getAbsolutePath(q))),
            (a = '#' + j.id + ' .jwdownload'),
            (j.style.width = ''),
            (j.style.height = ''),
            e(a + 'display', {
              width: c.styleDimension(Math.max(320, d)),
              height: c.styleDimension(Math.max(180, f)),
              background:
                'black center no-repeat ' + (b ? 'url(' + b + ')' : ''),
              backgroundSize: 'contain',
              position: 'relative',
              border: 'none',
              display: 'block',
            }),
            e(a + 'display div', {
              position: 'absolute',
              width: '100%',
              height: '100%',
            }),
            e(a + 'logo', {
              top: g.margin + 'px',
              right: g.margin + 'px',
              background: 'top right no-repeat url(' + g.prefix + g.file + ')',
            }),
            e(a + 'icon', {
              background:
                'center no-repeat url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAgNJREFUeNrs28lqwkAYB/CZqNVDDj2r6FN41QeIy8Fe+gj6BL275Q08u9FbT8ZdwVfotSBYEPUkxFOoks4EKiJdaDuTjMn3wWBO0V/+sySR8SNSqVRKIR8qaXHkzlqS9jCfzzWcTCYp9hF5o+59sVjsiRzcegSckFzcjT+ruN80TeSlAjCAAXzdJSGPFXRpAAMYwACGZQkSdhG4WCzehMNhqV6vG6vVSrirKVEw66YoSqDb7cqlUilE8JjHd/y1MQefVzqdDmiaJpfLZWHgXMHn8F6vJ1cqlVAkEsGuAn83J4gAd2RZymQygX6/L1erVQt+9ZPWb+CDwcCC2zXGJaewl/DhcHhK3DVj+KfKZrMWvFarcYNLomAv4aPRSFZVlTlcSPA5fDweW/BoNIqFnKV53JvncjkLns/n/cLdS+92O7RYLLgsKfv9/t8XlDn4eDyiw+HA9Jyz2eyt0+kY2+3WFC5hluej0Ha7zQQq9PPwdDq1Et1sNsx/nFBgCqWJ8oAK1aUptNVqcYWewE4nahfU0YQnk4ntUEfGMIU2m01HoLaCKbTRaDgKtaVLk9tBYaBcE/6Artdr4RZ5TB6/dC+9iIe/WgAMYADDpAUJAxjAAAYwgGFZgoS/AtNNTF7Z2bL0BYPBV3Jw5xFwwWcYxgtBP5OkE8i9G7aWGOOCruvauwADALMLMEbKf4SdAAAAAElFTkSuQmCC)',
            }))
          : r
          ? ((g = r),
            (j = h('iframe', '', j)),
            (j.src = 'http://www.youtube.com/embed/' + c.youTubeID(g)),
            (j.width = d),
            (j.height = f),
            (j.style.border = 'none'))
          : b();
      }
    };
  })(jwplayer),
  (function (h) {
    var c = h.utils,
      l = h.events,
      j = {};
    (h.embed.flash = function (b, e, n, a, d) {
      function f(a, b, c) {
        var d = document.createElement('param');
        d.setAttribute('name', b);
        d.setAttribute('value', c);
        a.appendChild(d);
      }
      function q(a, b, c) {
        return function () {
          try {
            c && document.getElementById(d.id + '_wrapper').appendChild(b);
            var e = document.getElementById(d.id).getPluginConfig('display');
            'function' == typeof a.resize && a.resize(e.width, e.height);
            b.style.left = e.x;
            b.style.top = e.h;
          } catch (f) {}
        };
      }
      function k(a) {
        if (!a) return {};
        var b = {},
          d = [];
        c.foreach(a, function (a, e) {
          var f = c.getPluginName(a);
          d.push(a);
          c.foreach(e, function (a, c) {
            b[f + '.' + a] = c;
          });
        });
        b.plugins = d.join(',');
        return b;
      }
      var m = new h.events.eventdispatcher(),
        r = c.flashVersion();
      c.extend(this, m);
      this.embed = function () {
        n.id = d.id;
        if (10 > r)
          return (
            m.sendEvent(l.ERROR, {
              message: 'Flash version must be 10.0 or greater',
            }),
            !1
          );
        var g,
          h,
          t = d.config.listbar,
          p = c.extend({}, n);
        if (b.id + '_wrapper' == b.parentNode.id)
          g = document.getElementById(b.id + '_wrapper');
        else {
          g = document.createElement('div');
          h = document.createElement('div');
          h.style.display = 'none';
          h.id = b.id + '_aspect';
          g.id = b.id + '_wrapper';
          g.style.position = 'relative';
          g.style.display = 'block';
          g.style.width = c.styleDimension(p.width);
          g.style.height = c.styleDimension(p.height);
          if (d.config.aspectratio) {
            var A = parseFloat(d.config.aspectratio);
            h.style.display = 'block';
            h.style.marginTop = d.config.aspectratio;
            g.style.height = 'auto';
            g.style.display = 'inline-block';
            t &&
              ('bottom' == t.position
                ? (h.style.paddingBottom = t.size + 'px')
                : 'right' == t.position &&
                  (h.style.marginBottom = -1 * t.size * (A / 100) + 'px'));
          }
          b.parentNode.replaceChild(g, b);
          g.appendChild(b);
          g.appendChild(h);
        }
        g = a.setupPlugins(d, p, q);
        0 < g.length ? c.extend(p, k(g.plugins)) : delete p.plugins;
        'undefined' != typeof p['dock.position'] &&
          'false' == p['dock.position'].toString().toLowerCase() &&
          ((p.dock = p['dock.position']), delete p['dock.position']);
        g = p.wmode
          ? p.wmode
          : p.height && 40 >= p.height
          ? 'transparent'
          : 'opaque';
        h = 'height width modes events primary base fallback volume'.split(' ');
        for (t = 0; t < h.length; t++) delete p[h[t]];
        h = c.getCookies();
        c.foreach(h, function (a, b) {
          'undefined' == typeof p[a] && (p[a] = b);
        });
        h = window.location.href.split('/');
        h.splice(h.length - 1, 1);
        h = h.join('/');
        p.base = h + '/';
        j[b.id] = p;
        c.isMSIE()
          ? ((h =
              '\x3cobject classid\x3d"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" " width\x3d"100%" height\x3d"100%"id\x3d"' +
              b.id +
              '" name\x3d"' +
              b.id +
              '" tabindex\x3d0""\x3e'),
            (h += '\x3cparam name\x3d"movie" value\x3d"' + e.src + '"\x3e'),
            (h +=
              '\x3cparam name\x3d"allowfullscreen" value\x3d"true"\x3e\x3cparam name\x3d"allowscriptaccess" value\x3d"always"\x3e'),
            (h += '\x3cparam name\x3d"seamlesstabbing" value\x3d"true"\x3e'),
            (h += '\x3cparam name\x3d"wmode" value\x3d"' + g + '"\x3e'),
            (h += '\x3cparam name\x3d"bgcolor" value\x3d"#000000"\x3e'),
            (h += '\x3c/object\x3e'),
            (b.outerHTML = h),
            (g = document.getElementById(b.id)))
          : ((h = document.createElement('object')),
            h.setAttribute('type', 'application/x-shockwave-flash'),
            h.setAttribute('data', e.src),
            h.setAttribute('width', '100%'),
            h.setAttribute('height', '100%'),
            h.setAttribute('bgcolor', '#000000'),
            h.setAttribute('id', b.id),
            h.setAttribute('name', b.id),
            (h.className = 'jwswf'),
            f(h, 'allowfullscreen', 'true'),
            f(h, 'allowscriptaccess', 'always'),
            f(h, 'seamlesstabbing', 'true'),
            f(h, 'wmode', g),
            b.parentNode.replaceChild(h, b),
            (g = h));
        d.config.aspectratio && (g.style.position = 'absolute');
        d.container = g;
        d.setPlayer(g, 'flash');
      };
      this.supportsConfig = function () {
        if (r)
          if (n) {
            if ('string' == c.typeOf(n.playlist)) return !0;
            try {
              var a = n.playlist[0].sources;
              if ('undefined' == typeof a) return !0;
              for (var b = 0; b < a.length; b++)
                if (a[b].file && g(a[b].file, a[b].type)) return !0;
            } catch (d) {}
          } else return !0;
        return !1;
      };
    }).getVars = function (b) {
      return j[b];
    };
    var g = (h.embed.flashCanPlay = function (b, e) {
      if (c.isYouTube(b) || c.isRtmp(b, e) || 'hls' == e) return !0;
      var g = c.extensionmap[e ? e : c.extension(b)];
      return !g ? !1 : !!g.flash;
    });
  })(jwplayer),
  (function (h) {
    function c(b, c, g) {
      if (null !== navigator.userAgent.match(/BlackBerry/i)) return !1;
      if ('youtube' === c || l.isYouTube(b)) return !0;
      var a = l.extension(b);
      c = c || j.extType(a);
      if ('hls' === c)
        if (g) {
          g = l.isAndroidNative;
          if (g(2) || g(3) || g('4.0')) return !1;
          if (l.isAndroid()) return !0;
        } else if (l.isAndroid()) return !1;
      if (l.isRtmp(b, c)) return !1;
      b = j[c] || j[a];
      if (!b || (b.flash && !b.html5)) return !1;
      var d;
      a: if ((b = b.html5)) {
        try {
          d = !!h.vid.canPlayType(b);
          break a;
        } catch (f) {}
        d = !1;
      } else d = !0;
      return d;
    }
    var l = h.utils,
      j = l.extensionmap,
      g = h.events;
    h.embed.html5 = function (b, e, j, a, d) {
      function f(a, c, d) {
        return function () {
          try {
            var e = document.querySelector('#' + b.id + ' .jwmain');
            d && e.appendChild(c);
            'function' == typeof a.resize &&
              (a.resize(e.clientWidth, e.clientHeight),
              setTimeout(function () {
                a.resize(e.clientWidth, e.clientHeight);
              }, 400));
            c.left = e.style.left;
            c.top = e.style.top;
          } catch (f) {}
        };
      }
      function q(a) {
        k.sendEvent(a.type, { message: 'HTML5 player not found' });
      }
      var k = this,
        m = new g.eventdispatcher();
      l.extend(k, m);
      k.embed = function () {
        if (h.html5) {
          a.setupPlugins(d, j, f);
          b.innerHTML = '';
          var c = h.utils.extend({}, j);
          delete c.volume;
          c = new h.html5.player(c);
          d.container = document.getElementById(d.id);
          d.setPlayer(c, 'html5');
        } else
          (c = new l.scriptloader(e.src)),
            c.addEventListener(g.ERROR, q),
            c.addEventListener(g.COMPLETE, k.embed),
            c.load();
      };
      k.supportsConfig = function () {
        if (h.vid.canPlayType)
          try {
            if ('string' == l.typeOf(j.playlist)) return !0;
            for (var a = j.playlist[0].sources, b = 0; b < a.length; b++)
              if (c(a[b].file, a[b].type, j.androidhls)) return !0;
          } catch (d) {}
        return !1;
      };
    };
    h.embed.html5CanPlay = c;
  })(jwplayer),
  (function (h) {
    var c = h.embed,
      l = h.utils,
      j = /\.(js|swf)$/;
    h.embed = l.extend(function (g) {
      function b() {
        t = 'Adobe SiteCatalyst Error: Could not find Media Module';
      }
      var e = l.repo(),
        n = l.extend({}, h.defaults),
        a = l.extend({}, n, g.config),
        d = g.config,
        f = a.plugins,
        q = a.analytics,
        k = e + 'jwpsrv.js',
        m = e + 'sharing.js',
        r = e + 'related.js',
        x = e + 'gapro.js',
        n = h.key ? h.key : n.key,
        u = new h.utils.key(n).edition(),
        t,
        f = f ? f : {};
      'ads' == u &&
        a.advertising &&
        (j.test(a.advertising.client)
          ? (f[a.advertising.client] = a.advertising)
          : (f[e + a.advertising.client + '.js'] = a.advertising));
      delete d.advertising;
      d.key = n;
      a.analytics && j.test(a.analytics.client) && (k = a.analytics.client);
      delete d.analytics;
      q && !('ads' === u || 'enterprise' === u) && delete q.enabled;
      if ('free' == u || !q || !1 !== q.enabled) f[k] = q ? q : {};
      delete f.sharing;
      delete f.related;
      switch (u) {
        case 'ads':
        case 'enterprise':
          if (d.sitecatalyst)
            try {
              window.s && window.s.hasOwnProperty('Media')
                ? new h.embed.sitecatalyst(g)
                : b();
            } catch (p) {
              b();
            }
        case 'premium':
          a.related &&
            (j.test(a.related.client) && (r = a.related.client),
            (f[r] = a.related)),
            a.ga && (j.test(a.ga.client) && (x = a.ga.client), (f[x] = a.ga));
        case 'pro':
          a.sharing &&
            (j.test(a.sharing.client) && (m = a.sharing.client),
            (f[m] = a.sharing)),
            a.skin &&
              (d.skin = a.skin.replace(
                /^(beelden|bekle|five|glow|modieus|roundster|stormtrooper|vapor)$/i,
                l.repo() + 'skins/$1.xml',
              ));
      }
      d.plugins = f;
      g.config = d;
      g = new c(g);
      t && g.errorScreen(t);
      return g;
    }, h.embed);
  })(jwplayer),
  (function (h) {
    var c = jwplayer.utils;
    h.sitecatalyst = function (h) {
      function j(b) {
        a.debug && c.log(b);
      }
      function g(a) {
        a = a.split('/');
        a = a[a.length - 1];
        a = a.split('?');
        return a[0];
      }
      function b() {
        if (!m) {
          m = !0;
          var a = n.getPosition();
          j('stop: ' + f + ' : ' + a);
          s.Media.stop(f, a);
        }
      }
      function e() {
        r ||
          (b(),
          (r = !0),
          j('close: ' + f),
          s.Media.close(f),
          (x = !0),
          (k = 0));
      }
      var n = h,
        a = c.extend({}, n.config.sitecatalyst),
        d = {
          onPlay: function () {
            if (!x) {
              var a = n.getPosition();
              m = !1;
              j('play: ' + f + ' : ' + a);
              s.Media.play(f, a);
            }
          },
          onPause: b,
          onBuffer: b,
          onIdle: e,
          onPlaylistItem: function (b) {
            try {
              x = !0;
              e();
              k = 0;
              var d;
              if (a.mediaName) d = a.mediaName;
              else {
                var h = n.getPlaylistItem(b.index);
                d = h.title
                  ? h.title
                  : h.file
                  ? g(h.file)
                  : h.sources && h.sources.length
                  ? g(h.sources[0].file)
                  : '';
              }
              f = d;
              q = a.playerName ? a.playerName : n.id;
            } catch (j) {
              c.log(j);
            }
          },
          onTime: function () {
            if (x) {
              var a = n.getDuration();
              if (-1 == a) return;
              r = m = x = !1;
              j('open: ' + f + ' : ' + a + ' : ' + q);
              s.Media.open(f, a, q);
              j('play: ' + f + ' : 0');
              s.Media.play(f, 0);
            }
            a = n.getPosition();
            if (3 <= Math.abs(a - k)) {
              var b = k;
              j('seek: ' + b + ' to ' + a);
              j('stop: ' + f + ' : ' + b);
              s.Media.stop(f, b);
              j('play: ' + f + ' : ' + a);
              s.Media.play(f, a);
            }
            k = a;
          },
          onComplete: e,
        },
        f,
        q,
        k,
        m = !0,
        r = !0,
        x;
      c.foreach(d, function (a) {
        n[a](d[a]);
      });
    };
  })(jwplayer.embed),
  (function (h, c) {
    var l = [],
      j = h.utils,
      g = h.events,
      b = g.state,
      e = document,
      n = 'getBuffer getCaptionsList getControls getCurrentCaptions getCurrentQuality getDuration getFullscreen getHeight getLockState getMute getPlaylistIndex getSafeRegion getPosition getQualityLevels getState getVolume getWidth isBeforeComplete isBeforePlay releaseState'.split(
        ' ',
      ),
      a = 'playlistNext stop forceState playlistPrev seek setCurrentCaptions setControls setCurrentQuality setVolume'.split(
        ' ',
      ),
      d = {
        onBufferChange: g.JWPLAYER_MEDIA_BUFFER,
        onBufferFull: g.JWPLAYER_MEDIA_BUFFER_FULL,
        onError: g.JWPLAYER_ERROR,
        onSetupError: g.JWPLAYER_SETUP_ERROR,
        onFullscreen: g.JWPLAYER_FULLSCREEN,
        onMeta: g.JWPLAYER_MEDIA_META,
        onMute: g.JWPLAYER_MEDIA_MUTE,
        onPlaylist: g.JWPLAYER_PLAYLIST_LOADED,
        onPlaylistItem: g.JWPLAYER_PLAYLIST_ITEM,
        onPlaylistComplete: g.JWPLAYER_PLAYLIST_COMPLETE,
        onReady: g.API_READY,
        onResize: g.JWPLAYER_RESIZE,
        onComplete: g.JWPLAYER_MEDIA_COMPLETE,
        onSeek: g.JWPLAYER_MEDIA_SEEK,
        onTime: g.JWPLAYER_MEDIA_TIME,
        onVolume: g.JWPLAYER_MEDIA_VOLUME,
        onBeforePlay: g.JWPLAYER_MEDIA_BEFOREPLAY,
        onBeforeComplete: g.JWPLAYER_MEDIA_BEFORECOMPLETE,
        onDisplayClick: g.JWPLAYER_DISPLAY_CLICK,
        onControls: g.JWPLAYER_CONTROLS,
        onQualityLevels: g.JWPLAYER_MEDIA_LEVELS,
        onQualityChange: g.JWPLAYER_MEDIA_LEVEL_CHANGED,
        onCaptionsList: g.JWPLAYER_CAPTIONS_LIST,
        onCaptionsChange: g.JWPLAYER_CAPTIONS_CHANGED,
        onAdError: g.JWPLAYER_AD_ERROR,
        onAdClick: g.JWPLAYER_AD_CLICK,
        onAdImpression: g.JWPLAYER_AD_IMPRESSION,
        onAdTime: g.JWPLAYER_AD_TIME,
        onAdComplete: g.JWPLAYER_AD_COMPLETE,
        onAdCompanions: g.JWPLAYER_AD_COMPANIONS,
        onAdSkipped: g.JWPLAYER_AD_SKIPPED,
        onAdPlay: g.JWPLAYER_AD_PLAY,
        onAdPause: g.JWPLAYER_AD_PAUSE,
        onAdMeta: g.JWPLAYER_AD_META,
        onCast: g.JWPLAYER_CAST_SESSION,
      },
      f = {
        onBuffer: b.BUFFERING,
        onPause: b.PAUSED,
        onPlay: b.PLAYING,
        onIdle: b.IDLE,
      };
    h.api = function (l) {
      function k(a, b) {
        j.foreach(a, function (a, c) {
          p[a] = function (a) {
            return b(c, a);
          };
        });
      }
      function m(a, b) {
        var c = 'jw' + b.charAt(0).toUpperCase() + b.slice(1);
        p[b] = function () {
          var b = t.apply(
            this,
            [c].concat(Array.prototype.slice.call(arguments, 0)),
          );
          return a ? p : b;
        };
      }
      function r(a) {
        F = [];
        D && D.destroy && D.destroy();
        h.api.destroyPlayer(a.id);
      }
      function x(a, b) {
        try {
          a.jwAddEventListener(
            b,
            'function(dat) { jwplayer("' +
              p.id +
              '").dispatchEvent("' +
              b +
              '", dat); }',
          );
        } catch (c) {
          j.log('Could not add internal listener');
        }
      }
      function u(a, b) {
        A[a] || ((A[a] = []), v && C && x(v, a));
        A[a].push(b);
        return p;
      }
      function t() {
        if (C) {
          if (v) {
            var a = Array.prototype.slice.call(arguments, 0),
              b = a.shift();
            if ('function' === typeof v[b]) {
              switch (a.length) {
                case 6:
                  return v[b](a[0], a[1], a[2], a[3], a[4], a[5]);
                case 5:
                  return v[b](a[0], a[1], a[2], a[3], a[4]);
                case 4:
                  return v[b](a[0], a[1], a[2], a[3]);
                case 3:
                  return v[b](a[0], a[1], a[2]);
                case 2:
                  return v[b](a[0], a[1]);
                case 1:
                  return v[b](a[0]);
              }
              return v[b]();
            }
          }
          return null;
        }
        F.push(arguments);
      }
      var p = this,
        A = {},
        G = {},
        v,
        C = !1,
        F = [],
        B,
        D,
        H = {},
        E = {};
      p.container = l;
      p.id = l.id;
      p.setup = function (a) {
        if (h.embed) {
          var b = e.getElementById(p.id);
          b && (a.fallbackDiv = b);
          r(p);
          b = h(p.id);
          b.config = a;
          D = new h.embed(b);
          D.embed();
          return b;
        }
        return p;
      };
      p.getContainer = function () {
        return p.container;
      };
      p.addButton = function (a, b, c, d) {
        try {
          (E[d] = c),
            t(
              'jwDockAddButton',
              a,
              b,
              "jwplayer('" + p.id + "').callback('" + d + "')",
              d,
            );
        } catch (e) {
          j.log('Could not add dock button' + e.message);
        }
      };
      p.removeButton = function (a) {
        t('jwDockRemoveButton', a);
      };
      p.callback = function (a) {
        if (E[a]) E[a]();
      };
      p.getMeta = function () {
        return p.getItemMeta();
      };
      p.getPlaylist = function () {
        var a = t('jwGetPlaylist');
        'flash' == p.renderingMode &&
          j.deepReplaceKeyName(
            a,
            ['__dot__', '__spc__', '__dsh__', '__default__'],
            ['.', ' ', '-', 'default'],
          );
        return a;
      };
      p.getPlaylistItem = function (a) {
        j.exists(a) || (a = p.getPlaylistIndex());
        return p.getPlaylist()[a];
      };
      p.getRenderingMode = function () {
        return p.renderingMode;
      };
      p.setFullscreen = function (a) {
        j.exists(a)
          ? t('jwSetFullscreen', a)
          : t('jwSetFullscreen', !t('jwGetFullscreen'));
        return p;
      };
      p.setMute = function (a) {
        j.exists(a) ? t('jwSetMute', a) : t('jwSetMute', !t('jwGetMute'));
        return p;
      };
      p.lock = function () {
        return p;
      };
      p.unlock = function () {
        return p;
      };
      p.load = function (a) {
        t('jwInstreamDestroy');
        h(p.id).plugins.googima && t('jwDestroyGoogima');
        t('jwLoad', a);
        return p;
      };
      p.playlistItem = function (a) {
        t('jwPlaylistItem', parseInt(a, 10));
        return p;
      };
      p.resize = function (a, b) {
        if ('flash' !== p.renderingMode) t('jwResize', a, b);
        else {
          var c = e.getElementById(p.id + '_wrapper'),
            d = e.getElementById(p.id + '_aspect');
          d && (d.style.display = 'none');
          c &&
            ((c.style.display = 'block'),
            (c.style.width = j.styleDimension(a)),
            (c.style.height = j.styleDimension(b)));
        }
        return p;
      };
      p.play = function (a) {
        if (a !== c) return t('jwPlay', a), p;
        a = p.getState();
        var d = B && B.getState();
        d
          ? d === b.IDLE || d === b.PLAYING || d === b.BUFFERING
            ? t('jwInstreamPause')
            : t('jwInstreamPlay')
          : a == b.PLAYING || a == b.BUFFERING
          ? t('jwPause')
          : t('jwPlay');
        return p;
      };
      p.pause = function (a) {
        a === c
          ? ((a = p.getState()),
            a == b.PLAYING || a == b.BUFFERING ? t('jwPause') : t('jwPlay'))
          : t('jwPause', a);
        return p;
      };
      p.createInstream = function () {
        return new h.api.instream(this, v);
      };
      p.setInstream = function (a) {
        return (B = a);
      };
      p.loadInstream = function (a, b) {
        B = p.setInstream(p.createInstream()).init(b);
        B.loadItem(a);
        return B;
      };
      p.destroyPlayer = function () {
        t('jwPlayerDestroy');
      };
      p.playAd = function (a) {
        var b = h(p.id).plugins;
        b.vast ? b.vast.jwPlayAd(a) : t('jwPlayAd', a);
      };
      p.pauseAd = function () {
        var a = h(p.id).plugins;
        a.vast ? a.vast.jwPauseAd() : t('jwPauseAd');
      };
      k(f, function (a, b) {
        G[a] ||
          ((G[a] = []),
          u(g.JWPLAYER_PLAYER_STATE, function (b) {
            var c = b.newstate;
            b = b.oldstate;
            if (c == a) {
              var d = G[c];
              if (d)
                for (var e = 0; e < d.length; e++) {
                  var f = d[e];
                  'function' == typeof f &&
                    f.call(this, { oldstate: b, newstate: c });
                }
            }
          }));
        G[a].push(b);
        return p;
      });
      k(d, u);
      j.foreach(n, function (a, b) {
        m(!1, b);
      });
      j.foreach(a, function (a, b) {
        m(!0, b);
      });
      p.remove = function () {
        if (!C) throw 'Cannot call remove() before player is ready';
        r(this);
      };
      p.registerPlugin = function (a, b, c, d) {
        h.plugins.registerPlugin(a, b, c, d);
      };
      p.setPlayer = function (a, b) {
        v = a;
        p.renderingMode = b;
      };
      p.detachMedia = function () {
        if ('html5' == p.renderingMode) return t('jwDetachMedia');
      };
      p.attachMedia = function (a) {
        if ('html5' == p.renderingMode) return t('jwAttachMedia', a);
      };
      p.removeEventListener = function (a, b) {
        var c = A[a];
        if (c) for (var d = c.length; d--; ) c[d] === b && c.splice(d, 1);
      };
      p.dispatchEvent = function (a, b) {
        var c = A[a];
        if (c)
          for (
            var c = c.slice(0), d = j.translateEventResponse(a, b), e = 0;
            e < c.length;
            e++
          ) {
            var f = c[e];
            if ('function' === typeof f)
              try {
                a === g.JWPLAYER_PLAYLIST_LOADED &&
                  j.deepReplaceKeyName(
                    d.playlist,
                    ['__dot__', '__spc__', '__dsh__', '__default__'],
                    ['.', ' ', '-', 'default'],
                  ),
                  f.call(this, d);
              } catch (h) {
                j.log('There was an error calling back an event handler');
              }
          }
      };
      p.dispatchInstreamEvent = function (a) {
        B && B.dispatchEvent(a, arguments);
      };
      p.callInternal = t;
      p.playerReady = function (a) {
        C = !0;
        v || p.setPlayer(e.getElementById(a.id));
        p.container = e.getElementById(p.id);
        j.foreach(A, function (a) {
          x(v, a);
        });
        u(g.JWPLAYER_PLAYLIST_ITEM, function () {
          H = {};
        });
        u(g.JWPLAYER_MEDIA_META, function (a) {
          j.extend(H, a.metadata);
        });
        u(g.JWPLAYER_VIEW_TAB_FOCUS, function (a) {
          var b = p.getContainer();
          !0 === a.hasFocus
            ? j.addClass(b, 'jw-tab-focus')
            : j.removeClass(b, 'jw-tab-focus');
        });
        for (p.dispatchEvent(g.API_READY); 0 < F.length; )
          t.apply(this, F.shift());
      };
      p.getItemMeta = function () {
        return H;
      };
      return p;
    };
    h.playerReady = function (a) {
      var b = h.api.playerById(a.id);
      b ? b.playerReady(a) : h.api.selectPlayer(a.id).playerReady(a);
    };
    h.api.selectPlayer = function (a) {
      var b;
      j.exists(a) || (a = 0);
      a.nodeType ? (b = a) : 'string' == typeof a && (b = e.getElementById(a));
      return b
        ? (a = h.api.playerById(b.id))
          ? a
          : h.api.addPlayer(new h.api(b))
        : 'number' == typeof a
        ? l[a]
        : null;
    };
    h.api.playerById = function (a) {
      for (var b = 0; b < l.length; b++) if (l[b].id == a) return l[b];
      return null;
    };
    h.api.addPlayer = function (a) {
      for (var b = 0; b < l.length; b++) if (l[b] == a) return a;
      l.push(a);
      return a;
    };
    h.api.destroyPlayer = function (a) {
      var b, d, f;
      j.foreach(l, function (c, e) {
        e.id === a && ((b = c), (d = e));
      });
      if (b === c || d === c) return null;
      j.clearCss('#' + d.id);
      if (
        (f = e.getElementById(
          d.id + ('flash' == d.renderingMode ? '_wrapper' : ''),
        ))
      ) {
        'html5' === d.renderingMode && d.destroyPlayer();
        var g = e.createElement('div');
        g.id = d.id;
        f.parentNode.replaceChild(g, f);
      }
      l.splice(b, 1);
      return null;
    };
  })(window.jwplayer),
  (function (h) {
    var c = h.events,
      l = h.utils,
      j = c.state;
    h.api.instream = function (g, b) {
      function e(a, c) {
        f[a] ||
          ((f[a] = []),
          b.jwInstreamAddEventListener(
            a,
            'function(dat) { jwplayer("' +
              g.id +
              '").dispatchInstreamEvent("' +
              a +
              '", dat); }',
          ));
        f[a].push(c);
        return this;
      }
      function h(a, b) {
        q[a] ||
          ((q[a] = []),
          e(c.JWPLAYER_PLAYER_STATE, function (b) {
            var c = b.newstate,
              d = b.oldstate;
            if (c == a) {
              var e = q[c];
              if (e)
                for (var f = 0; f < e.length; f++) {
                  var g = e[f];
                  'function' == typeof g &&
                    g.call(this, { oldstate: d, newstate: c, type: b.type });
                }
            }
          }));
        q[a].push(b);
        return this;
      }
      var a,
        d,
        f = {},
        q = {},
        k = this;
      k.type = 'instream';
      k.init = function () {
        g.callInternal('jwInitInstream');
        return k;
      };
      k.loadItem = function (b, c) {
        a = b;
        d = c || {};
        'array' == l.typeOf(b)
          ? g.callInternal('jwLoadArrayInstream', a, d)
          : g.callInternal('jwLoadItemInstream', a, d);
      };
      k.removeEvents = function () {
        f = q = {};
      };
      k.removeEventListener = function (a, b) {
        var c = f[a];
        if (c) for (var d = c.length; d--; ) c[d] === b && c.splice(d, 1);
      };
      k.dispatchEvent = function (a, b) {
        var c = f[a];
        if (c)
          for (
            var c = c.slice(0), d = l.translateEventResponse(a, b[1]), e = 0;
            e < c.length;
            e++
          ) {
            var g = c[e];
            'function' == typeof g && g.call(this, d);
          }
      };
      k.onError = function (a) {
        return e(c.JWPLAYER_ERROR, a);
      };
      k.onMediaError = function (a) {
        return e(c.JWPLAYER_MEDIA_ERROR, a);
      };
      k.onFullscreen = function (a) {
        return e(c.JWPLAYER_FULLSCREEN, a);
      };
      k.onMeta = function (a) {
        return e(c.JWPLAYER_MEDIA_META, a);
      };
      k.onMute = function (a) {
        return e(c.JWPLAYER_MEDIA_MUTE, a);
      };
      k.onComplete = function (a) {
        return e(c.JWPLAYER_MEDIA_COMPLETE, a);
      };
      k.onPlaylistComplete = function (a) {
        return e(c.JWPLAYER_PLAYLIST_COMPLETE, a);
      };
      k.onPlaylistItem = function (a) {
        return e(c.JWPLAYER_PLAYLIST_ITEM, a);
      };
      k.onTime = function (a) {
        return e(c.JWPLAYER_MEDIA_TIME, a);
      };
      k.onBuffer = function (a) {
        return h(j.BUFFERING, a);
      };
      k.onPause = function (a) {
        return h(j.PAUSED, a);
      };
      k.onPlay = function (a) {
        return h(j.PLAYING, a);
      };
      k.onIdle = function (a) {
        return h(j.IDLE, a);
      };
      k.onClick = function (a) {
        return e(c.JWPLAYER_INSTREAM_CLICK, a);
      };
      k.onInstreamDestroyed = function (a) {
        return e(c.JWPLAYER_INSTREAM_DESTROYED, a);
      };
      k.onAdSkipped = function (a) {
        return e(c.JWPLAYER_AD_SKIPPED, a);
      };
      k.play = function (a) {
        b.jwInstreamPlay(a);
      };
      k.pause = function (a) {
        b.jwInstreamPause(a);
      };
      k.hide = function () {
        g.callInternal('jwInstreamHide');
      };
      k.destroy = function () {
        k.removeEvents();
        g.callInternal('jwInstreamDestroy');
      };
      k.setText = function (a) {
        b.jwInstreamSetText(a ? a : '');
      };
      k.getState = function () {
        return b.jwInstreamState();
      };
      k.setClick = function (a) {
        b.jwInstreamClick && b.jwInstreamClick(a);
      };
    };
  })(window.jwplayer),
  (function (h) {
    var c = h.api,
      l = c.selectPlayer;
    c.selectPlayer = function (c) {
      return (c = l(c))
        ? c
        : {
            registerPlugin: function (c, b, e) {
              h.plugins.registerPlugin(c, b, e);
            },
          };
    };
  })(jwplayer));

jwplayer.key = 'tUDnDci0Yte6zMf/qry/nKMxIBmS1c4e95AGtw==';
