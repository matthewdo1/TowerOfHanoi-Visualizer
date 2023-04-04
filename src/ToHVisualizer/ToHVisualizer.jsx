import React from 'react';
import './ToHVisualizer.css';
import * as algo from './ToHAlgorithm.js';

// Set the time between each move in the animation
const TIME_PER_ANIM = 300;

export default class ToHVisualizer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			a: [],
			b: [],
			c: [],
			isRunning: false,
			disks: 3
		};
	} 

	componentDidMount() {
		this.resetGame();
	}

	// Generates the starting 'a' array for the first rod based on the number of disks and sets two empty arrays for rods 'b' and 'c'.
	// Function is called when: the component is first mounted, # of disks are changed, game is started, or the reset button is clicked.
	resetGame() {
		const a = [];
		
		for(let i = 1; i < this.state.disks + 1; i++) {
			a.push(i);
		}

		this.setState({
			a,
			b: [],
			c: [],
		});
	}
	

	// Event handler when the user changes the amount of disks in the game. Limits currently set to a minimum of 1 disk to a maximum of 10 disks in the render function.
	changeDisks(e) {
		if(e.target.name === "inc") {
			this.setState({ disks: this.state.disks + 1 }, () => {this.resetGame()});
		} else if(e.target.name === "dec") {
			this.setState({ disks: this.state.disks - 1 }, () => {this.resetGame()});
		}
	}


	// algo.towerOfHanoi generates an array of objects that specifies the disk to move, as well as the source and destination rods.
	// towerOfHanoi iterates through the generated array of animations and renders each move after a set interval specified by TIME_PER_ANIM.
	towerOfHanoi() {
		this.resetGame();

		const animations = algo.towerOfHanoi(this.state.disks, "a", "c", "b");

		for(let i = 0; i < animations.length; i++) {
			const {disk, fromRod, toRod} = animations[i];
			setTimeout(() => {	
				if(fromRod === 'a') {
					this.setState({a: this.state.a.slice(1)});
					if(toRod === 'b') {
						this.setState({b: [disk, ...this.state.b]});
					} else if(toRod === 'c') {
						this.setState({c: [disk, ...this.state.c]});
					}
				} else if (fromRod === 'b') {
					this.setState({b: this.state.b.slice(1)});
					if(toRod === 'a') {
						this.setState({a: [disk, ...this.state.a]});
					} else if(toRod === 'c') {
						this.setState({c: [disk, ...this.state.c]});
					}
				} else if (fromRod === 'c') {
					this.setState({c: this.state.c.slice(1)});
					if(toRod === 'a') {
						this.setState({a: [disk, ...this.state.a]});
					} else if(toRod === 'b') {
						this.setState({b: [disk, ...this.state.b]});
					}
				}
				if(i === (animations.length - 1)) this.setState({isRunning: false});
			}, (i + 1) * TIME_PER_ANIM);
		}
	}

	render() {
		const {a, b, c} = this.state;

		return (
			<div className="main-container">
				<div className="header">
					<button 
						name="dec" 
						onClick={(e) => this.changeDisks(e)}
						disabled={(this.state.disks === 1 || (this.state.isRunning)) ? true : false}
					>
						<>&lt;</>
					</button>
					<div className="disk-counter">{this.state.disks}</div>
					<button 
						name="inc" 
						onClick={(e) => this.changeDisks(e)}
						disabled={(this.state.disks === 10) || (this.state.isRunning) ? true : false}
					>
						<>&gt;</>
					</button>
					<button className="resetButton"
						onClick={() => this.resetGame()}
						disabled={(this.state.isRunning) ? true : false}
					>
						Reset
					</button>
					<button className="startButton"
						onClick={() => this.setState({isRunning: true}, this.towerOfHanoi)}						
						disabled={(this.state.isRunning) ? true : false}
					>
						Send It
					</button>
				</div>
			
				<div className="game-container">
					<div className="column">
						<div className="disk-rod"/>
						<div className="disk-container">
							{a.map((value, idx) => (
								<div 
								className="disk" 
								key={idx}
								style={{width: `calc(${value} * 50px)`}}>
								</div>
							))}
						</div>
					</div>

					<div className="column">
						<div className="disk-rod"/>
						<div className="disk-container">
							{b.map((value, idx) => (
								<div 
								className="disk" 
								key={idx}
								style={{width: `calc(${value} * 50px`}}>
								</div>
							))}
						</div>
					</div>

					<div className="column">
						<div className="disk-rod"/>
						<div className="disk-container">
							{c.map((value, idx) => (
								<div 
								className="disk" 
								key={idx}
								style={{width: `calc(${value} * 50px`}}>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		);
	}
}