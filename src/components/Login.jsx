import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Center,
} from '@chakra-ui/react';
import { useUsers } from '../contex/UsersContext';

function Login({setlogedinUser}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { users } = useUsers();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform authentication logic here (e.g., send a request to your API)
    const user = users.filter((user)=>(user.email=== email && user.password=== password))
    if(user.length===1){
      setlogedinUser(user[0])
    }else{
        alert('Fail to login')
    }

    
  };

  return (
    <Center h="100vh">
      <Box w="300px" p={6} boxShadow="md" rounded="md" bg="white">
        <form onSubmit={handleSubmit}>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
            />
          </FormControl>

          <FormControl id="password" mt={4} isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </FormControl>

          <Button
            type="submit"
            colorScheme="teal"
            mt={6}
            isFullWidth
            size="lg"
          >
            Login
          </Button>
        </form>
      </Box>
    </Center>
  );
}

export default Login;
