import * as React from 'react';
import TestRenderer from 'react-test-renderer';

import { createTimeProvider, GetTime, withTime, useTime } from './';

const MockTimeProvider = createTimeProvider(() => '2018–04–06T12:30:00Z');

describe('TimeProvider', () => {
  test('GetTime can get the time from the Provider', () => {
    const tree = TestRenderer.create(
      <MockTimeProvider>
        <GetTime>{({ currentTime }) => currentTime}</GetTime>
      </MockTimeProvider>,
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });

  const HOCOutputter = withTime(({ currentTime }) => <span>{currentTime}</span>);

  test('withTime can get the time from the Provider', () => {
    const tree = TestRenderer.create(
      <MockTimeProvider>
        <HOCOutputter />
      </MockTimeProvider>,
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });

  const HookOutputter = () => {
    const { currentTime } = useTime();
    return <span>{currentTime}</span>;
  };

  test('useTime can get the time from the Provider', () => {
    const tree = TestRenderer.create(
      <MockTimeProvider>
        <HookOutputter />
      </MockTimeProvider>,
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('TimeProvider calls getTime with props', () => {
    const getTime = jest.fn(({ timeZone }) => 'Time' + timeZone);
    const TP = createTimeProvider(getTime);

    TestRenderer.create(<TP timeZone="America/New_York">Hi</TP>);

    expect(getTime).toBeCalledWith({ timeZone: 'America/New_York' });
  });
});
