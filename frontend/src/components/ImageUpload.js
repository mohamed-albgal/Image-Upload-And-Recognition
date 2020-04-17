import React , {useState, useEffect} from 'react'
import { Auth, Storage } from 'aws-amplify' 
import ImageUploader from 'react-images-upload'

/*
source:
https://www.npmjs.com/package/react-images-upload
*/ 
// const s3 = new AWS.S3({
//     region: 'us-west-1',
//     params: {
//       Bucket: config.s3.BUCKET,
//     }
//   });
const ImageUpload = () => {
	const [imageUpload, setImageUpload] = useState(null)
	const [loading, setLoading] = useState("");
	const [error, setError] = useState(false);
	const errorMsg = "There was an error uploading that file"
	useEffect( () => {
		processUpload(imageUpload);
	},[imageUpload])
	
	const processUpload = async (img) => {
		if (!imageUpload) return
		setLoading('loading');
		console.log(imageUpload);
		const filename = `${Date.now()} - ${img.name}`;
		try {
			const storedFile = await Storage.vault.put(filename, img, {
				contentType: img.type, 
			});
			console.log(storedFile)
			setLoading("");
		}catch(err){
			setError(true);
			setLoading("");
			console.log(err);
		};
	}
	return (
		<div className='ui container'>
			{error && 
				(<div className={`ui warning message`}>
					<div className="header"> {errorMsg}</div>
				</div>)}
			<ImageUploader
			withIcon={true}
			buttonText='Upload An Image'
			buttonClassName={`ui secondary ${loading} button`}
			onChange={f => setImageUpload(f[0])}
			imgExtension={['.jpg', '.png']}
			maxFileSize={5242880}
			/>
        </div>
        );
}

export default ImageUpload;


/*
add any of these props to modify behavior: note

parameter	type	default	description
className	String	-	Class name for the input.
fileContainerStyle	Object	-	Inline styles for the file container.
onChange	Function	-	On change handler for the input.
buttonClassName	String	-	Class name for upload button.
buttonStyles	Object	-	Inline styles for upload button.
withPreview	Boolean	true	Show preview of selected images.
accept	String	"accept=image/*"	Accept attribute for file input.
name	String	-	Input name.
withIcon	Boolean	true	If true, show upload icon on top
buttonText	String	'Choose images'	The text that display in the button.
withLabel	Boolean	true	Show instruction label
label	String	'Max file size: 5mb, accepted: jpg	gif
labelStyles	Object	-	Inline styles for the label.
labelClass	string	-	Class name for the label
imgExtension	Array	['.jpg', '.gif', '.png', '.gif']	Supported image extension (will use in the image validation).
maxFileSize	Number	5242880	Max image size.
fileSizeError	String	" file size is too big"	Label for file size error message.
fileTypeError	String	" is not supported file extension"	Label for file extension error message.
errorClass	String	-	Class for error messages
errorStyle	Object	-	Inline styles for errors
singleImage	Boolean	false	If true, only a single image c



*/

/*
	s3 amplify bug issue:
		uploading gave a 'No Credentials' error
		the identity pool was not set up correctly,
		the user was entered into the user pool, but not the identity pool resulting an authed user with no access permissions
		i made a new identity pool with an 'Authed Iam Role' with the proper permission, then registered the provider as cognito with my cognito 
		userpool id and app client id
		the result worked

*/