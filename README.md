# Data Query Dashboard

A React-based dashboard prototype for a Gen AI Analytics tool that demonstrates natural language query interaction and result visualization.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technical Architecture](#technical-architecture)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [State Management](#state-management)
- [UI/UX Design](#uiux-design)
- [Future Improvements](#future-improvements)
- [Credits](#credits)

## Overview

This Data Query Dashboard prototype demonstrates how non-technical users can interact with data using natural language queries. The application simulates an AI-powered analytics tool that allows users to ask business questions in plain English and receive visualized insights instantly.

### Purpose

The dashboard aims to democratize data insights across business units by:
- Enabling users to ask complex business questions directly
- Providing instant, accurate insights from databases
- Eliminating dependency on data teams
- Facilitating faster, data-driven decisions

## Features

### Natural Language Query Input
- **Query Input Field**: Clean, modern input with placeholder text guiding users
- **AI-Powered Suggestions**: Dropdown with contextual query suggestions
- **Autocomplete**: Keyboard navigation for suggestion selection
- **Query Validation**: Visual feedback for empty or invalid queries

### Query Processing Simulation
- **Loading States**: Animated indicators during query processing
- **Error Handling**: Graceful error display with actionable messages
- **Context-Aware Responses**: Different visualizations based on query content

### Results Visualization
- **Multiple Chart Types**: Support for bar, line, pie, and area charts
- **Tabular View**: Alternative data presentation in table format
- **AI Analysis**: Simulated AI-generated insights about the data
- **Responsive Visualizations**: Charts that adapt to different screen sizes

### Query History Management
- **Persistent History**: Record of previous queries with timestamps
- **Query Reuse**: Ability to rerun previous queries with a single click
- **History Management**: Option to remove queries from history

### Responsive Design
- **Mobile-First Approach**: Fully functional on devices of all sizes
- **Adaptive Layout**: UI components that reorganize based on screen size
- **Touch-Friendly Controls**: Larger hit areas on mobile devices

## Technical Architecture

### Frontend Framework
- **React.js**: Component-based UI development
- **Next.js**: App Router for routing and server components

### State Management
- **Redux Toolkit**: Global state management
- **React Hooks**: Local component state

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Accessible and customizable UI components

### Data Visualization
- **Recharts**: Composable chart library built on React components

### Development Tools
- **TypeScript**: Static type checking
- **ESLint**: Code quality and consistency

## Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/data-query-dashboard.git
   cd data-query-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

### Submitting Queries

1. Type a business question in the query input field
   - Example: "Show me monthly revenue trends for the past year"
   - Example: "What are our top 5 performing products this quarter?"
2. Click the send button or press Enter to submit
3. View the results in the chart or table format

### Using Suggestions

1. Click the sparkle icon in the input field to see suggested queries
2. Select a suggestion to automatically fill the input field
3. Submit the query to see results

### Working with Query History

1. Navigate to the "Query History" tab to see previous queries
2. Click the "Run again" button on any history item to rerun that query
3. Use the delete button to remove items from history

### Analyzing Results

1. View the chart to see data visualization
2. Switch to the table view for detailed data points
3. Read the AI Analysis section for insights about the data

## Project Structure

```plaintext
data-query-dashboard/
├── app/                  # Next.js app directory
│   ├── layout.tsx        # Root layout component
│   └── page.tsx          # Home page component
├── components/           # React components
│   ├── ui/               # UI components from shadcn/ui
│   ├── dashboard.tsx     # Main dashboard layout
│   ├── query-input.tsx   # Query input with suggestions
│   ├── query-history.tsx # History management
│   ├── results-display.tsx # Results visualization container
│   ├── data-chart.tsx    # Chart visualization component
│   └── data-table.tsx    # Table visualization component
├── lib/                  # Utility functions and state management
│   ├── features/         # Redux slices
│   │   └── query/        # Query-related state management
│   ├── store.ts          # Redux store configuration
│   └── mock-data.ts      # Mock data generation
├── public/               # Static assets
└── README.md             # Project documentation
```

## State Management

The application uses Redux Toolkit for global state management with the following structure:

### State Structure

```typescript
interface QueryState {
  currentQuery: string;
  queryHistory: QueryHistoryItem[];
  isLoading: boolean;
  error: string | null;
  results: ChartResult | null;
}
```

### Actions

- `submitQuery`: Adds a query to history and sets as current
- `setLoading`: Updates loading state
- `setError`: Sets error message
- `setResults`: Updates results with chart data
- `removeFromHistory`: Removes a query from history

## UI/UX Design

- **Simplicity**: Clean interface with focused functionality
- **Clarity**: Clear visual hierarchy and information organization
- **Feedback**: Visual cues for system status and user actions
- **Accessibility**: High contrast and keyboard navigation

## Future Improvements

- Natural language processing for better query interpretation
- Support for more advanced visualizations
- Integration with real databases
- Collaboration features like saved queries and sharing

## Live Demo

The project is deployed at: [Data Query Dashboard](https://v0-frontend-engineering-challenge-three.vercel.app/)

## Credits

- UI Components: [shadcn/ui](https://ui.shadcn.com/)
- Charts: [Recharts](https://recharts.org/)
- Icons: [Lucide React](https://lucide.dev/)
