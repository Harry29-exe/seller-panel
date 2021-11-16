import React, {PropsWithChildren} from 'react';
import {Select} from "@chakra-ui/react";

export type OptionButtonProps = PropsWithChildren<{
    onChange: (event: any) => any;
}>

const OptionButton = (props: OptionButtonProps) => {
    // const [value, setValue] = useState(props.options[0][0]);

    return (
        <Select onChange={(event: any) => {
            props.onChange(event);
        }}
            // setValue(event.target.value);
            // }} value={value}
        >

            {
                props.children
            }

        </Select>
    );
};

export default OptionButton;