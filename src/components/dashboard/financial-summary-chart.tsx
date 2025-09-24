
'use client';

import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

const chartData = [
  { month: 'Jan', revenue: 9000, expenses: 6500 },
  { month: 'Feb', revenue: 9500, expenses: 7000 },
  { month: 'Mar', revenue: 11000, expenses: 7200 },
  { month: 'Apr', revenue: 10500, expenses: 8000 },
  { month: 'May', revenue: 12000, expenses: 8500 },
  { month: 'Jun', revenue: 13500, expenses: 9000 },
  { month: 'Jul', revenue: 14000, expenses: 9200 },
  { month: 'Aug', revenue: 13000, expenses: 8800 },
  { month: 'Sep', revenue: 12500, expenses: 8300 },
  { month: 'Oct', revenue: 14500, expenses: 9500 },
  { month: 'Nov', revenue: 15000, expenses: 9800 },
  { month: 'Dec', revenue: 16000, expenses: 10200 },
];

export function FinancialSummaryChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Summary</CardTitle>
        <CardDescription>
          Revenue and expenses over the last year.
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="month"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${Number(value) / 1000}K`}
            />
             <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                }}
                cursor={{ fill: 'hsl(var(--muted))' }}
            />
            <Legend wrapperStyle={{fontSize: "12px", paddingTop: "10px"}}/>
            <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0}/>
                </linearGradient>
            </defs>
            <Area type="monotone" dataKey="revenue" name="Revenue" stroke="hsl(var(--chart-1))" fillOpacity={1} fill="url(#colorRevenue)" />
            <Area type="monotone" dataKey="expenses" name="Expenses" stroke="hsl(var(--chart-2))" fillOpacity={1} fill="url(#colorExpenses)" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
