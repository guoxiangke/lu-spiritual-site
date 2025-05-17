"use client"

import { useState, useEffect } from "react"
import { Calendar } from "@/components/calendar"
import { MonthSelector } from "@/components/month-selector"
import { getDevotionalItems } from "@/lib/get-devotional-items"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function YearCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1)
  const [availableDates, setAvailableDates] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 获取可用日期
  useEffect(() => {
    async function fetchAvailableDates() {
      try {
        setLoading(true)
        setError(null)
        const items = await getDevotionalItems()
        setAvailableDates(Object.keys(items))
      } catch (error) {
        console.error("获取可用日期失败:", error)
        setError("获取数据失败，请稍后再试")
        setAvailableDates([])
      } finally {
        setLoading(false)
      }
    }

    fetchAvailableDates()
  }, [])

  const handleMonthChange = (month: number) => {
    setCurrentMonth(month)
  }

  // 重试加载数据
  const handleRetry = () => {
    setLoading(true)
    setError(null)
    // 重新获取数据
    getDevotionalItems()
      .then((items) => {
        setAvailableDates(Object.keys(items))
        setError(null)
      })
      .catch((err) => {
        console.error("重试获取数据失败:", err)
        setError("重试获取数据失败，请稍后再试")
        setAvailableDates([])
      })
      .finally(() => {
        setLoading(false)
      })
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="text-muted-foreground">正在从API获取2025卢牧师带你读新约数据...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center py-20">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <p className="mb-4 text-destructive">{error}</p>
          <Button onClick={handleRetry} variant="outline">
            重试
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <MonthSelector currentMonth={currentMonth} onMonthChange={handleMonthChange} />
      <Calendar month={currentMonth} availableDates={availableDates} />
    </div>
  )
}
