import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const API_URL=import.meta.env.VITE_API_URL;

const Calendar = () => {
  const [currentEvents, setCurrentEvents] = useState([]);
  const location = useLocation();
  const { application } = location.state || {};
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedSlotId, setSelectedSlotId] = useState(null);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const response = await axios.get(`${API_URL}/interviews`);
        const events = response.data.map((event) => ({
          id: event._id,
          title: 'Interview',
          start: new Date(event.interviewDate.start).toISOString(),
          end: new Date(event.interviewDate.end).toISOString(),
          backgroundColor: 'green', // Color for existing interviews
        }));
        setCurrentEvents(events);
      } catch (error) {
        console.error('Error fetching interviews:', error);
      }
    };

    fetchInterviews();
  }, []);

  const handleSelect = async (info) => {
    const { startStr, endStr } = info;
    const slotId = `${startStr}-${endStr}`;

    if (selectedSlotId === slotId) {
      // Deselect slot
      setSelectedSlot(null);
      setSelectedSlotId(null);
    } else {
      // Select new slot
      setSelectedSlotId(slotId);
      setSelectedSlot({
        start: startStr,
        end: endStr,
      });

      // Update calendar view to show selected slot
      setCurrentEvents((prevEvents) => [
        ...prevEvents.filter((event) => event.id !== slotId),
        {
          id: slotId,
          title: 'Selected Slot',
          start: startStr,
          end: endStr,
          backgroundColor: 'blue', // Color for selected slot
        },
      ]);
    }
  };

  const handleScheduleInterview = async () => {
    if (!selectedSlot) {
      alert('Please select a time slot');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/interviews`, {
        applicationId: application._id,
        interviewDate: selectedSlot,
      });

      if (response.status === 201) {
        alert('Interview scheduled successfully');
        setCurrentEvents((prevEvents) => [
          ...prevEvents,
          {
            id: response.data._id,
            title: 'Interview',
            start: selectedSlot.start,
            end: selectedSlot.end,
            backgroundColor: 'green', // Color for scheduled interviews
          },
        ]);
        setSelectedSlot(null); // Clear selection after scheduling
        setSelectedSlotId(null); // Clear slot ID after scheduling
      }
    } catch (error) {
      console.error('Error scheduling interview:', error);
      alert('Failed to schedule interview');
    }
  };

  return (
    <div className="calendar-container" style={{ padding: '20px' }}>
      <h1 className="calendar-title" style={{ textAlign: 'center' }}>Calendar</h1>
      <FullCalendar
        height="75vh"
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        select={handleSelect}
        events={currentEvents}
      />
      <button
        onClick={handleScheduleInterview}
        className="schedule-button"
        style={{
          display: 'block',
          margin: '20px auto',
          padding: '10px 20px',
          fontSize: '16px',
          color: '#fff',
          backgroundColor: '#007bff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        disabled={!selectedSlot}
      >
        Schedule Interview
      </button>
    </div>
  );
};

export default Calendar;
