"use client"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

interface MonthSelectorEnhancedProps {
  currentMonth: number
  onMonthChange: (month: number) => void
}

export function MonthSelectorEnhanced({ currentMonth, onMonthChange }: MonthSelectorEnhancedProps) {
  const months = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]

  // 使用状态来跟踪按钮点击
  const [clickedPrev, setClickedPrev] = useState(false)
  const [clickedNext, setClickedNext] = useState(false)

  // 处理上一个月按钮点击
  const handlePrevMonth = () => {
    setClickedPrev(true)
    const newMonth = currentMonth === 1 ? 12 : currentMonth - 1
    console.log("切换到上一个月:", newMonth)
    onMonthChange(newMonth)

    // 重置点击状态
    setTimeout(() => setClickedPrev(false), 300)
  }

  // 处理下一个月按钮点击
  const handleNextMonth = () => {
    setClickedNext(true)
    const newMonth = currentMonth === 12 ? 1 : currentMonth + 1
    console.log("切换到下一个月:", newMonth)
    onMonthChange(newMonth)

    // 重置点击状态
    setTimeout(() => setClickedNext(false), 300)
  }

  // 处理直接月份选择
  const handleMonthSelect = (monthIndex: number) => {
    console.log("直接选择月份:", monthIndex + 1)
    onMonthChange(monthIndex + 1)
  }

  // 使用原生HTML按钮作为备用
  return (
    <div className="mb-6 flex items-center justify-center gap-4">
      {/* 上一个月按钮 */}
      <button
        type="button"
        onClick={handlePrevMonth}
        className={`flex h-10 w-10 items-center justify-center rounded-md border ${
          clickedPrev ? "bg-muted" : "bg-background"
        } text-foreground hover:bg-muted month-selector-button`}
        aria-label="上个月"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {/* 月份列表 */}
      <div className="flex gap-2 overflow-x-auto py-2 scrollbar-hide">
        {months.map((month, index) => (
          <button
            key={month}
            type="button"
            onClick={() => handleMonthSelect(index)}
            className={`px-4 py-2 rounded-md ${
              currentMonth === index + 1
                ? "bg-primary text-primary-foreground"
                : "bg-background text-foreground hover:bg-muted"
            } min-w-16`}
          >
            {month}
          </button>
        ))}
      </div>

      {/* 下一个月按钮 */}
      <button
        type="button"
        onClick={handleNextMonth}
        className={`flex h-10 w-10 items-center justify-center rounded-md border ${
          clickedNext ? "bg-muted" : "bg-background"
        } text-foreground hover:bg-muted month-selector-button`}
        aria-label="下个月"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  )
}
