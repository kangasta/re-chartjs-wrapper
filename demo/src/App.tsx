import React, { useState, useEffect } from 'react';

import { Chart } from 're-chartjs-wrapper';

function getRandomData(N=3, max=100): number[] {
  return Array(N).fill(max).map((a): number => Math.round(Math.random() * a))
}

function App() {
  const [data, setData] = useState<number[]>(getRandomData());

  useEffect(() => {
    const interval = setInterval(() => { setData(getRandomData()); }, 3e3);
    return () => {
      clearInterval(interval);
    }
  }, []);

  return (
    <div className="App" style={{maxWidth: '800px', textAlign: 'center'}}>
      <h1>re-chartjs-wrapper</h1>
      <p style={{textAlign: 'left'}}>React wrapper for Chart.js charts.</p>
      <div style={{display: 'block', position: 'relative', maxHeight: '400px', maxWidth: '800px'}}>
        <Chart type='doughnut' data={{datasets: [{data, backgroundColor: ['DarkOrange', 'DarkSlateGray', 'DarkSlateBlue']}], labels: ['A', 'B', 'C']}}/>
      </div>
    </div>
  );
}

export default App;
