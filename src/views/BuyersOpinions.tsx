import React, {useState} from 'react';
import BuyerOpinion from "../molecules/BuyerOpinion";
import {Box, Divider, useColorModeValue, VStack} from "@chakra-ui/react";
import BuyerOpinionsFilter, {opinionsTypes} from "../molecules/BuyerOpinionsFilter";
import ComponentBg from "../atomics/ComponentBG";

const BuyersOpinions = () => {
    const bgColor = useColorModeValue("gray.100", "gray.900");
    const [opinionsType, setOpinionsType] = useState<string>(opinionsTypes.last5);


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

                <BuyerOpinion rating={3} comment={longComment} name={"Alex"}/>
                <BuyerOpinion rating={4} comment={shortComment} name={"Bob"}/>
                <BuyerOpinion rating={2}/>
                <BuyerOpinion rating={5} name={"Alice"}/>

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