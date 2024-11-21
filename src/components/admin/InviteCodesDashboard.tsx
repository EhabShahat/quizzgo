import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

interface InviteCode {
  code: string;
  used: boolean;
  createdAt: Date;
  participantName?: string;
}

interface InviteCodesDashboardProps {
  codes: InviteCode[];
}

export const InviteCodesDashboard = ({ codes }: InviteCodesDashboardProps) => {
  const totalCodes = codes.length;
  const usedCodes = codes.filter((code) => code.used).length;
  const availableCodes = totalCodes - usedCodes;

  const pieData = [
    { name: "Used", value: usedCodes, color: "#F97316" },
    { name: "Available", value: availableCodes, color: "#8B5CF6" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card className="bg-white/5">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white">Total Codes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{totalCodes}</div>
        </CardContent>
      </Card>
      <Card className="bg-white/5">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white">Used Codes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{usedCodes}</div>
        </CardContent>
      </Card>
      <Card className="bg-white/5">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white">Available Codes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{availableCodes}</div>
        </CardContent>
      </Card>

      {totalCodes > 0 && (
        <Card className="bg-white/5">
          <CardHeader>
            <CardTitle className="text-white">Code Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[150px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={40}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};