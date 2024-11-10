import React, { useState } from 'react';
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdb-react-ui-kit';

export const ComboBoxGeneric = ({ label, options, onSelect }) => {
    const [selectedOption, setSelectedOption] = useState(label);

    const handleSelect = (value, label) => {
        setSelectedOption(label);
        onSelect(value);
    };

    return (
        <MDBDropdown className='p-4'>
            <MDBDropdownToggle color="primary">
                {selectedOption}
            </MDBDropdownToggle>
            <MDBDropdownMenu>
                {options.map((option) => (
                    <MDBDropdownItem 
                        key={option.value} 
                        link 
                        onClick={() => handleSelect(option.value, option.label)}
                    >
                        {option.label}
                    </MDBDropdownItem>
                ))}
            </MDBDropdownMenu>
        </MDBDropdown>
    );
};