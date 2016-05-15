(function() {
  const data = {
    language: 'template',
    prepare: [
      {
        pat: /\:\/\//gm,
        rep: '\:\/\\\/'
      }
    ],
    execute: [
      {
        custom: '([\'](.*?)[\']|[\"](.*?)[\"])',
        pat: /.+/gm,
        rep: '<span id="value">$&</span>'
      },
      {
        custom: '\\b(abstract|arguments|boolean|break|byte|case|catch|char|class|const|continue|debugger|default|delete|do|double|else|enum|eval|export|extends|false|final|finally|float|for|function|goto|if|implements|import|in|instanceof|int|interface|let|long|native|new|null|package|private|protected|public|return|short|static|super|switch|synchronized|this|throw|throws|transient|true|try|typeof|var|void|volatile|while|with|yield)\\b',
        pat: /.+/gm,
        rep: '<span id="attribute">$&</span>'
      },
      {
        custom: '\\b(alert|all|anchor|anchors|area|assign|blur|button|checkbox|clearInterval|clearTimeout|clientInformation|close|closed|confirm|constructor|crypto|decodeURI|decodeURIComponent|defaultStatus|document|element|elements|embed|embeds|encodeURI|encodeURIComponent|escape|event|fileUpload|focus|form|forms|frame|height|innerHeight|innerWidth|layer|layers|link|location|mimeTypes|navigate|navigator|frames|frameRate|hidden|history|image|images|offscreenBuffering|open|opener|option|outerHeight|outerWidth|packages|pageXOffset|pageYOffset|parent|parseFloat|parseInt|password|plugin|prompt|propertyIsEnum|radio|reset|screen|screenX|screenY|scroll|secure|select|self|setInterval|setTimeout|status|submit|taint|text|textarea|top|unescape|untaint|width|window)\\b',
        pat: /.+/gm,
        rep: '<span id="reserved">$&</span>'
      },
      {
        custom: '\\b(Array|Date|eval|function|hasOwnProperty|Infinity|isFinite|isNaN|isPrototypeOf|length|Math|NaN|name|Number|Object|prototype|String|toString|undefined|valueOf)\\b',
        pat: /.+/gm,
        rep: '<span id="reserved">$&</span>'
      },
      {
        custom: '\\b(onblur|onclick|onerror|onfocus|onkeydown|onkeypress|onkeyup|onmouseover|onload|onmouseup|onmousedown|onsubmit)\\b',
        pat: /.+/gm,
        rep: '<span id="parameter">$&</span>'
      },
      {
        custom: '[\/][\/].+',
        pat: /.+/gm,
        rep: '<span id="comment">$&</span>'
      },
      {
        begin: {pat: '[\/][\*]', exclude: false},
        end: {pat: '[\*][\/]', exclude: false},
        pat: /.+/gm,
        rep: '<span id="comment">$&</span>'
      },
      {
        custom: '(\\d|[\-]\\d|[\.]\\d)+',
        pat: /.+/gm,
        rep: '<span id="unit">$&</span>'
      },
      {
        begin: {pat: '[\<]span(.*?)value(.*?)[\>][\']', exclude: true},
        end: {pat: '[\'][\<][\/]span[\>]', exclude: true},
        pat: /(\<span(.*?)\>|\<\/span\>)/gm,
        rep: ''
      },
      {
        begin: {pat: '[\<]span(.*?)value(.*?)[\>][\"]', exclude: true},
        end: {pat: '[\"][\<][\/]span[\>]', exclude: true},
        pat: /(\<span(.*?)\>|\<\/span\>)/gm,
        rep: ''
      },
      {
        begin: {pat: '[\<]span(.*?)comment(.*?)[\>][\/][\/]', exclude: true},
        end: {pat: '[\<][\/]span[\>]$', exclude: true},
        pat: /(\<span(.*?)\>|\<\/span\>)/gm,
        rep: ''
      },
      {
        begin: {pat: '[\<]span(.*?)comment(.*?)[\>][\/][\*]', exclude: true},
        end: {pat: '[\*][\/][\<][\/]span[\>]', exclude: true},
        pat: /(\<span(.*?)\>|\<\/span\>)/gm,
        rep: ''
      }
    ],
    finalise: [
      {
        pat: /\:\/\\\//gm,
        rep: '\:\/\/'
      }
    ]
  };
  clz.Colorize(data);
})();
