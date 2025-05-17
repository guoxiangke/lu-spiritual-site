"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { getUTC8DateOnly, isFutureDateUTC8, isTodayUTC8, formatDateMMDD } from "@/lib/date-utils"

interface CalendarProps {
  month: number
  year?: number
  availableDates?: string[] // 可用日期列表
}

export function Calendar({ month, year = new Date().getFullYear(), availableDates = [] }: CalendarProps) {
  // 状态用于存储当前日期
  const [currentDate, setCurrentDate] = useState<Date | null>(null)

  // 在客户端初始化当前日期（使用UTC+8）
  useEffect(() => {
    setCurrentDate(getUTC8DateOnly())
  }, [])

  // 获取月份中的天数
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate()
  }

  // 获取月份的第一天是星期几 (0 = 星期日, 1 = 星期一, 等)
  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month - 1, 1).getDay()
  }

  const daysInMonth = getDaysInMonth(month, year)
  const firstDayOfMonth = getFirstDayOfMonth(month, year)

  // 创建月份中天数的数组
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  // 创建第一天之前的空单元格数组
  const emptyCells = Array.from({ length: firstDayOfMonth }, (_, i) => `empty-${i}`)

  // 星期几标题
  const weekdays = ["日", "一", "二", "三", "四", "五", "六"]

  // 检查日期是否在未来（使用UTC+8）
  const isFutureDate = (day: number) => {
    return isFutureDateUTC8(year, month, day)
  }

  // 检查日期是否是今天（使用UTC+8）
  const isToday = (day: number) => {
    return isTodayUTC8(year, month, day)
  }

  // 格式化日期为MMDD格式
  const formatDate = (month: number, day: number) => {
    return formatDateMMDD(month, day)
  }

  // 检查日期是否有内容可用
  const hasContent = (dateStr: string) => {
    return availableDates.includes(dateStr)
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-4 grid grid-cols-7 gap-4">
        {weekdays.map((day) => (
          <div key={day} className="flex h-10 items-center justify-center font-medium text-muted-foreground">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-4">
        {emptyCells.map((empty) => (
          <div key={empty} className="h-16"></div>
        ))}
        {days.map((day) => {
          const isInFuture = isFutureDate(day)
          const dateStr = formatDate(month, day)
          const hasContentForDate = hasContent(dateStr)
          const isTodayDate = isToday(day)

          // 未来日期 - 灰色且不可点击
          if (isInFuture) {
            return (
              <div
                key={day}
                className="flex h-16 items-center justify-center rounded-md bg-muted/30 text-lg font-medium text-muted-foreground"
              >
                {day}日
              </div>
            )
          }

          // 今天 - 特殊高亮
          if (isTodayDate) {
            return (
              <Link
                key={day}
                href={`/day/${dateStr}`}
                className="flex h-16 items-center justify-center rounded-md bg-primary/20 text-lg font-medium text-primary hover:bg-primary/30 ring-2 ring-primary"
              >
                {day}日
              </Link>
            )
          }

          // 过去日期但没有内容 - 稍微暗一点
          if (!hasContentForDate) {
            return (
              <Link
                key={day}
                href={`/day/${dateStr}`}
                className="flex h-16 items-center justify-center rounded-md bg-muted/30 text-lg font-medium text-primary/70 hover:bg-muted/50"
              >
                {day}日
              </Link>
            )
          }

          // 有内容的过去日期 - 正常显示
          return (
            <Link
              key={day}
              href={`/day/${dateStr}`}
              className="flex h-16 items-center justify-center rounded-md bg-muted/50 text-lg font-medium text-primary hover:bg-muted"
            >
              {day}日
            </Link>
          )
        })}
      </div>
    </div>
  )
}
