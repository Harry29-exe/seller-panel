import React, {useState} from 'react';
import {Select, SelectProps} from "@chakra-ui/react";

export interface OptionButtonProps {
    options: [any, string][],
    onChange: (event: any) => any;
}

const OptionButton = (props: OptionButtonProps & SelectProps) => {
    const {options, onChange, ...rest} = props;
    const [value, setValue] = useState(props.options[0][0]);

    return (
        <Select isFullWidth={false} onChange={(event: any) => {
            onChange(event);
            setValue(event.target.value);
        }} value={value} {...rest}>

            {
                options.map(opt =>
                    <option key={opt[0]} value={opt[0]}>{opt[1]}</option>
                )
            }


        </Select>
    );
};

export default OptionButton;