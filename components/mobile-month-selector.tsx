"use client"
import { useState } from "react"
import type React from "react"

import { ChevronLeft, ChevronRight } from "lucide-react"

interface MobileMonthSelectorProps {
  currentMonth: number
  onMonthChange: (month: number) => void
}

export function MobileMonthSelector({ currentMonth, onMonthChange }: MobileMonthSelectorProps) {
  const months = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [touchEndX, setTouchEndX] = useState<number | null>(null)

  const handlePrevMonth = () => {
    const newMonth = currentMonth === 1 ? 12 : currentMonth - 1
    console.log("切换到上一个月:", newMonth)
    onMonthChange(newMonth)
  }

  const handleNextMonth = () => {
    const newMonth = currentMonth === 12 ? 1 : currentMonth + 1
    console.log("切换到下一个月:", newMonth)
    onMonthChange(newMonth)
  }

  // 处理滑动手势
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.touches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStartX && touchEndX) {
      const diff = touchStartX - touchEndX
      if (diff > 50) {
        // 向左滑动，下一个月
        handleNextMonth()
      } else if (diff < -50) {
        // 向右滑动，上一个月
        handlePrevMonth()
      }
    }
    // 重置触摸状态
    setTouchStartX(null)
    setTouchEndX(null)
  }

  return (
    <div
      className="mb-6 touch-feedback"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={handlePrevMonth}
          className="flex h-14 w-14 items-center justify-center rounded-full border border-input bg-background text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground active:scale-95 transition-transform month-nav-button"
          aria-label="上个月"
        >
          <ChevronLeft className="h-7 w-7" />
        </button>

        <div className="text-xl font-medium">{months[currentMonth - 1]}</div>

        <button
          type="button"
          onClick={handleNextMonth}
          className="flex h-14 w-14 items-center justify-center rounded-full border border-input bg-background text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground active:scale-95 transition-transform month-nav-button"
          aria-label="下个月"
        >
          <ChevronRight className="h-7 w-7" />
        </button>
      </div>

      <div className="grid grid-cols-6 gap-1 overflow-x-auto py-2 scrollbar-hide">
        {months.map((month, index) => (
          <button
            key={month}
            type="button"
            onClick={() => onMonthChange(index + 1)}
            className={`px-2 py-3 rounded-md text-sm ${
              currentMonth === index + 1
                ? "bg-primary text-primary-foreground font-medium"
                : "bg-background text-foreground hover:bg-accent"
            }`}
          >
            {month}
          </button>
        ))}
      </div>
    </div>
  )
}
