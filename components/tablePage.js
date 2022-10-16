import React from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import moment from 'moment';
import DataGridTable from './dataGridTable';
import AddDocumentModal from './addDocumentModal';
import { updateDocument } from '../config/firebase';
import ImageViewer from './imageViewer';
import { useNotification } from '../contexts/notificationContext';
import MultipleSelectBox from './multiSelectBox';
import SingalSelectDropdown from './singleSelectDropdown';
import { TextareaAutosize } from '@mui/material';

export default function TablePage({ title, columns, rows, addDocument, docRoot, rowHeight }) {
    const [pageSize, setPageSize] = React.useState(20);
    const [rowsPerPageOptions, setRowsPerPageOptions] = React.useState(20);

    const { setNotification } = useNotification();

    for (let i = 0; i < columns.length; i++) { 
        if (columns[i].type === 'date') {
            columns[i].valueFormatter = function (params) {
                return moment(params.value).fromNow();
            }
            columns[i].valueGetter = function (params) {
                if (params.value) return params.value.toDate();
                return moment(new Date()).fromNow();
            }
        } else if (columns[i].type === 'image') {
            columns[i].renderCell = (params) => {
                return (
                    <div className='w-full h-full'>
                        {params.row[columns[i].field] ? 
                            <>
                                {Array.isArray(params.value) ?
                                    <>
                                        {params.row[columns[i].field].map((thumbnail, index) => {
                                            return (
                                                <ImageViewer src={thumbnail} alt='' className='h-full w-auto' key={index} height={1000} width={1000} />
                                            )
                                        })}
                                    </>
                                    : <>
                                        <ImageViewer src={params.row[columns[i].field]} alt='' className='h-full w-auto' height={1000} width={1000} />
                                    </>
                                }
                            </>
                            : <></>
                        }
                    </div>
                )
            }
            delete columns[i].type;
        } else if (columns[i].type === 'select' && columns[i].multiple) {
            delete columns[i].type
            columns[i].renderCell = (params) => {
                return (
                    <>
                        <MultipleSelectBox dataArray={columns[i].values} label={columns[i].headerName} titleFn={columns[i].title} valueFn={columns[i].value} onChange={(data) => {
                            const values = columns[i].onChange(data);
                            const updateddata = { ...params, value: values}
                            handleChange(updateddata)
                        }} selectedValues={columns[i].selectedValue(params.value)} multiple={columns[i].multiple ? columns[i].multiple : null} />
                    </>
                )
            }
        } else if (columns[i].type === 'select' && !columns[i].multiple) {
            delete columns[i].type
            columns[i].renderCell = (params) => {
                return (
                    <Box
                        sx={{
                            marginTop: 2,
                            marginBottom: 2,
                            width: '100%',
                        }}
                    >
                        <SingalSelectDropdown dataArray={columns[i].values} label={columns[i].headerName} titleFn={columns[i].title} valueFn={columns[i].value} onChange={(data) => {
                            const values = columns[i].onChange(data);
                            console.log(values);
                            const updateddata = { ...params, value: values }
                            handleChange(updateddata)
                        }} selectedValue={params.value} />
                    </Box>
                )
            }
        }
        // else if (columns[i].type === 'd') {
        //     delete columns[i].type
        //     columns[i].renderCell = (params) => {
        //         return (
        //             <Box key={index} sx={{
        //                 width: '100%',
        //                 marginBottom: '10px',
        //             }}>
        //                 <TextareaAutosize
        //                     placeholder={columns[i]}
        //                     onChange={(event) => {
        //                         let set = true;
        //                         if (field.regex) {
        //                             if (!field.regex.test(event.target.value)) set = false;
        //                         }
        //                         if (set) {
        //                             const currentForm = { ...form }
        //                             currentForm[field.key] = event.target.value
        //                             setForm(currentForm);
        //                         }
        //                     }}
        //                     value={form[field.key] || ''}
        //                     minRows={3}
        //                     style={{ width: '100%' }}
        //                 />
        //             </Box>
        //         )
        //     }
        // }
        
    }

    const handleChange = async (params, event) => {
        const data = {};
        data[params.field] = params.value;
        const result = await updateDocument(docRoot, data, params.id);
        if (result) {
            setNotification({
                type: 'success',
                message: `${title} updated successfully`
            })
        } else {
            setNotification({
                type: 'error',
                message: `Something went wrong while updating ${title}`
            })
        }
    }

    const handleDelete = (params, event) => {
        console.log(docRoot);
        console.log(params);
        console.log(event);
        console.log('event');
    }
    const checkboxSelection = (selectedData) => {
        console.log(selectedData);
    }


    return (
        <>
            <Box sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <Box sx={{
                    width: '50%',
            }}>
                    <Typography variant="h1" component="h2">
                        {title}
                    </Typography>
                </Box>
                {addDocument && Object.keys(addDocument).length
                    ?
                        <Box>
                            <AddDocumentModal title={addDocument.title} document={addDocument.document} fields={addDocument.fields} submitLabel={addDocument.submitLabel} />
                        </Box>
                    :
                        <></>
                }
            </Box>
            <Box sx={{ p: 2 }}>
                <DataGridTable
                    rowHeight={rowHeight}
                    columns={columns}
                    rows={rows}
                    getRowId ={(row) => row.id}
                    pageSize={pageSize}
                    rowsPerPageOptions={rowsPerPageOptions}
                    handleChange={handleChange}
                    handleDelete={handleDelete}
                    checkboxSelection={checkboxSelection}
                />
            </Box>
        </>
    )
}