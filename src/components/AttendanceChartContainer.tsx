import Image from "next/image";
import AttendanceChart from "./AttendanceChart";
import { prisma } from "@/lib/prisma";

const AttendanceChartContainer = async () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysSinceSaturday = dayOfWeek === 6 ? 0 : dayOfWeek + 1;

  const lastSaturday = new Date(today);
  lastSaturday.setDate(today.getDate() - daysSinceSaturday);
  lastSaturday.setHours(0, 0, 0, 0);

  const resData = await prisma.attendance.findMany({
    where: {
      date: {
        gte: lastSaturday,
      },
    },
    select: {
      date: true,
      present: true,
    },
  });

  const daysOfWeek = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu"];

  const attendanceMap: { [key: string]: { present: number; absent: number } } =
    {
      Sat: { present: 0, absent: 0 },
      Sun: { present: 0, absent: 0 },
      Mon: { present: 0, absent: 0 },
      Tue: { present: 0, absent: 0 },
      Wed: { present: 0, absent: 0 },
      Thu: { present: 0, absent: 0 },
    };

  resData.forEach((item) => {
    const itemDate = new Date(item.date);
    const jsDay = itemDate.getDay(); // 0 = Sunday, 6 = Saturday

    let dayName = "";
    if (jsDay === 6) dayName = "Sat";
    else if (jsDay === 0) dayName = "Sun";
    else if (jsDay >= 1 && jsDay <= 4) dayName = daysOfWeek[jsDay + 0]; // Mon-Thu

    if (dayName) {
      if (item.present) attendanceMap[dayName].present += 1;
      else attendanceMap[dayName].absent += 1;
    }
  });

  const data = daysOfWeek.map((day) => ({
    name: day,
    present: attendanceMap[day].present,
    absent: attendanceMap[day].absent,
  }));

  return (
    <div className="bg-white rounded-2xl h-full p-4 border-2">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Attendance</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      <AttendanceChart data={data} />
    </div>
  );
};

export default AttendanceChartContainer;
