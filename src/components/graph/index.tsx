import { Bar, Pie, Line, Radar, PolarArea } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
    RadialLinearScale,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
    RadialLinearScale
);

interface GraphProps {
    type: "bar" | "pie" | "line" | "radar" | "polarArea";
    data: any;
    options?: any;
}

const Graph: React.FC<GraphProps> = ({ type, data, options }) => {
    switch (type) {
        case "bar":
            return <Bar data={data} options={options} />;
        case "pie":
            return <Pie data={data} options={options} />;
        case "line":
            return <Line data={data} options={options} />;
        case "radar":
            return <Radar data={data} options={options} />;
        case "polarArea":
            return <PolarArea data={data} options={options} />;
        default:
            return null;
    }
};

export default Graph;
