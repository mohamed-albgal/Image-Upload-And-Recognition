import React, {useState} from 'react'
//import ImageDisplay from "./ImageDisplay";

const SearchBar = (props) => {
	const [term, setTerm] = useState("");
	const onFormSubmit = (e) => {
		e.preventDefault();
		//search term is 'exported' to parent component (App)
		props.extractTerm(term);
	};
	const inputStyle = {
		fontSize:'1.4em'
	}
	return (
		<div className="ui category search ui raised segment">
			<form onSubmit={e => onFormSubmit(e)} className="ui form">
				<div className="field">
				<label>Image Search</label>
					<input style={inputStyle} type="text"
					value={term}
					onChange={e => setTerm(e.target.value)}>
				</input>
				</div>
			</form>
		</div>
	)
}
export default SearchBar;