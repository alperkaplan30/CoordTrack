document.addEventListener('DOMContentLoaded', (event) => {
    const statusText = document.getElementById('statusText');

    let successCount = 0;
    let failedCount = 0;

    
    let failedCoordinates = {
        x: null,
        y: null,
        z: null
    };

    const updateStatus = (status) => {
        statusText.className = '';
        statusText.classList.add(status.toLowerCase().replace(' ', '-'));
        statusText.textContent = status;

        if (status === 'SUCCESS') {
            successCount++;
        } else if (status === 'FAILED') {
            failedCount++;
            
            if (failedCoordinates.x !== null) {
                xChart.data.labels.push(new Date());
                yChart.data.labels.push(new Date());
                zChart.data.labels.push(new Date());

                xChart.data.datasets[0].data.push(failedCoordinates.x);
                yChart.data.datasets[0].data.push(failedCoordinates.y);
                zChart.data.datasets[0].data.push(failedCoordinates.z);

                xChart.update();
                yChart.update();
                zChart.update();
            }
        }

      
        doughnutChart.data.datasets[0].data = [successCount, failedCount];
        doughnutChart.update();
    };

    const xCtx = document.getElementById('xChart').getContext('2d');
    const yCtx = document.getElementById('yChart').getContext('2d');
    const zCtx = document.getElementById('zChart').getContext('2d');

    const xChart = new Chart(xCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'X Coordinate',
                data: [],
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                fill: false
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'second'
                    },
                    title: {
                        display: true,
                        text: 'Time'
                    }
                },
                y: {
                    min: -1000,
                    max: 1000,
                    ticks: {
                        stepSize: 100
                    },
                    title: {
                        display: true,
                        text: 'X Coordinate'
                    }
                }
            }
        }
    });

    const yChart = new Chart(yCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Y Coordinate',
                data: [],
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                fill: false
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'second'
                    },
                    title: {
                        display: true,
                        text: 'Time'
                    }
                },
                y: {
                    min: -1000,
                    max: 1000,
                    ticks: {
                        stepSize: 100
                    },
                    title: {
                        display: true,
                        text: 'Y Coordinate'
                    }
                }
            }
        }
    });

    const zChart = new Chart(zCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Z Coordinate',
                data: [],
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: false
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'second'
                    },
                    title: {
                        display: true,
                        text: 'Time'
                    }
                },
                y: {
                    min: -1000,
                    max: 1000,
                    ticks: {
                        stepSize: 100
                    },
                    title: {
                        display: true,
                        text: 'Z Coordinate'
                    }
                }
            }
        }
    });

    const doughnutCtx = document.getElementById('doughnutChart').getContext('2d');

    const doughnutData = {
        labels: ['Success', 'Failed'],
        datasets: [{
            label: 'Process Count',
            data: [0, 0], 
            backgroundColor: ['#48e42c', '#f53737'], 
        }]
    };

    const doughnutConfig = {
        type: 'doughnut',
        data: doughnutData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Success or Failed Count'
                }
            }
        },
    };

    const doughnutChart = new Chart(doughnutCtx, doughnutConfig);

    const socket = io('http://localhost:5000');

    socket.on('coordinateUpdate', (data) => {
        if (statusText.textContent === 'FAILED') return;

        const now = new Date();

        xChart.data.labels.push(now);
        xChart.data.datasets[0].data.push(data.x);
        yChart.data.labels.push(now);
        yChart.data.datasets[0].data.push(data.y);
        zChart.data.labels.push(now);
        zChart.data.datasets[0].data.push(data.z);

        xChart.update();
        yChart.update();
        zChart.update();
    });

    socket.on('statusUpdate', (status) => {
        if (status === 'FAILED') {
            failedCoordinates = {
                x: xChart.data.datasets[0].data.slice(-1)[0],
                y: yChart.data.datasets[0].data.slice(-1)[0],
                z: zChart.data.datasets[0].data.slice(-1)[0]
            };
        }
        updateStatus(status);
    });

    socket.on('processCompletion', (data) => {
        if (data.status === 'FAILED') {
            failedCoordinates = data.coordinates;
        }
    });
});
