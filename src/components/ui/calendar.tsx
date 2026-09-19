"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "../../lib/utils"
import { buttonVariants } from "./button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 bg-white", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        month_caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium text-gray-700",
        nav: "absolute left-0 flex w-full justify-between z-10",
        button_previous: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-white border-gray-200 p-0 opacity-50 hover:opacity-100 hover:bg-gray-50 z-10 absolute left-1"
        ),
        button_next: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-white border-gray-200 p-0 opacity-50 hover:opacity-100 hover:bg-gray-50 z-10 absolute right-1"
        ),
        month_grid: "w-full border-collapse space-y-1",
        weekdays: "flex",
        weekday: "text-muted-foreground rounded-md w-8 font-normal text-xs text-gray-500",
        week: "flex w-full mt-2",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal text-gray-700 hover:bg-gray-100 hover:text-gray-900 relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-blue-50"
        ),
        range_start: "aria-selected:bg-blue-600 aria-selected:text-white rounded-l-md aria-selected:hover:bg-blue-800 aria-selected:hover:text-white",
        range_middle: "aria-selected:bg-blue-100 aria-selected:text-blue-700 aria-selected:hover:bg-blue-200 aria-selected:hover:text-blue-800",
        range_end: "aria-selected:bg-blue-600 aria-selected:text-white rounded-r-md aria-selected:hover:bg-blue-800 aria-selected:hover:text-white",
        selected: "bg-blue-600 text-white hover:bg-blue-800 hover:text-white focus:bg-blue-700 focus:text-white rounded-md aria-selected:hover:bg-blue-800 aria-selected:hover:text-white",
        today: "bg-gray-100 text-gray-900 border border-gray-200 hover:bg-gray-200 hover:text-black",
        outside: "text-gray-400 opacity-50 aria-selected:text-white aria-selected:opacity-75 aria-selected:hover:opacity-90",
        disabled: "text-gray-300 opacity-50 cursor-not-allowed hover:bg-transparent",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ className, orientation, ...props }) => {
          const Icon = orientation === "left" ? ChevronLeft : ChevronRight
          return <Icon className={cn("h-4 w-4 text-gray-600", className)} {...props} />
        },
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
