import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Copyright from '../common/Copyright'
import ChartUserByCountry from './ChartUserByCountry'
import CustomizedTreeView from './CustomizedTreeView'
import CustomizedDataGrid from './CustomizedDataGrid'
import HighlightedCard from './HighlightedCard'
import PageViewsBarChart from './PageViewsBarChart'
import SessionsChart from './SessionsChart'
import StatCard from './StatCard'

const data = [
  {
    title: 'Users',
    value: '14k',
    interval: 'Last 30 days',
    trend: 'up',
    data: [
      200, 24, 220, 260, 240, 380, 100, 240, 280, 240, 300, 340, 320, 360, 340, 380,
      360, 400, 380, 420, 400, 640, 340, 460, 440, 480, 460, 600, 880, 920,
    ],
  },
  {
    title: 'Conversions',
    value: '325',
    interval: 'Last 30 days',
    trend: 'down',
    data: [
      1640, 1250, 970, 1130, 1050, 900, 720, 1080, 900, 450, 920, 820, 840, 600, 820,
      780, 800, 760, 380, 740, 660, 620, 840, 500, 520, 480, 400, 360, 300, 220,
    ],
  },
  {
    title: 'Event count',
    value: '200k',
    interval: 'Last 30 days',
    trend: 'neutral',
    data: [
      500, 400, 510, 530, 520, 600, 530, 520, 510, 730, 520, 510, 530, 620, 510, 530,
      520, 410, 530, 520, 610, 530, 520, 610, 530, 420, 510, 430, 520, 510,
    ],
  },
]

export default function MainGrid() {
  return (
    <Box style={{ width: '100%', maxWidth: '1700px' }}>
      {/* cards */}
      <Typography component="h2" variant="h6" style={{ marginBottom: '16px' }}>
        Overview
      </Typography>
      <div className="grid grid-12" style={{ marginBottom: '16px' }}>
        {data.map((card, index) => (
          <div key={index} className="grid-item-3">
            <StatCard {...card} />
          </div>
        ))}
        <div className="grid-item-3">
          <HighlightedCard />
        </div>
        <div className="grid-item-6">
          <SessionsChart />
        </div>
        <div className="grid-item-6">
          <PageViewsBarChart />
        </div>
      </div>
      <Typography component="h2" variant="h6" style={{ marginBottom: '16px' }}>
        Details
      </Typography>
      <div className="grid grid-12">
        <div className="grid-item-9">
          <CustomizedDataGrid />
        </div>
        <div className="grid-item-3">
          <div className="stack" style={{ gap: '16px' }}>
            <CustomizedTreeView />
            <ChartUserByCountry />
          </div>
        </div>
      </div>
      <Copyright style={{ margin: '32px 0' }} />
    </Box>
  )
}