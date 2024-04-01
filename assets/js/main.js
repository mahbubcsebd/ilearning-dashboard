Dropzone.autoDiscover = false;
$(document).ready(function () {
    // -----------------------------------------------------------
    // Sidebar toggle behavior
    const toggler = document.querySelector('.open-sidebar-btn-1');
    toggler.addEventListener('click', function () {
        document.querySelector('#sidebar').classList.toggle('collapsed');
        $('.open-sidebar-btn').toggleClass('active');
    });

    $('.open-sidebar-btn-2').on('click', function () {
        $('#sidebar').addClass('active');
    });

    $('.close-sidebar-btn').on('click', function () {
        $('#sidebar').removeClass('active');
    });

    $('.sidebar-link').on('click', function () {
        $('.sidebar-link').removeClass('active');
        $(this).addClass('active');
    });

    // -----------------------------------------------------------
    // Tooltip
    $('.tteb-popup-content').hide();
    $('.ellipsis-btn').on('click', function () {
        $(this).siblings('.tteb-popup-content').toggle();
    });

    $(document).on('click', function (event) {
        if (!$(event.target).closest('.ellipsis-btn').length) {
            $('.tteb-popup-content').hide();
        }
    });

    // File upload and preview
    if ($('#myUniqueUploadId').length > 0) {
        var upload = new FileUploadWithPreview('myUniqueUploadId');
    }

    // -----------------------------------------------------------

    // Select 2 For Country
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

    if ($('.countries').length > 0) {
        $('#countries').select2({
            templateResult: function (item) {
                return format(item, false);
            },
        });
    }

    // -----------------------------------------------------------

    // Chosen for multiple select
    $('.chzn-select-keyword').chosen({
        width: '100%',
        no_results_text: 'Oops, nothing found!',
    });
    $('.chzn-select-meta').chosen({
        width: '100%',
        no_results_text: 'Oops, nothing found!',
    });

    // -----------------------------------------------------------

    // Tiny MCE for additional info
    tinymce.init({
        selector: '#additional-info',
        plugins:
            'ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
        toolbar:
            'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
        tinycomments_mode: 'embedded',
        tinycomments_author: 'Author name',
        mergetags_list: [
            { value: 'First.Name', title: 'First Name' },
            { value: 'Email', title: 'Email' },
        ],
        ai_request: (request, respondWith) =>
            respondWith.string(() =>
                Promise.reject('See docs to implement AI Assistant')
            ),
    });

    // Tiny MCE for Meta Description
    tinymce.init({
        selector: '#add-blog-meta-desc',
        plugins:
            'ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
        toolbar:
            'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
        tinycomments_mode: 'embedded',
        tinycomments_author: 'Author name',
        mergetags_list: [
            { value: 'First.Name', title: 'First Name' },
            { value: 'Email', title: 'Email' },
        ],
        ai_request: (request, respondWith) =>
            respondWith.string(() =>
                Promise.reject('See docs to implement AI Assistant')
            ),
    });

    // -----------------------------------------------------------

    function dropBox(selector) {
        new Dropzone(selector, {
            url: '#',
            maxFiles: 1,
            acceptedFiles: 'image/*',
            init: function () {
                this.on('addedfile', function (file) {
                    // Remove existing preview image and text
                    $('#preview-image').remove();
                    $('#text-overlay').remove();
                });
            },
        });
    }

    if ($('#main-course-drop').length > 0) {
        dropBox('#main-course-drop');
    }

    if ($('#introduction-drop').length > 0) {
        dropBox('#introduction-drop');
    }

    if ($('#thumbnil-drop').length > 0) {
        dropBox('#thumbnil-drop');
    }

    if ($('#perview-img-drop').length > 0) {
        dropBox('#perview-img-drop');
    }

    // -----------------------------------------------------------
    // CVV Date and Year
    const monthInput = $('#month');
    const yearInput = $('#year');

    const focusSibling = function (target, direction, callback) {
        const nextTarget = target[direction]();
        nextTarget && nextTarget.focus();

        callback && callback(nextTarget);
    };

    monthInput.on('keydown', (event) => {
        const value = event.target.value.toString();

        if (value.length === 1 && value > 1) {
            event.target.value = '0' + value;
        }
        // bounds
        if (value === '00') {
            event.target.value = '01';
        } else if (value > 12) {
            event.target.value = '12';
        }

        if (event.target.value.length >= 2) {
            focusSibling(monthInput, 'next');
        }
        event.stopImmediatePropagation();
    });

    yearInput.on('keydown', (event) => {
        if (event.key === 'Backspace' && event.target.selectionStart === 0) {
            focusSibling(yearInput, 'prev');
            event.stopImmediatePropagation();
        }
    });

    const inputMatchesPattern = function (e) {
        const { value, selectionStart, selectionEnd, pattern } = e.target;

        const character = String.fromCharCode(e.which);
        const proposedEntry =
            value.slice(0, selectionStart) +
            character +
            value.slice(selectionEnd);
        const match = proposedEntry.match(pattern);

        return (
            e.metaKey ||
            e.which <= 0 ||
            e.which == 8 ||
            (match && match['0'] === match.input)
        );
    };

    $('input[data-pattern-validate]').on('keypress', (e) => {
        if (!inputMatchesPattern(e)) {
            e.preventDefault();
        }
    });

    // -----------------------------------------------------------
    // Schedule Checkbox Active
    $('#schedule-main').change(function () {
        if ($(this).is(':checked')) {
            $('.schedule-wrapper').addClass('schedule-active');
        } else {
            $('.schedule-wrapper').removeClass('schedule-active');
        }
    });

    // -----------------------------------------------------------
});

