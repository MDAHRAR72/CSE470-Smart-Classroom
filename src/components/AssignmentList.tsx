"use client";

import { Assignment } from "@/types/assignment";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/UserCard";
import { Button } from "@/components/ui/button";

interface AssignmentListProps {
  assignments: Assignment[];
  onAddAssignment: () => void;
  onUpdateStatus: (id: string, status: Assignment["status"]) => void;
}

export function AssignmentList({
  assignments,
  onAddAssignment,
  onUpdateStatus,
}: AssignmentListProps) {
  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Assignments</CardTitle>
          <Button onClick={onAddAssignment}>Add Assignment</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Title</th>
                <th className="text-left py-2">Course</th>
                <th className="text-left py-2">Description</th>
                <th className="text-left py-2">Due Date</th>
                <th className="text-left py-2">Status</th>
                <th className="text-left py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment) => (
                <tr key={assignment.id} className="border-b">
                  <td className="py-2">{assignment.title}</td>
                  <td className="py-2">{assignment.courseName ?? "-"}</td>
                  <td className="py-2">{assignment.description}</td>
                  <td className="py-2">
                    {new Date(assignment.dueDate).toLocaleDateString()}
                  </td>
                  <td className="py-2">
                    <div
                      className={`px-2 py-1 rounded-full text-sm ${
                        assignment.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : assignment.status === "in-progress"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {assignment.status}
                    </div>
                  </td>
                  <td className="py-2">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          onUpdateStatus(assignment.id, "completed")
                        }
                      >
                        Complete
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          onUpdateStatus(assignment.id, "in-progress")
                        }
                      >
                        Start
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
