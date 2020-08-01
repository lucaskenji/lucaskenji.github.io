import React from "react";
import LightingOptions from "./LightingOptions";
import ColorOptions from "./ColorOptions";
import SizeOptions from "./SizeOptions";
import EffectOptions from "./EffectOptions";

class EditOptionsComponent extends React.Component {
	
	constructor(props) {
		super(props);
		this.handleChangeInput = this.handleChangeInput.bind(this);
	}
	
	render() {
		return (
			<form>
				<input
					type="file" 
					id="imgselector" 
					onChange={(event) => {this.handleImageChange(event)}} />
				<br/>
				
				<LightingOptions 
					state={this.props.state} 
					handleChangeInput={this.handleChangeInput}
				/>
				
				<ColorOptions 
					state={this.props.state} 
					handleChangeInput={this.handleChangeInput}
				/>
				
				<SizeOptions 
					state={this.props.state} 
					handleChangeInput={this.handleChangeInput} 
					restoreOriginalSize={this.props.restoreOriginalSize}
				/>
				
				<EffectOptions 
					state={this.props.state} 
					handleChangeInput={this.handleChangeInput}
				/>
				
				<button 
					type="button" 
					className="mt-4 btn btn-danger" 
					onClick={() => {this.props.restoreDefaultValues()}}>
					Restaurar propriedades iniciais
				</button>
			</form>
		);
	}	

	handleChangeInput(input) {
		const inputName = input.target.name;
		let newValue = null;
		
		if (input.target.value.toString().search(/\d/) === -1) {
			newValue = input.target.value;
		} else {
			newValue = parseFloat(input.target.value);
		}
				
		this.props.handleOptionChange(inputName, newValue);
	}

	handleImageChange(fileInput) {
		const imgSelector = fileInput.target;
		const fileSent = imgSelector.files ? imgSelector.files[0] : null;
		const reader = new FileReader();

		const fileIsImage = (file) => {
			if (file.type.search("image") !== -1) {
				return true;
			}
			return false;
		}
			
		const readFileInBase64 = (file) => {
			reader.onloadend = () => { this.props.handleUploadResult(reader.result); }
			reader.readAsDataURL(fileSent);
		}
		
		if (fileSent) {
			if (fileIsImage(fileSent)) {
				readFileInBase64(fileSent);				
			} else {
				this.props.handleUploadResult(null, "O arquivo deve ser uma imagem.");
			}			
		}
	}
	
}

export default EditOptionsComponent;