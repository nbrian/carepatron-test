import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ClientRow from './ClientRow';
import { TablePagination } from '@mui/material';
import { useEffect, useState } from 'react';

export default function BasicTable({ clients, filter = '' }: { clients: IClient[]; filter: string }) {
	const [rows, setRows] = useState<IClient[]>(clients);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const PAGE_OPTIONS = [5, 10, 25];

	const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
		setPage(newPage);
	};
	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	// Filter list when search query is updated
	useEffect(() => {
		const filteredRows = clients.filter((row) => {
			const name = `${row.firstName} ${row.lastName}`;
			return name.toLowerCase().includes(filter.toLowerCase());
		});
		setRows(filteredRows);
	}, [clients, filter]);

	return (
		<>
			<TableContainer component={Paper} sx={{ maxWidth: '100%' }}>
				<Table sx={{ minWidth: 400 }} aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>Phone number</TableCell>
							<TableCell>Email</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{(rowsPerPage > 0
							? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							: rows
						).map((client) => (
							<ClientRow key={client.id} client={client} />
						))}
						{!rows ||
							(!rows.length && (
								<TableRow sx={{ padding: 3 }}>
									<TableCell component='th' scope='row'>
										No clients
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
			{rows.length > PAGE_OPTIONS[0] && (
				<TablePagination
					rowsPerPageOptions={PAGE_OPTIONS}
					component='div'
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			)}
		</>
	);
}
