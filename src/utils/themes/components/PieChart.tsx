import { ArcElement, ChartData, Chart as ChartJS, ChartOptions, Legend, Tooltip } from 'chart.js';
import React from 'react';
import { Pie } from 'react-chartjs-2';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

const PieChart: React.FC = () => {
    const labels = ['Sudo-Admin', 'Super-Admin', 'Admin', 'User'];

    const data: ChartData<'pie'> = {
        labels: labels,
        datasets: [{
            label: '',
            data: [50, 59, 80, 81],
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

    const options: ChartOptions<'pie'> = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Pie Chart Example',
            },
        },
    };

    return (
        <div className='w-[300px] h-[300px]'>
            <Pie data={data} options={options} />
        </div>
    );
};

export default PieChart;
