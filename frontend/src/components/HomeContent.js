import React, {useState, useEffect} from 'react';
import SearchBar from "./SearchBar";
import ImageDisplay from "./ImageDisplay";
import credentials from "./keys.js";
import Unsplash from 'unsplash-js';

const HomeContent = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [images, setImages] = useState([]);

	const defaultTerm = () => {
		const terms = ['puppies', 'house', 'car', 'fun', 'city', 'robot'];
		return terms[Math.floor(Math.random() * terms.length)];
	}

	useEffect(() => {
		requestAndSetImageObjects(searchTerm ? searchTerm: defaultTerm());
	}, [searchTerm])

	const requestAndSetImageObjects = async (term) => {
		try {
			let unsplash =  new Unsplash({accessKey:credentials.unsplash.ACCESS_KEY});
			let response = await unsplash.search.photos(term, 2, 10);
			let data = await response.json();
			setImages(data.results.map(elt => {
				return {
							src: elt.urls.regular,
							width: elt.width / 1000,
							height: elt.height / 1000,
							description: elt.description
						}
			}));
		}catch(err){
			console.log(err)
			return 'unable to reach api'
		}
	}

	return (
		<div className=" ui container" style={{marginTop: '40px'}}>
			<SearchBar extractTerm={setSearchTerm} />
			<ImageDisplay searchTerm={searchTerm} images={images} />
		</div>
	)
}
export default HomeContent;