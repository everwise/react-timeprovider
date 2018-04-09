# React TimeProvider

React components for safely accessing the current time.

[![NPM](https://img.shields.io/npm/v/react-timeprovider.svg)](https://www.npmjs.com/package/react-timeprovider)

## Install

NPM:

```bash
npm install --save react-timeprovider
```

Yarn:

```bash
yarn add react-timeprovider
```

## Usage

```jsx
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
```

**Note:** React TimePicker assumes you are using React >= 16.3.0. If you are
using an older version you can still use the library in conjunction with
`react-broadcast` >= 0.7. Here is how:

```jsx
import { createContext } from 'react-broadcast';
import createComponents from 'react-timeprovider/dist/createComponents';

const { createTimeProvider, TimeProvider, GetTime, withTime } = createComponents(createContext());
```

## Documentation

### `<TimeProvider>`

Props:

* `interval` (number, default `500`) - The number of milliseconds to wait before
  updating the time.

### `<GetTime>`

Takes a function as `children` and passes an object containing `currentTime` to
that function.

### `withTime`

A HOC that will pass the prop `currentTime` to the wrapped component.

### `createTimeProvider(getTime)`

If you are writing tests and want to mock out the `getTime` function or if you
don't like the default time representation you can create your own
`<TimeProvider>` component.

```jsx
const MockTimeProvider = createTimeProvider(() => '2018–04–06T12:30:00Z');
```

The `getTime` function will be passed any extra props that you set onto
`<TimeProvider>`. This is useful if you want the time zone for example.

## License

MIT © [Everwise](https://github.com/everwise)
