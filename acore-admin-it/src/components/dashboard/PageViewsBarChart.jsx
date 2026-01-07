import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

export default function PageViewsBarChart() {
  const colorPalette = ['#1d4ed8', '#3b82f6', '#60a5fa']
  
  return (
    <Card className="card-outlined" style={{ width: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Page views and downloads
        </Typography>
        <Stack style={{ justifyContent: 'space-between' }}>
          <Stack direction="row" style={{ alignItems: 'center', gap: 8 }}>
            <Typography variant="h4" component="p">
              1.3M
            </Typography>
            <Chip size="small" color="error" label="-8%" />
          </Stack>
          <Typography variant="caption" style={{ color: 'var(--text-secondary)' }}>
            Page views and downloads for the last 6 months
          </Typography>
        </Stack>
        <div className="bar-chart">
          <svg width="100%" height="250">
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
              
              {/* X-axis */}
              <g transform="translate(0, 200)">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'].map((month, i) => (
                  <text
                    key={i}
                    x={`${(i * 14.28) + 7.14}%`}
                    y="20"
                    textAnchor="middle"
                    className="bar-chart-label"
                  >
                    {month}
                  </text>
                ))}
              </g>
              
              {/* Bars */}
              <g>
                {/* Page views */}
                {[2234, 3872, 2998, 4125, 3357, 2789, 2998].map((value, i) => (
                  <rect
                    key={`page-${i}`}
                    x={`${(i * 14.28) + 1}%`}
                    y={200 - (value / 5000) * 200}
                    width="3%"
                    height={(value / 5000) * 200}
                    fill={colorPalette[0]}
                    rx="4"
                  />
                ))}
                
                {/* Downloads */}
                {[3098, 4215, 2384, 2101, 4752, 3593, 2384].map((value, i) => (
                  <rect
                    key={`download-${i}`}
                    x={`${(i * 14.28) + 5}%`}
                    y={200 - (value / 5000) * 200}
                    width="3%"
                    height={(value / 5000) * 200}
                    fill={colorPalette[1]}
                    rx="4"
                  />
                ))}
                
                {/* Conversions */}
                {[4051, 2275, 3129, 4693, 3904, 2038, 2275].map((value, i) => (
                  <rect
                    key={`conversion-${i}`}
                    x={`${(i * 14.28) + 9}%`}
                    y={200 - (value / 5000) * 200}
                    width="3%"
                    height={(value / 5000) * 200}
                    fill={colorPalette[2]}
                    rx="4"
                  />
                ))}
              </g>
            </g>
          </svg>
        </div>
      </CardContent>
    </Card>
  )
}