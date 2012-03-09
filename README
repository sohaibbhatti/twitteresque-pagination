The javascript provided here allows for the quick addition of 'endless' pagination, similar to that of what is present in Twitter

Usage:
 Call the following method on whichever page requires the pagination:
    triggerPagination(pageUrl, pageNum, maxPages, threshold, timeoutValue, container, additionalParams)

pageUrl: The current url of the page. Currently the url has to be manually passed as an argument, though this should soon be done in an automated fashion
pageNum: The page number from where you want pagination to begin. Generally you'd be setting this to a value of 2
maxPages: The maximum number of pages.
threshold: a numeric threshold value to fine tune when to load the consequent page. If 0 is passed, it means that as soon as the scroll bar exceeds that of the container div, a request for a new page will be triggered off.
timoutValue: How often should the script check whether it needs to invoke a GET request.
container: The container where all the divs would be appended to. If no parameter is passed a default of '.results' is chosen.
additionalParams: Extra url parameters other than the page number can now be passed along in the form of an object.


In the case of Rails, pagination can be set up in the following manner.

1. Add the javascript to your assets.

2. Include the javascript in your view

    <%= javascript_include_tag "twitteresque_pagination" %>

3. Define a helper similar to the one presented below.

  def twitteresque_pagify(obj, container='.results', threshold = 0, counter= 300, additional_params = '{}')
    max_pages = (obj.total_entries % obj.per_page) == 0 ? obj.total_entries / obj.per_page : (obj.total_entries / obj.per_page) + 1
    javascript_tag %Q{
      $(document).ready(function(){
      triggerPagination("#{url_for}", 2, #{max_pages}, #{threshold}, #{counter}, "#{container}", #{additional_params});
      });
    }
  end

4. In your controller paginate whichever object requires pagination.

  @user = User.paginate(:page => params[:page], :per_page => 5)

5. In your view invoke the twitteresque_pagify method on the object requiring pagination.
  user controller index action
  <%= twitteresque_pagify @user %>

6. As a javascript response to the controller, the following code can be added
  users/index.js.erb
  $('.results').append('<%=escape_javascript(render 'partial')%>');
