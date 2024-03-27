


$(document).ready(function () {
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

    // Tooltip
    $('.tteb-popup-content').hide();
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

    // Chosen for meta
    $('.chzn-select-meta').chosen({
        width: '100%',
        no_results_text: 'Oops, nothing found!',
    });

    // Select2 for keyword
    $('.chzn-select-keyword').chosen({
        width: '100%',
        no_results_text: 'Oops, nothing found!',
    });
});

$(document).ready(function () {
    // Radial Bar Chart
    function CircleBar(e, color) {
        $(e)
            .circleProgress({ fill: { color: color } })
            .on(
                'circle-animation-progress',
                function (_event, _progress, stepValue) {
                    $(this)
                        .find('.radial-percent')
                        .text(String(parseInt(100 * stepValue)) + '%');
                }
            );
    }
    CircleBar('.revenue-bar', '#7F56D9');
    CircleBar('.statistics-bar', '#FF5733');
    CircleBar('.analytics-bar', '#477AFF');
    CircleBar('.sales-bar', '#00C5C5');



    // Chart JS for Yearly Progress
    (function () {
        const ctx = document
            .getElementById('yearly-progress-canvas')
            .getContext('2d');

        // Replace these with your actual data for visits and sales each month
        const labels = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ];
        const visitData = [
            1800, 4300, 3400, 5600, 3200, 5000, 4300, 2200, 2600, 2900, 3300,
            4200,
        ];
        const salesData = [
            400, 2350, 2200, 2900, 900, 4200, 700, 3600, 2700, 2200, 2900, 2500,
        ];

        const data = {
            labels: labels,
            datasets: [
                {
                    label: 'Course Visit',
                    data: visitData,
                    backgroundColor: '#9C4DF4',
                    borderColor: '#9C4DF4',
                    borderWidth: 1,
                    strokeColor: '#ACC26D',
                    pointColor: '#fff',
                    pointStrokeColor: '#9DB86D',
                    tension: 0.4,
                    pointHitRadius: 10,
                    cubicInterpolationMode: 'monotone',
                    segment: {
                        lineJoin: 'round',
                    },
                },
                {
                    label: 'Course Sale',
                    data: salesData,
                    backgroundColor: '#FF6652',
                    borderColor: '#FF6652',
                    borderWidth: 1,
                    tension: 0.4,
                    pointHitRadius: 10,
                    cubicInterpolationMode: 'monotone',
                    segment: {
                        lineJoin: 'round',
                    },
                },
            ],
        };

        const config = {
            type: 'line',
            data: data,
            options: {
                plugins: {
                    title: {
                        display: false,
                        text: 'Yearly Progress',
                        padding: {
                            top: 10,
                            bottom: 30,
                        },
                        font: {
                            size: 18,
                            weight: 'bold',
                        },
                        color: '#333',
                    },
                    legend: {
                        display: true,
                        position: 'bottom',
                        align: 'center',
                        fullWidth: true,
                        reverse: false,

                        labels: {
                            color: '#333',
                            usePointStyle: true,
                            font: {
                                size: 12,
                                weight: 'normal',
                            },
                        },
                    },
                    elements: {
                        line: {
                            borderWidth: 2,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Set the fill color for the area under the line
                            borderRadius: 10,
                            fill: true, // Set this to true to fill the area under the line
                        },
                    },
                    tooltip: {
                        enabled: true,
                        backgroundColor: '#fff',
                        titleColor: '#333',
                        bodyColor: '#333',
                        titleFont: {
                            size: 16,
                            weight: 'bold',
                        },
                        bodyFont: {
                            size: 14,
                            weight: 'bold',
                        },
                    },
                    responsive: true,
                },
                layout: {
                    padding: {
                        left: 10,
                        right: 10,
                        top: 10,
                        bottom: 10,
                    },
                },
                responsive: true, // Makes the chart responsive to screen size
                animations: {
                    radius: {
                        duration: 400,
                        easing: 'linear',
                    },
                },
                scales: {
                    y: {
                        title: {
                            display: true,
                        },
                        ticks: {
                            // display: false,
                            // Include a dollar sign in the ticks
                            callback: function (value, index, values) {
                                return '$' + value;
                            },
                            color: '#333',
                            font: {
                                size: 14,
                                weight: 'bold',
                            },

                            gridLines: {
                                display: false,
                            },
                        },
                        grid: {
                            display: false, // Set this to false to hide the y-axis grid lines
                        },
                    },
                    x: {
                        title: {
                            display: true,
                            // text: 'Month'
                        },
                        grid: {
                            display: false, // Set this to false to hide the y-axis grid lines
                        },
                    },
                },
            },
        };

        const myChart = new Chart(ctx, config);
    })();



    // Doughnut Chart for Course Progress
    (function () {
        var ctx = document
            .getElementById('course-progress-chart')
            .getContext('2d');
        var courseProgressChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['In Progress', 'Not Completed', 'Completed'],
                datasets: [
                    {
                        // label: 'My First Dataset',
                        data: [300, 50, 100],
                        backgroundColor: ['#FF6652', '#477AFF', '#9C4DF4'],
                        hoverOffset: 4,
                    },
                ],
            },
            options: {
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        align: 'center',
                        fullWidth: true,
                        reverse: false,

                        labels: {
                            color: '#333',
                            usePointStyle: true,
                            font: {
                                size: 12,
                                weight: 'normal',
                            },
                        },
                    },
                },
            },
        });
    })();
});


