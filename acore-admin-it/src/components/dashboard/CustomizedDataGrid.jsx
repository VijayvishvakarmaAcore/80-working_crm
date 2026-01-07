import React, { useState } from 'react'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'

const columns = [
  { field: 'pageTitle', headerName: 'Page Title', flex: 1.5, minWidth: 200 },
  {
    field: 'status',
    headerName: 'Status',
    flex: 0.5,
    minWidth: 80,
    renderCell: (params) => renderStatus(params.value),
  },
  {
    field: 'users',
    headerName: 'Users',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 80,
  },
  {
    field: 'eventCount',
    headerName: 'Event Count',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'viewsPerUser',
    headerName: 'Views per User',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 120,
  },
  {
    field: 'averageTime',
    headerName: 'Average Time',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 100,
  },
]

const rows = [
  {
    id: 1,
    pageTitle: 'Homepage Overview',
    status: 'Online',
    eventCount: 8345,
    users: 212423,
    viewsPerUser: 18.5,
    averageTime: '2m 15s',
  },
  {
    id: 2,
    pageTitle: 'Product Details - Gadgets',
    status: 'Online',
    eventCount: 5653,
    users: 172240,
    viewsPerUser: 9.7,
    averageTime: '2m 30s',
  },
  {
    id: 3,
    pageTitle: 'Checkout Process - Step 1',
    status: 'Offline',
    eventCount: 3455,
    users: 58240,
    viewsPerUser: 15.2,
    averageTime: '2m 10s',
  },
  {
    id: 4,
    pageTitle: 'User Profile Dashboard',
    status: 'Online',
    eventCount: 112543,
    users: 96240,
    viewsPerUser: 4.5,
    averageTime: '2m 40s',
  },
  {
    id: 5,
    pageTitle: 'Article Listing - Tech News',
    status: 'Offline',
    eventCount: 3653,
    users: 142240,
    viewsPerUser: 3.1,
    averageTime: '2m 55s',
  },
  {
    id: 6,
    pageTitle: 'FAQs - Customer Support',
    status: 'Online',
    eventCount: 106543,
    users: 15240,
    viewsPerUser: 7.2,
    averageTime: '2m 20s',
  },
]

function renderStatus(status) {
  const colors = {
    Online: 'success',
    Offline: 'default',
  }

  return <Chip label={status} color={colors[status]} size="small" />
}

export default function CustomizedDataGrid() {
  const [selected, setSelected] = useState([])
  const [pageSize, setPageSize] = useState(20)

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelected(rows.map(row => row.id))
    } else {
      setSelected([])
    }
  }

  const handleSelect = (id) => {
    setSelected(prev =>
      prev.includes(id)
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    )
  }

  return (
    <div className="data-grid">
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>
                <Checkbox
                  checked={selected.length === rows.length}
                  indeterminate={selected.length > 0 && selected.length < rows.length}
                  onChange={handleSelectAll}
                />
              </th>
              {columns.map((column) => (
                <th key={column.field} style={{ textAlign: column.headerAlign || 'left' }}>
                  {column.headerName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.id} className={index % 2 === 0 ? 'even' : 'odd'}>
                <td>
                  <Checkbox
                    checked={selected.includes(row.id)}
                    onChange={() => handleSelect(row.id)}
                  />
                </td>
                {columns.map((column) => (
                  <td key={column.field} style={{ textAlign: column.align || 'left' }}>
                    {column.renderCell
                      ? column.renderCell({ value: row[column.field] })
                      : row[column.field]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="table-pagination">
        <div className="table-pagination-info">
          Rows per page:
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            style={{ marginLeft: '8px' }}
          >
            {[10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div className="table-pagination-controls">
          <button className="table-pagination-button" disabled>
            Previous
          </button>
          <button className="table-pagination-page active">1</button>
          <button className="table-pagination-button">
            Next
          </button>
        </div>
      </div>
    </div>
  )
}