// $(document).ready(function () {
//     // Radial Bar Chart
//     function CircleBar(e, color) {
//         $(e)
//             .circleProgress({ fill: { color: color } })
//             .on(
//                 'circle-animation-progress',
//                 function (_event, _progress, stepValue) {
//                     $(this)
//                         .find('.radial-percent')
//                         .text(String(parseInt(100 * stepValue)) + '%');
//                 }
//             );
//     }
//     CircleBar('.revenue-bar', '#7F56D9');
//     CircleBar('.statistics-bar', '#FF5733');
//     CircleBar('.analytics-bar', '#477AFF');
//     CircleBar('.sales-bar', '#00C5C5');

//     // Chart JS for Yearly Progress
//     (function () {
//         const ctx = document
//             .getElementById('yearly-progress-canvas')
//             .getContext('2d');

//         // Replace these with your actual data for visits and sales each month
//         const labels = [
//             'Jan',
//             'Feb',
//             'Mar',
//             'Apr',
//             'May',
//             'Jun',
//             'Jul',
//             'Aug',
//             'Sep',
//             'Oct',
//             'Nov',
//             'Dec',
//         ];
//         const visitData = [
//             1800, 4300, 3400, 5600, 3200, 5000, 4300, 2200, 2600, 2900, 3300,
//             4200,
//         ];
//         const salesData = [
//             400, 2350, 2200, 2900, 900, 4200, 700, 3600, 2700, 2200, 2900, 2500,
//         ];

//         const data = {
//             labels: labels,
//             datasets: [
//                 {
//                     label: 'Course Visit',
//                     data: visitData,
//                     backgroundColor: '#9C4DF4',
//                     borderColor: '#9C4DF4',
//                     borderWidth: 1,
//                     strokeColor: '#ACC26D',
//                     pointColor: '#fff',
//                     pointStrokeColor: '#9DB86D',
//                     tension: 0.4,
//                     pointHitRadius: 10,
//                     cubicInterpolationMode: 'monotone',
//                     segment: {
//                         lineJoin: 'round',
//                     },
//                 },
//                 {
//                     label: 'Course Sale',
//                     data: salesData,
//                     backgroundColor: '#FF6652',
//                     borderColor: '#FF6652',
//                     borderWidth: 1,
//                     tension: 0.4,
//                     pointHitRadius: 10,
//                     cubicInterpolationMode: 'monotone',
//                     segment: {
//                         lineJoin: 'round',
//                     },
//                 },
//             ],
//         };

