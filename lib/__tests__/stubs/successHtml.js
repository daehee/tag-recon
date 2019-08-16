module.exports.successHtml = `
<html class="no-js">
  <head>
    <script>
      (function(a, s, y, n, c, h, i, d, e) {
        s.className += " " + y;
        h.start = 1 * new Date();
        h.end = i = function() {
          s.className = s.className.replace(RegExp(" ?" + y), "");
        };
        (a[n] = a[n] || []).hide = h;
        setTimeout(function() {
          i();
          h.end = null;
        }, c);
        h.timeout = c;
      })(window, document.documentElement, "async-hide", "dataLayer", 4000, {
        "GTM-WD7CWT4": true
      });
    </script>
    <script>
      (function(w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
        var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s),
          dl = l != "dataLayer" ? "&l=" + l : "";
        j.async = true;
        j.src =
          "https://www.googletagmanager.com/gtm.js?id=" +
          i +
          dl +
          "&gtm_auth=nVO7sLhHpfSMZ5opsyT8zg&gtm_preview=env-2&gtm_cookies_win=x";
        f.parentNode.insertBefore(j, f);
      })(window, document, "script", "dataLayer", "GTM-WD7CWT4");
    </script>
    <script>
      !(function(f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function() {
          n.callMethod
            ? n.callMethod.apply(n, arguments)
            : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = "2.0";
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(
        window,
        document,
        "script",
        "https://connect.facebook.net/en_US/fbevents.js"
      );
      fbq("init", "1358762697511092"); // Insert your pixel ID here.
      fbq("track", "PageView");
    </script>
    <noscript
      ><img
        height="1"
        width="1"
        style="display:none"
        src="https://www.facebook.com/tr?id=1358762697511092&ev=PageView&noscript=1"
    /></noscript>

    <script type="text/javascript">
      var _vwo_code = (function() {
        var account_id = 380580,
          settings_tolerance = 2000,
          library_tolerance = 2500,
          use_existing_jquery = false,
          /* DO NOT EDIT BELOW THIS LINE */
          f = false,
          d = document;
        return {
          use_existing_jquery: function() {
            return use_existing_jquery;
          },
          library_tolerance: function() {
            return library_tolerance;
          },
          finish: function() {
            if (!f) {
              f = true;
              var a = d.getElementById("_vis_opt_path_hides");
              if (a) a.parentNode.removeChild(a);
            }
          },
          finished: function() {
            return f;
          },
          load: function(a) {
            var b = d.createElement("script");
            b.src = a;
            b.type = "text/javascript";
            b.innerText;
            b.onerror = function() {
              _vwo_code.finish();
            };
            d.getElementsByTagName("head")[0].appendChild(b);
          },
          init: function() {
            settings_timer = setTimeout(
              "_vwo_code.finish()",
              settings_tolerance
            );
            var a = d.createElement("style"),
              b =
                "body{opacity:0 !important;filter:alpha(opacity=0) !important;background:none !important;}",
              h = d.getElementsByTagName("head")[0];
            a.setAttribute("id", "_vis_opt_path_hides");
            a.setAttribute("type", "text/css");
            if (a.styleSheet) a.styleSheet.cssText = b;
            else a.appendChild(d.createTextNode(b));
            h.appendChild(a);
            this.load(
              "//dev.visualwebsiteoptimizer.com/j.php?a=" +
                account_id +
                "&u=" +
                encodeURIComponent(d.URL) +
                "&r=" +
                Math.random()
            );
            return settings_timer;
          }
        };
      })();
      _vwo_settings_timer = _vwo_code.init();

      function setJsDownloadEvent(parent_url, dependent_urls) {
        var jq = document.createElement("script");
        if (parent_url instanceof Array && parent_url.length > 1) {
          //first load url count greate than 1 means sequencial url load required
          jq.src = parent_url.shift();
          document.head.appendChild(jq);

          if (dependent_urls.length) {
            if (jq.addEventListener)
              jq.addEventListener(
                "load",
                function() {
                  setJsDownloadEvent(parent_url, dependent_urls);
                },
                false
              );
            else if (jq.attachEvent)
              jq.attachEvent("onload", function() {
                setJsDownloadEvent(parent_url, dependent_urls);
              });
            else
              jq.onload = function() {
                setJsDownloadEvent(parent_url, dependent_urls);
              };
          }
        } else {
          //Only one first load js exist
          if (parent_url instanceof Array && parent_url.length == 1) {
            jq.src = parent_url[0];
          } else {
            jq.src = parent_url;
          }
          document.head.appendChild(jq);

          if (dependent_urls.length) {
            if (jq.addEventListener)
              jq.addEventListener(
                "load",
                function() {
                  downloadJSAtOnload(dependent_urls);
                },
                false
              );
            else if (jq.attachEvent)
              jq.attachEvent("onload", function() {
                downloadJSAtOnload(dependent_urls);
              });
            else
              jq.onload = function() {
                downloadJSAtOnload(dependent_urls);
              };
          }
        }
      }
      function downloadJSAtOnload(dependent_urls) {
        for (urlVar in dependent_urls) {
          if (typeof dependent_urls[urlVar] == "function") {
            dependent_urls[urlVar].call();
          } else {
            var element = document.createElement("script");
            element.src = dependent_urls[urlVar];
            document.head.appendChild(element);
          }
          //console.log(dependent_urls[urlVar]);
        }
      }
    </script>
  </head>
  <body>
    <noscript
      ><iframe
        src="https://www.googletagmanager.com/ns.html?id=GTM-WD7CWT4&gtm_auth=nVO7sLhHpfSMZ5opsyT8zg&gtm_preview=env-2&gtm_cookies_win=x"
        height="0"
        width="0"
        style="display:none;visibility:hidden"
      ></iframe
    ></noscript>
  </body>
</html>
`;
