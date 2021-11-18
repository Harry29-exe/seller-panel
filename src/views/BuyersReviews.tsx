import React, {useContext, useEffect, useState} from 'react';
import BuyerReview from "../molecules/BuyerReview";
import {Box, Center, Divider, useColorModeValue, VStack} from "@chakra-ui/react";
import BuyerReviewsFilter, {opinionsTypes} from "../molecules/BuyerReviewsFilter";
import ComponentBg from "../atomics/ComponentBG";
import backendAddress from "../logic/ServerAddress";
import {AuthContext} from "../contexts/AuthContext";
import {defineMessage, FormattedMessage} from "react-intl";
import SellerPanelWidgetPin from "../molecules/SellerPanelWidgetPin";

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

const message = defineMessage({
    id: "buyersReviews",
    defaultMessage: "Buyers reviews"
});

const BuyersReviews = () => {
    const bgColor = useColorModeValue("gray.100", "gray.800");
    const [opinionsType, setOpinionsType] = useState<string>(opinionsTypes.last5);
    const [opinions, setOpinions] = useState<BuyerOpinionData[]>([]);
    const authContext = useContext(AuthContext);

    useEffect(() => {
        fetch(`${backendAddress}/opinions/${authContext.authHolder.activeUser}`)
            .then(response => response.json())
            .then(opinionsData => setOpinions(opinionsData));
    }, [authContext]);

    const opinionsToDisplay = filterOpinions(opinions, opinionsType);
    return (
        <ComponentBg mx={"auto"} my="4vh" pb={1} pt={[3, 5]}
        >
            <SellerPanelWidgetPin message={message} elementId={"buyersReviews"}/>
            <VStack spacing={3} p={[3, 5]}>
                <Box w={"100%"}>
                    <BuyerReviewsFilter setOpinionsType={setOpinionsType}/>
                    <Divider mt={5} w="100%"/>
                </Box>

                <VStack overflowY="auto" w="100%" h={["65vh", "65vh", "70vh"]} px={[3, 5]} pt={4} pb={1} spacing={10}
                        borderBottom={"1px solid rgba(1, 1, 1, 1)"}>
                    {opinionsToDisplay.length > 0 ?
                        opinionsToDisplay.map((o, i) =>
                            <BuyerReview key={i} name={o.name} rating={o.rating} comment={o.comment}/>
                        )
                        :
                        <Center fontSize="lg" fontWeight={600}>
                            <FormattedMessage id="BuyersOpinions_NoOpinionsMatchingCriteria"
                                              defaultMessage={"Could not find any reviews matching given criteria"}/>
                        </Center>
                    }
                </VStack>

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

export default BuyersReviews;