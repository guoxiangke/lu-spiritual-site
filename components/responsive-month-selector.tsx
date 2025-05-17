"use client"
import { useEffect, useState } from "react"
import { MonthSelector } from "./month-selector"
import { MobileMonthSelector } from "./mobile-month-selector"

interface ResponsiveMonthSelectorProps {
  currentMonth: number
  onMonthChange: (month: number) => void
}

export function ResponsiveMonthSelector({ currentMonth, onMonthChange }: ResponsiveMonthSelectorProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // 检测是否为移动设备
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }

    // 初始检测
    checkMobile()

    // 监听窗口大小变化
    window.addEventListener("resize", checkMobile)

    // 清理监听器
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return isMobile ? (
    <MobileMonthSelector currentMonth={currentMonth} onMonthChange={onMonthChange} />
  ) : (
    <MonthSelector currentMonth={currentMonth} onMonthChange={onMonthChange} />
  )
}