//         const config = {
//             type: 'line',
//             data: data,
//             options: {
//                 plugins: {
//                     title: {
//                         display: false,
//                         text: 'Yearly Progress',
//                         padding: {
//                             top: 10,
//                             bottom: 30,
//                         },
//                         font: {
//                             size: 18,
//                             weight: 'bold',
//                         },
//                         color: '#333',
//                     },
//                     legend: {
//                         display: true,
//                         position: 'bottom',
//                         align: 'center',
//                         fullWidth: true,
//                         reverse: false,

//                         labels: {
//                             color: '#333',
//                             usePointStyle: true,
//                             font: {
//                                 size: 12,
//                                 weight: 'normal',
//                             },
//                         },
//                     },
//                     elements: {
//                         line: {
//                             borderWidth: 2,
//                             borderColor: 'rgba(75, 192, 192, 1)',
//                             backgroundColor: 'rgba(75, 192, 192, 0.2)', // Set the fill color for the area under the line
//                             borderRadius: 10,
//                             fill: true, // Set this to true to fill the area under the line
//                         },
//                     },
//                     tooltip: {
//                         enabled: true,
//                         backgroundColor: '#fff',
//                         titleColor: '#333',
//                         bodyColor: '#333',
//                         titleFont: {
//                             size: 16,
//                             weight: 'bold',
//                         },
//                         bodyFont: {
//                             size: 14,
//                             weight: 'bold',
//                         },
//                     },
//                     responsive: true,
//                 },
//                 layout: {
//                     padding: {
//                         left: 10,
//                         right: 10,
//                         top: 10,
//                         bottom: 10,
//                     },
//                 },
//                 responsive: true, // Makes the chart responsive to screen size
//                 animations: {
//                     radius: {
//                         duration: 400,
//                         easing: 'linear',
//                     },
//                 },
//                 scales: {
//                     y: {
//                         title: {
//                             display: true,
//                         },
//                         ticks: {
//                             // display: false,
//                             // Include a dollar sign in the ticks
//                             callback: function (value, index, values) {
//                                 return '$' + value;
//                             },
//                             color: '#333',
//                             font: {
//                                 size: 14,
//                                 weight: 'bold',
//                             },

//                             gridLines: {
//                                 display: false,
//                             },
//                         },
//                         grid: {
//                             display: false, // Set this to false to hide the y-axis grid lines
//                         },
//                     },
//                     x: {
//                         title: {
//                             display: true,
//                             // text: 'Month'
//                         },
//                         grid: {
//                             display: false, // Set this to false to hide the y-axis grid lines
//                         },
//                     },
//                 },
//             },
//         };

//         const myChart = new Chart(ctx, config);
//     })();

//     // Doughnut Chart for Course Progress
//     (function () {
//         var ctx = document
//             .getElementById('course-progress-chart')
//             .getContext('2d');
//         var courseProgressChart = new Chart(ctx, {
//             type: 'doughnut',
//             data: {
//                 labels: ['In Progress', 'Not Completed', 'Completed'],
//                 datasets: [
//                     {
//                         // label: 'My First Dataset',
//                         data: [300, 50, 100],
//                         backgroundColor: ['#FF6652', '#477AFF', '#9C4DF4'],
//                         hoverOffset: 4,
//                     },
//                 ],
//             },
//             options: {
//                 plugins: {
//                     legend: {
//                         display: true,
//                         position: 'bottom',
//                         align: 'center',
//                         fullWidth: true,
//                         reverse: false,

//                         labels: {
//                             color: '#333',
//                             usePointStyle: true,
//                             font: {
//                                 size: 12,
//                                 weight: 'normal',
//                             },
//                         },
//                     },
//                 },
//             },
//         });
//     })();
// });

// $(document).ready(function () {
//     // Chart JS for Yearly Progress
//     (function () {
//         const ctx = document
//             .getElementById('sales-overview-canvas')
//             .getContext('2d');

//         // Replace these with your actual data for visits and sales each month
//         const labels = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
//         const newVisitorData = [1800, 4300, 3400, 5600, 3200, 5000, 4300];
//         const uniqueVisitorData = [400, 2350, 2200, 2900, 900, 4200, 700];
//         const prevVisitorData = [600, 2500, 2800, 1800, 700, 1200, 1900];

