import { useState } from "react";
import axios from "axios";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Heading,
  Text,
  Center,
  useDisclosure,
  VStack,
  Select,
  SimpleGrid,
  Box,
  assignRef
} from '@chakra-ui/react';

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    offense: '',
    dateOfOccurrence: '',
    legalStatus: ''
  });
  const [records, setRecords] = useState<any>({});
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    if (!Object.values(formData).every(value => value.trim())) {
      alert("Please fill all fields");
      return
    }
    try {
      const res = await axios.post('http://localhost:3000/api/criminal-record', formData);
      setRecords(res.data);
      setFormData({
        name: '',
        dateOfBirth: '',
        offense: '',
        dateOfOccurrence: '',
        legalStatus: ''
      })
    } catch (error) {
      alert("Error " + error);
    }
    onClose();
  };
  return (
    <>
      <Center>
        <VStack>
          <Heading as="h1" size="xl">CrimAlgo - Criminal Records DAPP</Heading>
          <Text>Description: This DAPP allows you to manage  criminal records on the Algorand blockchain.</Text>
          <Button colorScheme="teal" onClick={onOpen}>Add Criminal Record</Button>
          {
            records.name && (
              <Box
                borderWidth="1px"
                borderRadius="lg"
                p={8}
                boxShadow="md"
                bg="white"

                m={4}
              >
                <ListCard title="Name" value={records.name} />
                <ListCard title="Date of Birth" value={records.dateOfBirth} />
                <ListCard title="Date of Occurrence" value={records.dateOfOccurrence} />
                <ListCard title="Legal Status" value={records.legalStatus} />
                <ListCard title="Offense" value={records.offense} />
                <hr />
                <ListCard title="Balance" value={records.balance} />
                <ListCard title="Transaction" value={records.transaction} />

              </Box>
            )
          }

        </VStack>
      </Center>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Criminal Record</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input type="text" name="name" value={formData.name} onChange={handleInputChange} />
              </FormControl>
              <SimpleGrid columns={2} spacing={6} width="100%">
                <FormControl>
                  <FormLabel>Date of Birth</FormLabel>
                  <Input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} />
                </FormControl>
                <FormControl>
                  <FormLabel>Date of Occurrence</FormLabel>
                  <Input type="date" name="dateOfOccurrence" value={formData.dateOfOccurrence} onChange={handleInputChange} />
                </FormControl>
              </SimpleGrid>
              <FormControl>
                <FormLabel>Legal Status</FormLabel>
                <Select name="legalStatus" value={formData.legalStatus} onChange={handleInputChange} placeholder="Select">
                  <option value="under investigation">Under Investigation</option>
                  <option value="awaiting trial">Awaiting Trial</option>
                  <option value="convicted">Convicted</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Offense / Description</FormLabel>
                <Textarea rows={3} name="offense" value={formData.offense} onChange={handleInputChange} />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Cancel</Button>
            <Button colorScheme="teal" ml={3} onClick={handleSubmit}>Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>

  );
}

const ListCard = (props: any) => {
  return (
    <VStack spacing={1} align="flex-start" justifyContent={"flex-start"} my={2}>
      <Text as={"b"}>{props.title}</Text>
      <Text>{props.value}</Text>
    </VStack>
  );
};
export default App;
