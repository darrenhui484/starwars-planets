import IPlanet from "../models/IPlanet"
import Plot from 'react-plotly.js';
import { Data, Layout } from "plotly.js";
import { ATTRIBUTE_TITLE_MAPPING } from "../constants/constants";

interface IBarChartProps {
    planets: Array<IPlanet>
    attribute: keyof IPlanet;
}

export default function BarChart({ planets, attribute }: IBarChartProps) {
    const data: Data[] = [{
        type: 'bar',
        x: planets.map(planet => planet.name),
        y: planets.map(planet => planet[attribute]),
        marker: {
            color: 'hsl(192,100,81)'
        }
    }]

    const layout: Partial<Layout> = {
        title: `Planets' ${ATTRIBUTE_TITLE_MAPPING[attribute]}`,
        paper_bgcolor: 'hsl(0,0,10)',
        plot_bgcolor: 'hsl(0,0,10)',
        font: {
            color: 'white'
        },
        autosize: true,
        xaxis: {
            title: 'Planets',
        },
        yaxis: {
            title: ATTRIBUTE_TITLE_MAPPING[attribute]
        },
        margin: {
            l: 200
        }
    };

    return (<>
        <Plot data={data} layout={layout} useResizeHandler={true} style={{ height: '100%', width: '100%', color: 'white' }} />
    </>)
}