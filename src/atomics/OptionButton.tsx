import React, {useState} from 'react';
import {Select} from "@chakra-ui/react";

export interface OptionButtonProps {
    options: [any, string][],
    onChange: (event: any) => any;
}

const OptionButton = (props: OptionButtonProps) => {
    const [value, setValue] = useState(props.options[0][0]);

    return (
        <Select onChange={(event: any) => {
            props.onChange(event);
            setValue(event.target.value);
        }} value={value}>

            {
                props.options.map(opt =>
                    <option key={opt[0]} value={opt[0]}>{opt[1]}</option>
                )
            }

        </Select>
    );
};

export default OptionButton;