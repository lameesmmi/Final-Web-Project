import React, { useState, useEffect } from 'react';
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

// List of month labels for the X-axis
const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

// Static earnings data for each year (2021 to 2025)
// Values are balanced to reflect realistic monthly earnings in SAR
const staticEarnings = {
  2021: [1200, 2100, 1700, 2200, 1300, 1100, 1900, 1250, 1400, 2000, 1600, 1800],
  2022: [1900, 1500, 1800, 2300, 2400, 1100, 1200, 1800, 2200, 2500, 1900, 2100],
  2023: [2400, 2700, 1300, 3100, 1700, 1600, 2800, 3200, 1900, 2000, 2100, 3100],
  2024: [3100, 2800, 2500, 3300, 2000, 1800, 2900, 3450, 3300, 2500, 3100, 3350],
  2025: [1500, 1800, 1200, 2000, 1100, 1400, 0, 0, 0, 0, 0, 0], // Partial year
};

const EarningPerMonth = () => {
  // State to hold the list of years available for selection
  const [availableYears, setAvailableYears] = useState([]);

  // State to store the currently selected year from the dropdown
  const [selectedYear, setSelectedYear] = useState('');

  // State to hold earnings for the selected year (12 months)
  const [earnings, setEarnings] = useState(new Array(12).fill(0));

  // Populate available years on component mount
  useEffect(() => {
    setAvailableYears(Object.keys(staticEarnings));
  }, []);

  // Update earnings when a year is selected
  useEffect(() => {
    if (!selectedYear) return;

    setEarnings(staticEarnings[selectedYear] || new Array(12).fill(0));
  }, [selectedYear]);

  // Prepare data in the format required for the chart
  const chartData = months.map((month, index) => ({
    month,
    earning: earnings[index],
  }));

  return (
    <div className="earning-container">
      {/* Year dropdown selector */}
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

      {/* Bar chart display for monthly earnings */}
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chartData}
            barCategoryGap="25%"
            margin={{ top: 10, right: 0, left: 10, bottom: 40 }}
          >
            {/* Grid lines */}
            <CartesianGrid vertical={false} stroke="#000" strokeWidth={1} />

            {/* X-axis configuration */}
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

            {/* Y-axis configuration */}
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

            {/* Tooltip for hover values */}
            <Tooltip
              wrapperStyle={{ fontSize: '13px', fontFamily: 'Ubuntu' }}
              formatter={(value) => [`${value} SAR`, 'Earning']}
            />

            {/* Earnings bar */}
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
