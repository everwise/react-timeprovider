import * as React from 'react';

const TimeContext = React.createContext();

// We export a TimeProvider factory if they need to override how we `getTime`.
export const createTimeProvider = getTime =>
  class TimeProvider extends React.PureComponent {
    static defaultProps = {
      interval: 500,
    };

    state = {
      currentTime: getTime(),
    };

    componentDidMount() {
      this.interval = setInterval(this.updateTime, this.props.interval);
    }

    componentWillUnmount() {
      if (this.interval) {
        clearInterval(this.interval);
      }
    }

    updateTime = () => {
      this.setState(() => ({
        currentTime: getTime(),
      }));
    };

    render() {
      return <TimeContext.Provider value={this.state}>{this.props.children}</TimeContext.Provider>;
    }
  };

// We return the ISO string version of the date. This is nice because it is not
// a mutable object like `Date` and it is also a human readable representation.
const defaultGetTime = () => new Date().toISOString();

export const TimeProvider = createTimeProvider(defaultGetTime);

export const GetTime = TimeContext.Consumer;

export const withTime = WrappedComponent => props => (
  <GetTime>
    {({ currentTime }) => (
      <WrappedComponent
        // by passing currentTime first and ...props second, we allow
        // parent components to override the currentTime
        currentTime={currentTime}
        {...props}
      />
    )}
  </GetTime>
);
