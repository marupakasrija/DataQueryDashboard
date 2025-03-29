"use client"

import { useSelector, useDispatch } from "react-redux"
import { Clock, ArrowUpRight, Trash2 } from "lucide-react"
import {
  selectQueryHistory,
  removeFromHistory,
  submitQuery,
  setLoading,
  setResults,
} from "@/lib/features/query/querySlice"
import { generateMockResults } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"

export default function QueryHistory() {
  const queryHistory = useSelector(selectQueryHistory)
  const dispatch = useDispatch()

  const handleRerunQuery = (query: string) => {
    dispatch(submitQuery(query))
    dispatch(setLoading(true))

    // Simulate API call delay
    setTimeout(() => {
      const mockResults = generateMockResults(query)
      dispatch(setResults(mockResults))
      dispatch(setLoading(false))
    }, 1500)
  }

  const handleRemoveQuery = (index: number) => {
    dispatch(removeFromHistory(index))
  }

  if (queryHistory.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg bg-background">
        <Clock className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">No query history yet</h3>
        <p className="text-muted-foreground mt-2">Your previous queries will appear here</p>
      </div>
    )
  }

  return (
    <Card>
      <CardContent className="p-0">
        <ScrollArea className="h-[500px]">
          <div className="p-4">
            <h3 className="text-lg font-medium mb-4">Recent Queries</h3>
            <div className="space-y-3">
              {queryHistory.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-md border bg-card hover:bg-accent/10 transition-colors"
                >
                  <div className="flex-1 mr-4">
                    <p className="text-sm font-medium">{item.query}</p>
                    <p className="text-xs text-muted-foreground mt-1">{new Date(item.timestamp).toLocaleString()}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleRerunQuery(item.query)} title="Run again">
                      <ArrowUpRight className="h-4 w-4" />
                      <span className="sr-only">Run again</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveQuery(index)}
                      title="Remove from history"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