//         const data = {
//             labels: labels,
//             datasets: [
//                 {
//                     label: 'Course Visit',
//                     data: newVisitorData,
//                     backgroundColor: '#9C4DF4',
//                     borderColor: '#9C4DF4',
//                     borderWidth: 1,
//                     strokeColor: '#ACC26D',
//                     pointColor: '#fff',
//                     pointStrokeColor: '#9DB86D',
//                     tension: 0.4,
//                     pointHitRadius: 10,
//                     cubicInterpolationMode: 'monotone',
//                     segment: {
//                         lineJoin: 'round',
//                     },
//                 },
//                 {
//                     label: 'Course Sale',
//                     data: uniqueVisitorData,
//                     backgroundColor: '#FF6652',
//                     borderColor: '#FF6652',
//                     borderWidth: 1,
//                     tension: 0.4,
//                     pointHitRadius: 10,
//                     cubicInterpolationMode: 'monotone',
//                     segment: {
//                         lineJoin: 'round',
//                     },
//                 },
//                 {
//                     label: 'Course Sale',
//                     data: prevVisitorData,
//                     backgroundColor: '#477AFF',
//                     borderColor: '#477AFF',
//                     borderWidth: 1,
//                     tension: 0.4,
//                     pointHitRadius: 10,
//                     cubicInterpolationMode: 'monotone',
//                     segment: {
//                         lineJoin: 'round',
//                     },
//                 },
//             ],
//         };

//         const config = {
//             type: 'line',
//             data: data,
//             options: {
//                 plugins: {
//                     title: {
//                         display: false,
//                         text: 'Yearly Progress',
//                         padding: {
//                             top: 10,
//                             bottom: 30,
//                         },
//                         font: {
//                             size: 18,
//                             weight: 'bold',
//                         },
//                         color: '#333',
//                     },
//                     legend: {
//                         display: true,
//                         position: 'bottom',
//                         align: 'center',
//                         fullWidth: true,
//                         reverse: false,

//                         labels: {
//                             color: '#333',
//                             usePointStyle: true,
//                             font: {
//                                 size: 12,
//                                 weight: 'normal',
//                             },
//                         },
//                     },
//                     elements: {
//                         line: {
//                             borderWidth: 2,
//                             borderColor: 'rgba(75, 192, 192, 1)',
//                             backgroundColor: 'rgba(75, 192, 192, 0.2)',
//                             borderRadius: 10,
//                             fill: true,
//                         },
//                     },
//                     tooltip: {
//                         enabled: true,
//                         backgroundColor: '#fff',
//                         titleColor: '#333',
//                         bodyColor: '#333',
//                         titleFont: {
//                             size: 16,
//                             weight: 'bold',
//                         },
//                         bodyFont: {
//                             size: 14,
//                             weight: 'bold',
//                         },
//                     },
//                     responsive: true,
//                 },
//                 layout: {
//                     padding: {
//                         left: 10,
//                         right: 10,
//                         top: 10,
//                         bottom: 10,
//                     },
//                 },
//                 responsive: true,
//                 animations: {
//                     radius: {
//                         duration: 400,
//                         easing: 'linear',
//                     },
//                 },
//                 scales: {
//                     y: {
//                         title: {
//                             display: true,
//                         },
//                         ticks: {
//                             color: '#333',
//                             font: {
//                                 size: 14,
//                                 weight: 'bold',
//                             },
//                         },
//                         grid: {
//                             display: true,
//                         },
//                     },
//                     x: {
//                         title: {
//                             display: true,
//                         },
//                         grid: {
//                             display: true,
//                         },
//                     },
//                 },
//             },
//         };

//         const myChart = new Chart(ctx, config);
//     })();

//     // Doughnut Chart for Course Progress
//     if ($('#course-progress-chart-2').length > 0) {
//         (function () {
//             var ctx = document
//                 .getElementById('course-progress-chart-2')
//                 .getContext('2d');
//             var courseProgressChartTwo = new Chart(ctx, {
//                 type: 'doughnut',
//                 data: {
//                     labels: ['In Progress', 'Not Completed', 'Completed'],
//                     datasets: [
//                         {
//                             data: [300, 50, 100],
//                             backgroundColor: ['#FF6652', '#477AFF', '#9C4DF4'],
//                             hoverOffset: 4,
//                         },
//                     ],
//                 },
//                 options: {
//                     plugins: {
//                         legend: {
//                             display: true,
//                             position: 'bottom',
//                             align: 'center',
//                             fullWidth: true,
//                             reverse: false,

