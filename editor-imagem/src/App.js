import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import GithubLogo from "./github-icon.png"

import EditorComponent from "./components/Editor";

function App() {
  return (
    <div className="App">
		<div className="center-div mt-2">
			<h1>Editar imagens</h1>
		</div>
		
		<div className="container editor-component mt-4">
			<EditorComponent/>
		</div>
		
		<div className="mt-4 footer">
			<div className="footer-content">
				2020. Lucas Kenji. &nbsp;
				<span>
					<a href="https://github.com/lucaskenji" target="_blank" rel="noopener noreferrer">
						<img src={GithubLogo} alt="Github icon."/>
					</a>
				</span>
			</div>
		</div>
    </div>
  );
}

export default App;
