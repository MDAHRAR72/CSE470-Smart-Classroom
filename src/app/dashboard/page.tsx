"use client";

import { useSession } from "next-auth/react";
import { Assignment } from "@/types/assignment";
import { AssignmentList } from "@/components/AssignmentList";
import { AssignmentForm } from "@/components/AssignmentForm";
import { CalendarComponent } from "@/components/Calendar";
import { TodoList } from "@/components/TodoList";
import { BurgerMenu } from "@/components/BurgerMenu";
import { NoticeBoard } from "@/components/NoticeBoard";
import { useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: "1",
      title: "Math Homework",
      courseName: "MAT110",
      description: "Complete chapter 3 exercises",
      dueDate: "2025-08-06",
      status: "pending",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Science Project",
      courseName: "SCI101",
      description: "Submit plant growth experiment report",
      dueDate: "2025-08-10",
      status: "in-progress",
      createdAt: new Date().toISOString(),
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <p>Access denied. Please log in.</p>;

  type NewAssignmentInput = {
    title: string;
    description: string;
    courseName: string;
    assignedBy: string;
    dueDate: string;
    dueTime: string;
    maxMarks: number;
    attachments?: FileList | undefined;
  };

  const handleAddAssignment = (data: NewAssignmentInput) => {
    setAssignments(prev => [...prev, {
      id: Date.now().toString(),
      title: data.title,
      description: data.description,
      courseName: data.courseName,
      dueDate: data.dueDate,
      status: "pending",
      createdAt: new Date().toISOString(),
    }]);
  };

  const handleUpdateStatus = (id: string, status: Assignment["status"]) => {
    setAssignments(assignments.map((assignment) =>
      assignment.id === id ? { ...assignment, status } : assignment
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            {/* Burger menu at top left */}
            <BurgerMenu />
            <h1 className="text-3xl font-bold">
              Welcome, {session.user?.name || session.user?.email} 🎓
            </h1>
          </div>
          <div className="flex items-center gap-3 relative">
            {/* Notifications dropdown */}
            <NotificationBell />
            {/* Clickable avatar linking to profile edit */}
            <Link href="/profile/edit" className="block" title="My Profile">
              <Image
                src="/avatar.jpg"
                alt="Avatar"
                width={32}
                height={32}
                className="rounded-full border"
              />
            </Link>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CalendarComponent assignments={assignments} />
          </div>
          <div className="lg:col-span-1 space-y-8">
            <TodoList />
            <NoticeBoard />
          </div>
          <div className="lg:col-span-3">
            <AssignmentList
              assignments={assignments}
              onAddAssignment={() => setIsOpen(true)}
              onUpdateStatus={handleUpdateStatus}
            />
          </div>
        </div>
        <AssignmentForm onSubmit={handleAddAssignment} isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </div>
  );
}

function NotificationBell() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (!ref.current) return;
      if (ref.current.contains(e.target as Node)) return;
      setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        aria-label="Notifications"
        title="Notifications"
        className="p-2 rounded-full border hover:bg-accent hover:text-accent-foreground"
        onClick={() => setOpen((v) => !v)}
      >
        <Bell className="h-4 w-4" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-md border bg-white shadow-md p-3 text-sm text-muted-foreground">
          No new notifications
        </div>
      )}
    </div>
  );
}
