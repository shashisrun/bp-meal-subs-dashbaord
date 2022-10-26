import React from 'react';
import TablePage from '../components/tablePage';
import { getDocuments, createRef, subscribe } from '../config/firebase';

export default function Plans() {
    const [rows, setRows] = React.useState([]);


    React.useEffect(() => {
        const fetchData = async () => {
            subscribe(`plans`, setRows)
        }
        fetchData();
    }, [])

    const columns = [
        { field: 'id', headerName: 'ID', width: 200 },
        {
            field: 'name',
            headerName: 'Plan Name',
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
            field: 'description',
            headerName: 'Plan Description',
            width: 300,
            editable: true,
        },
        {
            field: 'duration',
            headerName: 'Duration (days)',
            width: 150,
            editable: true,
        },
        {
            field: 'price',
            headerName: 'Price',
            width: 150,
            editable: true,
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
        title: 'Plan',
        document: `plans`,
        submitLabel: 'Add Plan',
        fields: [
            {
                type: 'text',
                name: 'Plan Name',
                required: true,
                key: 'name'
            },
            {
                type: 'file',
                name: 'Plan Image',
                required: false,
                multiple: 10,
                key: 'thumbnails',
                accept: 'image/*',
                uploadPath: 'plans'
            },
            {
                type: 'textarea',
                name: 'Description',
                required: true,
                key: 'description',
            },
            {
                type: 'text',
                name: 'Duration (days)',
                required: true,
                key: 'duration',
            },
            {
                type: 'text',
                name: 'price',
                required: true,
                key: 'price'
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
            <TablePage title={'Plans'} columns={columns} rows={rows} addDocument={addCuisine} docRoot={`plans`} rowHeight={150} />
        </div>
    )
}
