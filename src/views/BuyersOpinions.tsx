import React, {useContext, useEffect, useState} from 'react';
import BuyerOpinion from "../molecules/BuyerOpinion";
import {Box, Divider, useColorModeValue, VStack} from "@chakra-ui/react";
import BuyerOpinionsFilter, {opinionsTypes} from "../molecules/BuyerOpinionsFilter";
import ComponentBg from "../atomics/ComponentBG";
import backendAddress from "../logic/ServerAddress";
import {AuthContext} from "../contexts/AuthContext";

interface BuyerOpinionData {
    name?: string,
    rating: number,
    comment?: string
}

function filterOpinions(opinions: BuyerOpinionData[], opinionType: string): BuyerOpinionData[] {
    switch (opinionType) {
        case opinionsTypes.last5:
            return opinions.slice(0, 5);
        case opinionsTypes.positive:
            return opinions.filter(o => o.rating > 3);
        case opinionsTypes.negative:
            return opinions.filter(o => o.rating < 3);
        default:
            return opinions;
    }
}

const BuyersOpinions = () => {
    const bgColor = useColorModeValue("gray.100", "gray.900");
    const [opinionsType, setOpinionsType] = useState<string>(opinionsTypes.last5);
    const [opinions, setOpinions] = useState<BuyerOpinionData[]>([]);
    const authContext = useContext(AuthContext);

    useEffect(() => {
        fetch(`${backendAddress}/opinions/${authContext.authHolder.activeUser}`)
            .then(response => response.json())
            .then(opinionsData => setOpinions(opinionsData));
    }, [authContext]);

    return (
        <ComponentBg w={["90%", "90%", "700px", "850px", "950px"]}
                     maxH="calc(92vh - 70px)"
                     mx={"auto"} mt="4vh" mb="4vh" p={[5, 7, 10]}
                     bg={bgColor} overflowY="auto"
        >
            <VStack spacing={10}>
                <Box w={"100%"}>
                    <BuyerOpinionsFilter setOpinionsType={setOpinionsType}/>
                    <Divider mt={5} w="100%"/>
                </Box>

                {
                    filterOpinions(opinions, opinionsType).map((o, i) =>
                        <BuyerOpinion key={i} name={o.name} rating={o.rating} comment={o.comment}/>
                    )
                }

            </VStack>
        </ComponentBg>
    );
};


const longComment = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
    "In sed est viverra, bibendum risus eget, eleifend enim. Donec in magna vel" +
    " lorem ultricies efficitur. Vivamus imperdiet quam eu nisi tincidunt, congue pharetra " +
    "turpis malesuada. Etiam felis tortor, faucibus non lacinia tristique, auctor vitae ex." +
    " In ultrices massa et arcu commodo, et vehicula ex ullamcorper. Maecenas ut interdum" +
    " leo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos " +
    "himenaeos. Aenean vitae quam elementum, efficitur nunc eu, tincidunt sem.\n" +
    "\n" +
    "Suspendisse neque justo, dignissim vel sagittis non, rhoncus a leo. Aenean" +
    " eu porttitor sem. Nam porta, ipsum vitae lobortis finibus, magna lacus ultrices" +
    " est, in sodales est neque quis erat. Vestibulum at dictum ipsum. In ac sem quis leo vestibulum tincidunt. In vehicula metus id lectus volutpat varius. Aliquam imperdiet id velit eget commodo. Sed ac odio massa. Duis libero ante, elementum a pulvinar id, cursus at nunc. Mauris auctor tempus lectus, rutrum tincidunt sem molestie ut."
    + "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed est viverra," +
    " bibendum risus eget, eleifend enim. Donec in magna vel lorem ultricies efficitur." +
    "Vivamus imperdiet quam eu nisi tincidunt, congue pharetra turpis malesuada. Etiam " +
    "felis tortor, faucibus non lacinia tristique, auctor vitae ex. In ultrices massa et" +
    " arcu commodo, et vehicula ex ullamcorper. Maecenas ut interdum leo. Class aptent " +
    "taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. " +
    "Aenean vitae quam elementum, efficitur nunc eu, tincidunt sem.\n" +
    "\n" +
    "Suspendisse neque justo, dignissim vel sagittis non, rhoncus a leo. Aenean eu" +
    " porttitor sem. Nam porta, ipsum vitae lobortis finibus, magna lacus ultrices est, " +
    "in sodales est neque quis erat. Vestibulum at dictum ipsum. In ac sem quis leo " +
    "vestibulum tincidunt. In vehicula metus id lectus volutpat varius. Aliquam imperdiet " +
    "id velit eget commodo. Sed ac odio massa. Duis libero ante, elementum a pulvinar" +
    " id, cursus at nunc. Mauris auctor tempus lectus, rutrum tincidunt sem molestie ut."

const shortComment = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed " +
    "est viverra, bibendum risus eget"

export default BuyersOpinions;