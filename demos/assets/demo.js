$(function() {

    var dph = $("#demo-placeholder");

    dph.css('height', window.innerHeight - $('#demos-bar').height());

    $("#demos-list").on('change', function() {
        dph.attr('src', $(this).find(':selected').val());
        dph.focus();
    });
    
});