import React from 'react';
import TablePage from '../components/tablePage';
import { getDocuments, createRef, subscribe } from '../config/firebase';

export default function Plans() {
    const [rows, setRows] = React.useState([]);


    React.useEffect(() => {
        const fetchData = async () => {
            subscribe(`users`, setRows)
        }
        fetchData();
    }, [])

    const columns = [
        { field: 'id', headerName: 'ID', width: 200 },
        {
            field: 'name',
            headerName: 'Customer Name',
            width: 150,
            editable: true,
        },
        {
            field: 'profile',
            headerName: 'Profile Photo',
            width: 110,
            editable: false,
            type: 'image',
        },
        {
            field: 'phone',
            headerName: 'Customer Phone',
            width: 150,
            editable: false,
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
        // title: 'Plan',
        // document: `plans`,
        // submitLabel: 'Add Plan',
        // fields: [
        //     {
        //         type: 'text',
        //         name: 'Plan Name',
        //         required: true,
        //         key: 'name'
        //     },
        //     {
        //         type: 'file',
        //         name: 'Plan Image',
        //         required: false,
        //         multiple: 10,
        //         key: 'thumbnails',
        //         accept: 'image/*',
        //         uploadPath: 'plans'
        //     },
        //     {
        //         type: 'text',
        //         name: 'Monthly Fee',
        //         required: true,
        //         key: 'monthlyFee'
        //     },
        //     {
        //         type: 'text',
        //         name: 'Yearly Fee',
        //         required: true,
        //         key: 'yearlyFee'
        //     },
        //     {
        //         type: 'checkbox',
        //         name: 'Active',
        //         required: true,
        //         key: 'status',
        //         checked: true
        //     },
        // ]
    }
    return (
        <div>
            <TablePage title={'Customers'} columns={columns} rows={rows} addDocument={addCuisine} docRoot={`plans`} rowHeight={150} />
        </div>
    )
}