//                             labels: {
//                                 color: '#333',
//                                 usePointStyle: true,
//                                 font: {
//                                     size: 12,
//                                     weight: 'normal',
//                                 },
//                             },
//                         },
//                     },
//                 },
//             });
//         })();
//     }

//     // Storage Details Chart
//     if ($('#storage-chart').length > 0) {
//         (function () {
//             var ctx = document.getElementById('storage-chart').getContext('2d');
//             var storageDetails = new Chart(ctx, {
//                 type: 'doughnut',
//                 data: {
//                     labels: ['In Progress', 'Not Completed', 'Completed'],
//                     datasets: [
//                         {
//                             data: [300, 50, 100],
//                             backgroundColor: ['#FF6652', '#477AFF', '#9C4DF4'],
//                             hoverOffset: 4,
//                         },
//                     ],
//                 },
//                 options: {
//                     plugins: {
//                         legend: {
//                             display: true,
//                             position: 'bottom',
//                             align: 'center',
//                             fullWidth: true,
//                             reverse: false,

//                             labels: {
//                                 color: '#333',
//                                 usePointStyle: true,
//                                 font: {
//                                     size: 12,
//                                     weight: 'normal',
//                                 },
//                             },
//                         },
//                     },
//                 },
//             });
//         })();
//     }
// });

// $(document).ready(function () {
//     // Storage Details Chart
//     if ($('#storage-chart').length > 0) {
//         (function () {
//             var ctx = document.getElementById('storage-chart').getContext('2d');
//             var storageDetails = new Chart(ctx, {
//                 type: 'doughnut',
//                 data: {
//                     labels: ['Used', 'Available'],
//                     datasets: [
//                         {
//                             data: [54, 74],
//                             backgroundColor: ['#9C4DF4', '#FF6652'],
//                             hoverOffset: 4,
//                         },
//                     ],
//                 },
//                 options: {
//                     plugins: {
//                         legend: {
//                             display: true,
//                             position: 'right',
//                             align: 'bottom',
//                             fullWidth: true,
//                             reverse: false,

//                             labels: {
//                                 color: '#333',
//                                 usePointStyle: true,
//                                 font: {
//                                     size: 12,
//                                     weight: 'normal',
//                                 },
//                             },
//                         },
//                     },
//                 },
//             });
//         })();
//     }
// });

// $(document).ready(function () {
//     (function () {
//         const ctx = document
//             .getElementById('yearly-progress-status-canvas')
//             .getContext('2d');

//         const labels = [
//             'Jan',
//             'Feb',
//             'Mar',
//             'Apr',
//             'May',
//             'Jun',
//             'Jul',
//             'Aug',
//             'Sep',
//             'Oct',
//             'Nov',
//             'Dec',
//         ];
//         const visitData = [
//             1800, 4300, 3400, 5600, 3200, 5000, 4300, 2200, 2600, 2900, 3300,
//             4200,
//         ];
//         const salesData = [
//             400, 2350, 2200, 2900, 900, 4200, 700, 3600, 2700, 2200, 2900, 2500,
//         ];

//         const data = {
//             labels: labels,
//             datasets: [
//                 {
//                     label: 'Course Visit',
//                     data: visitData,
//                     borderColor: '#9C4DF4',
//                     borderWidth: 1,
//                     strokeColor: '#ACC26D',
//                     pointColor: '#fff',
//                     pointStrokeColor: '#9DB86D',
//                     tension: 0.2,
//                     cubicInterpolationMode: 'monotone',
//                     backgroundColor: 'rgba(156, 77, 244, .2)',
//                     fill: 'start',
//                 },
//                 {
//                     label: 'Course Sale',
//                     data: salesData,
//                     backgroundColor: '#FF6652',
//                     borderColor: '#FF6652',
//                     borderWidth: 1,
//                     tension: 0.2,
//                     cubicInterpolationMode: 'monotone',
//                     borderWidth: 2,
//                 },
//             ],
//         };

