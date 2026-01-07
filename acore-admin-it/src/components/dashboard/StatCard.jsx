import React from 'react'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

export default function StatCard({ title, value, interval, trend, data }) {
  const trendColors = {
    up: '#10b981',
    down: '#ef4444',
    neutral: '#6b7280'
  }

  const labelColors = {
    up: 'success',
    down: 'error',
    neutral: 'default'
  }

  const color = labelColors[trend]
  const trendValues = { up: '+25%', down: '-25%', neutral: '+5%' }

  return (
    <div className="card-outlined" style={{ height: '100%', flexGrow: 1 }}>
      <div className="card-content">
        <Typography component="h2" variant="subtitle2" gutterBottom>
          {title}
        </Typography>
        <Stack style={{ justifyContent: 'space-between', flexGrow: '1', gap: '8px' }}>
          <div style={{ justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h4" component="p">
                {value}
              </Typography>
              <Chip size="small" color={color} label={trendValues[trend]} />
            </div>
            <Typography variant="caption" style={{ color: 'var(--text-secondary)' }}>
              {interval}
            </Typography>
          </div>
          <div style={{ width: '100%', height: 50 }}>
            <svg width="100%" height="50" style={{ overflow: 'visible' }}>
              <defs>
                <linearGradient id={`area-gradient-${value}`} x1="50%" y1="0%" x2="50%" y2="100%">
                  <stop offset="0%" stopColor={trendColors[trend]} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={trendColors[trend]} stopOpacity={0} />
                </linearGradient>
              </defs>
              <path
                d={getSparklinePath(data, 50)}
                fill={`url(#area-gradient-${value})`}
              />
              <path
                d={getSparklinePath(data, 50)}
                fill="none"
                stroke={trendColors[trend]}
                strokeWidth="1.5"
              />
            </svg>
          </div>
        </Stack>
      </div>
    </div>
  )
}

function getSparklinePath(data, height) {
  if (!data || data.length === 0) return ''
  
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min
  const width = 100
  
  let path = `M 0 ${height - ((data[0] - min) / range) * height}`
  
  for (let i = 1; i < data.length; i++) {
    const x = (i / (data.length - 1)) * width
    const y = height - ((data[i] - min) / range) * height
    path += ` L ${x} ${y}`
  }
  
  path += ` L ${width} ${height} L 0 ${height} Z`
  return path
}