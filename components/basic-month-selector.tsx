"use client"

interface BasicMonthSelectorProps {
  currentMonth: number
  onMonthChange: (month: number) => void
}

export function BasicMonthSelector({ currentMonth, onMonthChange }: BasicMonthSelectorProps) {
  const months = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]

  const handlePrevMonth = () => {
    onMonthChange(currentMonth === 1 ? 12 : currentMonth - 1)
  }

  const handleNextMonth = () => {
    onMonthChange(currentMonth === 12 ? 1 : currentMonth + 1)
  }

  return (
    <div className="mb-6 flex items-center justify-center">
      {/* 使用纯文本箭头，不依赖图标库 */}
      <button
        type="button"
        onClick={handlePrevMonth}
        className="flex h-14 w-14 items-center justify-center rounded-md border-2 border-gray-300 bg-white text-2xl font-bold text-gray-800 shadow-md hover:bg-gray-100 active:translate-y-0.5"
        aria-label="上个月"
      >
        ←
      </button>

      <div className="mx-4 text-xl font-bold">{months[currentMonth - 1]}</div>

      <button
        type="button"
        onClick={handleNextMonth}
        className="flex h-14 w-14 items-center justify-center rounded-md border-2 border-gray-300 bg-white text-2xl font-bold text-gray-800 shadow-md hover:bg-gray-100 active:translate-y-0.5"
        aria-label="下个月"
      >
        →
      </button>
    </div>
  )
}
