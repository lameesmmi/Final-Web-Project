// Path: src/components/ActivitiesPerMonth.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from 'recharts';
import './EarningPerMonth.css';

const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const ActivitiesPerMonth = ({ guideId }) => {
  const [availableYears, setAvailableYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [activities, setActivities] = useState(Array(12).fill(0));

  useEffect(() => {
    axios.get(`/guide/available-years/${guideId}`)
      .then((res) => setAvailableYears(res.data))
      .catch(() => setAvailableYears([]));
  }, [guideId]);

  useEffect(() => {
    if (!selectedYear) return;

    axios.get(`/api/guide/activities-per-month/${guideId}/${selectedYear}`)
      .then((res) => setActivities(res.data))
      .catch(() => setActivities(Array(12).fill(0)));
  }, [selectedYear, guideId]);

  const chartData = months.map((month, index) => ({
    month,
    activityCount: activities[index],
  }));

  return (
    <div className="earning-container">
      <div className="year-dropdown-centered">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="year-select-bw"
        >
          <option value="">Choose a year</option>
          {availableYears.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chartData}
            barCategoryGap="25%"
            margin={{ top: 10, right: 0, left: 10, bottom: 40 }}
          >
            <CartesianGrid vertical={false} stroke="#000" strokeWidth={1} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 13, fontFamily: 'Ubuntu', fill: '#000' }}
              angle={-45}
              textAnchor="end"
              interval={0}
            >
              <Label
                value="Month"
                offset={30}
                position="bottom"
                style={{ fill: '#000', fontFamily: 'Ubuntu', fontSize: 14 }}
              />
            </XAxis>
            <YAxis
              axisLine={{ stroke: '#000', strokeWidth: 3 }}
              tick={{ fontSize: 13, fill: '#000' }}
              tickLine={false}
              tickFormatter={(value) => `${value}`}
            >
              <Label
                value="Activities"
                position="bottom"
                offset={-114}
                dx={-27}
                style={{
                  fill: '#000',
                  fontFamily: 'Ubuntu',
                  fontSize: 14,
                  textAnchor: 'middle'
                }}
              />
            </YAxis>
            <Tooltip
              wrapperStyle={{ fontSize: '13px', fontFamily: 'Ubuntu' }}
              formatter={(value) => [`${value} activities`, 'Count']}
            />
            <Bar
              dataKey="activityCount"
              fill="#000"
              radius={[0, 0, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ActivitiesPerMonth;
