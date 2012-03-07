function triggerPagination(pageUrl, pageNum, maxPages, threshold, timeoutValue, container){
  container = (typeof container == 'undefined')? '.results' : container;
  nextPage = pageNum + 1;
  if (triggerComparator(threshold, container)){
    if (pageNum<=maxPages){
      pageRequest = pageUrl.concat('.js');
      $.get(pageRequest, {page: pageNum});
    }
    if (nextPage<=maxPages){
      $(document).ajaxComplete(function(){
        triggerPagination(pageUrl, nextPage, maxPages, threshold, timeoutValue, container);
      });
    }
  }
  else{
    window.setTimeout(
      function(){
        triggerPagination(pageUrl, pageNum, maxPages, threshold, timeoutValue, container);
      },
      300
    );
  } 
}

function triggerComparator(threshold, container){
  return (calculateScrollerPosition(container) < threshold);
}

function calculateScrollerPosition(container){
  return (divHeight(container) - ($(document).scrollTop() + $(window).height()));
}

function divHeight(container){
  return ($(container).position().top + $(container).height());
}

