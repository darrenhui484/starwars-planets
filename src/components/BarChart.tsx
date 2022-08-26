import IPlanet from "../models/IPlanet"
import Plot from 'react-plotly.js';
import { Data, Layout } from "plotly.js";

interface IBarChartProps {
    planets: Array<IPlanet>
    attribute: keyof IPlanet;
}

export default function BarChart({ planets, attribute }: IBarChartProps) {
    const data: Data[] = [
        {
            type: 'bar',
            x: planets.map(planet => planet.name),
            y: planets.map(planet => planet[attribute]),
        }]

    const layout: Partial<Layout> = {
        title: 'Star Wars Planet Information',
        autosize: true,
        xaxis: {
            title: 'Planets'
        },
        yaxis: {
            title: attribute
        }

    };

    return (<>
        <Plot data={data} layout={layout} useResizeHandler={true} style={{ height: '100%', width: '100%' }} />
    </>)
}