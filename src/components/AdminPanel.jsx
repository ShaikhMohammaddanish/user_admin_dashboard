import React, { useEffect, useState } from "react";
import { VStack, Stack, Input, Button, IconButton, HStack, FormControl, FormLabel, Select, Table, Thead, Tbody, Tr, Th, Td, TableCaption, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Text } from "@chakra-ui/react";
import {
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useUsers } from '../contex/UsersContext';
import DeleteButton from "./Delete";

function AdminPanel({ logedinUser, setlogedinUser }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    //   const [users, setUsers] = useState([]);
    const { users, updateUsers } = useUsers();
    const [SearchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setfilteredUsers] = useState([])

    const defaultUser = { id: null, name: "", email: "", password: "", role: "Viewer" }
    //   Administrator, Editor, Viewer
    const [formData, setFormData] = useState(defaultUser);
    const [modalAction, setModalAction] = useState("create"); // "create" or "edit"

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidPassword = (password) => password.length >= 8;

    // for delet confirmation
    const [ideleteIsOpen, setideleteIsOpen] = useState(false);
    const cancelRef = React.useRef();


    //create new user
    const handleAddOrUpdateUser = () => {
        if (!formData.name) {
            alert("Please enter a valid name.");
            return;
        }

        if (!isValidEmail(formData.email)) {
            alert("Please enter a valid email.");
            return;
        }

        if (!isValidPassword(formData.password)) {
            alert("Password should be at least 8 characters.");
            return;
        }

        if (modalAction === "edit") {
            updateUsers((prevUsers) => prevUsers.map((user) => (user.id === formData.id ? formData : user)));
        } else {
            if (users.filter((user) => (user.email === formData.email)).length >= 1) {
                alert("Email already exist");
                return;
            }
            updateUsers([...users, { ...formData, id: String(users.length + 1) }]);
        }
        resetForm();
        onClose();
    };

    const openCreateModal = () => {
        resetForm();
        setModalAction("create");
        onOpen();
    };


    const openEditModal = (user) => {
        setFormData(user);
        setModalAction("edit");
        onOpen();
    };

    // delete user
    const handleDeleteUser = (id) => {
        updateUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        if (modalAction === "edit") resetForm();
    };

    // reset form 
    const resetForm = () => {
        setFormData(defaultUser);
    };


    // search base on given keyword
    const serchupdated = (val) => {
        setSearchTerm(val);
        setfilteredUsers(users.filter(entry => {
            return Object.values(entry).some(value => value.includes(val))
        }))
    }

    const isAdmin = logedinUser.role === 'Administrator'

    return (<>
        <HStack spacing={8} direction='row'>
            <Text fontSize='4xl'>Hi, {logedinUser.name}</Text>

        </HStack >

        <VStack spacing={4} p={4}>

            <HStack spacing={8} direction='row'>

                {isAdmin && <Button onClick={openCreateModal}>Create New User</Button>}
                <Button onClick={() => (setlogedinUser(null))} >Logout</Button>
            </HStack>
            <Input value={SearchTerm} onChange={(e) => { serchupdated(e.target.value) }} placeholder="Search a user" />

            <Table variant="simple">
                <TableCaption>User List</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Id</Th>
                        <Th>Name</Th>
                        <Th>Email</Th>
                        <Th>Role</Th>
                        {isAdmin && <Th>Actions</Th>}
                    </Tr>
                </Thead>
                <Tbody>
                    {

                        (SearchTerm === '') ?
                            users.map((user) => (
                                <Tr key={user.id}>
                                    <Td>{user.id}</Td>
                                    <Td>{user.name}</Td>
                                    <Td>{user.email}</Td>
                                    <Td>{user.role}</Td>
                                    {
                                        isAdmin &&
                                        <Td>
                                            <HStack spacing={4}>
                                                <IconButton icon={<EditIcon />} onClick={() => openEditModal(user)} />
                                                {/* <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteUser(user.id)} /> */}
                                                <DeleteButton deleteUser={user}  />
                                            </HStack>
                                        </Td>
                                    }
                                </Tr>
                            )) :

                            filteredUsers.map((user) => (
                                <Tr key={user.id}>
                                    <Td>{user.id}</Td>
                                    <Td>{user.name}</Td>
                                    <Td>{user.email}</Td>
                                    <Td>{user.role}</Td>
                                    {
                                        isAdmin &&
                                        <Td>
                                            <HStack spacing={4}>
                                                <IconButton icon={<EditIcon />} onClick={() => openEditModal(user)} />
                                                <DeleteButton deleteUser={user}  />
                                                {/* <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteUser(user.id)} /> */}
                                            </HStack>
                                        </Td>
                                    }
                                </Tr>
                            ))
                    }

                </Tbody>
            </Table>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{modalAction === "create" ? "Create User" : "Edit User"}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <FormControl>
                                <FormLabel>Name</FormLabel>
                                <Input value={formData.name} onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))} placeholder="Enter name" />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Email</FormLabel>
                                <Input type="email" value={formData.email} onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))} placeholder="Enter email" />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Password</FormLabel>
                                <Input type="password" value={formData.password} onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))} placeholder="Enter password" />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Role</FormLabel>
                                <Select value={formData.role} onChange={(e) => setFormData((prev) => ({ ...prev, role: e.target.value }))}>
                                    <option value="Administrator">Administrator</option>
                                    <option value="Editor">Editor</option>
                                    <option value="Viewer">Viewer</option>
                                </Select>
                            </FormControl>
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleAddOrUpdateUser}>
                            {modalAction === "create" ? "Create" : "Update"}
                        </Button>
                        <Button variant="ghost" onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>



            <AlertDialog
                isOpen={ideleteIsOpen}
                leastDestructiveRef={cancelRef}
                onClose={()=>setideleteIsOpen(false)}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete Confirmation
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure you want to delete this item? This action cannot be undone.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme="red" onClick={()=>console.log('delel')} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>



        </VStack>

    </>

    );
}

export default AdminPanel;
