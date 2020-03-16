import React from 'react';
import { render } from '@testing-library/react';

import { Chart } from '../index';
import * as helpers from '../helpers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ChartJs, { ChartData, ChartOptions } from 'chart.js';
jest.mock('chart.js');

it('renders without crashing', (): void => {
  render(<Chart />);
});

it('defaults to configurations over other props', (): void => {
  const dataSpy = jest.spyOn(helpers, 'getDataUpdater');
  const optionsSpy = jest.spyOn(helpers, 'getOptionsUpdater');

  const data: ChartData = { datasets: [{ data: [1] }] };
  const options: ChartOptions = { responsive: true };

  render(
    <Chart
      data={{ datasets: [] }}
      options={{ responsive: false }}
      configuration={{ data, options }}
    />
  );

  expect(dataSpy).toHaveBeenCalledWith(data);
  expect(optionsSpy).toHaveBeenCalledWith(options);
});
