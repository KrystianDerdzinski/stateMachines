const machine = {
	state: 'OFF',

	transitions: {
		'OFF': {
			press() {
				this.state = 'ON'
			}
		},
		'ON': {
			press() {
				this.state = 'BLINK'
			}
		},
		'BLINK': {
			press() {
				this.state = 'OFF'
			}
		}
	},

	dispatch(actionName) {
		action = this.transitions[this.state][actionName];
		if (action) {
			action.call(this);
		} else {
			console.error(`Invalid action ${actionName} in state ${this.state}`);
		}
	}
}

const flashlight = Object.create(machine);

console.log(flashlight.state);
flashlight.dispatch('press');
console.log(flashlight.state);
flashlight.dispatch('press');
console.log(flashlight.state);
flashlight.dispatch('press');