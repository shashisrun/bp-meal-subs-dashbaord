import React from 'react';
import TablePage from '../components/tablePage';
import { subscribe } from '../config/firebase';

export default function Categories() {
    const [rows, setRows] = React.useState([]);
    const docroot = 'cuisines/';

    React.useEffect(() => {
        const fetchData = () => {
            subscribe(docroot, setRows);
        }
        fetchData();
    },[])

    const columns = [
        { field: 'id', headerName: 'ID', width: 200 },
        {
            field: 'name',
            headerName: 'Cuisine Name',
            width: 150,
            editable: true,
        },
        {
            field: 'thumbnails',
            headerName: 'Thumbnail',
            width: 110,
            editable: false,
            type: 'image',
        },
        {
            field: 'status',
            headerName: 'Active',
            width: 160,
            type: 'boolean',
            editable: true,
        },
        {
            field: 'createdAt',
            headerName: 'Created At',
            width: 160,
            type: 'date',
        },
        {
            field: 'updatedAt',
            headerName: 'Updated At',
            width: 250,
            type: 'date',
        },
    ];

    const addCuisine = {
        title: 'Add cuisine',
        document: docroot,
        submitLabel: 'Add Cuisine',
        fields: [
            {
                type: 'text',
                name: 'Cuisine Name',
                required: true,
                key: 'name'
            },
            {
                type: 'file',
                name: 'Cuisine Image',
                required: false,
                multiple: 10,
                key: 'thumbnails',
                accept: 'image/*',
                uploadPath: 'cuisines'
            },
            {
                type: 'checkbox',
                name: 'Active',
                required: true,
                key: 'status',
                checked: true
            },
        ]
    }
    return (
        <div>
            <TablePage title={'Cuisines'} columns={columns} rows={rows} addDocument={addCuisine} docRoot={docroot} rowHeight={150} />
        </div>
    )
}
