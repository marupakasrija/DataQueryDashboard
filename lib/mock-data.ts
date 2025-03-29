// Mock data generator for simulating AI query responses

type ChartResult = {
  title: string
  chartType: string
  data: any[]
  analysis: string
}

// Helper function to generate random numbers within a range
const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Generate monthly revenue data
const generateRevenueData = (): ChartResult => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const data = months.map((month) => ({
    month,
    revenue: getRandomNumber(50000, 150000),
  }))

  return {
    title: "Monthly Revenue Trends",
    chartType: "line",
    data,
    analysis:
      "Revenue shows a positive trend over the year with seasonal peaks in Q2 and Q4. The average monthly revenue is approximately $95,000, with a 12% increase compared to the previous year.",
  }
}

// Generate product performance data
const generateProductData = (): ChartResult => {
  const products = ["Product A", "Product B", "Product C", "Product D", "Product E"]

  const data = products.map((product) => ({
    product,
    sales: getRandomNumber(1000, 5000),
  }))

  // Sort by sales in descending order
  data.sort((a, b) => b.sales - a.sales)

  return {
    title: "Top 5 Performing Products",
    chartType: "bar",
    data,
    analysis:
      "Product A continues to be our top performer with 35% higher sales than the next best product. Products C and E have shown significant growth this quarter, increasing by 22% and 18% respectively.",
  }
}

// Generate regional sales data
const generateRegionalData = (): ChartResult => {
  const regions = ["North", "South", "East", "West", "Central"]

  const data = regions.map((region) => ({
    region,
    sales: getRandomNumber(200000, 500000),
  }))

  return {
    title: "Sales Performance by Region",
    chartType: "pie",
    data,
    analysis:
      "The West region leads in sales performance, accounting for 28% of total revenue. The North region has shown the most improvement, with a 15% increase from the previous quarter. The Central region requires attention as it's underperforming compared to other regions.",
  }
}

// Generate customer retention data
const generateRetentionData = (): ChartResult => {
  const segments = ["Enterprise", "Mid-Market", "SMB", "Startup"]

  const data = segments.map((segment) => ({
    segment,
    retentionRate: getRandomNumber(65, 95),
  }))

  return {
    title: "Customer Retention Rate by Segment",
    chartType: "bar",
    data,
    analysis:
      "Enterprise customers show the highest retention rate at 92%, indicating strong product-market fit in this segment. The Startup segment has the lowest retention at 68%, suggesting potential issues with pricing or feature alignment for smaller businesses.",
  }
}

// Generate marketing ROI data
const generateMarketingData = (): ChartResult => {
  const channels = ["Social Media", "Email", "Content Marketing", "PPC", "Affiliate", "Direct"]

  const data = channels.map((channel) => ({
    channel,
    roi: getRandomNumber(100, 400),
  }))

  // Sort by ROI in descending order
  data.sort((a, b) => b.roi - a.roi)

  return {
    title: "Marketing Campaign ROI by Channel",
    chartType: "bar",
    data,
    analysis:
      "Email marketing continues to deliver the highest ROI at 385%, making it our most efficient channel. Social media campaigns have improved significantly, now delivering 320% ROI compared to 250% last quarter. PPC performance has declined and requires optimization.",
  }
}

// Generate quarterly trend data
const generateQuarterlyData = (): ChartResult => {
  const quarters = ["Q1", "Q2", "Q3", "Q4"]
  const metrics = ["Revenue", "Expenses", "Profit"]

  const data = []

  for (const quarter of quarters) {
    const revenue = getRandomNumber(800000, 1200000)
    const expenses = getRandomNumber(500000, 700000)
    const profit = revenue - expenses

    data.push({
      quarter,
      revenue,
      expenses,
      profit,
    })
  }

  return {
    title: "Quarterly Financial Performance",
    chartType: "area",
    data,
    analysis:
      "Q3 showed the strongest profit margin at 42%, driven by increased revenue and stable expenses. Overall, the company's profitability has improved by 8% year-over-year, with revenue growth outpacing expense increases in the last two quarters.",
  }
}

// Main function to generate mock results based on query
export const generateMockResults = (query: string): ChartResult => {
  const queryLower = query.toLowerCase()

  if (queryLower.includes("revenue") || queryLower.includes("trend")) {
    return generateRevenueData()
  } else if (queryLower.includes("product") || queryLower.includes("top")) {
    return generateProductData()
  } else if (queryLower.includes("region") || queryLower.includes("compare")) {
    return generateRegionalData()
  } else if (queryLower.includes("retention") || queryLower.includes("customer")) {
    return generateRetentionData()
  } else if (queryLower.includes("marketing") || queryLower.includes("roi") || queryLower.includes("campaign")) {
    return generateMarketingData()
  } else {
    // Default to quarterly data for generic queries
    return generateQuarterlyData()
  }
}

