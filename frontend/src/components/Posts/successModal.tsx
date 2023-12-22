import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, Text, Flex } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../utils/reduxUtils';
import { useEffect, useState } from 'react';

interface SuccessModal {
	isSubmitted: boolean;
}

export const SuccessModal = ({ isSubmitted }: SuccessModal) => {
	const { success } = useAppSelector(state => state.posts);
	const [count, setCount] = useState(5);
	const { isOpen, onClose } = useDisclosure({ isOpen: success });
	const navigate = useNavigate();

	useEffect(() => {
		if (isSubmitted && success) {
			const timer = setTimeout(() => {
				navigate('/');
			}, 5000);
			if (!count) {
				return;
			}
			setInterval(() => {
				setCount(prevCount => prevCount - 1);
			}, 1000);
			return () => {
				clearTimeout(timer);
			};
		}
	}, [isSubmitted, success]);

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
