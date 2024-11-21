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

  const cards = [
    { title: "Total", value: totalCodes, bgColor: "bg-card", textColor: "text-purple-400", icon: "▲" },
    { title: "Available", value: availableCodes, bgColor: "bg-card", textColor: "text-green-400", icon: "●" },
    { title: "Used", value: usedCodes, bgColor: "bg-card", textColor: "text-orange-400", icon: "■" },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white">Usage Statistics</h3>
      <div className="grid grid-cols-3 gap-4">
        {cards.map((card, index) => (
          <Card key={index} className={`${card.bgColor} border-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105`}>
            <CardHeader className="pb-2">
              <CardTitle className={`text-sm font-medium flex items-center gap-2 ${card.textColor}`}>
                <span>{card.icon}</span>
                {card.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${card.textColor}`}>
                {card.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {totalCodes > 0 && (
        <Card className="bg-card border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Usage</CardTitle>
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