jQuery.fn.colorPickerCmyk = function() {
    var slices = ['cyan', 'magento', 'yellow', 'black'];

    var poiterClass = 'poiter';
    var lineClass = 'line';
    var inputClass = 'color';

    var poiter = '#' + poiterClass + '-';
    var line = '#' + lineClass + '-';
    var input = '#' + inputClass + '-';

    var template = '<div class="color-picker-cmyk">';
    slices.forEach(function(slice) {
        template += '<div class="input">';
        template += '   <div class="slice">';
        template += '       <div class="' + lineClass + '"  id="' + lineClass + '-' + slice + '"></div>';
        template += '       <div class="' + poiterClass + '"  id="' + poiterClass + '-' + slice + '"></div>';
        template += '   </div>';
        template += '   <input type="text" value="0" class="' + inputClass + '"  id="' + inputClass + '-' + slice + '"/>';
        template += '</div>';
    });
    template += '</div>'
    $(this).html(template);

    var setPosition = function(position, slice) {
        if (position >= 0 && position <= 100) {
            $(poiter + slice).css('left', (5 + position) + 'px');
            $(input + slice).val(position);
            return true;
        }
        return false;
    }

    var getSlice = function(_this) {
        var slice = $(_this).attr('id');
        slice = slice.split('-');
        return slice[1];
    }

    var lineClick = function(event) {
        var position = event.pageX - $(this).offset().left;
        slice = getSlice(this);
        setPosition(position, slice);
    }

    var inputKeyup = function() {
        var position = parseInt($(this).val());
        var slice = getSlice(this);
        if (!setPosition(position, slice)) {
            setPosition(0, slice)
        }
    }

    var poiterMousedown = function(event) {
        var positionMouse = event.pageX;
        var slice = getSlice(this);
        var postitionInit = parseInt($(input + slice).val());

        $(this).on("mousemove", function(event) {
            var position = (event.pageX - positionMouse) + postitionInit;
            setPosition(position, slice);
            //console.log('positionInit ' + postitionInit, 'positionMouse(init) ' + positionMouse, 'pageX ' + event.pageX, 'Position ' + position);
        });
    }

    $(document).ready(function() {
        slices.forEach(function(slice) {
            $(line + slice).on('click', lineClick);
            $(input + slice).on('keyup', inputKeyup);
            $(poiter + slice).on("mousedown", poiterMousedown);
            //console.log(poiter + slice);
        });
        $(document).on("mouseup", function() {
            slices.forEach(function(slice) {
                $(poiter + slice).off("mousemove");
            });
            //console.log('cancel mouse move');
        });
    });

    return this;
};