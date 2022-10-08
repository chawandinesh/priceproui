import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { CircularProgress, Grid } from '@mui/material';
import moment from 'moment';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
console.log(getRandomColor());

const colors = [
    { borderColor: 'rgb(255, 99, 132)', backgroundColor: 'rgba(255, 99, 132, 0.5)' },
    { borderColor: 'rgb(53, 162, 235)', backgroundColor: 'rgba(53, 162, 235, 0.5)' },
    { borderColor: 'rgb(62, 205, 53)', backgroundColor: 'rgba(62, 205, 53,0.5)' }
];
export function HistoryChart() {
    const state = useSelector((state) => state);
    const { data, loading, error, errorText } = _.get(state, 'productHistory');
    const labels = _.map(data[0], (eachData) => moment(_.get(eachData, 'created_at')).format('DD-MM-YYYY'));

    const dataS = {
        labels,
        datasets: _.map(data, (eachData, idx) => {
            return {
                label: _.get(_.head(eachData), 'store'),
                data: _.map(eachData, (each) => _.get(each, 'price')),
                borderColor: colors[idx].borderColor,
                backgroundColor: colors[idx].backgroundColor
            };
        })
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: _.size(_.get(dataS, 'datasets')) ? true : false,
                color: 'black',
                font: {
                    size: 20,
                    color: 'black'
                },
                text: `Price History for - ${_.get(state, 'search.searchResults[0].title', '').slice(0, 30)} ...`
            }
        }
    };

    if (loading) {
        return (
            <Grid item xs={12}>
                <Grid container justifyContent="center">
                    <Grid item>
                        <CircularProgress />
                    </Grid>
                </Grid>
            </Grid>
        );
    } else {
        return <Line options={options} data={dataS} />;
    }
}
