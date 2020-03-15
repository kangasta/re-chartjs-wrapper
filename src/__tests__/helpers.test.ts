import ChartJs, { ChartConfiguration, ChartData } from 'chart.js';

import {
  generateRandomId,
  getOptionsUpdater,
  getDataUpdater
} from '../helpers';

describe('generateRandomId', (): void => {
  it('adds random string with length of six after prefix', (): void => {
    const spy = jest
      .spyOn(Math, 'random')
      .mockImplementationOnce(() => 0)
      .mockImplementationOnce(() => 0.123456789);
    expect(generateRandomId('test')).toMatch(/test[0-9a-z]{6}/);
    expect(spy).toHaveBeenCalledTimes(2);
  });
  it('adds "chart-" prefix by default', (): void => {
    expect(generateRandomId()).toMatch(/chart-[0-9a-z]{6}/);
  });
});

function generateMockChart(configuration: ChartConfiguration = {}): ChartJs {
  return ({
    data: {},
    options: {},
    ...configuration,
    update: jest.fn()
  } as unknown) as ChartJs;
}

describe('getOptionsUpdater', (): void => {
  it('returns prev if prev is falsy', () => {
    const updater = getOptionsUpdater({});
    expect(updater(undefined)).toEqual(undefined);
  });
  it('returns prev if options is falsy', () => {
    const updater = getOptionsUpdater(undefined);
    const chart = generateMockChart();
    expect(updater(chart)).toEqual(chart);
  });
  it('updates options with given values', () => {
    const options = { responsive: false };
    const updater = getOptionsUpdater(options);

    const chart = generateMockChart({ options: { responsive: true } });
    const updated = updater(chart);

    expect(updated?.options.responsive).toBe(false);
    expect(updated?.update).toHaveBeenCalled();
  });
});

const dummyDatasets = [
  { data: [1, 2, 3] },
  { data: [4, 5, 6] },
  { data: [7, 8, 9] }
];

function checkDataUpdateBehaviour(
  newData: ChartData,
  prevData: ChartConfiguration = {},
  expectedData?: ChartData
): void {
  const data: ChartData = newData;
  const updater = getDataUpdater(data);

  const chart = generateMockChart(prevData);
  const updated = updater(chart);

  expect(updated?.data).toEqual(expectedData || data);
  expect(updated?.update).toHaveBeenCalled();
}

describe('getDataUpdater', (): void => {
  it('returns prev if prev is falsy', () => {
    const updater = getDataUpdater({});
    expect(updater(undefined)).toEqual(undefined);
  });
  it('returns prev if options is falsy', (): void => {
    const updater = getDataUpdater(undefined);
    const chart = generateMockChart();
    expect(updater(chart)).toEqual(chart);
  });
  it('adds initial datasets', (): void => {
    checkDataUpdateBehaviour({ datasets: dummyDatasets.slice(0, 1) });
  });
  it('adds new datasets to existing array', (): void => {
    checkDataUpdateBehaviour(
      { datasets: dummyDatasets.slice(0, 1) },
      { data: { datasets: [] } }
    );
  });
  it('modifies existing data and removes removed datasets', (): void => {
    checkDataUpdateBehaviour(
      { datasets: dummyDatasets.slice(1) },
      { data: { datasets: dummyDatasets.slice() } }
    );
  });
  it('removes datasets if empty data given', (): void => {
    checkDataUpdateBehaviour(
      { datasets: undefined },
      { data: { datasets: [] } },
      { datasets: [] }
    );
  });
});
