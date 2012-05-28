// Sohaib Talaat Bhatti
function triggerPagination(pageUrl, pageNum, maxPages, threshold, timeoutValue, container, additional_params){
  container = (typeof container == 'undefined')? '.results' : container;
  
  additional_params = (typeof additional_params == 'undefined')? {} : additional_params;
  additional_params.page = pageNum;

  nextPage = pageNum + 1;
  if (triggerComparator(threshold, container)){
    if (pageNum<=maxPages){
      pageRequest = pageUrl.concat('.js');
      $.get(pageRequest, additional_params);
    }
    if (nextPage<=maxPages){
      $(document).ajaxComplete(function(){
        triggerPagination(pageUrl, nextPage, maxPages, threshold, timeoutValue, container, additional_params);
      });
    }
  }
  else{
    window.setTimeout(
      function(){
        triggerPagination(pageUrl, pageNum, maxPages, threshold, timeoutValue, container, additional_params);
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