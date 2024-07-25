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
  Image,
} from "@chakra-ui/react";
import { EditIcon, AddIcon, DeleteIcon } from "@chakra-ui/icons";

function App() {
  // State for the CV information
  const [profile, setProfile] = useState({
    name: "John Doe",
    title: "Software Engineer",
    email: "john.doe@example.com",
    phone: "+123456789",
    photo:
      "https://via.placeholder.com/150",
  });

  const [education, setEducation] = useState([
    {
      institution: "XYZ University",
      degree: "Bachelor of Science",
      graduationYear: "2024",
    },
  ]);

  const [workExperience, setWorkExperience] = useState([
    {
      company: "ABC Corp",
      role: "Software Developer",
      duration: "2022 - Present",
    },
  ]);

  // Disclosure hooks for modals
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeSection, setActiveSection] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [formData, setFormData] = useState({});

  // Function to handle opening the modal for editing
  const handleEditClick = (section, index = null) => {
    setActiveSection(section);
    setActiveIndex(index);
    if (section === "profile") {
      setFormData(profile);
    } else if (section === "education") {
      setFormData(index !== null ? education[index] : {});
    } else if (section === "workExperience") {
      setFormData(index !== null ? workExperience[index] : {});
    }
    onOpen();
  };

  // Function to handle saving the form data
  const handleSave = () => {
    if (activeSection === "profile") {
      setProfile(formData);
    } else if (activeSection === "education") {
      if (activeIndex !== null) {
        setEducation((prev) =>
          prev.map((edu, i) => (i === activeIndex ? formData : edu))
        );
      } else {
        setEducation((prev) => [...prev, formData]);
      }
    } else if (activeSection === "workExperience") {
      if (activeIndex !== null) {
        setWorkExperience((prev) =>
          prev.map((work, i) => (i === activeIndex ? formData : work))
        );
      } else {
        setWorkExperience((prev) => [...prev, formData]);
      }
    }
    onClose();
  };

  // Function to handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Functions to add and remove sections
  const addSection = (section) => {
    handleEditClick(section);
  };

  const removeSection = (section, index) => {
    if (section === "education") {
      setEducation((prev) => prev.filter((_, i) => i !== index));
    } else if (section === "workExperience") {
      setWorkExperience((prev) => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <Container maxW="container.md" py={6}>
      {/* Profile Section */}
      <Section title="Profile">
        <Image
          src={profile.photo}
          alt="Profile"
          boxSize="150px"
          objectFit="cover"
          mb={4}
          onClick={() => handleEditClick("profile")}
          cursor="pointer"
        />
        <EditableField
          label="Name"
          value={profile.name}
          onEdit={() => handleEditClick("profile")}
        />
        <EditableField
          label="Title"
          value={profile.title}
          onEdit={() => handleEditClick("profile")}
        />
        <EditableField
          label="Email"
          value={profile.email}
          onEdit={() => handleEditClick("profile")}
        />
        <EditableField
          label="Phone"
          value={profile.phone}
          onEdit={() => handleEditClick("profile")}
        />
      </Section>

      {/* Education Section */}
      <Section title="Education">
        {education.map((edu, index) => (
          <Box key={index} mb={4} position="relative">
            <EditableField
              label="Institution"
              value={edu.institution}
              onEdit={() => handleEditClick("education", index)}
            />
            <EditableField
              label="Degree"
              value={edu.degree}
              onEdit={() => handleEditClick("education", index)}
            />
            <EditableField
              label="Graduation Year"
              value={edu.graduationYear}
              onEdit={() => handleEditClick("education", index)}
            />
            <IconButton
              icon={<DeleteIcon />}
              position="absolute"
              top="4px"
              right="4px"
              size="sm"
              variant="ghost"
              colorScheme="red"
              aria-label="Delete"
              onClick={() => removeSection("education", index)}
            />
          </Box>
        ))}
        <Button
          leftIcon={<AddIcon />}
          colorScheme="blue"
          variant="outline"
          onClick={() => addSection("education")}
        >
          Add Education
        </Button>
      </Section>

      {/* Work Experience Section */}
      <Section title="Work Experience">
        {workExperience.map((work, index) => (
          <Box key={index} mb={4} position="relative">
            <EditableField
              label="Company"
              value={work.company}
              onEdit={() => handleEditClick("workExperience", index)}
            />
            <EditableField
              label="Role"
              value={work.role}
              onEdit={() => handleEditClick("workExperience", index)}
            />
            <EditableField
              label="Duration"
              value={work.duration}
              onEdit={() => handleEditClick("workExperience", index)}
            />
            <IconButton
              icon={<DeleteIcon />}
              position="absolute"
              top="4px"
              right="4px"
              size="sm"
              variant="ghost"
              colorScheme="red"
              aria-label="Delete"
              onClick={() => removeSection("workExperience", index)}
            />
          </Box>
        ))}
        <Button
          leftIcon={<AddIcon />}
          colorScheme="blue"
          variant="outline"
          onClick={() => addSection("workExperience")}
        >
          Add Work Experience
        </Button>
      </Section>

      {/* Edit Modal */}
      <EditModal
        title={`Edit ${activeSection ? activeSection.replace(/([A-Z])/g, ' $1') : ''}`}
        isOpen={isOpen}
        onClose={onClose}
        onSave={handleSave}
        formData={formData}
        onChange={handleInputChange}
        section={activeSection}
      />
    </Container>
  );
}

// Section component for reusability
const Section = ({ title, children }) => (
  <Box p={4} bg="white" shadow="md" rounded="md" mb={6}>
    <Heading size="md" mb={4}>
      {title}
    </Heading>
    {children}
  </Box>
);

// EditableField component for inline editing
const EditableField = ({ label, value, onEdit }) => (
  <Flex alignItems="center" mb={2}>
    <Text fontWeight="bold" mr={2}>
      {label}:
    </Text>
    <Text flex="1">{value}</Text>
    <IconButton
      icon={<EditIcon />}
      onClick={onEdit}
      variant="ghost"
      colorScheme="blue"
      size="sm"
      aria-label="Edit"
    />
  </Flex>
);
// EditModal component for handling form input and modal
const EditModal = ({
  title,
  isOpen,
  onClose,
  onSave,
  formData,
  onChange,
  section,
}) => {
  const fields =
    section === "profile"
      ? [
          { label: "Name", name: "name", type: "text" },
          { label: "Title", name: "title", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "Phone", name: "phone", type: "text" },
          { label: "Photo URL", name: "photo", type: "text" },
        ]
      : section === "education"
      ? [
          { label: "Institution", name: "institution", type: "text" },
          { label: "Degree", name: "degree", type: "text" },
          { label: "Graduation Year", name: "graduationYear", type: "text" },
        ]
      : section === "workExperience"
      ? [
          { label: "Company", name: "company", type: "text" },
          { label: "Role", name: "role", type: "text" },
          { label: "Duration", name: "duration", type: "text" },
        ]
      : [];

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
                  onChange={onChange}
                />
              </FormControl>
            ))}
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={onSave}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
          



            
export default App
