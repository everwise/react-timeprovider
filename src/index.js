import * as React from 'react';

const Context = React.createContext();

// We return the ISO string version of the date. This is nice because it is not
// a mutable object like `Date` and it is also a human readable representation.
const defaultGetTime = (/* props */) => new Date().toISOString();

const cleanProps = ({ interval, children, ...props }) => props;

// We export a TimeProvider factory if they need to override how we `getTime`.
export const createTimeProvider = getTime => ({ interval = 500, children, ...props }) => {
  const [currentTime, setCurrentTime] = React.useState(getTime(props));

  React.useEffect(
    () => {
      const intervalId = setInterval(() => {
        setCurrentTime(getTime(props));
      }, interval);

      return () => {
        clearInterval(intervalId);
      };
    },
    [setCurrentTime],
  );

  return <Context.Provider value={{ currentTime, ...props }}>{children}</Context.Provider>;
};

export const TimeProvider = createTimeProvider(defaultGetTime);

export const GetTime = Context.Consumer;

export const withTime = WrappedComponent => props => (
  <GetTime>
    {timeProps => (
      <WrappedComponent
        // by passing timeProps first and ...props second, we allow
        // parent components to override the timeProps
        {...timeProps}
        {...props}
      />
    )}
  </GetTime>
);

export const useTime = () => React.useContext(Context);
