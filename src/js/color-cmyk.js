jQuery.fn.colorPickerCmyk = function() {
    var slices = ['cyan', 'magento', 'yellow', 'black'];

    var poiterClass = 'poiter';
    var lineClass = 'line';
    var inputClass = 'color';

    var poiter = '#' + poiterClass + '-';
    var line = '#' + lineClass + '-';
    var input = '#' + inputClass + '-';

    var cmyk = [0, 0, 0, 0];

    var template = '<div class="color-picker-cmyk">';
    template += '<div class="view"><div class="preview"></div></div>';
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
            setCmyk(position, slice);
            setPreview();
            return true;
        }
        return false;
    }

    var setCmyk = function(position, slice) {
        slices.forEach(function(ele, index) {
            if (ele == slice) {
                cmyk[index] = position;
            }
        });
    }

    var setPreview = function() {
        var cyan = parseInt(256 - (cmyk[0] / 100 * 256));
        var magento = parseInt(256 - (cmyk[1] / 100 * 256));
        var yellow = parseInt(256 - (cmyk[2] / 100 * 256));
        var max = 0;
        var back = parseInt(256 - (cmyk[3] / 100 * 256));
        if (cyan > max) {
            max = cyan;
        }
        if (magento > max) {
            max = magento;
        }
        if (yellow > max) {
            max = yellow;
        }
        if (back < cyan) {
            cyan = back;
        }
        if (back < magento) {
            magento = back;
        }
        if (back < yellow) {
            yellow = back;
        }
        console.log('rgb(' + cyan + ',' + magento + ',' + yellow + ')', back, max);
        $('.preview').css('background-color', 'rgb(' + cyan + ',' + magento + ',' + yellow + ')');
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