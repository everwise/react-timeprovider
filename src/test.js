import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { createContext } from 'react-broadcast';

import { createTimeProvider, GetTime, withTime } from './';
import createComponents from './createComponents';

const Broadcast = createComponents(createContext({}));

const MockTimeProvider = createTimeProvider(() => '2018–04–06T12:30:00Z');
const BCMockTimeProvider = Broadcast.createTimeProvider(() => '2018–04–06T12:30:00Z');

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

  test('Broadcast.GetTime can get the time from the Provider', () => {
    const tree = TestRenderer.create(
      <BCMockTimeProvider>
        <Broadcast.GetTime>{({ currentTime }) => currentTime}</Broadcast.GetTime>
      </BCMockTimeProvider>,
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });

  const BCTimeOutputter = Broadcast.withTime(({ currentTime }) => <span>{currentTime}</span>);

  test('Broadcast.withTime can get the time from the Provider', () => {
    const tree = TestRenderer.create(
      <BCMockTimeProvider>
        <BCTimeOutputter />
      </BCMockTimeProvider>,
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
