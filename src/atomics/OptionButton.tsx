import React from 'react';
import {Select} from "@chakra-ui/react";

export interface OptionButtonProps {
    options: [any, string][],
    onChange: (event: any) => any;
}

const OptionButton = (props: OptionButtonProps) => {
    return (
        <Select onChange={props.onChange}>
            {
                props.options.map(opt =>
                    <option key={opt[0]} value={opt[0]}>{opt[1]}</option>
                )
            }
        </Select>
    );
};

export default OptionButton;