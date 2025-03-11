
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Users, Eye, Clock, TrendingUp, TrendingDown } from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip,
  ResponsiveContainer, 
  BarChart, 
  Bar,
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

// Mock data for our analytics
const pageViewsData = [
  { name: 'Jan', views: 400 },
  { name: 'Feb', views: 300 },
  { name: 'Mar', views: 600 },
  { name: 'Apr', views: 800 },
  { name: 'May', views: 700 },
  { name: 'Jun', views: 900 },
  { name: 'Jul', views: 1100 },
];

const trafficSourceData = [
  { name: 'Direct', value: 40 },
  { name: 'Search', value: 30 },
  { name: 'Social', value: 20 },
  { name: 'Referral', value: 10 },
];

const visitDurationData = [
  { name: '0-10s', duration: 20 },
  { name: '10-30s', duration: 30 },
  { name: '30-60s', duration: 25 },
  { name: '1-3m', duration: 15 },
  { name: '3m+', duration: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const KPICard = ({ title, value, change, icon, trend }: { title: string; value: string; change: string; icon: React.ReactNode; trend: 'up' | 'down' }) => (
  <Card>
    <CardContent className="pt-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          <div className="flex items-center mt-1">
            {trend === 'up' ? (
              <TrendingUp className="mr-1 h-3 w-3 text-emerald-500" />
            ) : (
              <TrendingDown className="mr-1 h-3 w-3 text-rose-500" />
            )}
            <span className={`text-xs font-medium ${trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
              {change}
            </span>
          </div>
        </div>
        <div className="p-2 bg-primary/10 rounded-full">
          {icon}
        </div>
      </div>
    </CardContent>
  </Card>
);

const AnalyticsDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <KPICard 
          title="Total Visitors" 
          value="15,300" 
          change="+12% from last month" 
          icon={<Users className="h-5 w-5 text-primary" />} 
          trend="up"
        />
        <KPICard 
          title="Page Views" 
          value="42,500" 
          change="+8% from last month" 
          icon={<Eye className="h-5 w-5 text-primary" />} 
          trend="up"
        />
        <KPICard 
          title="Bounce Rate" 
          value="24%" 
          change="-3% from last month" 
          icon={<Activity className="h-5 w-5 text-primary" />} 
          trend="down"
        />
        <KPICard 
          title="Avg. Visit Duration" 
          value="2m 15s" 
          change="+10% from last month" 
          icon={<Clock className="h-5 w-5 text-primary" />} 
          trend="up"
        />
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Page Views Over Time</CardTitle>
            <CardDescription>Monthly page views for the last 7 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={pageViewsData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RechartsTooltip />
                  <Area type="monotone" dataKey="views" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>Where your visitors are coming from</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={trafficSourceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {trafficSourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Visit Duration</CardTitle>
          <CardDescription>How long visitors stay on your site</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={visitDurationData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <RechartsTooltip />
                <Bar dataKey="duration" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
