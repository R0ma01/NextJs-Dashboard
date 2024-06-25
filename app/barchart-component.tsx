import React from 'react';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
Chart.register(CategoryScale);
import { Bar } from 'react-chartjs-2';

export default function BarchartComponent({ data, parameter}) {
    const dataSet = data.map(item => item[parameter]);
    const countMap = new Map();
    let chartData = {};

    switch (parameter) {
        default:
            dataSet.forEach(word => {
                if (countMap.get(word)) {
                    countMap.set(word, countMap.get(word) + 1);
                } else {
                    countMap.set(word, 1);
                }
            });
            break;

        case 'age':
            countMap.set("- de 24", 0);
            countMap.set("24 à 28", 0);
            countMap.set("29 et +", 0);

            dataSet.forEach(age => {
                if (age >= 29) {
                    countMap.set("29 et +", countMap.get("29 et +") + 1);
                } else if (age >= 24) {
                    countMap.set("24 à 28", countMap.get("24 à 28") + 1);
                } else {
                    countMap.set("- de 24", countMap.get("- de 24") + 1);
                }
            });
            break;
    }

    chartData = {
        labels: Array.from(countMap.keys()),
        datasets: [
            {
                label: parameter,
                data: Array.from(countMap.values()),
            },
        ],
    };

    return (
        <div className="barchart-component">
            <Bar data={chartData} />
        </div>
    );
}
