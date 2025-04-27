import React from "react";
import { FiBarChart2, FiActivity, FiAward, FiStar } from "react-icons/fi";

const Analytics = () => {
  // Static data - replace with dynamic data if needed
  const analyticsData = {
    activity: {
      questionsPosted: 12,
      answersProvided: 34,
      profileViews: 567
    },
    engagement: {
      totalVotes: 89,
      bestAnswers: 5,
      communityRating: 4.8
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-8">
        <FiBarChart2 className="text-cyan-600" size={32} />
        <h2 className="text-3xl font-extrabold text-gray-800">Your Analytics</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Activity Overview Card */}
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
          <div className="flex items-center gap-3 mb-6">
            <FiActivity className="text-cyan-600" size={24} />
            <h3 className="text-lg font-semibold">Activity Overview</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-cyan-50 rounded-lg">
              <span>📝 Questions Posted</span>
              <span className="font-medium text-cyan-700">
                {analyticsData.activity.questionsPosted}
              </span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <span>💬 Answers Provided</span>
              <span className="font-medium text-green-700">
                {analyticsData.activity.answersProvided}
              </span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
              <span>👀 Profile Views</span>
              <span className="font-medium text-purple-700">
                {analyticsData.activity.profileViews}
              </span>
            </div>
          </div>
        </div>

        {/* Engagement Stats Card */}
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
          <div className="flex items-center gap-3 mb-6">
            <FiAward className="text-cyan-600" size={24} />
            <h3 className="text-lg font-semibold">Engagement Stats</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
              <span>📈 Total Votes Received</span>
              <span className="font-medium text-orange-700">
                {analyticsData.engagement.totalVotes}
              </span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-pink-50 rounded-lg">
              <span>🏆 Best Answers</span>
              <span className="font-medium text-pink-700">
                {analyticsData.engagement.bestAnswers}
              </span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-lg">
              <span className="flex items-center gap-2">
                <FiStar className="text-yellow-500" /> Community Rating
              </span>
              <span className="font-medium text-indigo-700">
                {analyticsData.engagement.communityRating}/5
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Stats Section */}
      <div className="mt-8 p-6 bg-cyan-50 rounded-xl">
        <h3 className="text-lg font-semibold mb-4">Weekly Progress</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-cyan-600">+24%</div>
            <div className="text-sm text-gray-600">Engagement</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-green-600">+15%</div>
            <div className="text-sm text-gray-600">Answers</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-purple-600">+42%</div>
            <div className="text-sm text-gray-600">Visibility</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;