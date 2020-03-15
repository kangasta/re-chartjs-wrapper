import React from 'react';
import { render } from '@testing-library/react';

import { Chart } from '../index';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ChartJs from 'chart.js';
jest.mock('chart.js');

it('renders without crashing', (): void => {
  render(<Chart configuration={{}}>Test</Chart>);
});
