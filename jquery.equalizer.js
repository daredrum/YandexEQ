;(function($) {
  
  var defaults = {
    timeout: 500,
    colWidth: 1
  }
  
  function setEqualizer(selector, timeout, colWidth) {
    if (!colWidth) {
        colWidth = 1;
    }
    $(selector).css({
        verticalAlign: 'bottom',
        lineHeight: $(selector).height() + 'px'
    });

    // Кол-во столбиков
    var colQuantity = Math.ceil($(selector).width()/colWidth);
    var cols = new Array(colQuantity);
    for (var i = 0; i < cols.length; i++) {
        var span = $('<span/>');
        $(selector).append(span); 
        span.css({
            verticalAlign: 'bottom',
            display: 'inline-block',

            fontSize: 0,
            lineHeight: 0,

            width: colWidth,
            background: 'pink',
            borderTop: '2px solid red'
        });
    }

    run_equalizer(selector, timeout);
  }
  
  function run_equalizer (selector, timeout) {
      $(selector).find('span').each(function (i) {
          var colHeight = Math.round($(selector).height() * Math.random());
          $(this).height(colHeight);
      });
      
      //*** меняем js анимацию на css анимацию
      setTimeout(function() {
        $(selector).find('span').css(
            {
              MozTransition: 'height ' + timeout/1000 + 's linear',
              WebkitTransition: 'height ' + timeout/1000 + 's linear',
              transition: 'height ' + timeout/1000 + 's linear',
              height: $(selector).height()/2 
            }
        );
        setTimeout(function() {
          run_equalizer(selector, timeout);
        }, timeout);
      }, timeout);
      
      //***
  }
  
  $.fn.equalizer = function(options) {
    
    var settings = $.extend({}, defaults, options);
    
    return this.each(function() {
      setEqualizer(this, settings.timeout, settings.colWidth);
    });
    
  }
  
})(jQuery);
