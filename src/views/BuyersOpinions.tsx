import React from 'react';
import Rating from "../atomics/Rating";
import BuyerOpinion from "../molecules/BuyerOpinion";
import {VStack} from "@chakra-ui/react";

const BuyersOpinions = () => {
    return (
        <VStack w="40vw" ml="30vw" mt="40px" spacing={10}>
            <BuyerOpinion/>
            <BuyerOpinion/>
            <BuyerOpinion/>
            <BuyerOpinion/>

            <br/><br/><br/>
            <Rating rating={4}/>
            <Rating rating={5}/>
            <Rating rating={2}/>
        </VStack>
    );
};

export default BuyersOpinions;