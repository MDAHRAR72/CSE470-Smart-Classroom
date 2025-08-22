"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/UserCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Trash2 } from "lucide-react";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (input.trim() === "") return;
    setTodos([
      ...todos,
      { id: Date.now().toString(), text: input.trim(), completed: false },
    ]);
    setInput("");
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>To-Do List</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addTodo();
          }}
          className="flex gap-2 mb-4"
        >
          <Input
            placeholder="Add a new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button type="submit">Add</Button>
        </form>
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded shadow-sm"
            >
              <span
                className={
                  "flex-1 cursor-pointer select-none " +
                  (todo.completed ? "line-through text-gray-400" : "")
                }
                onClick={() => toggleTodo(todo.id)}
              >
                {todo.text}
              </span>
              <Button
                variant={todo.completed ? "default" : "outline"}
                size="icon"
                className="ml-2"
                onClick={() => toggleTodo(todo.id)}
                title={
                  todo.completed ? "Mark as Incomplete" : "Mark as Complete"
                }
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="ml-2 text-red-500 hover:text-red-700"
                onClick={() => deleteTodo(todo.id)}
                title="Delete"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>
        {todos.length === 0 && (
          <p className="text-gray-400 text-center mt-4">
            No tasks yet. Add one above!
          </p>
        )}
      </CardContent>
    </Card>
  );
}
