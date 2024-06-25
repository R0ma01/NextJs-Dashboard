import React from 'react';
import Chart from 'chart.js/auto';
import {CategoryScale} from 'chart.js'; 
Chart.register(CategoryScale);
import {Bar} from 'react-chartjs-2';

export default function barchartComponent(data: any[], parameter: string) {

    const dataSet: number[] = data.map(item => item[parameter]);

    // Example data for demonstration (replace with actual data logic)
    const dataValues = [1, 2, 3];

    // Chart.js data object structure
    const chartData = {
        labels: ["low", "high", "mid"], // Labels based on parameter values
        datasets: [
            {
                label: 'low',
                data: [1, 2, 3], // Example data values
            },
        ],
    };



    return (
        <div className="">
            <Bar data={{
        labels: ["low", "high", "mid"],
        datasets: [
            {
                label:"hello",
                data: [1, 2, 3], // Example data values
            },
        ],
    }}/>
        </div>
    );
}
