"use client"

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts"

type DataPoint = {
  [key: string]: string | number
}

type DataChartProps = {
  data: DataPoint[]
  type: string
}

const COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--secondary))",
  "hsl(var(--accent))",
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#0088fe",
  "#00C49F",
  "#FFBB28",
]

export default function DataChart({ data, type }: DataChartProps) {
  if (!data || data.length === 0) {
    return <div>No data available</div>
  }

  // Extract keys for x and y axis (assuming first data point structure is consistent)
  const keys = Object.keys(data[0])
  const xKey = keys[0] // First key is usually the category/label
  const yKey = keys[1] // Second key is usually the value

  switch (type.toLowerCase()) {
    case "bar":
      return (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xKey} angle={-45} textAnchor="end" height={60} tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={yKey} fill="hsl(var(--primary))" />
          </BarChart>
        </ResponsiveContainer>
      )

    case "line":
      return (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xKey} angle={-45} textAnchor="end" height={60} tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={yKey} stroke="hsl(var(--primary))" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      )

    case "area":
      return (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xKey} angle={-45} textAnchor="end" height={60} tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey={yKey} stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.2)" />
          </AreaChart>
        </ResponsiveContainer>
      )

    case "pie":
      return (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <Pie
              data={data}
              dataKey={yKey}
              nameKey={xKey}
              cx="50%"
              cy="50%"
              outerRadius={120}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )

    default:
      return (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xKey} angle={-45} textAnchor="end" height={60} tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={yKey} fill="hsl(var(--primary))" />
          </BarChart>
        </ResponsiveContainer>
      )
  }
}

