import React, {useState} from 'react'
//import ImageDisplay from "./ImageDisplay";

const SearchBar = (props) => {
	const [term, setTerm] = useState("");
	const onFormSubmit = (e) => {
		e.preventDefault();
		//search term is 'exported' to parent component (App)
		props.extractTerm(term);
	};
	return (
		<div className="ui segment">
			<form onSubmit={e => onFormSubmit(e)} className="ui form">
				<div className="field">
				<label>Image Search</label>
					<input type="text"
					value={term}
					onChange={e => setTerm(e.target.value)}>
				</input>
				</div>
			</form>
		</div>
	)
}
export default SearchBar;