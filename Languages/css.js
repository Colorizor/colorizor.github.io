(function() {
  //------------------------------------------------------------------------------------------------------------
  //---------------------------------------------------RegEx----------------------------------------------------
  //------------------------------------------------------------------------------------------------------------
  var regex = [
    ['<span class="value">$&</span>', /(\'|\")([\s\S]*?)(\'|\")/igm],
    ['<span class="selector">$&</span>', /([\#\.\w\-]+)(?:((?!.*?[\\\*\;\}])|(?=.*?[\{])))/igm],
    ['<span class="reserved">$&</span>', /(?:(?!.*?[\{]))([\w\-]+)(?=[\:])/igm],
    ['<span class="attribute">$&</span>', /(([^\w\:]|[\w])+)(?=[\;])/igm],
    ['<span class="comment">$&</span>', /\/\*([\s\S]*?)\*\//igm]
    //['<span class="digit">$&</span>', /([\d\.]+)(em|ex|\%|px|cm|mm|in|pt|pc|ch|rem|vh|vw|vmin|vmax)/igm],
    //['<a class="link" href="$&" target="_blank">$&</a>', /(ftp|http|https)\:\/\/([\w\d\W]*?)(?=[\s\'\"\(\)\{\}\[\]])/igm],
    //['<span style="color: $&;">$&</span>', /((rgba|rgb|hsla|hsl)\(([\s\S]*?)\)|\#([\w\d]){6})(?!.*?\{)/igm]
  ];
  
  //------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------COLORIZING-------------------------------------------------
  //------------------------------------------------------------------------------------------------------------
  $.each($('code[language="css"]'), function() {
    //--------------------------------------------------FETCH
    var str = $(this).html();
    //--------------------------------------------------SIZING
    $(this).css({
      'height': 'auto',
      'left': '0px',
      'right': '0px',
      'width': 'auto'
    });
    //--------------------------------------------------FIND
    for (a = 0; a < regex.length; a++) {
      str = str.replace(regex[a][1], regex[a][0]);
    }
    //--------------------------------------------------SAVE
    $(this).html(str);
  });
})();
