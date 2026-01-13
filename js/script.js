(function($){
  // Search
  var $searchWrap = $('#search-form-wrap'),
    isSearchAnim = false,
    searchAnimDuration = 200;

  var startSearchAnim = function(){
    isSearchAnim = true;
  };

  var stopSearchAnim = function(callback){
    setTimeout(function(){
      isSearchAnim = false;
      callback && callback();
    }, searchAnimDuration);
  };

  $('#nav-search-btn').on('click', function(e){
    e.preventDefault();
    if (isSearchAnim) return;

    startSearchAnim();
    $searchWrap.addClass('on');
    stopSearchAnim(function(){
      $('.search-form-input').focus();
    });
  });

  $('.search-form-input').on('blur', function(){
    startSearchAnim();
    $searchWrap.removeClass('on');
    stopSearchAnim();
  });

  $('form.search-form').on('submit', function() {
    q = $(this).find('.search-form-input').val();
    $(this).find('.search-form-input').val('site:https://hmdw.me ' + q);

  });

  // Caption
  $('.entry-content').each(function(i){
    if ($(this).attr('itemprop') == 'description') {
      return false;
    }
    $(this).find('img').each(function(){
      if ($(this).parent().hasClass('fancybox')) return;

      var alt = this.alt;

      $(this).wrap('<a href="' + this.src + '" title="' + alt + '" class="fancybox"></a>');
    });

    $(this).find('.fancybox').each(function(){
      $(this).attr('rel', 'article' + i);
    });
  });

  if ($.fancybox){
    $('.fancybox').fancybox();
  }

  // Mobile nav
  $(".mobile-nav-panel").click(function() {
    var $nav = $(".nav");
    var isExpanded = $(this).attr('aria-expanded') === 'true';
    $nav.toggleClass("active");
    $(this).attr('aria-expanded', !isExpanded);
  });

  // Close mobile menu when clicking outside
  $(document).on('click', function(e) {
    var $nav = $(".nav");
    var $button = $(".mobile-nav-panel");
    if ($nav.hasClass("active") &&
        !$nav.is(e.target) &&
        !$nav.has(e.target).length &&
        !$button.is(e.target) &&
        !$button.has(e.target).length) {
      $nav.removeClass("active");
      $button.attr('aria-expanded', 'false');
    }
  });

})(jQuery);
