(function () {
    const socket = io();
    let dataIntensity = [];
    let dataTemp = [];
    var optionsLight = {
        series: [{
            name: "Intensity",
            data: dataIntensity
        }],
        colors: ["#FF1654"],
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            },
            animations: {
                enabled: true,
                easing: 'linear',
                dynamicAnimation: {
                    speed: 1000
                }
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight',
            width: 1
        },
        title: {
            text: 'Light Intensity',
            align: 'left'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        },
        xaxis: {
            title: {
                text: "Time"
            },
            type: 'datetime',
            labels: {
                show: true,
                formatter: function (value, timestamp, opts) {
                    // console.log(value);
                    return moment(value).format("hh:mm:ss A");
                }
            }
        },
        yaxis: {
            min: 0,
            max: 255,
            title: {
                text: "Intesity"
            }
        }
    };
    var optionsTemp = {
        series: [{
            name: "Temperature",
            data: dataTemp
        }],
        colors: ["#FF1654"],
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            },
            animations: {
                enabled: true,
                easing: 'linear',
                dynamicAnimation: {
                    speed: 1000
                }
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight',
            width: 1
        },
        title: {
            text: 'Temperature',
            align: 'left'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        },
        xaxis: {
            title: {
                text: "Time"
            },
            type: 'datetime',
            labels: {
                show: true,
                formatter: function (value, timestamp, opts) {
                    // console.log(value);
                    return moment(value).format("hh:mm:ss A");
                }
            }
        },
        yaxis: {
            min: 0,
            max: 255,
            title: {
                text: "Temperature"
            }
        }
    };

    var chartLight = new ApexCharts(document.querySelector("#chart_light"), optionsLight);
    var chartTemp = new ApexCharts(document.querySelector("#chart_temp"), optionsTemp);
    chartLight.render();
    chartTemp.render();
    socket.on('light_sensor', function (msg) {
        if (chartLight && chartTemp) {
            const data = JSON.parse(msg.data);
            const {temp, light_intesity} = data;
            console.log(temp, light_intesity);
            dataTemp = [
                ...dataTemp,
                {
                    x: new Date().getTime(),
                    y: temp
                }
            ];
            dataIntensity = [
                ...dataIntensity,
                {
                    x: new Date().getTime(),
                    y: light_intesity
                }
            ];
            chartTemp.updateSeries([{
                data: dataTemp
            }]);
            chartLight.updateSeries([{
                data: dataIntensity
            }]);
        }
    });
})();
