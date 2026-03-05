"use client"

import { useState } from "react"
import { Calendar } from "@/components/calendar"
import { BasicMonthSelector } from "@/components/basic-month-selector"

interface YearCalendarProps {
  availableDates: string[]
}

export function YearCalendar({ availableDates }: YearCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1)

  return (
    <div>
      <BasicMonthSelector currentMonth={currentMonth} onMonthChange={setCurrentMonth} />
      <Calendar month={currentMonth} availableDates={availableDates} />
    </div>
  )
}
