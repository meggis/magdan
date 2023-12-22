import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

type IModel = {
	content: string;
	header: string;
	isReturn: boolean;
	onClick?: Function;
};

export const ConfirmModal = ({ content, header, isReturn, onClick }: IModel) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	let navigate = useNavigate();

	const handleModalOperationOnClick = () => {
		if (isReturn) navigate('/');
		if (onClick) onClick(), onClose();
	};

	return (
		<>
			<Button onClick={onOpen} variant="outline">
				{isReturn ? 'Cancel' : 'Delete'}
			</Button>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{header}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>{content}</ModalBody>

					<ModalFooter>
						<Button colorScheme="blue" mr={3} onClick={handleModalOperationOnClick}>
							{isReturn ? 'Go back' : 'Yes, delete it'}
						</Button>
						<Button variant="ghost" onClick={onClose}>
							{isReturn ? 'Stay' : 'No, keep it!'}
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
