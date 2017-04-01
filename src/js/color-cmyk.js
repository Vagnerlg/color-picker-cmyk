$(document).ready(function() {
    $('.line').on('click', function(event) {
        var position = event.pageX - $(this).offset().left;
        $('.poiter').css('left', (5 + position) + 'px');
        $('input[name="color"]').val(position);
    });
    $('input[name="color"]').on('keyup', function() {
        var position = parseInt($(this).val());
        if (position >= 0 && position <= 100) {
            $('.poiter').css('left', (5 + position) + 'px');
        } else {
            $('.poiter').css('left', '5px');
            $(this).val('0');
        }
    });
    $('.poiter').on("mousedown", function(event) {
        var positionMouse = event.pageX;
        var postitionInit = parseInt($('input[name="color"]').val());
        $(this).on("mousemove", function(event) {
            var position = (event.pageX - positionMouse) + postitionInit;
            if (position >= 0 && position <= 100) {
                $('.poiter').css('left', (5 + position) + 'px');
                $('input[name="color"]').val(position);
            }
            //console.log('positionInit ' + postitionInit, 'positionMouse(init) ' + positionMouse, 'pageX ' + event.pageX, 'Position ' + position);
        });
    });
    $(document).on("mouseup", function() {
        $('.poiter').off("mousemove");
        console.log('cancel mouse move');
    });
});