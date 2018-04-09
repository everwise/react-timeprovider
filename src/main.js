import * as React from 'react';

import createComponents from './createComponents';

export const { createTimeProvider, TimeProvider, GetTime, withTime } = createComponents(
  React.createContext(),
);
