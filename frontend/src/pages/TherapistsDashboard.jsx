import React, { useState, useEffect } from "react";
import { 
  ArrowLeft, Users, Activity, Calendar, BarChart3, AlertTriangle, 
  MessageCircle, Clock, TrendingUp, Heart, Filter 
} from "lucide-react";

const TherapistDashboard = () => {
  const [clients, setClients] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedClient, setSelectedClient] = useState(null);
  const [stats, setStats] = useState({
    totalClients: 45,
    activeSessions: 23,
    avgMoodScore: 6.2,
    alerts: 3,
    weeklyCheckins: 187,
  });

  // Mock data - replace with API calls
  useEffect(() => {
    // Fetch clients, stats, etc. from your backend
    const mockClients = [
      { id: 1, name: "Sarah K.", avatar: "👩", moodTrend: [3,4,5,6,7], avgMood: 5.0, lastCheckin: "2h ago", riskLevel: "medium" },
      { id: 2, name: "John M.", avatar: "👨", moodTrend: [7,6,5,4,3], avgMood: 5.0, lastCheckin: "1d ago", riskLevel: "high" },
      { id: 3, name: "Aisha N.", avatar: "👩", moodTrend: [6,7,8,7,6], avgMood: 6.8, lastCheckin: "4h ago", riskLevel: "low" },
    ];
    setClients(mockClients);
  }, []);

  const riskColors = {
    low: "bg-emerald-100 text-emerald-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="p-3 bg-white/50 backdrop-blur-sm rounded-2xl hover:bg-white hover:shadow-xl transition-all">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Therapist Dashboard
              </h1>
              <p className="text-gray-600">Monitor client progress and intervene effectively</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white/70 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white/50">
            <div className="text-right">
              <div className="text-sm text-gray-500">Next Session</div>
              <div className="font-bold text-lg text-gray-900">10:30 AM</div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-blue-100">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-2xl">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.totalClients}</p>
                <p className="text-sm text-gray-600">Active Clients</p>
              </div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-emerald-100">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-100 rounded-2xl">
                <Activity className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.weeklyCheckins}</p>
                <p className="text-sm text-gray-600">Weekly Check-ins</p>
              </div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-indigo-100">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-100 rounded-2xl">
                <BarChart3 className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.avgMoodScore}</p>
                <p className="text-sm text-gray-600">Avg Mood Score</p>
              </div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-orange-100">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-100 rounded-2xl">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.alerts}</p>
                <p className="text-sm text-gray-600">Risk Alerts</p>
              </div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-purple-100">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-2xl">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.activeSessions}</p>
                <p className="text-sm text-gray-600">Active Sessions</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Clients & Alerts */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Navigation Tabs */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-1 border border-gray-100">
              <div className="flex space-x-1 bg-gradient-to-r from-gray-50 to-gray-100 p-1 rounded-2xl">
                {["overview", "clients", "alerts", "reports"].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-3 px-4 rounded-xl font-medium text-sm transition-all ${
                      activeTab === tab
                        ? "bg-white shadow-lg shadow-indigo-200 text-indigo-700"
                        : "text-gray-600 hover:text-indigo-600 hover:bg-white/50"
                    }`}
                  >
                    {tab === "overview" && "📊 Overview"}
                    {tab === "clients" && "👥 Clients"}
                    {tab === "alerts" && "🚨 Alerts"}
                    {tab === "reports" && "📈 Reports"}
                  </button>
                ))}
              </div>
            </div>

            {/* Clients List */}
            {activeTab === "clients" && (
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-blue-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <Users className="w-7 h-7" /> All Clients
                  </h2>
                  <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-xl">
                    <Filter className="w-4 h-4 text-gray-500" />
                    <select className="bg-transparent text-sm outline-none">
                      <option>All Clients</option>
                      <option>High Risk</option>
                      <option>Active Today</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  {clients.map(client => (
                    <div
                      key={client.id}
                      className="group p-6 bg-gradient-to-r from-white to-blue-50 rounded-2xl border border-blue-100 hover:shadow-xl transition-all cursor-pointer"
                      onClick={() => setSelectedClient(client)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                            {client.avatar}
                          </div>
                          <div>
                            <h3 className="font-bold text-lg text-gray-900">{client.name}</h3>
                            <p className="text-sm text-gray-600">Avg Mood: {client.avgMood}/10</p>
                          </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${riskColors[client.riskLevel]}`}>
                          {client.riskLevel.toUpperCase()}
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>📅 {client.lastCheckin}</span>
                          <span>📊 <span className="font-semibold text-gray-900">Trend:</span> {client.moodTrend[client.moodTrend.length-1] > client.avgMood ? "↗️" : "↘️"}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Alerts */}
            {activeTab === "alerts" && (
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-red-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <AlertTriangle className="w-7 h-7 text-red-500" /> Priority Alerts
                </h2>
                {/* Alert cards */}
                <div className="space-y-4">
                  <div className="p-6 bg-gradient-to-r from-red-50 to-rose-50 rounded-2xl border-2 border-red-200 shadow-lg">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center mt-1">
                        <AlertTriangle className="w-6 h-6 text-red-500" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-red-900">John M. - High Risk</h3>
                        <p className="text-sm text-red-700 mt-1">Mood dropped 4 points in 24h</p>
                        <div className="flex items-center gap-2 mt-3 text-xs text-red-600">
                          <Clock className="w-3 h-3" />
                          <span>2 hours ago</span>
                          <button className="px-3 py-1 bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition-colors">
                            Contact Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Client Detail / Quick Actions */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-purple-100 sticky top-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-6 rounded-2xl font-semibold hover:shadow-xl transition-all flex items-center justify-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Schedule Session
                </button>
                <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 px-6 rounded-2xl font-semibold hover:shadow-xl transition-all flex items-center justify-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Send Report
                </button>
                <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-2xl font-semibold hover:shadow-xl transition-all flex items-center justify-center gap-2">
                  <Heart className="w-5 h-5" />
                  Wellness Check
                </button>
              </div>
            </div>

            {/* Client Mood Chart */}
            {selectedClient && (
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-indigo-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4">{selectedClient.name}'s Progress</h3>
                <div className="space-y-4">
                  {/* Mood Trend Chart (SVG based) */}
                  <div className="h-32 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-4 flex items-end justify-between space-x-1">
                    {selectedClient.moodTrend.map((mood, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col items-center flex-1 group"
                        style={{ height: `${mood * 8}px` }}
                      >
                        <div className="w-4 bg-gradient-to-t from-indigo-400 to-blue-400 rounded-t-lg shadow-lg group-hover:scale-110 transition-transform" />
                        <span className="text-xs text-gray-500 mt-1">{mood}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-gray-900">{selectedClient.avgMood}</p>
                    <p className="text-sm text-gray-600">Average Mood (Past 5 days)</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TherapistDashboard;
