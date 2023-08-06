import { Dialog, styled, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import CustomDialogTitle from './CustomDialogTitle';

type tDialog = {
	open: boolean;
	handleClose: (open: boolean) => void;
	handleSave?: (client: IClient) => void;
};

const StyledDialog = styled(Dialog)(({ theme }) => ({
	'& .MuiDialogContent-root': {
		padding: theme.spacing(2),
	},
	'& .MuiDialogActions-root': {
		padding: theme.spacing(1),
	},
}));

const CustomDialog = ({
	handleClose,
	open,
	title,
	children,
}: tDialog & { title?: string; children: React.ReactNode }) => {
	const [dialogOpen, setDialogOpen] = useState(false);
	const handleOnClose = () => {
		handleClose(false);
		setDialogOpen(false);
	};

	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

	useEffect(() => setDialogOpen(open), [open]);

	return (
		<StyledDialog
			onClose={handleClose}
			aria-labelledby='customized-dialog-title'
			open={dialogOpen}
			maxWidth={'sm'}
			fullWidth={true}
			fullScreen={fullScreen}
		>
			<CustomDialogTitle id='customized-dialog-title' onClose={handleOnClose}>
				{title}
			</CustomDialogTitle>
			{children}
		</StyledDialog>
	);
};

export default CustomDialog;
export type { tDialog };
