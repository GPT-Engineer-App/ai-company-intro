import React, { useState, useEffect } from "react";
import { Box, Heading, Text, Button, Flex, Image, useToast, Input, FormControl, FormLabel, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@chakra-ui/react";
import { FaRobot, FaBrain, FaSignInAlt } from "react-icons/fa";

const SERVER_URL = "https://backengine-9ax0.fly.dev";

const Index = () => {
  const [introduction, setIntroduction] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetchIntroduction();
  }, []);

  const fetchIntroduction = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/introduction`);
      const data = await response.text();
      setIntroduction(data);
    } catch (error) {
      console.error("Error fetching introduction:", error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("accessToken", data.accessToken);
        setIsLoggedIn(true);
        onClose();
        toast({
          title: "Login Successful",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        const errorData = await response.json();
        toast({
          title: "Login Failed",
          description: errorData.error,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <Box p={8}>
      <Flex justify="space-between" align="center" mb={8}>
        <Heading as="h1" size="xl">
          AI Company
        </Heading>
        {isLoggedIn ? (
          <Text>Welcome!</Text>
        ) : (
          <Button leftIcon={<FaSignInAlt />} onClick={onOpen}>
            Login
          </Button>
        )}
      </Flex>

      <Box mb={8}>
        <Image src="https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxBSSUyMHRlY2hub2xvZ3l8ZW58MHx8fHwxNzEwNzQyMDMxfDA&ixlib=rb-4.0.3&q=80&w=1080" alt="AI" mb={4} />
        <Heading as="h2" size="lg" mb={4}>
          About Us
        </Heading>
        <Text>{introduction}</Text>
      </Box>

      <Flex justify="center" wrap="wrap">
        <Box p={4} m={4} maxW="sm" borderWidth={1} borderRadius="lg">
          <FaRobot size={48} />
          <Heading as="h3" size="md" mt={4} mb={2}>
            AI Solutions
          </Heading>
          <Text>We provide cutting-edge AI solutions for businesses across various industries.</Text>
        </Box>
        <Box p={4} m={4} maxW="sm" borderWidth={1} borderRadius="lg">
          <FaBrain size={48} />
          <Heading as="h3" size="md" mt={4} mb={2}>
            Research & Development
          </Heading>
          <Text>Our team of experts conducts extensive research to advance AI technologies.</Text>
        </Box>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Email</FormLabel>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Password</FormLabel>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleLogin}>
              Login
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Index;
