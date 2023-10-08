import * as React from 'react';
import { useAppSelector, useAppDispatch } from '../../utils/reduxUtils';
import { useEffect, useMemo } from 'react';
import { getPostsData } from '../../features/posts/actions';
import { useTable, TableOptions, useSortBy } from 'react-table';
import { TableContainer, Table, Tbody, Thead, Tr, Td, Th, Tfoot, Flex, Box } from '@chakra-ui/react';

const HomePage = () => {
	const { posts, loadingPosts } = useAppSelector(state => state.posts);
	const dispatch = useAppDispatch();

	const sortItems = (prev: any, curr: any, columnId: string) => {
		const prevValue = prev.original[columnId].toLowerCase();
		const currlValue = curr.original[columnId].toLowerCase();

		return prevValue === currlValue ? 0 : prevValue < currlValue ? -1 : 1;
	};

	useEffect(() => {
		dispatch(getPostsData());
	}, []);

	const columns: Array<{ Header: string; accessor: string }> = useMemo(
		() => [
			{ Header: 'Post Name', accessor: 'display_name', sortType: sortItems },
			{ Header: 'Post Header', accessor: 'header', sortType: sortItems },
			{ Header: 'Post Content', accessor: 'content', sortType: sortItems },
			{ Header: 'Post Author', accessor: 'author', sortType: sortItems },
			{ Header: 'Post ID', accessor: 'post_id', sortType: sortItems },
			{ Header: 'Created Date', accessor: 'created_at', sortType: sortItems },
		],
		[posts],
	);
	const newCreatedDdate = (date: Date) => new Date(date).toLocaleDateString('en-US');

	const revealCharacters = (text: string) => text.substring(0, 20) + '...';
	const changedTableDataContent = useMemo(() => {
		return posts.map((post: any) => ({ ...post, content: revealCharacters(post.content), created_at: newCreatedDdate(post.created_at) }));
	}, [posts]);

	const options: TableOptions<any> = {
		data: changedTableDataContent,
		columns,
	};

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(options, useSortBy);

	return (
		<>
			<Box display="block" alignItems="center">
				{!loadingPosts ? (
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
														{cell.render('Cell')}
													</Td>
												);
											})}
										</Tr>
									);
								})}
							</Tbody>
							<Tfoot>
								{headerGroups.map(headerGroup => {
									const { key: tfootKey, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps();
									return (
										<Tr key={tfootKey} {...restHeaderGroupProps}>
											{headerGroup.headers.map(column => {
												const { key: trfootKey, ...restColumn } = column.getHeaderProps();
												return (
													<Th key={trfootKey} {...restColumn} backgroundColor="blue.300" color="white" borderTop="none">
														{column.render('Header')}
													</Th>
												);
											})}
										</Tr>
									);
								})}
							</Tfoot>
						</Table>
					</TableContainer>
				) : (
					<Flex justifyContent="center" w="100%" h="20vh" alignItems="center">
						<div>Loading data...</div>
					</Flex>
				)}
			</Box>
		</>
	);
};

export default HomePage;
