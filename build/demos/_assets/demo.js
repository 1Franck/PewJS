$(function() {

    $("#demo-placeholder").css('height', window.innerHeight - $('#demos-bar').height());

    $("#demos-list").on('change', function() {
        $("#demo-placeholder").attr('src', $(this).find(':selected').val());
    });
    
});