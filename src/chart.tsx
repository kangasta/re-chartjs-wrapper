import React, { useState, useEffect } from 'react';
import ChartJs, {
  ChartData,
  ChartOptions,
  ChartType,
  ChartConfiguration
} from 'chart.js';

import { generateRandomId, getOptionsUpdater, getDataUpdater } from './helpers';

export interface ChartProps extends React.HTMLAttributes<HTMLCanvasElement> {
  id?: string;
  type?: ChartType;
  data?: ChartData;
  options?: ChartOptions;
  configuration?: ChartConfiguration;
}

export function Chart({
  id: propsId,
  type,
  data,
  options,
  configuration = {},
  ...props
}: ChartProps): React.ReactElement {
  const [chart, setChart] = useState<ChartJs>();
  const [id, setId] = useState(propsId || generateRandomId());

  // Create new chart on id and type changes
  useEffect((): (() => void) => {
    setId(propsId || generateRandomId());
    setChart(new ChartJs(id, { type, data, options, ...configuration }));
    return (): void => {
      chart?.destroy();
    };
  }, [propsId, type]); // eslint-disable-line react-hooks/exhaustive-deps

  // Update chart options on options change
  useEffect((): void => {
    setChart(getOptionsUpdater(configuration.options || options));
  }, [configuration.options, options]);

  // Update chart data on data change
  useEffect((): void => {
    setChart(getDataUpdater(configuration.data || data));
  }, [configuration.data, data]);

  return <canvas id={id} {...props} />;
}
