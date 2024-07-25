import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// Chakra imports
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  VStack,
  Text,
  Heading,
  HStack,
} from '@chakra-ui/react';

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure(); // State for handling drawer visibility
  const [activeDrawer, setActiveDrawer] = useState(null); // State for tracking which drawer is open

  const openDrawer = (drawer) => {
    setActiveDrawer(drawer);
    onOpen();
  };

  return (
    <Box display="flex" height="100vh" bg="gray.50">
      {/* CV Display Area */}
      <Box flex="1" p={4} overflowY="auto">
        <Heading mb={4}>CV Preview</Heading>
        <Text fontSize="lg">
          This is where the CV that is being built will be displayed.
        </Text>
        {/* Additional CV content goes here */}
      </Box>

      {/* Sidebar with Drawers */}
      <Box width="300px" bg="white" shadow="md" p={4}>
        <VStack spacing={4} align="stretch">
          <Button onClick={() => openDrawer('personalInfo')} colorScheme="blue">
            Personal Information
          </Button>
          <Button onClick={() => openDrawer('education')} colorScheme="blue">
            Education Information
          </Button>
          <Button onClick={() => openDrawer('work')} colorScheme="blue">
            Work Information
          </Button>
        </VStack>
      </Box>

      {/* Drawer */}
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            {activeDrawer === 'personalInfo' && 'Personal Information'}
            {activeDrawer === 'education' && 'Education Information'}
            {activeDrawer === 'work' && 'Work Information'}
          </DrawerHeader>

          <DrawerBody>
            {activeDrawer === 'personalInfo' && (
              <Box>
                <Text>Enter your personal details here...</Text>
                {/* Add form fields or other content here */}
              </Box>
            )}
            {activeDrawer === 'education' && (
              <Box>
                <Text>Enter your educational details here...</Text>
                {/* Add form fields or other content here */}
              </Box>
            )}
            {activeDrawer === 'work' && (
              <Box>
                <Text>Enter your work experience here...</Text>
                {/* Add form fields or other content here */}
              </Box>
            )}
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

export default App
