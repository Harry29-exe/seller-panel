import ComponentBg from "../atomics/ComponentBG";
import {Button, FormControl, FormLabel, Input, VStack} from "@chakra-ui/react";
import React, {useState} from "react";
import SellerPanelNavbar from "../molecules/SellerPanelNavbar";

export const AdvancedForm = () => {
    const [name, setName] = useState<string>('');
    const [surname, setSurname] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const submit = () => {
        console.log('submit')
        setName('');
        setSurname('');
        setPhone('');
        setEmail('');
    }

    return <VStack spacing={16} mt={18} mb={12}>
        <ComponentBg >
            <VStack spacing={3} p={[1, 3, 5]}>
                <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input type='text' value={name} onChange={name => setName(name.target.value)}/>
                </FormControl>
                <FormControl>
                    <FormLabel>Surname</FormLabel>
                    <Input type='text' value={surname} onChange={surname => setSurname(surname.target.value)}/>
                </FormControl>
                <FormControl>
                    <FormLabel>Phone</FormLabel>
                    <Input type='phone' value={phone} onChange={phone => setPhone(phone.target.value)}/>
                </FormControl>
                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input type='email' value={email} onChange={email => setEmail(email.target.value)}/>
                </FormControl>

                <Button onClick={() => submit()}>Submit</Button>
            </VStack>
        </ComponentBg>
    </VStack>
}