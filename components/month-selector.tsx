"use client"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface MonthSelectorProps {
  currentMonth: number
  onMonthChange: (month: number) => void
}

export function MonthSelector({ currentMonth, onMonthChange }: MonthSelectorProps) {
  const months = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]

  const handlePrevMonth = () => {
    onMonthChange(currentMonth === 1 ? 12 : currentMonth - 1)
  }

  const handleNextMonth = () => {
    onMonthChange(currentMonth === 12 ? 1 : currentMonth + 1)
  }

  return (
    <div className="mb-6 flex items-center justify-center gap-4">
      <Button variant="outline" size="icon" onClick={handlePrevMonth} aria-label="上个月">
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <div className="flex gap-2 overflow-x-auto py-2 scrollbar-hide">
        {months.map((month, index) => (
          <Button
            key={month}
            variant={currentMonth === index + 1 ? "default" : "ghost"}
            className={`min-w-16 ${currentMonth === index + 1 ? "bg-primary text-primary-foreground" : ""}`}
            onClick={() => onMonthChange(index + 1)}
          >
            {month}
          </Button>
        ))}
      </div>
      <Button variant="outline" size="icon" onClick={handleNextMonth} aria-label="下个月">
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
