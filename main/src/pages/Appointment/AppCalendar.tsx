import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useState, useRef } from "react";
import { supabase } from "../../auth/superbaseClient";
import { useAuth } from "../../context/authProvider";
import type {
  GoogleCalendarList,
  GoogleCalendarListEntry,
} from "../../types/GoogleCalendarList";
// import { useGoogleCalendarEvents } from "../../hooks/useGoogleCalendarEvents";

const AppCalendar = () => {
  //   const { events, loading } = useGoogleCalendarEvents();
  //   if (loading) return <div>Loading...</div>;
  const [events, setEvents] = useState<
    { id: string; title: string; start: string; end: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [eventIdCounter, setEventIdCounter] = useState(1);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    type: "cell" | "event";
    info: any;
  } | null>(null);
  const calendarRef = useRef<any>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      // 這裡可串接API載入事件
      setLoading(false);
    };
    fetchEvents();
  }, []);

  // 新增事件
  const addEvent = (start: string, end: string) => {
    const title = prompt("請輸入事件標題");
    if (title) {
      const newEvent = {
        id: String(eventIdCounter),
        title,
        start,
        end,
      };
      setEvents((prev) => [...prev, newEvent]);
      setEventIdCounter((id) => id + 1);
    }
  };

  // 刪除事件
  const deleteEvent = (eventId: string) => {
    setEvents((prev) => prev.filter((evt) => evt.id !== eventId));
  };

  // 修改事件（拖曳或resize）
  const handleEventChange = (changeInfo: any) => {
    const { id } = changeInfo.event;
    setEvents((prev) =>
      prev.map((evt) =>
        evt.id === id
          ? {
              ...evt,
              start: changeInfo.event.startStr,
              end: changeInfo.event.endStr,
            }
          : evt
      )
    );
  };

  // 右鍵點擊 cell
  const handleDateContextMenu = (arg: any) => {
    arg.jsEvent.preventDefault();
    setContextMenu({
      x: arg.jsEvent.clientX,
      y: arg.jsEvent.clientY,
      type: "cell",
      info: arg,
    });
  };

  // 右鍵點擊 event
  const handleEventContextMenu = (arg: any) => {
    arg.jsEvent.preventDefault();
    setContextMenu({
      x: arg.jsEvent.clientX,
      y: arg.jsEvent.clientY,
      type: "event",
      info: arg,
    });
  };

  return (
    <div className="p-2" style={{ position: "relative" }}>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        selectable
        editable
        events={events}
        eventChange={handleEventChange}
        dateClick={(arg) => {
          setContextMenu({
            x: arg.jsEvent.clientX,
            y: arg.jsEvent.clientY,
            type: "cell",
            info: arg,
          });
        }}
        eventClick={(arg) => {
          setContextMenu({
            x: arg.jsEvent.clientX,
            y: arg.jsEvent.clientY,
            type: "event",
            info: arg,
          });
        }}
        height="auto"
      />
      {contextMenu && (
        <div
          style={{
            position: "fixed",
            top: contextMenu.y,
            left: contextMenu.x,
            background: "#fff",
            border: "1px solid #ccc",
            zIndex: 1000,
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            minWidth: 120,
            padding: 4,
          }}
          onClick={() => setContextMenu(null)}
        >
          {contextMenu.type === "cell" && (
            <>
              <div
                style={{ padding: 8, cursor: "pointer" }}
                onClick={() => {
                  addEvent(contextMenu.info.dateStr, contextMenu.info.dateStr);
                  setContextMenu(null);
                }}
              >
                新增事件
              </div>
            </>
          )}
          {contextMenu.type === "event" && (
            <>
              <div
                style={{ padding: 8, cursor: "pointer" }}
                onClick={() => {
                  const eventId = contextMenu.info.event.id;
                  deleteEvent(eventId);
                  setContextMenu(null);
                }}
              >
                刪除事件
              </div>
              <div
                style={{ padding: 8, cursor: "pointer" }}
                onClick={() => {
                  const eventId = contextMenu.info.event.id;
                  const title = prompt(
                    "請輸入新標題",
                    contextMenu.info.event.title
                  );
                  if (title) {
                    setEvents((prev) =>
                      prev.map((evt) =>
                        evt.id === eventId ? { ...evt, title } : evt
                      )
                    );
                  }
                  setContextMenu(null);
                }}
              >
                修改標題
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AppCalendar;
