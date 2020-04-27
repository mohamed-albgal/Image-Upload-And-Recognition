import React, {useState, useEffect} from 'react'
import { Storage} from 'aws-amplify'
import "./ImageDisplay.css"
import ImageDisplay from './ImageDisplay';

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
            //photes are stored like: _bucketName_:private:_identity_id_/*
            const s3Response = await Storage.list("", { level:"private"});
            const urls = [];
            for (let i = 0; i < s3Response.length; i++) {
                let url = await Storage.vault.get(s3Response[i].key);
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
            setImages(imageObjects);
        }catch (err) {
            console.log(err.message);
        }finally {
            setLoading('');
        }
    }
    return (
        <div className="ui container">
            <div className={`ui ${loading} attached segment`}>
                    <ImageDisplay images={images} />
            </div>
        </div>
    )
}
export default UserImageDisplay
