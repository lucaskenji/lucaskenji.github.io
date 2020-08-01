import React from "react";

function EffectOptions(props) {
	return (
		<div className="mt-3">
			<h3>Efeitos</h3>
				
			Pixelizar: &nbsp;
			<input 
				type="number" 
				name="pixelate" 
				value={props.state.pixelate} 
				min="0" 
				max="100"
				onChange={(event) => {
					if (event.target.value === "") {
						event.target.value = 0;
					}
					props.handleChangeInput(event)
				}} />
			<br/>
				
			Blur: &nbsp;
			<input 
				type="number" 
				name="blurValue" 
				value={props.state.blurValue} 
				min="0" 
				max="100" 
				onChange={(event) => {
					if (event.target.value === "") {
						event.target.value = 0;
					}
					props.handleChangeInput(event)
				}} />
			<br/>
			
			<input 
				type="checkbox" 
				name="useGreyscale" 
				checked={props.state.useGreyscale} 
				onChange={(event) => {
					props.handleChangeInput({
						target: {
							name: event.target.name,
							value: event.target.checked
						}
					})
				}} />
			&nbsp; Usar escala de cinza
			<br/>
			
			<input 
				type="checkbox" 
				name="useSepia" 
				checked={props.state.useSepia} 
				onChange={(event) => {
					props.handleChangeInput({
						target: {
							name: event.target.name,
							value: event.target.checked
						}
					})
				}} />
			&nbsp; Usar efeito sépia
		</div>
	);
};

export default EffectOptions;