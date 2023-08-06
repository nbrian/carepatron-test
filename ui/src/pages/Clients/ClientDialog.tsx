import { useEffect, useRef, useState } from 'react';
import {
	Box,
	Button,
	DialogActions,
	DialogContent,
	InputLabel,
	Step,
	StepLabel,
	Stepper,
	TextField,
} from '@mui/material';
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
import CustomDialog, { tDialog } from '../../components/CustomDialog';

const NEW_CLIENT: IClient = {
	id: 'new',
	firstName: '',
	lastName: '',
	email: '',
	phoneNumber: '',
};

const FIELD_ERR = {
	id: null,
	firstName: null,
	lastName: null,
	email: null,
	phoneNumber: null,
};

type ClientKeys = keyof typeof NEW_CLIENT;
type tFieldError = {
	[K in ClientKeys]: string | null;
};

const ClientDialog = (props: tDialog) => {
	const [dialogOpen, setDialogOpen] = useState(false);
	const [client, setClient] = useState<IClient>(NEW_CLIENT);
	const [activeStep, setActiveStep] = useState(0);
	const [fieldError, setFieldError] = useState<tFieldError>(FIELD_ERR);
	const nameFormRef = useRef<HTMLFormElement>();
	const detailsFormRef = useRef<HTMLFormElement>();

	const steps = ['Personal details', 'Contact details'];

	useEffect(() => setDialogOpen(props.open), [props.open]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		const { name, value } = event.target;
		setClient({
			...client,
			[name]: value,
		});
		if (value) {
			validateStep();
		}
	};

	const handleClose = () => {
		props.handleClose(false);
		setDialogOpen(false);
	};

	const handleSave = () => {
		setFieldError(FIELD_ERR);
		if (validateStep()) {
			props.handleSave && props.handleSave(client);
			handleClose();

			// reset values
			setClient(NEW_CLIENT);
			nameFormRef.current?.reset();
			detailsFormRef.current?.reset();
			setActiveStep(0);
		}
	};

	const handleNext = () => {
		setFieldError(FIELD_ERR);
		if (validateStep()) {
			setActiveStep((prev) => prev + 1);
		}
	};
	const handleBack = () => {
		setActiveStep((prev) => prev - 1);
	};

	const validateStep = () => {
		const invalidFields: string[] = [];
		const validateForm = (form: HTMLFormElement) => {
			for (let index = 0; index < form.elements.length; index++) {
				const element = form.elements.item(index) as HTMLInputElement;
				const name = element.name as ClientKeys;
				const value = element.value;

				if (name) {
					console.log({ [name]: value });
					if (!element.checkValidity()) {
						console.log(element.validationMessage);
						invalidFields.push(name);
						setFieldError((prev) => {
							const fields = Object.assign({}, prev);
							fields[name] = element.validationMessage;
							return fields;
						});
					} else {
						setFieldError((prev) => {
							const fields = Object.assign({}, prev);
							fields[name] = '';
							return fields;
						});
					}
				}
			}
		};
		if (activeStep === 0) {
			const form = nameFormRef.current;
			if (form) {
				validateForm(form);
			}
		} else {
			const form = detailsFormRef.current;
			if (form) {
				validateForm(form);
			}
		}

		return invalidFields.length === 0;
	};

	const renderStepsContent = () => {
		if (activeStep === 0) {
			return (
				<Box component={'form'} ref={nameFormRef} sx={{ display: 'grid', padding: '10px 8px 0' }}>
					<InputLabel
						shrink
						htmlFor='firstName'
						sx={{ fontSize: 18, marginTop: '3px' }}
						error={!!fieldError.firstName}
					>
						First name
					</InputLabel>
					<TextField
						id='firstName'
						name='firstName'
						variant='outlined'
						onChange={handleChange}
						value={client.firstName}
						error={!!fieldError.firstName}
						required
						helperText={fieldError.firstName}
					/>
					<InputLabel
						shrink
						htmlFor='lastName'
						sx={{ fontSize: 18, marginTop: '3px' }}
						error={!!fieldError.lastName}
					>
						Last name
					</InputLabel>
					<TextField
						id='lastName'
						name='lastName'
						variant='outlined'
						onChange={handleChange}
						value={client.lastName}
						error={!!fieldError.lastName}
						helperText={fieldError.lastName}
						required
					/>
				</Box>
			);
		} else {
			return (
				<Box component={'form'} ref={detailsFormRef} sx={{ display: 'grid', padding: '10px 8px 0' }}>
					<InputLabel
						shrink
						htmlFor='email'
						sx={{ fontSize: 18, marginTop: '3px' }}
						error={!!fieldError.email}
					>
						Email
					</InputLabel>
					<TextField
						id='email'
						name='email'
						type='email'
						variant='outlined'
						onChange={handleChange}
						value={client.email}
						error={!!fieldError.email}
						helperText={fieldError.email}
						required
					/>

					<InputLabel
						shrink
						htmlFor='phoneNumber'
						sx={{ fontSize: 18, marginTop: '3px' }}
						error={!!fieldError.phoneNumber}
					>
						Phone number
					</InputLabel>
					<TextField
						id='phoneNumber'
						name='phoneNumber'
						type='number'
						variant='outlined'
						onChange={handleChange}
						value={client.phoneNumber}
						error={!!fieldError.phoneNumber}
						helperText={fieldError.phoneNumber}
						required
					/>
				</Box>
			);
		}
	};

	return (
		<CustomDialog title='Create new client' open={dialogOpen} handleClose={handleClose}>
			<DialogContent>
				<Box sx={{ width: '100%' }}>
					<Stepper activeStep={activeStep}>
						{steps.map((label, index) => {
							const labelProps: {
								optional?: React.ReactNode;
								error?: boolean;
							} = {};
							// TODO: stepper error
							// if (fieldError.length > 0) {
							// 	labelProps.optional = (
							// 		<Typography variant='caption' color='error'>
							// 			Alert message
							// 		</Typography>
							// 	);
							// 	labelProps.error = true;
							// }
							return (
								<Step key={label}>
									<StepLabel {...labelProps}>{label}</StepLabel>
								</Step>
							);
						})}
					</Stepper>
				</Box>
				{renderStepsContent()}
			</DialogContent>
			<DialogActions>
				<Box
					sx={
						activeStep !== 0
							? { width: '100%', display: 'flex', justifyContent: 'space-between', padding: '16px' }
							: { padding: '16px' }
					}
				>
					{activeStep !== 0 && (
						<Button sx={{ textTransform: 'unset' }} onClick={handleBack}>
							<ArrowBackSharpIcon fontSize='small' sx={{ paddingRight: '2px' }} />
							Back
						</Button>
					)}
					<Button
						variant='contained'
						autoFocus
						onClick={activeStep === steps.length - 1 ? handleSave : handleNext}
						sx={{ textTransform: 'unset' }}
					>
						{activeStep === steps.length - 1 ? 'Create client' : 'Continue'}
					</Button>
				</Box>
			</DialogActions>
		</CustomDialog>
	);
};

export default ClientDialog;
