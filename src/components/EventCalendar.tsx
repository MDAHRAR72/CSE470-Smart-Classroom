"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import "react-calendar/dist/Calendar.css";

const Calendar = dynamic(() => import("react-calendar"), { ssr: false });

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const events = [
  {
    id: 1,
    title: "lorem ipsum dolor",
    time: "12:00 - 2:00 PM",
    description: "Lorem ipsum dolor sit amet, consectetur adipscing elit",
  },
  {
    id: 2,
    title: "lorem ipsum dolor",
    time: "12:00 - 2:00 PM",
    description: "Lorem ipsum dolor sit amet, consectetur adipscing elit",
  },
  {
    id: 3,
    title: "lorem ipsum dolor",
    time: "12:00 - 2:00 PM",
    description: "Lorem ipsum dolor sit amet, consectetur adipscing elit",
  },
];

const EventCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());
  return (
    <div className="bg-white p-5 border-2 rounded-2xl">
      <Calendar onChange={onChange} value={value} />
      <div className="border-t border-gray-300 my-4"></div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold my-4">Events</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      <div className="flex flex-col gap-4">
        {events.map((event) => (
          <div
            className="p-5 rounded-md border-2 border-gray-100 border-t-4 even:border-t-[#90caf9] odd:border-t-[#fff085]"
            key={event.id}
          >
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-gray-600">{event.title}</h1>
              <span className="text-gray-300 text-xs">{event.time}</span>
            </div>
            <p className="mt-2 text-gray-400 text-sm">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCalendar;
