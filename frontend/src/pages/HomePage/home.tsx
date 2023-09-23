import * as React from 'react';
import { useAppSelector, useAppDispatch } from '../../utils/reduxUtils';
import { useEffect, useMemo } from 'react';
import { getPostsData } from '../../features/posts/actions';
import { useTable, TableOptions, Column } from 'react-table';
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

	const columns: Array<{ Header: string; accessor: string }> = useMemo(
		() => [
			{ Header: 'Post Name', accessor: 'display_name' },
			{ Header: 'Post Header', accessor: 'header' },
			{ Header: 'Post Content', accessor: 'content' },
			{ Header: 'Post Author', accessor: 'author' },
			{ Header: 'Post ID', accessor: 'post_id' },
		],
		[],
	);

	const revealCharacters = (text: string) => text.substring(0, 20) + '...';
	const changedTableDataContent = posts.map(post => ({ ...post, content: revealCharacters(post.content) }));

	const options: TableOptions<any> = {
		data: changedTableDataContent,
		columns,
	};

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(options);

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
												const { key: thKey, ...restColumn } = column.getHeaderProps();
												return (
													<Th key={thKey} {...restColumn} backgroundColor="blue.300" color="white" borderTop="none">
														{column.render('Header')}
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
