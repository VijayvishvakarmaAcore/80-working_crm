import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

export default function SessionsChart() {
  const colorPalette = ['#60a5fa', '#3b82f6', '#1d4ed8']
  
  return (
    <Card className="card-outlined" style={{ width: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Sessions
        </Typography>
        <Stack style={{ justifyContent: 'space-between' }}>
          <Stack direction="row" style={{ alignItems: 'center', gap: 8 }}>
            <Typography variant="h4" component="p">
              13,277
            </Typography>
            <Chip size="small" color="success" label="+35%" />
          </Stack>
          <Typography variant="caption" style={{ color: 'var(--text-secondary)' }}>
            Sessions per day for the last 30 days
          </Typography>
        </Stack>
        <div className="line-chart">
          <svg width="100%" height="250">
            <defs>
              <linearGradient id="organic-gradient" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="referral-gradient" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="direct-gradient" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
              </linearGradient>
            </defs>
            
            <g transform="translate(0, 20)">
              {/* Grid lines */}
              {[0, 1, 2, 3, 4].map((i) => (
                <line
                  key={i}
                  x1="0"
                  y1={i * 50}
                  x2="100%"
                  y2={i * 50}
                  stroke="var(--border-color)"
                  strokeDasharray="4 2"
                  strokeWidth="0.8"
                />
              ))}
              
              {/* Area paths */}
              <path
                d={getAreaPath(organicData, 200)}
                fill="url(#organic-gradient)"
              />
              <path
                d={getAreaPath(referralData, 200)}
                fill="url(#referral-gradient)"
              />
              <path
                d={getAreaPath(directData, 200)}
                fill="url(#direct-gradient)"
              />
              
              {/* Line paths */}
              <path
                d={getLinePath(organicData, 200)}
                fill="none"
                stroke="#1d4ed8"
                strokeWidth="2"
              />
              <path
                d={getLinePath(referralData, 200)}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
              />
              <path
                d={getLinePath(directData, 200)}
                fill="none"
                stroke="#60a5fa"
                strokeWidth="2"
              />
            </g>
          </svg>
        </div>
      </CardContent>
    </Card>
  )
}

const organicData = [
  1000, 1500, 1200, 1700, 1300, 2000, 2400, 2200, 2600, 2800, 2500,
  3000, 3400, 3700, 3200, 3900, 4100, 3500, 4300, 4500, 4000, 4700,
  5000, 5200, 4800, 5400, 5600, 5900, 6100, 6300
]

const referralData = [
  500, 900, 700, 1400, 1100, 1700, 2300, 2000, 2600, 2900, 2300, 3200,
  3500, 3800, 4100, 4400, 2900, 4700, 5000, 5300, 5600, 5900, 6200,
  6500, 5600, 6800, 7100, 7400, 7700, 8000
]

const directData = [
  300, 900, 600, 1200, 1500, 1800, 2400, 2100, 2700, 3000, 1800, 3300,
  3600, 3900, 4200, 4500, 3900, 4800, 5100, 5400, 4800, 5700, 6000,
  6300, 6600, 6900, 7200, 7500, 7800, 8100
]

function getLinePath(data, height) {
  const max = Math.max(...data)
  const width = 100
  
  let path = `M 0 ${height - (data[0] / max) * height}`
  
  for (let i = 1; i < data.length; i++) {
    const x = (i / (data.length - 1)) * width
    const y = height - (data[i] / max) * height
    path += ` L ${x}% ${y}`
  }
  
  return path
}

function getAreaPath(data, height) {
  const max = Math.max(...data)
  const width = 100
  
  let path = `M 0 ${height - (data[0] / max) * height}`
  
  for (let i = 1; i < data.length; i++) {
    const x = (i / (data.length - 1)) * width
    const y = height - (data[i] / max) * height
    path += ` L ${x}% ${y}`
  }
  
  path += ` L ${width}% ${height} L 0 ${height} Z`
  return path
}