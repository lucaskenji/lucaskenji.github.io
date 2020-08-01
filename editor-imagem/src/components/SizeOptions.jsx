import React from "react";

function SizeOptions(props) {
	return (
		<div className="mt-3">
			<h3>Redimensionar</h3>
				
			Largura: &nbsp;
			<input 
				type="number" 
				name="width" 
				value={props.state.width} 
				min="1" 
				onChange={(event) => {props.handleChangeInput(event)}} />
			<br/>	
			
			Altura: &nbsp;
			<input 
				type="number" 
				name="height" 
				value={props.state.height} 
				min="1" 
				onChange={(event) => {props.handleChangeInput(event)}} />
			<br/>
					
			<button 
				type="button" 
				onClick={() => {props.restoreOriginalSize()}} 
				className="btn btn-danger mt-2">
				Restaurar tamanho inicial
			</button>
		</div>
	);
};

export default SizeOptions;