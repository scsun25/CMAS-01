import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await supabase.auth.getSession();
      const accessToken = data?.session?.provider_token;

      console.log("Access Token:", accessToken);
      if (!accessToken) {
        return;
      }

      // Fetch events from Google Calendar API
      const calendarId = "primary"; // or another calendar ID
      const timeMin = new Date().toISOString();
      // const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?timeMin=${timeMin}&singleEvents=true&orderBy=startTime`;
      const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?timeMin=${timeMin}&singleEvents=true&orderBy=startTime`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const res: GoogleCalendarList = await response.json();

      // Transform Google events to FullCalendar format
      const fcEvents = (res.items || []).map((item: any) => ({
        id: item.id,
        title: item.summary,
        start: item.start?.dateTime || item.start?.date,
        end: item.end?.dateTime || item.end?.date,
      }));
      console.log("fcEvents:", fcEvents);

      setEvents(fcEvents);
    };

    fetchEvents();
  }, []);

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={events}
      height="auto"
    />
  );
};

export default AppCalendar;
