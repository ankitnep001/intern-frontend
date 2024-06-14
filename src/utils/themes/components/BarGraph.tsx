import { BarElement, CategoryScale, ChartData, Chart as ChartJS, ChartOptions, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const BarGraph: React.FC = () => {
    const labels = ['Sudo-Admin', 'Super-Admin', 'Admin', 'User'];

    const data: ChartData<'bar'> = {
        labels: labels,
        datasets: [{
            label: '',
            data: [10, 34, 80, 91],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)'
            ],
            borderWidth: 1
        }]
    };

    const options: ChartOptions<'bar'> = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Bar Chart Example',
            },
        },
    };

    return (
        <div className='flex items-center w-[500px] h-[500px]'>
            <Bar data={data} options={options} />

        </div>
    );
};

export default BarGraph;
