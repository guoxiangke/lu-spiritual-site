"use client"

interface SuperSimpleMonthSelectorProps {
  currentMonth: number
  onMonthChange: (month: number) => void
}

export function SuperSimpleMonthSelector({ currentMonth, onMonthChange }: SuperSimpleMonthSelectorProps) {
  const months = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]

  const handlePrevMonth = () => {
    onMonthChange(currentMonth === 1 ? 12 : currentMonth - 1)
  }

  const handleNextMonth = () => {
    onMonthChange(currentMonth === 12 ? 1 : currentMonth + 1)
  }

  return (
    <div className="mb-6 flex flex-col items-center">
      {/* 超简单的月份选择器 */}
      <div className="flex w-full max-w-md items-center justify-between px-4 py-2">
        <button
          onClick={handlePrevMonth}
          className="h-12 w-12 rounded-full bg-gray-100 text-xl font-bold"
          aria-label="上个月"
        >
          ←
        </button>

        <span className="text-xl font-bold">{months[currentMonth - 1]}</span>

        <button
          onClick={handleNextMonth}
          className="h-12 w-12 rounded-full bg-gray-100 text-xl font-bold"
          aria-label="下个月"
        >
          →
        </button>
      </div>

      {/* 月份网格 */}
      <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-6">
        {months.map((month, index) => (
          <button
            key={month}
            onClick={() => onMonthChange(index + 1)}
            className={`px-3 py-2 rounded-md ${
              currentMonth === index + 1 ? "bg-primary text-white font-bold" : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {month}
          </button>
        ))}
      </div>
    </div>
  )
}
