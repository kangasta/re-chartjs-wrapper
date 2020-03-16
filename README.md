# re-chartjs-wrapper

[![Build Status](https://travis-ci.org/kangasta/re-chartjs-wrapper.svg?branch=master)](https://travis-ci.org/kangasta/re-chartjs-wrapper)
[![Maintainability](https://api.codeclimate.com/v1/badges/0e79b63ce1479c8c06b6/maintainability)](https://codeclimate.com/github/kangasta/re-chartjs-wrapper/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/0e79b63ce1479c8c06b6/test_coverage)](https://codeclimate.com/github/kangasta/re-chartjs-wrapper/test_coverage)

React wrapper for Chart.js charts.

## Installing

```bash
npm install re-chartjs-wrapper
```

## Usage

`type`, `data`, and `options` can be passed in as separate props or as `configuration` object. If some property is passed both in a separate prop and in configuration, the value fron configuration is used.

Custom id for chart and be passed in as `id` prop. If no id is given, an random six character string with `chart-` prefix is generated and used as the id.

In addition to these five props: `id`, `type`, `data`, `options`, and `configuration`, any props of `<canvas/>` can be given in. These additional props will be passed down to the `<canvas/>` component.

```jsx
import { Chart } from 're-chartjs-wrapper';

<Chart configuration={configuration}/>
<Chart type={type} data={data} options={options}/>
```

## Testing

For linting and unit tests, run:

```bash
# Linting
npm run lint
npm run lint -- --fix

# Unit tests
npm test
npm test -- --verbose --coverage
```
