import React from "react";
import Jimp from "jimp";
import EditOptionsComponent from "./EditOptions";
import DefaultImage from "../default_image.png";

class EditorComponent extends React.Component {

	constructor(props) {
		super(props);
		this.handleOptionChange = this.handleOptionChange.bind(this);
		this.handleUploadResult = this.handleUploadResult.bind(this);
		this.restoreOriginalSize = this.restoreOriginalSize.bind(this);
		this.restoreDefaultValues = this.restoreDefaultValues.bind(this);
	}
	
	state = {
		imageCode: DefaultImage,
		previewCode: DefaultImage,
		errorMessage: "",
		brightness: 0,
		contrast: 0,
		width: 420,
		height: 420,
		origSize: [420, 420],
		useGreyscale: false,
		useSepia: false,
		pixelate: 0,
		blurValue: 0,
		redValue: 0,
		greenValue: 0,
		blueValue: 0,
		loading: false
	}
	
	updatePreview() {
		this.setState({loading: true});
		
		Jimp.read(this.state.imageCode)
		.then((image) => {
			
			image
			.resize(this.state.width, this.state.height)
			.brightness(this.state.brightness)
			.contrast(this.state.contrast)
			.color([
				{ apply: "red", params: [this.state.redValue] },
				{ apply: "green", params: [this.state.greenValue] },
				{ apply: "blue", params: [this.state.blueValue] }
			]);
			
			if (this.state.blurValue !== 0) {
				image.blur(this.state.blurValue);
			}
			
			if (this.state.pixelate !== 0) {
				image.pixelate(this.state.pixelate);
			}
			
			if (this.state.useGreyscale) {
				image.greyscale();
			}
			
			if (this.state.useSepia) {
				image.sepia();
			}
			
			image
			.getBase64(image.getMIME(), (error, newCode) => {	
				if (!error) {
					this.setState({previewCode: newCode, errorMessage: "", loading: false});
				} else {
					throw new Error("erro durante a tentativa de conseguir a imagem em base64");
				}
			});
			
		})
		.catch((error) => {
			
			console.log(error);
			this.setState({errorMessage: "Um erro ocorreu durante a montagem da prévia.", loading: false});
		
		})
	}
	
	handleOptionChange(option, value) {
		this.setState({[option]: value});
		this.updatePreview();
	}
	
	handleUploadResult(imageCode, errorMessage) {
		if (imageCode) {

			const tempImage = new Image();
			tempImage.onload = () => {
				this.setState({
					imageCode, 
					previewCode: imageCode, 
					errorMessage: "", 
					width: tempImage.width, 
					height: tempImage.height,
					origSize: [tempImage.width, tempImage.height]
				});
				this.restoreDefaultValues();
			}
			tempImage.src = imageCode;
			
			
		} else {
			this.setState({errorMessage});
		}
	}

	restoreOriginalSize() {
		this.setState({
			width: this.state.origSize[0],
			height: this.state.origSize[1]
		});
		
		this.updatePreview();
	}
	
	restoreDefaultValues() {		
		this.setState({
			brightness: 0,
			contrast: 0,
			useGreyscale: false,
			useSepia: false,
			pixelate: 0,
			blurValue: 0,
			redValue: 0,
			greenValue: 0,
			blueValue: 0
		});
		
		this.restoreOriginalSize();
	}

	render() {
		return (
			<div className="row">
				<div className="col-8">
				
				<div className="mt-4" />
					
					{
						this.state.errorMessage
						?
						<div className="alert alert-danger">
							{ this.state.errorMessage }
						</div>
						:
						<span/>
					}

					<EditOptionsComponent 
						state={this.state}
						handleUploadResult={this.handleUploadResult} 
						handleOptionChange={this.handleOptionChange}
						restoreOriginalSize={this.restoreOriginalSize} 
						restoreDefaultValues={this.restoreDefaultValues} />
						
					<a download href={this.state.previewCode} className="btn btn-primary mt-2 mb-4">Baixar imagem</a>
						
				</div>
				
				<div className="col-4 mt-4 center-div">
					<img src={this.state.previewCode} alt="Preview" className="preview-image" />
					<div>
						Prévia do resultado
					</div>
					
					{
						this.state.loading
						?
						<div className="spinner-border" role="status">
						  <span className="sr-only">Loading...</span>
						</div>
						:
						<span/>
					}
					
				</div>
			</div>
		);
	}
	
};

export default EditorComponent;