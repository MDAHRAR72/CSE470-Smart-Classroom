"use client";

import { Assignment } from "@/types/assignment";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/UserCard";
import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react";

interface CalendarProps {
  assignments: Assignment[];
}

export function CalendarComponent({ assignments }: CalendarProps) {
  const [value, setValue] = useState<Date>(new Date());

  const goToPreviousMonth = () => {
    setValue((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const goToNextMonth = () => {
    setValue((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  const getAssignmentsForDate = (date: Date) => {
    return assignments.filter((assignment) => {
      const dueDate = new Date(assignment.dueDate);
      return dueDate.toDateString() === date.toDateString();
    });
  };

  // Note: status colors are applied inline where needed. No helper needed here.

  const monthMatrix = useMemo(() => {
    const start = startOfWeek(startOfMonth(value));
    const end = endOfWeek(endOfMonth(value));
    const days: Date[] = [];
    let current = start;
    while (current <= end) {
      days.push(current);
      current = addDays(current, 1);
    }
    const weeks: Date[][] = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }
    return weeks;
  }, [value]);

  const dayNames = useMemo(() => {
    const start = startOfWeek(value);
    return Array.from({ length: 7 }).map((_, i) =>
      format(addDays(start, i), "EEE")
    );
  }, [value]);

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full space-y-4">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPreviousMonth}
              className="rounded-full"
              aria-label="Previous month"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="rounded-full"
                onClick={() => {
                  setValue(new Date());
                }}
              >
                <CalendarIcon className="h-4 w-4 mr-2" />
                Today
              </Button>
              <span className="text-lg font-semibold">
                {format(value, "MMMM yyyy")}
              </span>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={goToNextMonth}
              className="rounded-full"
              aria-label="Next month"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div>
            <table className="w-full table-fixed border-collapse">
              <thead>
                <tr className="text-xs uppercase tracking-wide text-muted-foreground">
                  {dayNames.map((name) => (
                    <th key={name} className="p-2 text-center">
                      {name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {monthMatrix.map((week, wi) => (
                  <tr key={wi} className="align-top">
                    {week.map((day) => {
                      const inMonth = isSameMonth(day, value);
                      const todays = isToday(day);
                      const items = getAssignmentsForDate(day);
                      const hasPending = items.some(
                        (a) => a.status === "pending"
                      );
                      return (
                        <td
                          key={day.toISOString()}
                          className={`h-20 p-2 align-top text-center`}
                        >
                          <div className="flex items-center justify-center">
                            <span
                              className={`mx-auto inline-flex items-center justify-center rounded-full w-10 h-10 text-sm font-medium ${
                                hasPending
                                  ? "bg-[#5AACCF] text-white"
                                  : todays
                                  ? "bg-gray-500 text-white"
                                  : inMonth
                                  ? "bg-gray-200 text-gray-800"
                                  : "bg-gray-100 text-gray-400"
                              }`}
                              title={format(day, "PPPP")}
                            >
                              {format(day, "d")}
                            </span>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