//         const config = {
//             type: 'line',
//             data: data,
//             options: {
//                 plugins: {
//                     title: {
//                         display: false,
//                         text: 'Yearly Progress',
//                         padding: {
//                             top: 10,
//                             bottom: 30,
//                         },
//                         font: {
//                             size: 18,
//                             weight: 'bold',
//                         },
//                         color: '#333',
//                     },
//                     legend: {
//                         display: true,
//                         position: 'bottom',
//                         align: 'center',
//                         fullWidth: true,
//                         reverse: false,

//                         labels: {
//                             color: '#333',
//                             usePointStyle: true,
//                             font: {
//                                 size: 12,
//                                 weight: 'normal',
//                             },
//                         },
//                     },
//                     elements: {
//                         line: {
//                             borderWidth: 2,
//                             borderColor: 'rgba(75, 192, 192, 1)',
//                             backgroundColor: 'rgba(75, 192, 192, 0.2)',
//                             borderRadius: 10,
//                             fill: true,
//                         },
//                     },
//                     tooltip: {
//                         enabled: true,
//                         backgroundColor: '#fff',
//                         titleColor: '#333',
//                         bodyColor: '#333',
//                         titleFont: {
//                             size: 16,
//                             weight: 'bold',
//                         },
//                         bodyFont: {
//                             size: 14,
//                             weight: 'bold',
//                         },
//                     },
//                     responsive: true,
//                 },
//                 layout: {
//                     padding: {
//                         left: 10,
//                         right: 10,
//                         top: 10,
//                         bottom: 10,
//                     },
//                 },
//                 responsive: true,
//                 animations: {
//                     radius: {
//                         duration: 400,
//                         easing: 'linear',
//                     },
//                 },
//                 scales: {
//                     y: {
//                         title: {
//                             display: true,
//                         },
//                         ticks: {
//                             callback: function (value, index, values) {
//                                 return '$' + value;
//                             },
//                             color: '#333',
//                             font: {
//                                 size: 14,
//                                 weight: 'bold',
//                             },

//                             gridLines: {
//                                 display: false,
//                             },
//                         },
//                         grid: {
//                             display: true,
//                         },
//                     },
//                     x: {
//                         title: {
//                             display: true,
//                             // text: 'Month'
//                         },
//                         grid: {
//                             display: false,
//                         },
//                     },
//                 },
//             },
//         };

//         const myChart = new Chart(ctx, config);
//     })();
// });


// google.charts.load('current', { packages: ['corechart'] });
// google.charts.setOnLoadCallback(drawVisualization);

// function drawVisualization() {
//     // Some raw data (not necessarily accurate)
//     var data = google.visualization.arrayToDataTable([
//         ['Date', 'Course Earning', 'Book Earning'],
//         ['Mar 10', 4000, 9500],
//         ['Mar 11', 7800, 6800],
//         ['Mar 12', 8000, 6000],
//         ['Mar 13', 9000, 7000],
//         ['Mar 14', 10000, 8000],
//         ['Mar 15', 11000, 9000],
//         ['Mar 16', 12000, 10000],
//         ['Mar 17', 13000, 11000],
//         ['Mar 18', 14000, 12000],
//         ['Mar 19', 14500, 13000],
//         ['Mar 20', 13000, 14000],
//     ]);

//     var options = {
//         title: null,
//         legend: { position: 'top', alignment: 'center', maxLines: 3 },
//         vAxis: {
//             title: null,
//             ticks: [2000, 4000, 6000, 8000, 10000, 12000, 14000, 16000],
//         },
//         hAxis: { title: null },
//         seriesType: 'bars',
//         series: {
//             0: { type: 'bars', color: '#9C4DF4' },
//             1: { type: 'bars', color: '#FF6652' },
//         },
//         bar: {
//             groupWidth: 20,
//         },
//     };

//     var chart = new google.visualization.ComboChart(
//         document.getElementById('earning-analytics-chart')
//     );
//     chart.draw(data, options);
// }

// // Student Chart
// google.charts.load('current', { packages: ['corechart'] });
// google.charts.setOnLoadCallback(drawCharts);

