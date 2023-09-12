import React, { useState } from 'react';
import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  IconButton,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { useUsers } from '../contex/UsersContext';

function DeleteButton({deleteUser}) {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();
  const { users, updateUsers } = useUsers();



  const handleDelete = () => {
    // Perform your delete action here
    // You can call an API, update state, or perform any other action
    // delete user
    updateUsers((prevUsers) => prevUsers.filter((user) => user.id !== deleteUser.id));

    // After deleting, close the confirmation dialog
    setIsOpen(false);
  };

  return (
    <>
    <IconButton colorScheme="red" icon={<DeleteIcon />} onClick={() => setIsOpen(true)} />

  

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Confirmation
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete {deleteUser.name}? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default DeleteButton;
