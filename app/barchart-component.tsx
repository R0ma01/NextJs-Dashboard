import React from 'react';
import Chart from 'chart.js/auto';
import {CategoryScale} from 'chart.js'; 
Chart.register(CategoryScale);
import {Bar} from 'react-chartjs-2';
import { count } from 'console';

export default function barchartComponent(data: any[], parameter: string) {

    const dataSet: number[] = data.map(item =>{ return item[parameter];});
    console.log(dataSet);
    const countMap = new Map();
  
    dataSet.forEach(word => {
    if (countMap.get(word)) {
      countMap.set(word, countMap.get(word)+ 1);
    } else {
      countMap.set(word, 1);
    }
  });
    console.log(Array.from(countMap));

    const chartData = {
        labels: Array.from(countMap.keys()),
        datasets: [
            {
                label: parameter,
                data: Array.from(countMap.values()),
            },
        ],
    };
    
    return (
        <div className="">
            <Bar data={chartData}/>
        </div>
    );
}
