import * as React from 'react';
import { useEffect, useState, Suspense } from 'react';
import { getPostData, updatePostData, createPostData } from '../../features/posts/actions';
import { useAppDispatch, useAppSelector } from '../../utils/reduxUtils';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast, Textarea, Text, Divider, Box, Flex, ButtonGroup, Button, Spinner, Highlight } from '@chakra-ui/react';
import { ErrorMessage } from '@hookform/error-message';
import { WarningIcon } from '@chakra-ui/icons';
import { newCreatedDdate } from '../../utils/helperFunctions';
import { ConfirmModal } from './confirmModal';
import { useForm } from 'react-hook-form';
import { useAsyncDebounce } from 'react-table';

interface FormInputs {
	post_content: string;
	post_name: string;
	post_header: string;
}

const SinglePost = () => {
	const { post, loadingPost } = useAppSelector(state => state.posts);
	const { display_name, header, content, updated_at } = post;
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { id } = useParams();
	const {
		register,
		reset,
		handleSubmit,
		setValue,
		formState: { errors, isDirty, isSubmitted },
	} = useForm<FormInputs>({
		criteriaMode: 'all',
		mode: 'onChange',
	});
	const ref = React.useRef<HTMLFormElement>(null);
	const toast = useToast();
	const onSubmit = useAsyncDebounce(({ post_content, post_name, post_header }: FormInputs) => {
		if (!id) {
			dispatch(createPostData({ post_content, post_name, post_header, reset, navigate, toast }));
		} else {
			dispatch(updatePostData({ post_content, post_name, post_header, post_id: id, reset, navigate, toast }));
		}
	}, 150);

	useEffect(() => {
		if (id) {
			dispatch(getPostData({ post_id: id }));
			reset();
		} else {
			setValue('post_name', '');
			setValue('post_header', '');
			setValue('post_content', '');
		}
	}, [id]);

	return (
		<form onSubmit={handleSubmit(onSubmit)} style={{ height: '100%' }} ref={ref}>
			<Flex justifyContent="center">
				<Text backgroundColor="blue.300" bgClip="text" fontSize="3xl" fontWeight="extrabold" mt="30px" mb="30px">
					{id ? 'Editing post' : 'Create new post'}
				</Text>
			</Flex>
			{!loadingPost ? (
				<Box>
					<Text mb="10px" mt="30px" fontSize="lg">
						Post Name
					</Text>
					<Textarea
						defaultValue={display_name}
						id="post_name"
						{...register('post_name', {
							required: 'This field is required',
						})}
						placeholder="Here is a sample placeholder"
						size="sm"
					/>
					{isSubmitted ? (
						<ErrorMessage
							errors={errors}
							name="post_name"
							render={({ message }) => (
								<Text color="red" mt="8px" ml="10px" fontSize="sm">
									<WarningIcon w={5} h={5} color="red.500" mr="10px" />
									{message}
								</Text>
							)}
						/>
					) : null}
					<Text mb="10px" mt="30px" fontSize="lg">
						Post Header
					</Text>
					<Textarea
						defaultValue={header}
						id={'post_header'}
						{...register('post_header', {
							required: 'This field is required',
						})}
						placeholder="Here is a sample placeholder"
						size="sm"
					/>
					{isSubmitted ? (
						<ErrorMessage
							errors={errors}
							name="post_header"
							render={({ message }) => (
								<Text color="red" mt="8px" ml="10px" fontSize="sm">
									<WarningIcon w={5} h={5} color="red.500" mr="10px" />
									{message}
								</Text>
							)}
						/>
					) : null}
					<Text mb="10px" mt="30px" fontSize="lg">
						Post Content
					</Text>
					<Textarea
						defaultValue={content}
						id={'post_content'}
						{...register('post_content', {
							required: 'This field is required',
						})}
						placeholder="Here is a sample placeholder"
						size="sm"
					/>
					{isSubmitted ? (
						<ErrorMessage
							errors={errors}
							name="post_content"
							render={({ message }) => (
								<Text color="red" mt="8px" ml="10px" fontSize="sm">
									<WarningIcon w={5} h={5} color="red.500" mr="10px" />
									{message}
								</Text>
							)}
						/>
					) : null}
					{id ? (
						<>
							<Divider mb="10" mt="10" colorScheme="blue.300" />
							<Box display="flex" alignItems="center" justifyContent="space-between">
								<Highlight query={`${post.author}`} styles={{ px: '1', py: '1', bg: 'blue.100' }}>
									{`Author: ${post.author}`}
								</Highlight>
								<Text mb="8px">Date: {newCreatedDdate(updated_at)}</Text>
							</Box>
						</>
					) : null}
				</Box>
			) : (
				<Flex justifyContent="center" w="100%" h="20vh" alignItems="center">
					<Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
				</Flex>
			)}
			<Box mt="60px">
				<ButtonGroup gap="4">
					<Button colorScheme="blue" variant="solid" type="submit" isDisabled={!isDirty}>
						Save changes
					</Button>
					<ConfirmModal header="Sure want to go back?" content="Any changes won't be saved." isReturn={true} />
				</ButtonGroup>
			</Box>
		</form>
	);
};

export default SinglePost;
