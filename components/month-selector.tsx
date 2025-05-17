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
    <div className="mb-6 flex items-center justify-center">
      {/* 确保左箭头按钮始终可见 */}
      <button
        type="button"
        onClick={handlePrevMonth}
        className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md border border-input bg-background text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground active:scale-95 transition-transform"
        aria-label="上个月"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <div className="flex gap-1 overflow-x-auto py-2 scrollbar-hide mx-1 sm:mx-2 md:mx-4">
        {months.map((month, index) => (
          <Button
            key={month}
            variant={currentMonth === index + 1 ? "default" : "ghost"}
            className={`min-w-12 sm:min-w-16 ${currentMonth === index + 1 ? "bg-primary text-primary-foreground" : ""}`}
            onClick={() => onMonthChange(index + 1)}
          >
            {month}
          </Button>
        ))}
      </div>

      {/* 确保右箭头按钮始终可见 */}
      <button
        type="button"
        onClick={handleNextMonth}
        className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md border border-input bg-background text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground active:scale-95 transition-transform"
        aria-label="下个月"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  )
}
