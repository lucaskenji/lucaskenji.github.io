import React from "./react.js";
import ReactDOM from "./react-dom.js";

class MainApp extends React.Component {
				state = {
					// operationPhase is 0 when typing first element on operation, 1 when operator was typed, and 2 when second element is being typed.
					operation: ["", "", ""],
					operationPhase: 0,
					operators: [
						{ symbol: "/" },
						{ symbol: "x" },
						{ symbol: "-" },
						{ symbol: "+" },
						{ symbol: "=" }
					],
					screenText: ""
				};
				
				constructor() {
					super();
					this.handleClick = this.handleClick.bind(this);
					this.handleOption = this.handleOption.bind(this);
				}
				
				render() {
					return (<div className="google-font" id="app-div">
						<center>
							<h1>ReactJS Calculator</h1>
							<p>
								Calculator made using React and JavaScript.<br/>
								Calculadora feita usando React e JavaScript.
							</p>
							<div className="round-sqr" id="main">
								<ScreenCalculator screenText={this.state.screenText} />
								<ButtonPad operators={this.state.operators} handleClick={this.handleClick} handleOption={this.handleOption} />
							</div>
							<br/><hr/>
							2020. Lucas Kenji.&nbsp;
							<span style={{verticalAlign: "middle"}}>
							<a href="https://github.com/lucaskenji" target="_blank">
								<img src="github-icon.png" alt="Github icon."/>
							</a></span>
						</center>
					</div>);
				}
				
				doCalculation(opr) {
					let result = 0;
					switch(opr[1]) {
						case "+":
							result = Number(opr[0]) + Number(opr[2]);
							break;
						case "-":
							result = Number(opr[0]) - Number(opr[2]);
							break;
						case "x":
							result = Number(opr[0]) * Number(opr[2]);
							break;
						case "/":
							if (Number(opr[2]) == 0) {
								return;
							}
							result = Number(opr[0]) / Number(opr[2]);
							break;
					}
					this.setState({operation: ["", "", ""], operationPhase: 0, screenText: result});
				}
				
				handleClick(value) {
					let phase = this.state.operationPhase;
					let operation = [...this.state.operation];
					
					if (value == "=") {
						if (phase === 2) {
							this.doCalculation(operation);
						} else {
							this.setState({operation: ["", "", ""], operationPhase: 0, screenText: "Syntax error"});
						}
						return;
					}
					
					if (["+", "-", "x", "/"].includes(value)) {
						if (phase === 0) {
							if (operation[0] == "") {
								return;
							}
							this.setState({operationPhase: 1});
						}
						operation[1] = value;
						this.setState({operation, screenText: operation.join(" ") });
						return;
					}
					
					if (phase === 1) {
						phase = 2;
						this.setState({operationPhase: 2});
					}
					
					operation[phase] = operation[phase].concat(value);
					this.setState({operation, screenText: operation.join(" ") });
					return;
				}
				
				handleOption(value) {
					if (value == "AC") {
						this.setState({operation: ["", "", ""], operationPhase: 0, screenText: ""});
						return;
					}
					if (value == "C") {
						this.setState({operation: ["", "", ""], operationPhase: 0, screenText: ""});
						return;
					}
					
					let phase = this.state.operationPhase
					let operation = [...this.state.operation];
					let currentValue = operation[phase];
					console.log(phase);

					if (currentValue.length == 1 && phase != 0) {
						this.setState({operationPhase: phase-1});
					}
					if (phase == 0 && currentValue.length == 0) {
						return;
					}
					
					currentValue = currentValue.split("");
					currentValue.pop();
					operation[phase] = currentValue.join("");
					this.setState({operation, screenText: operation.join(" ") });
					return;
				}
			}
		
			class ButtonPad extends React.Component {
				render() {
					return (<div id="button-pad">
						<div id="main-pad">
							<div id="option-pad">
								{ ["AC", "C", "<"].map((num) => <ButtonOption handleOption={this.props.handleOption} key={num} symbol={num} /> ) }
							</div>
							<div id="num-pad">
								{ [7, 8, 9, 4, 5, 6, 1, 2, 3].map((num) => <ButtonNumber handleClick={this.props.handleClick} key={num} value={num} /> ) }
							</div>
							<div id="special-numpad">
								<ButtonNumber handleClick={this.props.handleClick} key={0} value={0} />
								<ButtonNumber handleClick={this.props.handleClick} key={"."} value={"."} />
							</div>
						</div>
						<div id="column-operators">
							{ this.props.operators.map((btnopr) => <ButtonOperator handleClick={this.props.handleClick} key={this.props.operators.indexOf(btnopr)} symbol={btnopr.symbol} /> ) }
						</div>
					</div>);
				}
			}
		
			class ButtonNumber extends React.Component {
				render() {
					let classes = "bg-orange round-sqr ";
					if (this.props.value == 0) {
						classes = classes.concat("button-zero");
					} else {
						classes = classes.concat("button-operator");
					}
					return (<div onClick={() => this.props.handleClick(this.props.value)} className={ classes }>
								<div className="button-value round-sqr no-select">{ this.props.value }</div>
							</div>);
				}
			}
		
			class ButtonOperator extends React.Component {
				render() {
					return (<div onClick={() => this.props.handleClick(this.props.symbol)} className="bg-blue button-operator round-sqr">
								<div className="button-value round-sqr no-select">{ this.props.symbol }</div>
							</div>);
				}
			}
			
			class ButtonOption extends React.Component {
				render() {
					return (<div onClick={() => this.props.handleOption(this.props.symbol)} className="bg-red button-operator round-sqr">
								<div className="button-value round-sqr no-select">{ this.props.symbol }</div>
							</div>);
				}
			}
			
			class ScreenCalculator extends React.Component {
				render() {
					return (<div className="screen-calc round-sqr">
						<div className="screen-txt">{ this.props.screenText }</div>
					</div>);
				}
			}

			ReactDOM.render(<MainApp/>, document.getElementById("root"));