import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Text, Flex } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../utils/reduxUtils';
import { useEffect, useState } from 'react';

type ISuccessModal = {
	isClicked: boolean;
};

export const SuccessModal = ({ isClicked }: ISuccessModal) => {
	const { success } = useAppSelector(state => state.posts);
	const [successModal, setSuccessModal] = useState(false);
	let [count, setCount] = useState(5);
	const { isOpen, onOpen, onClose } = useDisclosure({ isOpen: isClicked });
	let navigate = useNavigate();
	console.log(success);

	useEffect(() => {
		if (isClicked && success) {
			console.log('success', new Date());
			setSuccessModal(true);
			const timer = setTimeout(() => {
				navigate('/');
			}, 5000);
			if (!count) return;
			setInterval(() => {
				setCount(count => count - 1);
			}, 1000);
			return () => {
				clearTimeout(timer);
				setSuccessModal(false);
			};
		}
	}, [isClicked, success]);

	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Success</ModalHeader>
					<ModalBody>
						Item has been saved successfully.
						<Flex align="baseline">
							You will be redirect in{' '}
							<Text fontSize="xl" mr="4px" ml="4px" color="blue.300">
								{count}
							</Text>{' '}
							sec...
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};
