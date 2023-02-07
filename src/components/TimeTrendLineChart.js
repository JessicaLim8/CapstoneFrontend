import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

function TimeTrendLineChart(props) {
  return (
    <div className="TimeTrendLineChart">
        <LineChart width={400} height={200} data={props.data}>
            <Line type="monotone" dataKey={props.dataKey} stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" />
            <YAxis />
        </LineChart>
    </div>
  );
}

export default TimeTrendLineChart;
