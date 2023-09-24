import * as React from 'react';
import { useAppSelector, useAppDispatch } from '../../utils/reduxUtils';
import { useEffect, useMemo } from 'react';
import { getPostsData } from '../../features/posts/actions';
import { useTable, TableOptions, useSortBy } from 'react-table';
import { TableContainer, Table, Tbody, Thead, Tr, Td, Th, Tfoot, Flex, Box } from '@chakra-ui/react';

const HomePage = () => {
	const { isLogged } = useAppSelector(state => state.authorization);
	const { posts } = useAppSelector(state => state.posts);
	const dispatch = useAppDispatch();
	const userToken = localStorage.getItem('token');

	useEffect(() => {
		if (isLogged) {
			dispatch(getPostsData({ token: userToken as string }));
		}
	}, []);

	const sortItems = (prev: any, curr: any, columnId: string) => {
		if (prev.original[columnId].toLowerCase() > curr.original[columnId].toLowerCase()) {
			return 1;
		} else if (prev.original[columnId].toLowerCase() < curr.original[columnId].toLowerCase()) {
			return -1;
		} else {
			return 0;
		}
	};

	const columns: Array<{ Header: string; accessor: string }> = useMemo(
		() => [
			{ Header: 'Post Name', accessor: 'display_name', sortType: (prev: any, curr: any, columnId: any) => sortItems(prev, curr, columnId) },
			{ Header: 'Post Header', accessor: 'header', sortType: (prev: any, curr: any, columnId: any) => sortItems(prev, curr, columnId) },
			{ Header: 'Post Content', accessor: 'content', sortType: (prev: any, curr: any, columnId: any) => sortItems(prev, curr, columnId) },
			{ Header: 'Post Author', accessor: 'author', sortType: (prev: any, curr: any, columnId: any) => sortItems(prev, curr, columnId) },
			{ Header: 'Post ID', accessor: 'post_id', sortType: (prev: any, curr: any, columnId: any) => sortItems(prev, curr, columnId) },
		],
		[],
	);

	const revealCharacters = (text: string) => text.substring(0, 20) + '...';
	const changedTableDataContent = useMemo(() => {
		return posts.map(post => ({ ...post, content: revealCharacters(post.content) }));
	}, [posts]);

	const options: TableOptions<any> = {
		data: changedTableDataContent,
		columns,
	};

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(options, useSortBy);

	return (
		<>
			<Box display="block" alignItems="center">
				{posts.length ? (
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