$(document).ready(function () {
    // Chart JS for Yearly Progress
    (function () {
        const ctx = document
            .getElementById('sales-overview-canvas')
            .getContext('2d');

        // Replace these with your actual data for visits and sales each month
        const labels = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
        const newVisitorData = [1800, 4300, 3400, 5600, 3200, 5000, 4300];
        const uniqueVisitorData = [400, 2350, 2200, 2900, 900, 4200, 700];
        const prevVisitorData = [600, 2500, 2800, 1800, 700, 1200, 1900];

        const data = {
            labels: labels,
            datasets: [
                {
                    label: 'Course Visit',
                    data: newVisitorData,
                    backgroundColor: '#9C4DF4',
                    borderColor: '#9C4DF4',
                    borderWidth: 1,
                    strokeColor: '#ACC26D',
                    pointColor: '#fff',
                    pointStrokeColor: '#9DB86D',
                    tension: 0.4,
                    pointHitRadius: 10,
                    cubicInterpolationMode: 'monotone',
                    segment: {
                        lineJoin: 'round',
                    },
                },
                {
                    label: 'Course Sale',
                    data: uniqueVisitorData,
                    backgroundColor: '#FF6652',
                    borderColor: '#FF6652',
                    borderWidth: 1,
                    tension: 0.4,
                    pointHitRadius: 10,
                    cubicInterpolationMode: 'monotone',
                    segment: {
                        lineJoin: 'round',
                    },
                },
                {
                    label: 'Course Sale',
                    data: prevVisitorData,
                    backgroundColor: '#477AFF',
                    borderColor: '#477AFF',
                    borderWidth: 1,
                    tension: 0.4,
                    pointHitRadius: 10,
                    cubicInterpolationMode: 'monotone',
                    segment: {
                        lineJoin: 'round',
                    },
                },
            ],
        };

        const config = {
            type: 'line',
            data: data,
            options: {
                plugins: {
                    title: {
                        display: false,
                        text: 'Yearly Progress',
                        padding: {
                            top: 10,
                            bottom: 30,
                        },
                        font: {
                            size: 18,
                            weight: 'bold',
                        },
                        color: '#333',
                    },
                    legend: {
                        display: true,
                        position: 'bottom',
                        align: 'center',
                        fullWidth: true,
                        reverse: false,

                        labels: {
                            color: '#333',
                            usePointStyle: true,
                            font: {
                                size: 12,
                                weight: 'normal',
                            },
                        },
                    },
                    elements: {
                        line: {
                            borderWidth: 2,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Set the fill color for the area under the line
                            borderRadius: 10,
                            fill: true, // Set this to true to fill the area under the line
                        },
                    },
                    tooltip: {
                        enabled: true,
                        backgroundColor: '#fff',
                        titleColor: '#333',
                        bodyColor: '#333',
                        titleFont: {
                            size: 16,
                            weight: 'bold',
                        },
                        bodyFont: {
                            size: 14,
                            weight: 'bold',
                        },
                    },
                    responsive: true,
                },
                layout: {
                    padding: {
                        left: 10,
                        right: 10,
                        top: 10,
                        bottom: 10,
                    },
                },
                responsive: true, // Makes the chart responsive to screen size
                animations: {
                    radius: {
                        duration: 400,
                        easing: 'linear',
                    },
                },
                scales: {
                    y: {
                        title: {
                            display: true,
                        },
                        ticks: {
                            color: '#333',
                            font: {
                                size: 14,
                                weight: 'bold',
                            },
                        },
                        grid: {
                            display: true,
                        },
                    },
                    x: {
                        title: {
                            display: true,
                            // text: 'Month'
                        },
                        grid: {
                            display: true,
                        },
                    },
                },
            },
        };

        const myChart = new Chart(ctx, config);
    })();

    // Doughnut Chart for Course Progress
    if ($('#course-progress-chart-2').length > 0) {
            (function () {
                var ctx = document
                    .getElementById('course-progress-chart-2')
                    .getContext('2d');
                var courseProgressChartTwo = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: ['In Progress', 'Not Completed', 'Completed'],
                        datasets: [
                            {
                                // label: 'My First Dataset',
                                data: [300, 50, 100],
                                backgroundColor: [
                                    '#FF6652',
                                    '#477AFF',
                                    '#9C4DF4',
                                ],
                                hoverOffset: 4,
                            },
                        ],
                    },
                    options: {
                        plugins: {
                            legend: {
                                display: true,
                                position: 'bottom',
                                align: 'center',
                                fullWidth: true,
                                reverse: false,

                                labels: {
                                    color: '#333',
                                    usePointStyle: true,
                                    font: {
                                        size: 12,
                                        weight: 'normal',
                                    },
                                },
                            },
                        },
                    },
                });
            })();
    }


    // Storage Details Chart
    if($('#storage-chart').length > 0) {
        (function () {
            var ctx = document.getElementById('storage-chart').getContext('2d');
            var storageDetails = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['In Progress', 'Not Completed', 'Completed'],
                    datasets: [
                        {
                            // label: 'My First Dataset',
                            data: [300, 50, 100],
                            backgroundColor: ['#FF6652', '#477AFF', '#9C4DF4'],
                            hoverOffset: 4,
                        },
                    ],
                },
                options: {
                    plugins: {
                        legend: {
                            display: true,
                            position: 'bottom',
                            align: 'center',
                            fullWidth: true,
                            reverse: false,

                            labels: {
                                color: '#333',
                                usePointStyle: true,
                                font: {
                                    size: 12,
                                    weight: 'normal',
                                },
                            },
                        },
                    },
                },
            });
        })();
    }
});

