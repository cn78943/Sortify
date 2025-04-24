import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { EventInput } from "@fullcalendar/core";
import axios from "axios";

export default function Todos() {
  const [events, setEvents] = useState<EventInput[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    recurring: false,
    recurringDays: [] as string[],
    repeatUntil: "",
    toDo: "",
  });

  const handleDateClick = (arg: any) => {
    const clickedDate = arg.dateStr;
    setFormData((prev) => ({
      ...prev,
      date: clickedDate,
    }));
    setModalOpen(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    if (type === "checkbox" && name === "recurringDays") {
      setFormData((prev) => {
        const updatedDays = checked
          ? [...prev.recurringDays, value]
          : prev.recurringDays.filter((day) => day !== value);
        return { ...prev, recurringDays: updatedDays };
      });
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // 일정 추가하기
  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("로그인이 필요합니다.");

    const schedulePayload = {
      title: formData.title,
      startTime: `${formData.date}T00:00:00`,
      endTime: `${formData.date}T23:59:59`,
      recurring: formData.recurring,
      recurringDays: formData.recurring ? formData.recurringDays : [],
      repeatUntil: formData.recurring
        ? `${formData.repeatUntil}T23:59:59`
        : null,
      toDos: [
        {
          task: formData.toDo,
          completed: false,
          createdAt: new Date().toISOString(),
        },
      ],
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/schedules",
        schedulePayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      fetchSchedules();

      setEvents((prev) => [
        ...prev,
        {
          title: formData.title,
          start: formData.date,
          allDay: true,
        },
      ]);

      setModalOpen(false);
      setFormData({
        title: "",
        date: "",
        recurring: false,
        recurringDays: [],
        repeatUntil: "",
        toDo: "",
      });
    } catch (error) {
      console.error("일정 등록 실패:", error);
      alert("일정 등록에 실패했습니다.");
    }
  };

  // 일정 가져오기
  const fetchSchedules = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await axios.get("http://localhost:8080/api/schedules", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      const fetchedEvents = response.data.map((schedule: any) => ({
        title: schedule.title,
        start: schedule.startTime,
        end: schedule.endTime,
        allDay: true,
      }));

      setEvents(fetchedEvents);
    } catch (error) {
      console.error("일정 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);
  return (
    <div className="flex min-h-[calc(100vh-4rem)] relative">
      {/* 📅 캘린더 영역 */}
      <div className="flex justify-center items-start py-[5%] mx-auto gap-6 px-4 min-h-full w-screen">
        <div className="w-4/5 h-full bg-white shadow-lg rounded-lg p-4 relative">
          {/* 사이드바 */}
          <div
            className={`absolute top-0 ${
              sidebarOpen ? "left-0" : "-left-72"
            } z-10 h-full w-64 bg-indigo-200 shadow-lg p-4 transition-all duration-300`}
          >
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

        {/* 오른쪽 할 일 영역 */}
        <div className="w-1/5 bg-indigo-100 shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4 text-violet-700">오늘 할 일</h2>
          <p className="text-sm text-gray-700">
            날짜를 클릭해서 일정을 등록하세요.
          </p>
          <ul className="mt-4 space-y-2">
            {events
              .filter((event) => {
                const today = new Date();
                const eventDate = new Date(event.start as string);

                return (
                  eventDate.getFullYear() === today.getFullYear() &&
                  eventDate.getMonth() === today.getMonth() &&
                  eventDate.getDate() === today.getDate()
                );
              })
              .map((event, idx) => (
                <li key={idx} className="text-sm text-gray-900">
                  📌 {event.title} (
                  {new Date(event.start as string).toLocaleDateString()} )
                </li>
              ))}
          </ul>
        </div>
      </div>

      {/* 📌 일정 등록 모달 */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <h2 className="text-xl font-semibold mb-4 text-violet-700">
              일정 추가
            </h2>

            <label className="block mb-2 text-sm font-medium text-gray-700">
              제목
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded-md"
              />
            </label>

            <label className="block mb-2 text-sm font-medium text-gray-700">
              반복 일정
              <input
                type="checkbox"
                name="recurring"
                checked={formData.recurring}
                onChange={handleChange}
                className="ml-2"
              />
            </label>

            {formData.recurring && (
              <>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  반복 요일
                  <div className="flex flex-wrap gap-2 mt-1">
                    {[
                      "MONDAY",
                      "TUESDAY",
                      "WEDNESDAY",
                      "THURSDAY",
                      "FRIDAY",
                      "SATURDAY",
                      "SUNDAY",
                    ].map((day) => (
                      <label
                        key={day}
                        className="flex items-center gap-1 text-sm"
                      >
                        <input
                          type="checkbox"
                          name="recurringDays"
                          value={day}
                          checked={formData.recurringDays.includes(day)}
                          onChange={handleChange}
                        />
                        {day.slice(0, 3)}
                      </label>
                    ))}
                  </div>
                </label>

                <label className="block mb-2 text-sm font-medium text-gray-700">
                  반복 종료일
                  <input
                    type="date"
                    name="repeatUntil"
                    value={formData.repeatUntil}
                    onChange={handleChange}
                    className="w-full mt-1 px-3 py-2 border rounded-md"
                  />
                </label>
              </>
            )}

            <label className="block mb-4 text-sm font-medium text-gray-700">
              할 일
              <input
                type="text"
                name="toDo"
                value={formData.toDo}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded-md"
              />
            </label>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
              >
                취소
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 rounded-md bg-indigo-500 text-white hover:bg-indigo-600"
              >
                등록
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
