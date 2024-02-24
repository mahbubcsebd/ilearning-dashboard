


$(document).ready(function () {
    // Sidebar toggle behavior
    const toggler = document.querySelector('.btn');
    toggler.addEventListener('click', function () {
        document.querySelector('#sidebar').classList.toggle('collapsed');
    });

    // Tooltip
    // $('.tteb-popup-content').hide();
    $('.ellipsis-btn').on('click', function () {
        $(this).siblings('.tteb-popup-content').toggle();
    });

    $(document).click(function (event) {
        if (!$(event.target).closest('.ellipsis-btn').length) {
            $('.tteb-popup-content').hide();
        }
    });

    // File upload and preview
    var upload = new FileUploadWithPreview('myUniqueUploadId');

    // $('.presentation').innerHTML = <i class="fa-solid fa-angle-down"></i>;
});


// Select2 for country
$(document).ready(function () {
    function format(item, state) {
        if (!item.id) {
            return item.text;
        }
        var countryUrl = 'https://hatscripts.github.io/circle-flags/flags/';
        var stateUrl = 'https://oxguy3.github.io/flags/svg/us/';
        var url = state ? stateUrl : countryUrl;
        var img = $('<img>', {
            class: 'img-flag',
            width: 26,
            src: url + item.element.value.toLowerCase() + '.svg',
        });
        var span = $('<span>', {
            text: ' ' + item.text,
        });
        span.prepend(img);
        return span;
    }

    $(document).ready(function () {
        $('#countries').select2({
            templateResult: function (item) {
                return format(item, false);
            },
        });
    });
});