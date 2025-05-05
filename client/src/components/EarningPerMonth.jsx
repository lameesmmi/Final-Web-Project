// Path: src/components/EarningPerMonth.jsx

import React, { useState, useEffect } from 'react';
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

const EarningPerMonth = () => {
  const guideId = localStorage.getItem('guideId');

  const [availableYears, setAvailableYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [earnings, setEarnings] = useState(new Array(12).fill(0));

  useEffect(() => {
    axios.get(`/guides/earnings-years/${guideId}`)
      .then((res) => setAvailableYears(res.data))
      .catch(() => setAvailableYears([]));
  }, []);

  useEffect(() => {
    if (!selectedYear) return;

    axios.get(`/api/guides/earnings-per-month/${guideId}/${selectedYear}`)
      .then((res) => setEarnings(res.data))
      .catch(() => setEarnings(new Array(12).fill(0)));
  }, [selectedYear]);

  const chartData = months.map((month, index) => ({
    month,
    earning: earnings[index],
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
                value="SAR"
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
              formatter={(value) => [`${value} SAR`, 'Earning']}
            />
            <Bar
              dataKey="earning"
              fill="#000"
              radius={[0, 0, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EarningPerMonth;
