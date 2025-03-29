"use client"

import { useState } from "react"
import { Provider } from "react-redux"
import { store } from "@/lib/store"
import QueryInput from "@/components/query-input"
import QueryHistory from "@/components/query-history"
import ResultsDisplay from "@/components/results-display"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("results")

  return (
    <Provider store={store}>
      <div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-7xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Gen AI Analytics Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Ask complex business questions and get instant, data-driven insights
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-12">
            <QueryInput />
          </div>

          <div className="lg:col-span-12">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="results">Results</TabsTrigger>
                <TabsTrigger value="history">Query History</TabsTrigger>
              </TabsList>
              <TabsContent value="results" className="mt-0">
                <ResultsDisplay />
              </TabsContent>
              <TabsContent value="history" className="mt-0">
                <QueryHistory />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Provider>
  )
}

