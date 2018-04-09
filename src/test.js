import * as React from 'react';
import TestRenderer from 'react-test-renderer';

import { createTimeProvider, GetTime, withTime } from './';

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

  const TimeOutputter = withTime(({ currentTime }) => <span>{currentTime}</span>);

  test('withTime can get the time from the Provider', () => {
    const tree = TestRenderer.create(
      <MockTimeProvider>
        <TimeOutputter />
      </MockTimeProvider>,
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
