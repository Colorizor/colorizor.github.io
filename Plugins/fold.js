//================================================================================
//======================================Fold======================================
//================================================================================
$('pre:not([nofold])').find('span#block').click(function() {
  if (!$(this).attr('block')) {
    $(this).attr('block', $(this).html());
    $(this).html(' ... ');
  } else {
    $(this).html($(this).attr('block'));
    $(this).removeAttr('block');
  }
});
