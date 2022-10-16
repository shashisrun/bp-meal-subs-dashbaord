import React from 'react';
import TablePage from '../components/tablePage';
import { getDocuments, createRef, subscribe } from '../config/firebase';

export default function Meals() {
    const [rows, setRows] = React.useState([]);
    const [cuisines, setCuisines] = React.useState([]);


    React.useEffect(() => {
        const fetchData = async () => {
            subscribe(`meals`, setRows)
            getDocuments(`cuisines`).then((data) => {
                setCuisines(data);
            })
        }
        fetchData();
    }, [])

    const columns = [
        { field: 'id', headerName: 'ID', width: 200 },
        {
            field: 'name',
            headerName: 'Meal Name',
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
            headerName: 'Description',
            type: 'textarea',
            editable: true,
            width: 300,
        },
        {
            field: 'cuisines',
            headerName: 'Cuisines',
            width: 300,
            type: 'select',
            values: cuisines,
            title: (data) => data.name,
            value: (data) => data.id,
            multiple: 5,
            selectedValue: (datas) => {
                const data = [];
                for (let i = 0; i < datas.length; i++) {
                    data.push(datas[i].id);
                }
                return data;
            },
            onChange: (datas) => {
                const data = [];
                for (let i = 0; i < datas.length; i++) {
                    data.push(createRef(`cuisines`, datas[i]));
                }
                return data;
            },
            
        },
        {
            field: 'mealType',
            headerName: 'Meal Type',
            width: 200,
            type: 'select',
            values: [
                {
                    name: 'Vegetarian',
                    value: 'vegetarian',
                },
                {
                    name: 'Eggiterian',
                    value: 'eggiterian',
                },
                {
                    name: 'Non Vegetarian',
                    value: 'non-vegetarian',
                },
            ],
            title: (data) => data.name,
            value: (data) => data.value,
            selectedValue: (data) => {
                return data;
            },
            onChange: (data) => {
                return data;
            },

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
        title: 'Meal',
        document: `meals`,
        submitLabel: 'Add Meal',
        fields: [
            {
                type: 'text',
                name: 'Meal Name',
                required: true,
                key: 'name'
            },
            {
                type: 'file',
                name: 'Meal Image',
                required: false,
                multiple: 10,
                key: 'thumbnails',
                accept: 'image/*',
                uploadPath: 'meals'
            },
            {
                type: 'textarea',
                name: 'Description',
                required: true,
                key: 'description',
            },
            {
                type: 'select',
                multiple: 5,
                name: 'Cuisines',
                required: true,
                key: 'cuisines',
                title: (data) => data.name,
                value: (data) => data.id,
                preprocess: (datas) => {
                    if (datas) {
                        return datas.map(data => createRef(`cuisines`, data))
                    } else {
                        return []
                    }
                },
                options: cuisines
            },
            {
                type: 'select',
                name: 'Meal Type',
                required: true,
                key: 'mealType',
                title: (data) => {return data.name},
                value: (data) => {return data.value},
                preprocess: (datas) => {
                    return datas
                },
                options: [
                    {
                        name: 'Vegetarian',
                        value: 'vegetarian',
                    },
                    {
                        name: 'Eggiterian',
                        value: 'eggiterian',
                    },
                    {
                        name: 'Non Vegetarian',
                        value: 'non-vegetarian',
                    },
                ]
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
            <TablePage title={'Meals'} columns={columns} rows={rows} addDocument={addCuisine} docRoot={`meals`} rowHeight={150} />
        </div>
    )
}
