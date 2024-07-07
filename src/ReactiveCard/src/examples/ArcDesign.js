import React from 'react'
import { PieChart } from '@mui/x-charts/PieChart'

const ArcDesign = ({ data }) => {
  console.log('i reached my destination')
  console.log(data)
  return (
    <PieChart
      sx={{
        '& .MuiChartsLegend-series tspan': {
          fontSize: '0.7em ',
          fontFamily: 'Black Ops One',
        },
      }}
      series={[
        {
          data,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
        },
      ]}
      height={100}
    />
  )
}

export default ArcDesign
