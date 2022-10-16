import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SingalSelectDropdown({ dataArray, selectedValue, label, titleFn, valueFn, onChange }) {
    const [value, setValue] = React.useState(selectedValue ? selectedValue : '');

    const handleChange = (event) => {
        setValue(event.target.value);
        onChange(event.target.value);
    };

    return (
        <Box
            sx={{ width: '100%' }}
        >
            <FormControl sx={{ width: '100%' }}>
                <InputLabel>{label}</InputLabel>
                <Select
                    value={value}
                    onChange={handleChange}
                    label={label}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {dataArray.map((data, index) => <MenuItem key={index} value={valueFn(data)}>{titleFn(data)}</MenuItem>)}
                </Select>
            </FormControl>
        </Box>
    );
}
