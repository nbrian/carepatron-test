import { InputBase, alpha, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

type tSearch = {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 1),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.85),
	},
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		width: 'auto',
	},
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	right: 0,
	top: 0,
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingRight: `calc(1em + ${theme.spacing(4)})`,
		paddingLeft: `calc(1em + ${theme.spacing(1)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
	},
}));

const SearchInput = ({ value, onChange }: tSearch) => {
	const [searchValue, setSearchValue] = useState(value);
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
		onChange(e);
	};
	return (
		<Search>
			<StyledInputBase
				placeholder='Search clients...'
				inputProps={{ 'aria-label': 'search' }}
				value={searchValue}
				onChange={handleChange}
			/>
			<SearchIconWrapper>
				<SearchIcon />
			</SearchIconWrapper>
		</Search>
	);
};

export default SearchInput;
