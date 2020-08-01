import React from "react";

function LightingOptions(props) {
	return (
		<div className="mt-3">
			<h3>Iluminação</h3>
			<input 
				type="range" 
				name="brightness" 
				value={props.state.brightness} 
				min="-1" 
				max="1" 
				step="0.1" 
				onChange={(event) => {props.handleChangeInput(event)}} />
			&nbsp; Brilho
			<br/>
				
			<input 
				type="range" 
				name="contrast" 
				value={props.state.contrast} 
				min="-1" 
				max="1" 
				step="0.1" 
				onChange={(event) => {props.handleChangeInput(event)}} />
			&nbsp; Contraste
		</div>
	);
};

export default LightingOptions;