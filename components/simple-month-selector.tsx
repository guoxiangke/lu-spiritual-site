"use client"

interface SimpleMonthSelectorProps {
  currentMonth: number
  onMonthChange: (month: number) => void
}

export function SimpleMonthSelector({ currentMonth, onMonthChange }: SimpleMonthSelectorProps) {
  const months = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]

  const handlePrevMonth = () => {
    onMonthChange(currentMonth === 1 ? 12 : currentMonth - 1)
  }

  const handleNextMonth = () => {
    onMonthChange(currentMonth === 12 ? 1 : currentMonth + 1)
  }

  return (
    <div className="mb-6">
      {/* 月份选择器 - 简化版，使用HTML实体而不是图标 */}
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={handlePrevMonth}
          className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md border border-input bg-background text-foreground shadow hover:bg-accent hover:text-accent-foreground text-xl font-bold"
          aria-label="上个月"
        >
          &lt;
        </button>

        <div className="mx-4 text-xl font-medium">{months[currentMonth - 1]}</div>

        <button
          type="button"
          onClick={handleNextMonth}
          className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md border border-input bg-background text-foreground shadow hover:bg-accent hover:text-accent-foreground text-xl font-bold"
          aria-label="下个月"
        >
          &gt;
        </button>
      </div>

      {/* 月份列表 */}
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {months.map((month, index) => (
          <button
            key={month}
            type="button"
            onClick={() => onMonthChange(index + 1)}
            className={`px-3 py-2 rounded-md text-sm ${
              currentMonth === index + 1
                ? "bg-primary text-primary-foreground font-medium"
                : "bg-background hover:bg-accent text-foreground"
            }`}
          >
            {month}
          </button>
        ))}
      </div>
    </div>
  )
}
