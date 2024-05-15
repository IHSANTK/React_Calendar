import { produce } from 'immer'; // Assuming you've installed Immer

const initialState = {
  currentDate: new Date(),
  events: {}, // Consider a more structured event object if needed
  selectedDate: null,
  eventText: '',
  eventTime: '',
};

const rootReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case 'UPDATE_EVENTS':
        draft.events = action.payload;
        break;
      case 'DELETE_EVENT':
        const { date, index } = action.payload; 
        draft.events[date].splice(index, 1);
        if (draft.events[date].length === 0) {
          delete draft.events[date];
        }
        break;
      case 'SET_CURRENT_DATE':
        draft.currentDate = action.payload;
        break;
      case 'SET_SELECTED_DATE':
        draft.selectedDate = action.payload;
        break;
      case 'SET_EVENT_TEXT':
        draft.eventText = action.payload;
        break;
      case 'SET_EVENT_TIME':
        draft.eventTime = action.payload;
        break;
      default:
        break; // No change
    }
  });
};

export default rootReducer;
