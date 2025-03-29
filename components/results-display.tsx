"use client"

import { useSelector } from "react-redux"
import { selectCurrentQuery, selectResults, selectIsLoading, selectError } from "@/lib/features/query/querySlice"
import { Loader2, AlertCircle, BarChart2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DataChart from "@/components/data-chart"
import DataTable from "@/components/data-table"

export default function ResultsDisplay() {
  const currentQuery = useSelector(selectCurrentQuery)
  const results = useSelector(selectResults)
  const isLoading = useSelector(selectIsLoading)
  const error = useSelector(selectError)

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="flex flex-col items-center justify-center p-12">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <p className="text-lg font-medium">Processing your query...</p>
          <p className="text-muted-foreground mt-2">Analyzing data and generating insights</p>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (!results) {
    return (
      <Card className="w-full">
        <CardContent className="flex flex-col items-center justify-center p-12">
          <BarChart2 className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-lg font-medium">No results to display</p>
          <p className="text-muted-foreground mt-2">Try asking a business question to get started</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{results.title}</CardTitle>
        <CardDescription>Query: {currentQuery}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="chart" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="chart">Chart</TabsTrigger>
            <TabsTrigger value="table">Table</TabsTrigger>
          </TabsList>
          <TabsContent value="chart" className="mt-0">
            <div className="h-[400px] w-full">
              <DataChart data={results.data} type={results.chartType} />
            </div>
          </TabsContent>
          <TabsContent value="table" className="mt-0">
            <DataTable data={results.data} />
          </TabsContent>
        </Tabs>

        <div className="mt-6 p-4 bg-muted rounded-md">
          <h4 className="font-medium mb-2">AI Analysis</h4>
          <p className="text-sm">{results.analysis}</p>
        </div>
      </CardContent>
    </Card>
  )
}

