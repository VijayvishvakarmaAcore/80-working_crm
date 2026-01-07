import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded'

export default function HighlightedCard() {
  return (
    <Card style={{ height: '100%' }}>
      <CardContent>
        <InsightsRoundedIcon />
        <Typography
          component="h2"
          variant="subtitle2"
          gutterBottom
          style={{ fontWeight: '600' }}
        >
          Explore your data
        </Typography>
        <Typography style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>
          Uncover performance and visitor insights with our data wizardry.
        </Typography>
        <Button
          variant="contained"
          size="small"
          color="primary"
          endIcon={<ChevronRightRoundedIcon />}
          style={{ width: '100%' }}
        >
          Get insights
        </Button>
      </CardContent>
    </Card>
  )
}