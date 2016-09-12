$(document).ready(function() {

  // Use GOV.UK selection-buttons.js to set selected
  // and focused states for block labels
  var $blockLabels = $(".block-label input[type='radio'], .block-label input[type='checkbox']");
  new GOVUK.SelectionButtons($blockLabels);

  // Use GOV.UK show-hide-content.js
  // Where .block-label uses the data-target attribute
  // to toggle the visibility of related content
  var showHideContent = new GOVUK.ShowHideContent();
  showHideContent.init();

    $('#cookie_gotit').on('click',function(e)
  {
    e.preventDefault();
    GOVUK.cookie('seen_cookie_message', 'yes', { days: 28 });
    $('#global-cookie-message').hide();
  });
});