// function drawCharts() {
//     drawTotalStudentChart();
//     drawNewStudentChart();
//     drawStudentActivityChart();
// }

// function drawTotalStudentChart() {
//     var data = new google.visualization.DataTable();
//     data.addColumn('string', 'Date');
//     data.addColumn('number', 'Students');

//     let startDate = new Date(2024, 0, 1);

//     for (let i = 0; i < 30; i++) {
//         let currentDate = new Date(startDate);
//         currentDate.setDate(startDate.getDate() + i);
//         let dateString = `${currentDate.getFullYear()}-${
//             currentDate.getMonth() + 1
//         }-${currentDate.getDate()}`;

//         data.addRow([
//             dateString,
//             Math.floor(6500 + Math.random() * (7000 - 6500)),
//         ]);
//     }

//     var options = {
//         curveType: 'function',
//         legend: { position: 'none' },
//         hAxis: {
//             textPosition: 'none',
//             gridlines: { count: -1, color: 'transparent' },
//         },
//         vAxis: {
//             textPosition: 'none',
//             // gridlines: { count: -1, color: 'transparent' }
//         },
//         colors: ['#A65FF5'],
//         areaOpacity: 0.2,
//         chartArea: { width: '100%', height: '80%', padding: '24' },
//     };

//     var totalStudent = new google.visualization.LineChart(
//         document.getElementById('total-student-chart')
//     );
//     totalStudent.draw(data, options);
// }

// function drawNewStudentChart() {
//     var data = new google.visualization.DataTable();
//     data.addColumn('string', 'Date');
//     data.addColumn('number', 'Students');

//     let startDate = new Date(2024, 0, 1);

//     for (let i = 0; i < 30; i++) {
//         let currentDate = new Date(startDate);
//         currentDate.setDate(startDate.getDate() + i);
//         let dateString = `${currentDate.getFullYear()}-${
//             currentDate.getMonth() + 1
//         }-${currentDate.getDate()}`;

//         data.addRow([
//             dateString,
//             Math.floor(6500 + Math.random() * (7000 - 6500)),
//         ]);
//     }

//     var options = {
//         curveType: 'function',
//         legend: { position: 'none' },
//         hAxis: {
//             textPosition: 'none',
//             gridlines: { count: -1, color: 'transparent' },
//         },
//         vAxis: {
//             textPosition: 'none',
//             // gridlines: { count: -1, color: 'transparent' }
//         },
//         colors: ['#FF6652'],
//         areaOpacity: 0.2,
//         chartArea: { width: '100%', height: '80%', padding: '24' },
//     };

//     var newStudent = new google.visualization.LineChart(
//         document.getElementById('new-student-chart')
//     );
//     newStudent.draw(data, options);
// }

// function drawStudentActivityChart() {
//     var data = google.visualization.arrayToDataTable([
//         ['Month', 'This Month', 'Last Month'],
//         ['Jan', 1000, 400],
//         ['Feb', 1170, 460],
//         ['Mar', 660, 1120],
//         ['Apr', 1030, 540],
//         ['May', 1000, 400],
//         ['Jun', 1170, 460],
//         ['Jul', 660, 1120],
//         ['Aug', 1030, 540],
//         ['Sep', 1000, 400],
//         ['Oct', 1170, 460],
//         ['Nov', 660, 1120],
//         ['Dec', 1030, 540],
//     ]);

//     var options = {
//         curveType: 'function',
//         legend: {
//             textStyle: { color: '#6C688A', fontSize: 16 },
//             position: 'top',
//             alignment: 'center',
//         },
//         hAxis: {
//             textPosition: 'none',
//             gridlines: { count: -1, color: 'transparent' },
//         },
//         vAxis: {
//             textPosition: 'none',
//             // gridlines: { count: -1, color: 'transparent' }
//         },
//         colors: ['#7f56d9', '#FF6652'],
//         areaOpacity: 0.2,
//         chartArea: { width: '100%', height: '80%', padding: '24' },
//     };

//     var studentActivityChart = new google.visualization.LineChart(
//         document.getElementById('student-activity-chart')
//     );
//     studentActivityChart.draw(data, options);
// }
