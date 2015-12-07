// var html = [
  //   ['<span id="comment">$&</span>', /(&lt;\\\!\\\-\\\-.*|(.*?)([\w]+)(?=\n([\s\S]*?)\\\-\\\-&gt;)|(.*?)\\\-\\\-&gt;)/igm],
  //   ['<span id="selector">$&</span>', /((&lt;\\\!|&lt;|&lt;\\\/)([\w]+)(&gt;|\S|(\s\\\/&gt;|\\\/&gt;))|&gt;)/igm],
  //   ['<span id="attribute">$&</span>', /([\S]+)\\\=(?=\\\"([\s\S]*?)\\\")/igm],
  //   ['<span id="value">$&</span>', /\\\"([\s\S]*?)\\\"/igm],
  //   ['<span id="parameter">$&</span>', /\s([\w]+)(?=\<span)/igm],
  //   ['\\\-\\\-&gt;', /\\\-\\\-\<span\sid\=\"selector\"\>&gt;\<\/span\>/igm]
  // ];
(function() {
  //------------------------------------------------------------------------------------------------------------
  //---------------------------------------------------RegEx----------------------------------------------------
  //------------------------------------------------------------------------------------------------------------
  //----------------------------------------------------FIND
  var findChar = [ 
    [/\W/igm, '\\$&'],
    [/ftp\\\:\\\/\\\//igm, 'ftp\\\_\\\_URLFIXFTP\\\_\\\_'],
    [/https\\\:\\\/\\\//igm, 'https\\\_\\\_URLFIXHTTPS\\\_\\\_'], 
    [/http\\\:\\\/\\\//igm, 'http\\\_\\\_URLFIXHTTP\\\_\\\_'],
    [/((rgba|rgb|hsla|hsl)\\\(([\s\S]*?)\\\)|\\\#([\w\d]+))/igm, '$&<colouring>']
  ];
  //----------------------------------------------------REMOVE
  var removeChar = [
    [/\\\/\\\*([\s\S]*?)\\\*\\\//igm, /(\<span([\s\S]*?)\>|\<\/span\>)/igm, ''],
    [/\\\/\\\*([\s\S]*?)\\\*\\\//igm, /\n/igm, '</span>\n<span id="comment">'],
    [/(\\\'|\\\")([\s\S]*?)(\\\'|\\\")/igm, /(\<span([\s\S]*?)\>|\<\/span\>)/igm, ''],
    [/([\d]+)(\<span([\s\S]*?)\>([\W]+)\<\/span\>)([\d]+)/igm, /(\<span([\s\S]*?)\>|\<\/span\>)/igm, ''],
    [/((rgba|rgb|hsla|hsl)\\\(([\s\S]*?)\\\)|\\\#([\w\d]+))\<colouring\>/igm, /\<colouring\>/igm, '']
  ];
  //----------------------------------------------------FIX CHARACTERS
  var fixChar = [
    [/\\\&lt\\\;/igm, '<span id="character">&lt;</span>'],
    [/\\\&gt\\\;/igm, '<span id="character">&gt;</span>'],
    [/\\\&amp\\\;/igm, '<span id="character">&amp;</span>'],
    [/ftp\\\_\\\_URLFIXFTP\\\_\\\_/igm, 'ftp\\\:\\\/\\\/'],
    [/https\\\_\\\_URLFIXHTTPS\\\_\\\_/igm, 'https\\\:\\\/\\\/'],
    [/http\\\_\\\_URLFIXHTTP\\\_\\\_/igm, 'http\\\:\\\/\\\/']
  ];
  //----------------------------------------------------FEATURES
  var features = [
    ['<a id="link" href="$&" target="_blank">$&</a>', /(ftp|http|https)\:\/\/([\w\d\W]*?)(?=[\s\'\"\(\)\{\}\[\]])/igm],
    ['<span style="color: $&;">$&</span>', /((rgba|rgb|hsla|hsl)\((([\d\s\,\.\%]+){1,3})\)|\#([\w\d]+))/igm]
  ];
  //----------------------------------------------------HTML
  var html = [
    ['<span id="comment">$&</span>', /(\\\<\\\!\\\-\\\-|\\\<\\\!)([\s\S]*?)(\\\>|\\\-\\\-\\\>)/igm],
    ['<span id="selector">$&</span>', /((\\\<|\\\<\\\/)([\w]+)|\\\/\\\>|\\\>)/igm],
    ['<span id="attribute">$&</span>', /([\w]+)\\\=(?=(\\\'|\\\")(.*?)(\\\"|\\\'))/igm],
    ['<span id="value">$&</span>', /(\\\'|\\\")([\s\S]*?)(\\\"|\\\')/igm],
    ['<span id="character">$&</span>', /\\\W/igm]
  ];
  
  //------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------COLORIZING-------------------------------------------------
  //------------------------------------------------------------------------------------------------------------
  $.each($('pre[language="html"]'), function() {
    //------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------FETCH---------------------------------------------------
    //------------------------------------------------------------------------------------------------------------
    var str = $(this).html();
    //------------------------------------------------------------------------------------------------------------
    //---------------------------------------------------SIZING---------------------------------------------------
    //------------------------------------------------------------------------------------------------------------
    $(this).css({
      'height': 'auto',
      'left': '0px',
      'right': '0px',
      'width': 'auto'
    });
    //------------------------------------------------------------------------------------------------------------
    //---------------------------------------------------FINDING--------------------------------------------------
    //------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------FIND
    for (a = 0; a < findChar.length; a++) {
      str = str.replace(findChar[a][0], findChar[a][1]);
    }
    //----------------------------------------------------CODE
    for (a = 0; a < html.length; a++) {
      str = str.replace(html[a][1], html[a][0]);
    }
    //----------------------------------------------------REMOVE
    for (a = 0; a < removeChar.length; a++) {
      str = str.replace(removeChar[a][0], function(rep) {
        return rep.replace(removeChar[a][1], removeChar[a][2]);
      });
    }
    //----------------------------------------------------FIX
    for (a = 0; a < fixChar.length; a++) {
      str = str.replace(fixChar[a][0], fixChar[a][1]);
    }
    //------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------SAVE----------------------------------------------------
    //------------------------------------------------------------------------------------------------------------
    console.log(str);
    $(this).html(str);
  });
  
  //------------------------------------------------------------------------------------------------------------
  //---------------------------------------------------CLEAN----------------------------------------------------
  //------------------------------------------------------------------------------------------------------------
  $.each($('pre[language="html"]'), function() {
    var str = $(this).html();
    str = str.replace(/\\/igm, '');
    $(this).html(str);
  });
  
  //------------------------------------------------------------------------------------------------------------
  //---------------------------------------------------SPLIT----------------------------------------------------
  //------------------------------------------------------------------------------------------------------------
  $.each($('pre[language="html"]'), function() {
    var str = $(this).html();
    str = str.replace(/([\s\S]+)/igm, '<span id="all-number"></span><span id="all-code">$&</span>');
    $(this).html(str);
  });
  
  //------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------NUMBERING-------------------------------------------------
  //------------------------------------------------------------------------------------------------------------
  $.each($('pre[language="html"]').find('span[id="all-code"]'), function(line) {
    $(this).html(function(index, html) {
      return html.replace(/(^\n|.+)/igm, '<span id="code">$&</span>');
    });
    
    line = 0;
    
    $.each($(this).find('span[id="code"]'), function() {
      line++;
      var str = $($(this).parent().parent().find('span[id="all-number"]')).html();
      $($(this).parent().parent().find('span[id="all-number"]')).html(str + '<span id="number">' + line + '</span>\n');
    });
  });
  
  //------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------FEATURES--------------------------------------------------
  //------------------------------------------------------------------------------------------------------------
  //----------------------------------------------------SPAN
  $.each($('pre[language="html"]'), function() {
    var str = $(this).html();
    for (a = 0; a < features.length; a++) {
      str = str.replace(features[a][1], features[a][0]);
    }
    $(this).html(str);
  });
  //----------------------------------------------------CLICK
  $('pre[language="html"]').find('span[id="all-code"]').click(function() {
    var range, selection;

    if (window.getSelection && document.createRange) {
      selection = window.getSelection();
      range = document.createRange();
      range.selectNodeContents($(this)[0]);
      selection.removeAllRanges();
      selection.addRange(range);
    } else if (document.selection && document.body.createTextRange) {
      range = document.body.createTextRange();
      range.moveToElementText($(this)[0]);
      range.select();
    }
  });
})();
