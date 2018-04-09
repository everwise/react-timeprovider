/**
 * The createComponents factory lets us switch out the context implementation.
 * We use React.createContext by default, but if you are not on React 16.3 yet,
 * you could use the react-broadcast backport.
 */
import * as React from 'react';

// We return the ISO string version of the date. This is nice because it is not
// a mutable object like `Date` and it is also a human readable representation.
const defaultGetTime = (/* props */) => new Date().toISOString();

const cleanProps = ({ interval, children, ...props }) => props;

const createComponents = ({ Provider, Consumer }) => {
  // We export a TimeProvider factory if they need to override how we `getTime`.
  const createTimeProvider = getTime =>
    class TimeProvider extends React.PureComponent {
      static defaultProps = {
        interval: 500,
      };

      static getDerivedStateFromProps(nextProps, prevState) {
        const didChange = Object.keys(nextProps).reduce(
          (acc, key) => acc || nextProps[key] !== prevState[key],
          false,
        );
        if (!didChange) return null;

        const props = cleanProps(nextProps);

        return {
          ...prevState,
          ...props,
          currentTime: getTime(props),
        };
      }

      state = {
        ...cleanProps(this.props),
        currentTime: getTime(cleanProps(this.props)),
      };

      componentDidMount() {
        this.interval = setInterval(this.updateTime, this.props.interval);
      }

      componentWillReceiveProps(nextProps) {
        const nextState = TimeProvider.getDerivedStateFromProps(nextProps, this.state);
        if (nextState === null) return;
        this.setState(nextState);
      }

      componentWillUnmount() {
        if (this.interval) {
          clearInterval(this.interval);
        }
      }

      updateTime = () => {
        this.setState(() => ({
          currentTime: getTime(cleanProps(this.props)),
        }));
      };

      render() {
        return <Provider value={this.state}>{this.props.children}</Provider>;
      }
    };

  const TimeProvider = createTimeProvider(defaultGetTime);

  const GetTime = Consumer;

  const withTime = WrappedComponent => props => (
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

  return {
    createTimeProvider,
    TimeProvider,
    GetTime,
    withTime,
  };
};

export default createComponents;
