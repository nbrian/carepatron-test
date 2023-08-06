import { memo, useContext, useEffect, useState } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { StateContext } from '../../store/DataProvider';
import Page from '../../components/Page';
import ClientTable from './ClientTable';
import { getClients, createClient } from '../../services/api';
import SearchInput from '../../components/SearchInput';
import ClientDialog from './ClientDialog';

function Clients() {
	const { state, dispatch } = useContext(StateContext);
	const { clients } = state;
	const [searched, setSearched] = useState<string>('');
	const [clientDialogOpen, setClientDialogOpen] = useState(false);

	const openClientDialog = () => {
		setClientDialogOpen(true);
	};

	const onNewClientSave = (newClient: IClient) => {
		createClient(newClient).then((client) => {
			console.log('client', client);
			dispatch({ type: 'SAVE_CLIENT', data: client });
		});
	};

	useEffect(() => {
		getClients().then((clients) => dispatch({ type: 'FETCH_ALL_CLIENTS', data: clients }));
	}, [dispatch, clientDialogOpen]);

	return (
		<Page>
			<Typography variant='h4' sx={{ textAlign: 'start' }}>
				Clients
			</Typography>
			<Box sx={{ display: 'flex', justifyContent: 'space-between', margin: 'auto', marginTop: 3 }}>
				<SearchInput value={searched} onChange={(e) => setSearched(e.target.value)} />
				<Button variant='contained' sx={{ textTransform: 'unset' }} onClick={openClientDialog}>
					Create new client
				</Button>
			</Box>
			<ClientDialog open={clientDialogOpen} handleClose={setClientDialogOpen} handleSave={onNewClientSave} />
			<Paper sx={{ margin: 'auto', marginTop: 3 }}>
				<ClientTable clients={clients} filter={searched} />
			</Paper>
		</Page>
	);
}

export default memo(Clients);
