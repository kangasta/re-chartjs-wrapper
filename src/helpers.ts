import ChartJs, { ChartOptions, ChartData } from 'chart.js';

export function generateRandomId(prefix = 'chart-'): string {
  let postfix = '';
  while (postfix.length < 6) {
    postfix = Math.random()
      .toString(36)
      .substring(7);
  }
  return `${prefix}${postfix}`;
}

type ChartUpdater = (prev: ChartJs | undefined) => ChartJs | undefined;

export function getDataUpdater(data?: ChartData): ChartUpdater {
  return (prev: ChartJs | undefined): ChartJs | undefined => {
    if (!prev || !data) {
      return prev;
    }

    const datasets = data.datasets || [];

    if (!prev.data) {
      prev.data = { datasets };
    } else if (!prev.data.datasets) {
      prev.data.datasets = datasets;
    } else {
      const datasetsN = Math.max(prev.data.datasets.length, datasets.length);

      prev.data.labels = data.labels;
      for (let i = 0; i < datasetsN; i++) {
        // Modify existings datasets
        if (i < prev.data.datasets.length) {
          // Dataset was modified or removed
          if (datasets[i] !== undefined) {
            prev.data.datasets[i] = {
              ...prev.data.datasets[i],
              ...datasets[i]
            };
          } else {
            prev.data.datasets.pop();
          }
          // Add new datasets
        } else {
          prev.data.datasets.push(datasets[i]);
        }
      }
    }
    prev.update();
    return prev;
  };
}

export function getOptionsUpdater(options?: ChartOptions): ChartUpdater {
  return (prev: ChartJs | undefined): ChartJs | undefined => {
    if (!prev || !options) {
      return prev;
    }

    prev.options = options;
    prev.update();
    return prev;
  };
}
