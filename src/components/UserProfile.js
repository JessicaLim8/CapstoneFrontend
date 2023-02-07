import TimeTrendLineChart from './TimeTrendLineChart';
const data = [
    {date: '18-10-2022', max: 400, avg: 256, data: [10, 11, 12, 13, 14, 15, 14, 13, 12]}, 
    {date: '31-10-2022', max: 300, avg: 300, data: [10, 11, 12, 13, 14, 15, 14, 13, 12]}, 
    {date: '01-11-2022', max: 551, avg: 235, data: [10, 11, 12, 13, 14, 15, 14, 13, 12]}, 
];

function UserProfile(...props) {
  return (
    <div className="User-Profile">
        <TimeTrendLineChart data={data} dataKey="max"/>
        <TimeTrendLineChart data={data} dataKey="avg"/>

    </div>
  );
}

export default UserProfile;
