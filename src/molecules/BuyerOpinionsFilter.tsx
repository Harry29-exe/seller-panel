import React from 'react';
import {Box, Stack} from "@chakra-ui/react";
import OptionButton from "../atomics/OptionButton";
import {defineMessages, FormattedMessage, useIntl} from "react-intl";

export const buyerOpinionsMessages = defineMessages({
    last5: {
        id: "BuyerOpinions_last5",
        defaultMessage: "Last five message"
    },
    positive: {
        id: "BuyerOpinions_positive",
        defaultMessage: "All positive"
    },
    negative: {
        id: "BuyerOpinions_negative",
        defaultMessage: "All negative"
    },
    all: {
        id: "BuyerOpinions_all",
        defaultMessage: "All"
    }
});

export const opinionsTypes = {
    positive: "POSITIVE",
    negative: "NEGATIVE",
    all: "ALL",
    last5: "LAST5"
}

const BuyerOpinionsFilter = (props: { setOpinionsType: (v: string) => any }) => {
    const intl = useIntl();

    return (

        <Stack w="100%" spacing={[3, 4, 5]} direction={["column", null, "row"]}
               justifyContent="space-between">
            <Box fontSize="xl" fontWeight={600} alignSelf="center" textAlign={["center", null, "start"]}>

                <FormattedMessage id={"BuyerOpinions_opinionsToDisplay"}
                                  defaultMessage="Select what opinions you want to be displayed:"/>
            </Box>
            <Box alignSelf="center">
                <OptionButton options={[
                    [opinionsTypes.last5, intl.formatMessage(buyerOpinionsMessages.last5)],
                    [opinionsTypes.all, intl.formatMessage(buyerOpinionsMessages.all)],
                    [opinionsTypes.positive, intl.formatMessage(buyerOpinionsMessages.positive)],
                    [opinionsTypes.negative, intl.formatMessage(buyerOpinionsMessages.negative)],
                ]} onChange={event => props.setOpinionsType(event.target.value)}/>
            </Box>
        </Stack>
    );
};

export default BuyerOpinionsFilter;