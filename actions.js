export const updateEvents = (events) => ({
    type: 'UPDATE_EVENTS',
    payload: events,
  });
  
  export const deleteEvent = (date, index) => ({
    type: 'DELETE_EVENT',
    payload: { date, index },
  });
  
  export const setCurrentDate = (date) => ({
    type: 'SET_CURRENT_DATE',
    payload: date,
  });
  
  export const setSelectedDate = (date) => ({
    type: 'SET_SELECTED_DATE',
    payload: date,
  });
  
  export const setEventText = (text) => ({
    type: 'SET_EVENT_TEXT',
    payload: text,
  });
  
  export const setEventTime = (time) => ({
    type: 'SET_EVENT_TIME',
    payload: time,
  });
  