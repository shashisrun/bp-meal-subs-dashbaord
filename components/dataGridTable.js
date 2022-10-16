import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

export default function DataGridTable({ columns, rows, pageSize, rowsPerPageOptions, handleChange, handleDelete, checkboxSelection, rowHeight }) {
    return (
        <Box sx={{ height: "70vh", width: '100%' }}>
            <DataGrid
                rowHeight={rowHeight}
                rows={rows}
                columns={columns}
                pageSize={pageSize}
                rowsPerPageOptions={[rowsPerPageOptions]}
                checkboxSelection
                disableSelectionOnClick
                onCellEditCommit={handleChange}
                onSelectionModelChange={checkboxSelection}
            />
        </Box>
    );
}
