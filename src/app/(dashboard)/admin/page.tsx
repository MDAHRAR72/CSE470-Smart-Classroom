import Announcements from "@/components/Announcements";
import RadialChartContainer from "@/components/RadialChartContainer";
import EventCalendar from "@/components/EventCalendar";
import UserCard from "@/components/UserCard";
import AttendanceChartContainer from "@/components/AttendanceChartContainer";

const AdminPage = () => {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row bg-[#F7F7F7] border-l-2">
      {/*left*/}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/*UserCards*/}
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="admin" />
          <UserCard type="teacher" />
          <UserCard type="student" />
        </div>
        {/*MiddleCharts*/}
        <div className="flex gap-4 flex-col lg:flex-row">
          <div className="w-full lg:w-1/3 h-[450px]">
            <RadialChartContainer />
          </div>
          {/*AttendanceCharts*/}
          <div className="w-full lg:w-2/3 h-[450px]">
            <AttendanceChartContainer />
          </div>
        </div>
      </div>
      {/*right*/}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
};

export default AdminPage;
