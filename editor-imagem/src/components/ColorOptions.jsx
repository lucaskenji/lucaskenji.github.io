import React from "react";

function ColorOptions(props) {
	return (
		<div className="mt-3">
			<h3>Cores</h3>
			<input 
				type="range" 
				name="redValue" 
				value={props.state.redValue} 
				min="0" 
				max="255" 
				onChange={(event) => {props.handleChangeInput(event)}} />
			&nbsp; R
			<br/>
				
			<input 
				type="range" 
				name="greenValue" 
				value={props.state.greenValue} 
				min="0" 
				max="255" 
				onChange={(event) => {props.handleChangeInput(event)}} />
			&nbsp; G
			<br/>
				
			<input 
				type="range" 
				name="blueValue" 
				value={props.state.blueValue} 
				min="0" 
				max="255" 
				onChange={(event) => {props.handleChangeInput(event)}} />
			&nbsp; B
		</div>
	);
};

export default ColorOptions;