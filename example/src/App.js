import * as React from 'react';

import { TimeProvider, GetTime } from 'react-timeprovider';

const WeekendStatus = ({ currentTime }) => {
  // Because we take currentTime as a prop, we now no longer depend
  // on the external system time in our render function. We are now
  // a pure function
  const dayOfWeek = new Date(currentTime).getDay();
  const isWeekend = [0, 6].includes(dayOfWeek);
  if (isWeekend) {
    return <p>It&apos;s the weekend!</p>;
  }
  return <p>It is not the weekend. :(</p>;
};

const App = () => (
  <TimeProvider>
    <h1>Is it the weekend?</h1>
    <GetTime>{({ currentTime }) => <WeekendStatus currentTime={currentTime} />}</GetTime>
  </TimeProvider>
);

export default App;
