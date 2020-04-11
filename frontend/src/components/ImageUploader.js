import React , {useState} from 'react'
import ImageUploader from 'react-images-upload'

/*
source:
https://www.npmjs.com/package/react-images-upload
*/
const ImageUpload =() => {
	const [imageUploads, setImageUploads] = useState([])
	const imageDrop = (pic) => {
		setImageUploads(imageUploads.concat(pic));
		console.log(imageUploads)
	}
	return (
            <ImageUploader
                withIcon={false}
                buttonText='Upload Images'
                onChange={imageDrop}
                imgExtension={['.jpg','.png']}
                maxFileSize={5242880}
                buttonClassName='ui button'


            />
        );
}

export default ImageUpload

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