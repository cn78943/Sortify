import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { EventInput } from "@fullcalendar/core";

export default function Todos() {
  const [events, setEvents] = useState<EventInput[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleDateClick = (arg: any) => {
    const title = prompt("일정 제목을 입력하세요");
    if (title) {
      const newEvent = {
        title,
        start: arg.date,
        allDay: true,
      };
      setEvents((prev) => [...prev, newEvent]);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <div className="flex justify-center items-start py-[5%] mx-auto gap-6 px-4 min-h-full w-screen">
        {/* 📅 캘린더 영역 */}
        <div className="w-4/5 h-full bg-white shadow-lg rounded-lg p-4 relative">
          <div
            className={`absolute top-0 ${
              sidebarOpen ? "left-0" : "-left-72"
            } z-10 h-full w-64 bg-indigo-200 shadow-lg p-4 transition-all duration-300`}
          >
            {/* 닫기 버튼 */}
            <button
              className="text-indigo-700 text-lg font-bold mb-4 hover:text-indigo-900"
              onClick={() => setSidebarOpen(false)}
            >
              ← 닫기
            </button>

            <h2 className="text-lg font-bold text-indigo-700 mb-4">🗓️ 일정</h2>
            <ul className="space-y-2 text-sm">
              <li className="hover:underline cursor-pointer">일정 관리</li>
              <li className="hover:underline cursor-pointer">설정</li>
              <li className="hover:underline cursor-pointer">로그아웃</li>
            </ul>
            <h2 className="text-lg font-bold text-indigo-700 mb-4">🗓️ 일정</h2>
            <ul className="space-y-2 text-sm">
              <li className="hover:underline cursor-pointer">일정 관리</li>
              <li className="hover:underline cursor-pointer">설정</li>
              <li className="hover:underline cursor-pointer">로그아웃</li>
            </ul>
          </div>

          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            weekends={true}
            events={events}
            dateClick={handleDateClick}
            height="100%"
            eventClassNames={() =>
              "bg-violet-400 text-white border-0 rounded-md px-1 py-0.5 text-xs"
            }
            customButtons={{
              myHamburger: {
                text: "≡",
                click: () => {
                  setSidebarOpen((prev) => !prev);
                },
              },
            }}
            headerToolbar={{
              left: "myHamburger prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
          />
        </div>

        <div className="w-1/5 bg-indigo-100 shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4 text-violet-700">일정 목록</h2>
          <p className="text-sm text-gray-700">
            날짜를 클릭해서 일정을 등록하세요.
          </p>
          <ul className="mt-4 space-y-2">
            {events.map((event, idx) => (
              <li key={idx} className="text-sm text-gray-900">
                📌 {event.title} (
                {new Date(event.start as string).toLocaleDateString()} )
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
