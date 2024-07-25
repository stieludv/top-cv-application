import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// Chakra imports
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  IconButton,
  Stack,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

function App() {
  // State for tracking personal, education, and work information
  const [personalInfo, setPersonalInfo] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+123456789",
  });
  const [educationInfo, setEducationInfo] = useState({
    institution: "XYZ University",
    degree: "Bachelor of Science",
    graduationYear: "2024",
  });
  const [workInfo, setWorkInfo] = useState({
    company: "ABC Corp",
    role: "Software Developer",
    duration: "2022 - Present",
  });

  // Disclosure hooks for modals
  const {
    isOpen: isPersonalInfoOpen,
    onOpen: onPersonalInfoOpen,
    onClose: onPersonalInfoClose,
  } = useDisclosure();
  const {
    isOpen: isEducationInfoOpen,
    onOpen: onEducationInfoOpen,
    onClose: onEducationInfoClose,
  } = useDisclosure();
  const {
    isOpen: isWorkInfoOpen,
    onOpen: onWorkInfoOpen,
    onClose: onWorkInfoClose,
  } = useDisclosure();

  // Handlers for saving information
  const handleSavePersonalInfo = (newInfo) => {
    setPersonalInfo(newInfo);
    onPersonalInfoClose();
  };

  const handleSaveEducationInfo = (newInfo) => {
    setEducationInfo(newInfo);
    onEducationInfoClose();
  };

  const handleSaveWorkInfo = (newInfo) => {
    setWorkInfo(newInfo);
    onWorkInfoClose();
  };

  return (
    <Container maxW="container.md" py={6}>
      {/* Personal Information Section */}
      <Section
        title="Personal Information"
        
        content={
          <>
            <Text>Name: {personalInfo.name}</Text>
            <Text>Email: {personalInfo.email}</Text>
            <Text>Phone: {personalInfo.phone}</Text>
          </>
        }
        onEdit={onPersonalInfoOpen}
      />

      {/* Education Information Section */}
      <Section
        title="Education Information"
        content={
          <>
            <Text>Institution: {educationInfo.institution}</Text>
            <Text>Degree: {educationInfo.degree}</Text>
            <Text>Graduation Year: {educationInfo.graduationYear}</Text>
          </>
        }
        onEdit={onEducationInfoOpen}
      />

      {/* Work Experience Information Section */}
      <Section
        title="Work Experience"
        content={
          <>
            <Text>Company: {workInfo.company}</Text>
            <Text>Role: {workInfo.role}</Text>
            <Text>Duration: {workInfo.duration}</Text>
          </>
        }
        onEdit={onWorkInfoOpen}
      />

      {/* Modals for Editing Information */}
      <EditModal
        title="Edit Personal Information"
        isOpen={isPersonalInfoOpen}
        onClose={onPersonalInfoClose}
        onSave={handleSavePersonalInfo}
        initialData={personalInfo}
        fields={[
          { label: "Name", name: "name", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "Phone", name: "phone", type: "text" },
        ]}
      />

      <EditModal
        title="Edit Education Information"
        isOpen={isEducationInfoOpen}
        onClose={onEducationInfoClose}
        onSave={handleSaveEducationInfo}
        initialData={educationInfo}
        fields={[
          { label: "Institution", name: "institution", type: "text" },
          { label: "Degree", name: "degree", type: "text" },
          { label: "Graduation Year", name: "graduationYear", type: "text" },
        ]}
      />

      <EditModal
        title="Edit Work Information"
        isOpen={isWorkInfoOpen}
        onClose={onWorkInfoClose}
        onSave={handleSaveWorkInfo}
        initialData={workInfo}
        fields={[
          { label: "Company", name: "company", type: "text" },
          { label: "Role", name: "role", type: "text" },
          { label: "Duration", name: "duration", type: "text" },
        ]}
      />
    </Container>
  );
}

// Section component for reusability
const Section = ({ title, content, onEdit }) => (
  <Box
    p={4}
    bg="white"
    shadow="md"
    rounded="md"
    mb={6}
    position="relative"
  >
    <Flex justifyContent="space-between" alignItems="center">
      <Heading size="md" mb={2}>
        {title}
      </Heading>
      <IconButton
        icon={<EditIcon />}
        onClick={onEdit}
        variant="ghost"
        colorScheme="blue"
        aria-label="Edit"
      />
    </Flex>
    {content}
  </Box>
);

// EditModal component for handling form input and modal
const EditModal = ({
  title,
  isOpen,
  onClose,
  onSave,
  initialData,
  fields,
}) => {
  const [formData, setFormData] = useState(initialData);

  // Update form data state on input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          <Stack spacing={4}>
            {fields.map((field) => (
              <FormControl key={field.name}>
                <FormLabel>{field.label}</FormLabel>
                <Input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                />
              </FormControl>
            ))}
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default App
