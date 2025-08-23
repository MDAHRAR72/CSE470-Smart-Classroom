"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/UserCard";
import { Megaphone, CalendarDays } from "lucide-react";

interface Notice {
  id: string;
  title: string;
  date: string; // ISO or readable date
  body: string;
}

const sampleNotices: Notice[] = [
  {
    id: "1",
    title: "Midterm exam schedule released",
    date: "2025-08-12",
    body: "Check the examinations portal for detailed timings and seating plans.",
  },
  {
    id: "2",
    title: "Assignment 2 deadline extended",
    date: "2025-08-10",
    body: "The submission deadline has been extended by 48 hours due to server maintenance.",
  },
  {
    id: "3",
    title: "Guest lecture: Introduction to AI",
    date: "2025-08-09",
    body: "Join us this Friday at 3 PM in Hall A. Attendance certificates will be provided.",
  },
  {
    id: "4",
    title: "Planned maintenance",
    date: "2025-08-08",
    body: "Portal services may be intermittently unavailable on Sunday 1 AM – 3 AM.",
  },
];

export function NoticeBoard() {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center gap-2">
        <Megaphone className="h-5 w-5 text-muted-foreground" />
        <CardTitle>Notice Board</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3 max-h-80 overflow-y-auto pr-1">
          {sampleNotices.map((notice) => (
            <li key={notice.id} className="rounded-md border p-3">
              <div className="flex items-center justify-between">
                <p className="font-medium leading-snug">{notice.title}</p>
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {new Date(notice.date).toLocaleDateString()}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {notice.body}
              </p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
