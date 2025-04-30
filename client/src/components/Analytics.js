import React from "react";
import { FiBarChart2, FiActivity, FiAward, FiStar } from "react-icons/fi";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip
} from "recharts";

const Analytics = () => {
  // Chart Data
  const activityData = [
    { name: 'Questions', value: 12, fill: '#06b6d4' },
    { name: 'Answers', value: 34, fill: '#10b981' },
    { name: 'Views', value: 567, fill: '#8b5cf6' }
  ];

  const engagementData = [
    { name: 'Votes', value: 89, fill: '#f59e0b' },
    { name: 'Best Answers', value: 5, fill: '#ec4899' },
    { name: 'Rating', value: 4.8, fill: '#6366f1' }
  ];

  const timeSeriesData = [
    { day: 'Mon', questions: 2, answers: 5, views: 45 },
    { day: 'Tue', questions: 3, answers: 7, views: 78 },
    { day: 'Wed', questions: 5, answers: 10, views: 120 },
    { day: 'Thu', questions: 1, answers: 4, views: 34 },
    { day: 'Fri', questions: 4, answers: 8, views: 90 },
    { day: 'Sat', questions: 6, answers: 12, views: 150 },
    { day: 'Sun', questions: 2, answers: 6, views: 60 }
  ];

  const ratingData = [
    { category: 'Helpfulness', score: 4.5 },
    { category: 'Knowledge', score: 4.8 },
    { category: 'Activity', score: 4.2 },
    { category: 'Quality', score: 4.7 },
    { category: 'Engagement', score: 4.6 }
  ];

  return (
    <div className="w-full space-y-8">
      <div className="flex items-center gap-3">
        <FiBarChart2 className="text-cyan-600" size={32} />
        <h2 className="text-3xl font-extrabold text-gray-800">Your Analytics</h2>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Overview Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
          <div className="flex items-center gap-3 mb-6">
            <FiActivity className="text-cyan-600" size={24} />
            <h3 className="text-lg font-semibold">Activity Overview</h3>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData}>
                <Tooltip
                  cursor={{ fill: '#f0f9ff' }}
                  contentStyle={{
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                />
                <Bar
                  dataKey="value"
                  radius={[4, 4, 0, 0]}
                >
                  {activityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Engagement Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
          <div className="flex items-center gap-3 mb-6">
            <FiAward className="text-cyan-600" size={24} />
            <h3 className="text-lg font-semibold">Engagement Breakdown</h3>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={engagementData}
                  dataKey="value"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                >
                  {engagementData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Time Series Chart */}
      <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
        <h3 className="text-lg font-semibold mb-6">Weekly Activity Trend</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timeSeriesData}>
              <Tooltip
                contentStyle={{
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              />
              <Line
                type="monotone"
                dataKey="questions"
                stroke="#06b6d4"
                strokeWidth={2}
                dot={{ fill: '#06b6d4' }}
              />
              <Line
                type="monotone"
                dataKey="answers"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ fill: '#10b981' }}
              />
              <Line
                type="monotone"
                dataKey="views"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={{ fill: '#8b5cf6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Community Rating Radar Chart */}
      <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
        <div className="flex items-center gap-3 mb-6">
          <FiStar className="text-cyan-600" size={24} />
          <h3 className="text-lg font-semibold">Community Rating Analysis</h3>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart outerRadius={90} data={ratingData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="category" />
              <PolarRadiusAxis angle={30} domain={[0, 5]} />
              <Radar
                name="Rating"
                dataKey="score"
                stroke="#06b6d4"
                fill="#06b6d4"
                fillOpacity={0.4}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-cyan-50 p-6 rounded-xl flex items-center gap-4">
          <div className="text-2xl font-bold text-cyan-600">+24%</div>
          <div>
            <div className="font-medium">Engagement Growth</div>
            <div className="text-sm text-gray-600">Last 7 days</div>
          </div>
        </div>

        <div className="bg-green-50 p-6 rounded-xl flex items-center gap-4">
          <div className="text-2xl font-bold text-green-600">+15%</div>
          <div>
            <div className="font-medium">Answer Increase</div>
            <div className="text-sm text-gray-600">Week-over-week</div>
          </div>
        </div>

        <div className="bg-purple-50 p-6 rounded-xl flex items-center gap-4">
          <div className="text-2xl font-bold text-purple-600">+42%</div>
          <div>
            <div className="font-medium">Profile Visibility</div>
            <div className="text-sm text-gray-600">Monthly trend</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;