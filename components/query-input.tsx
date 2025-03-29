"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import { Search, Send, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { submitQuery, setLoading, setError, setResults } from "@/lib/features/query/querySlice"
import { generateMockResults } from "@/lib/mock-data"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const suggestions = [
  "Show me monthly revenue trends for the past year",
  "What are our top 5 performing products this quarter?",
  "Compare sales performance across regions",
  "What's the customer retention rate by segment?",
  "Analyze marketing campaign ROI by channel",
]

export default function QueryInput() {
  const [query, setQuery] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [activeSuggestion, setActiveSuggestion] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    dispatch(submitQuery(query))
    dispatch(setLoading(true))

    // Simulate API call delay
    setTimeout(() => {
      try {
        const mockResults = generateMockResults(query)
        dispatch(setResults(mockResults))
        dispatch(setLoading(false))
      } catch (error) {
        dispatch(setError("Failed to process your query. Please try again."))
        dispatch(setLoading(false))
      }
    }, 1500)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    setShowSuggestions(false)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (showSuggestions) {
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setActiveSuggestion((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev))
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setActiveSuggestion((prev) => (prev > 0 ? prev - 1 : prev))
      } else if (e.key === "Enter" && activeSuggestion >= 0) {
        e.preventDefault()
        setQuery(suggestions[activeSuggestion])
        setShowSuggestions(false)
      } else if (e.key === "Escape") {
        setShowSuggestions(false)
      }
    }
  }

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <Search className="absolute left-3 h-5 w-5 text-muted-foreground" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Ask a business question..."
            className="pl-10 pr-20 py-6 text-base"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={handleKeyDown}
          />
          <div className="absolute right-2 flex space-x-1">
            <Popover>
              <PopoverTrigger asChild>
                <Button type="button" size="icon" variant="ghost" className="h-8 w-8">
                  <Sparkles className="h-4 w-4" />
                  <span className="sr-only">Suggestions</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <div className="p-4 border-b">
                  <h4 className="font-medium text-sm">Suggested queries</h4>
                </div>
                <div className="p-2">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      className="w-full text-left px-2 py-1.5 text-sm rounded hover:bg-accent"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            <Button type="submit" size="icon" disabled={!query.trim()}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Submit</span>
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

