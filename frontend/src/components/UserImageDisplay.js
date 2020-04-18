
//use the Image display component

/*
    this needs to be refactored, is copied code from the homecontent component,
    should be: just pass the component an array
*/


import React, {useState, useEffect, useContext } from 'react'
import { Storage} from 'aws-amplify'
import "./ImageDisplay.css"
import { AuthContext } from './AuthContext';
import ImageDisplay from './ImageDisplay';
import { render } from '@testing-library/react';

const UserImageDisplay = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState('');
    useEffect(() => {
        getKeysMakeImages();
    },[]);

    const getKeysMakeImages = async () => {
        try {
            setLoading('loading');
            //first param must be an empty string
            //photes are stored like: bucket: 
            const s3Response = await Storage.list("", { level:"private"});
            const urls = [];
            for (let i = 0; i < s3Response.length; i++) {
                console.log(s3Response[i], 'is the image key im trying to get a url for');
                let url = await Storage.vault.get(s3Response[i].key);
                console.log('key I got back:')
                console.dir(url);
                urls.push(url);
            }
            const imageObjects = urls.map(url => {
                const newObj = {
                    src: url,
                    width: 4,
                    height: 3,
                    description: "Some Image"
                }
                return newObj;
            });
            console.log('the array of objects:', imageObjects)
            setImages(imageObjects);
        }catch (err) {
            console.log(err.message);
        }finally {
            setLoading('');
        }
    }
    return (
        <div className="ui container">
        <div style={{width:'3em', height:'3em', textAlign:'center'}} className="ui blue circular massive icon button">+</div>
            <div className={`ui ${loading} attached segment`}>
                    <ImageDisplay images={images} />
            </div>
        </div>
    )
}
export default UserImageDisplay
