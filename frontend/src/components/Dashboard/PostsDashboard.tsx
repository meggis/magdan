import * as React from 'react';
import { useAppSelector, useAppDispatch } from '../../utils/reduxUtils';
import { useEffect, useMemo, useState } from 'react';
import { getPostsData, deletePostData } from '../../features/posts/actions';
import { useTable, TableOptions, useSortBy, useAsyncDebounce } from 'react-table';
import { useToast, TableContainer, Table, Tbody, Thead, Tr, Td, Th, Tfoot, Flex, Box, Button, Wrap, Spinner } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { newCreatedDdate } from '../../utils/helperFunctions';
import { ConfirmModal } from '../Posts/confirmModal';
import { IPostsModel } from '../../models/posts/post';
import './PostsDashboard.css';

const PostsDashboard = () => {
	const { posts, loadingPosts } = useAppSelector(state => state.posts);
	const [newPosts, setNewPosts] = useState<IPostsModel['posts']>([]);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const toast = useToast();
	const sortItems = (prev: any, curr: any, columnId: string) => {
		const prevValue = prev.original[columnId].toLowerCase();
		const currlValue = curr.original[columnId].toLowerCase();

		return prevValue === currlValue ? 0 : prevValue < currlValue ? -1 : 1;
	};

	useEffect(() => {
		dispatch(getPostsData());
	}, []);

	useEffect(() => {
		if (!posts) {
			return;
		}
		setNewPosts(posts);
	}, [posts]);

	const columns: Array<{ Header: string; accessor: string }> = useMemo(
		() => [
			{ Header: 'Post Name', accessor: 'display_name', sortType: sortItems },
			{ Header: 'Post Header', accessor: 'header', sortType: sortItems },
			{ Header: 'Post Content', accessor: 'content', sortType: sortItems },
			{ Header: 'Post Author', accessor: 'author', sortType: sortItems },
			{ Header: 'Post ID', accessor: 'post_id', sortType: sortItems },
			{ Header: 'Created Date', accessor: 'created_at', sortType: sortItems },
			{ Header: 'Actions', accessor: 'actions' },
		],
		[posts],
	);

	const handleDelete = useAsyncDebounce(data => {
		dispatch(deletePostData({ post_id: data.post_id, toast }));
	}, 250);

	const editPostButton = (singlePost: any) => {
		return (
			<Wrap>
				<Button variant="outline" size="sm" color="#63b3ed" borderColor="#63b3ed" onClick={() => navigate(`posts/post/${singlePost.post_id}`)}>
					Edit
				</Button>
				<ConfirmModal header="Delete item?" content="Sure want to delete item?" isReturn={false} onClick={() => handleDelete(singlePost)} />
			</Wrap>
		);
	};

	const changedTableDataContent = useMemo(() => {
		return newPosts.map((post: any) => ({
			...post,
			content: post.content,
			created_at: newCreatedDdate(post.created_at),
			actions: editPostButton(post),
		}));
	}, [newPosts]);

	const options: TableOptions<any> = {
		data: changedTableDataContent,
		columns,
	};
	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(options, useSortBy);

	return (
		<>
			<Box display="block" alignItems="center">
				<Button
					backgroundColor="#e8bc14"
					mt="30px"
					mb="30px"
					size="lg"
					_hover={{ backgroundColor: '#d1a912' }}
					color="white"
					onClick={() => navigate(`posts/post/`)}
				>
					+ Add new post
				</Button>
			</Box>
			{!loadingPosts ? (
				<Box display="block" alignItems="center">
					<TableContainer>
						<Table {...getTableProps()} variant="simple" size="md">
							<Thead>
								{headerGroups.map(headerGroup => {
									const { key: trKey, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps();
									return (
										<Tr key={trKey} {...restHeaderGroupProps}>
											{headerGroup.headers.map(column => {
												const { key: thKey, ...restColumn } = column.getHeaderProps(column.getSortByToggleProps);
												return (
													<Th
														key={thKey}
														{...restColumn}
														onClick={() => column.toggleSortBy(!column.isSortedDesc)}
														backgroundColor="blue.300"
														color="white"
														borderTop="none"
													>
														{column.render('Header')}
														<span>{column.isSorted ? (column.isSortedDesc ? ' ▼' : ' ▲') : ''}</span>
													</Th>
												);
											})}
										</Tr>
									);
								})}
							</Thead>
							<Tbody {...getTableBodyProps()}>
								{rows.map((row, idx) => {
									prepareRow(row);
									return (
										<Tr {...row.getRowProps()} key={idx}>
											{row.cells.map(cell => {
												const { key: trBodyKey, ...restHeaderGroupProps } = cell.getCellProps();
												return (
													<Td key={trBodyKey} {...restHeaderGroupProps}>
														{cell.value.length > 20 && cell.column.Header === 'Post Content' ? (
															<div title={cell.value} className="make_elipsis">
																{cell.render('Cell')}
															</div>
														) : (
															cell.render('Cell')
														)}
													</Td>
												);
											})}
										</Tr>
									);
								})}
							</Tbody>
						</Table>
					</TableContainer>
				</Box>
			) : (
				<Flex justifyContent="center" w="100%" h="20vh" alignItems="center">
					<div>Loading data...</div>
				</Flex>
			)}
		</>
	);
};

export default PostsDashboard;
