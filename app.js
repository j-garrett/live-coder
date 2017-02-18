$(document).ready(function() {
  // Store reference for input/output nodes for easy access
  var htmlPane = $('#panes-view').find('[data-display-pane="html"]');
  var cssPane = $('#panes-view').find('[data-display-pane="css"]');
  var outputPane = $('#panes-view').find('[data-display-pane="output"]');

  // Helper function to update output
  // If we wanted feature completeness, we would add CSS/HTML parser here
  // Then iterate and make sure we are only updating values inside output pane
  var updateOutputPane = function() {
    var htmlVal = htmlPane.children()[0].value;
    var cssVal = '<style>' + cssPane.children()[0].value + '</style>';
    outputPane.html(htmlVal + cssVal);
  };

  // Helper function handle tabs
  var handleTabs = function(e) {
    if (e.keyCode === 9) {
      // Keep us from tabbing inputs if tab is pressed
      e.preventDefault();

      // Grab input value and cursor location
      var val = this.value;
      var cursor = this.selectionStart;

      // Set new value with two spaces added where cursor was
      this.value = val.slice(0, cursor) + '\x20\x20' + val.slice(cursor);
      // and update cursor location
      this.selectionStart = cursor + 2;
      this.selectionEnd = cursor + 2;
    }
  };

  // Helper function to handle pane and button toggles
  var togglePaneView = function() {
    // Use data attr to find which id pane needs to toggle
    $('[data-display-pane="' + this.dataset.buttonPane + '"]')
      .fadeToggle(500);

    // Update button to show user which panes are currently hidden
    $(this)
      .toggleClass('unselected');
  };

  // Attach click listeners to menu buttons
  $('#panes-toggle-select')
    .children('.toggle, .button')
    .click(togglePaneView);

  // Attach listeners to user inputs
  $('.pane-text-input')
    .keydown(handleTabs)
    .keyup(updateOutputPane);
});