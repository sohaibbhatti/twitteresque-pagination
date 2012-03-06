function triggerPagination(pageUrl, pageNum, maxPages, threshold, timeoutValue){
  nextPage = pageNum + 1;
  if (triggerComparator(threshold)){
    if (pageNum<=maxPages){
      pageRequest = pageUrl.concat('.js');
      $.get(pageRequest, {page: pageNum});
    }
    if (nextPage<=maxPages){
      $(document).ajaxComplete(function(){
        triggerPagination(pageUrl, nextPage, maxPages, threshold, timeoutValue)
      });
    }
  }
  else{
    window.setTimeout(
      function(){
        triggerPagination(pageUrl, pageNum, maxPages, threshold, timeoutValue);
      },
      300
    );
  } 
}

function triggerComparator(threshold){
  return (calculateScrollerPosition() < threshold);
}

function calculateScrollerPosition(){
  return (divHeight() - ($(document).scrollTop() + $(window).height()));
}

function divHeight(){
  return ($('.results').position().top + $('.results').height());
}