$(document).ready(function () {
    // Storage Details Chart
    if ($('#storage-chart').length > 0) {
        (function () {
            var ctx = document.getElementById('storage-chart').getContext('2d');
            var storageDetails = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Used', 'Available'],
                    datasets: [
                        {
                            // label: 'My First Dataset',
                            data: [54, 74],
                            backgroundColor: [ '#9C4DF4','#FF6652'],
                            hoverOffset: 4,
                        },
                    ],
                },
                options: {
                    plugins: {
                        legend: {
                            display: true,
                            position: 'right',
                            align: 'bottom',
                            fullWidth: true,
                            reverse: false,

                            labels: {
                                color: '#333',
                                usePointStyle: true,
                                font: {
                                    size: 12,
                                    weight: 'normal',
                                },
                            },
                        },
                    },
                },
            });
        })();
    }
});


$(document).ready(function () {
    (function () {
        const ctx = document
            .getElementById('yearly-progress-status-canvas')
            .getContext('2d');

        // Replace these with your actual data for visits and sales each month
        const labels = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ];
        const visitData = [
            1800, 4300, 3400, 5600, 3200, 5000, 4300, 2200, 2600, 2900, 3300,
            4200,
        ];
        const salesData = [
            400, 2350, 2200, 2900, 900, 4200, 700, 3600, 2700, 2200, 2900, 2500,
        ];

        const data = {
            labels: labels,
            datasets: [
                {
                    label: 'Course Visit',
                    data: visitData,
                    borderColor: '#9C4DF4',
                    borderWidth: 1,
                    strokeColor: '#ACC26D',
                    pointColor: '#fff',
                    pointStrokeColor: '#9DB86D',
                    tension: 0.2,
                    cubicInterpolationMode: 'monotone',
                    backgroundColor: 'rgba(156, 77, 244, .2)',
                    fill: 'start',
                },
                {
                    label: 'Course Sale',
                    data: salesData,
                    backgroundColor: '#FF6652',
                    borderColor: '#FF6652',
                    borderWidth: 1,
                    tension: 0.2,
                    // pointHitRadius: 10,
                    cubicInterpolationMode: 'monotone',
                    // backgroundColor: 'rgba(156, 77, 244, .2)',
                    // borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    // fill: 'start',
                },
            ],
        };

        const config = {
            type: 'line',
            data: data,
            options: {
                plugins: {
                    title: {
                        display: false,
                        text: 'Yearly Progress',
                        padding: {
                            top: 10,
                            bottom: 30,
                        },
                        font: {
                            size: 18,
                            weight: 'bold',
                        },
                        color: '#333',
                    },
                    legend: {
                        display: true,
                        position: 'bottom',
                        align: 'center',
                        fullWidth: true,
                        reverse: false,

                        labels: {
                            color: '#333',
                            usePointStyle: true,
                            font: {
                                size: 12,
                                weight: 'normal',
                            },
                        },
                    },
                    elements: {
                        line: {
                            borderWidth: 2,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Set the fill color for the area under the line
                            borderRadius: 10,
                            fill: true, // Set this to true to fill the area under the line
                        },
                    },
                    tooltip: {
                        enabled: true,
                        backgroundColor: '#fff',
                        titleColor: '#333',
                        bodyColor: '#333',
                        titleFont: {
                            size: 16,
                            weight: 'bold',
                        },
                        bodyFont: {
                            size: 14,
                            weight: 'bold',
                        },
                    },
                    responsive: true,
                },
                layout: {
                    padding: {
                        left: 10,
                        right: 10,
                        top: 10,
                        bottom: 10,
                    },
                },
                responsive: true, // Makes the chart responsive to screen size
                animations: {
                    radius: {
                        duration: 400,
                        easing: 'linear',
                    },
                },
                scales: {
                    y: {
                        title: {
                            display: true,
                        },
                        ticks: {
                            // display: false,
                            // Include a dollar sign in the ticks
                            callback: function (value, index, values) {
                                return '$' + value;
                            },
                            color: '#333',
                            font: {
                                size: 14,
                                weight: 'bold',
                            },

                            gridLines: {
                                display: false,
                            },
                        },
                        grid: {
                            display: true, // Set this to false to hide the y-axis grid lines
                        },
                    },
                    x: {
                        title: {
                            display: true,
                            // text: 'Month'
                        },
                        grid: {
                            display: false, // Set this to false to hide the y-axis grid lines
                        },
                    },
                },
            },
        };

        const myChart = new Chart(ctx, config);
    })();
});