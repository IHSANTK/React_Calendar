import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  updateEvents,
  deleteEvent,
  setCurrentDate,
  setSelectedDate,
  setEventText,
  setEventTime,
} from './actions';

import './Calendar.css';

const Calendar = (props) => {
  const {
    currentDate,
    events,
    selectedDate,
    eventText,
    eventTime,
    updateEvents,
    deleteEvent,
    setCurrentDate,
    setSelectedDate,
    setEventText,
    setEventTime,
  } = props;

  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  const startDay = startOfMonth.getDay();
  const daysInMonth = endOfMonth.getDate();

  const days = [];
  for (let i = 0; i < startDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const handleDayClick = (day) => {
    setSelectedDate(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`);
  };

  const handleEventSubmit = (e) => {
    e.preventDefault();
    if (selectedDate && eventText && eventTime) {
      const eventDate = selectedDate;
      const newEvent = { text: eventText, time: eventTime };
      updateEvents({
        ...events,
        [eventDate]: events[eventDate] ? [...events[eventDate], newEvent] : [newEvent],
      });
      setEventText('');
      setEventTime('');
      setSelectedDate(null);
    }
  };

  const handleDeleteEvent = (eventDate, index) => {
    deleteEvent(eventDate, index);
  };

  return (
    <div className="calendar-container">
      <div className="calendar">
        <div className="calendar-header">
          <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}>Prev</button>
          <h2>{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</h2>
          <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}>Next</button>
        </div>
        <div className="calendar-grid">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="calendar-day-name">{day}</div>
          ))}
          {days.map((day, index) => (
            <div key={index} className="calendar-day" onClick={() => day && handleDayClick(day)}>
              {day}
  
            </div>
          ))}
        </div>
        
        {selectedDate && (
          <form onSubmit={handleEventSubmit} className="event-form">
            <h3>Add Event on {selectedDate}</h3>
            <input
              type="text"
              value={eventText}
              onChange={(e) => setEventText(e.target.value)}
              placeholder="Event Details"
              required
            />
            <input
              type="time"
              value={eventTime}
              onChange={(e) => setEventTime(e.target.value)}
              placeholder="Time"
              required
            />
            <button type="submit">Add Event</button>
          </form>
        )}
      </div>

      <div className="all-events">
        <h3> Events</h3>
        {Object.keys(events).map(eventDate => (
          <div key={eventDate} className="event-date">
            <h4>{eventDate}</h4>
            {events[eventDate].map((event, idx) => (
              <div key={idx} className="event-detail">
                <span>{event.time} - {event.text}</span>
                <i id="icon" className="fa-solid fa-trash-can"  onClick={() => handleDeleteEvent(eventDate, idx)}></i>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

Calendar.propTypes = {
  currentDate: PropTypes.instanceOf(Date).isRequired,
  events: PropTypes.object.isRequired,
  selectedDate: PropTypes.string,
  eventText: PropTypes.string,
  eventTime: PropTypes.string,
  updateEvents: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired,
  setCurrentDate: PropTypes.func.isRequired,
  setSelectedDate: PropTypes.func.isRequired,
  setEventText: PropTypes.func.isRequired,
  setEventTime: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currentDate: state.currentDate,
  events: state.events,
  selectedDate: state.selectedDate,
  eventText: state.eventText,
  eventTime: state.eventTime,
});

export default connect(mapStateToProps, {
  updateEvents,
  deleteEvent,
  setCurrentDate,
  setSelectedDate,
  setEventText,
  setEventTime,
})(Calendar);
