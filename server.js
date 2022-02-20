/* 
// simple state machine to read num values from array
*/

const isArrayNumeric = function(array) {
	let state = 'initial';

	const transitions = {
		initial: {
			read() {
				if (Array.isArray(array) && array.length === 0) {
					console.log('empty array');
					setStateTo('error');
				} else if (array.length > 0) {
					setStateTo('reading');
					dispatch('read');
				} else {
					console.error('Invalid array');
					setStateTo('error');
				}
			}
		},
		reading: {
			read() {
				if (array.length === 0) {
					setStateTo('done');
					dispatch('viewResult')
				} else if (!isNaN(array[0])) {
					array.shift();
					dispatch('read');
					setStateTo('reading')
				} else {
					setStateTo('error');
					dispatch('viewResult');
				}
			}
		},
		done: {
			viewResult() {
				console.log(`the array is numeric`);
			}
		},
		error: {
			viewResult() {
				console.log(`the array is not numeric`);
			}
		}
	}

	function dispatch(actionName) {
		const action = transitions[state][actionName];
		if (action) {
			action.call(this);
		} else {
			setStateTo('error');
			console.error(`Invalid action ${actionName} in state ${state}`);
		}
	}

	function setStateTo(newState) {
		state = newState;
	}

	dispatch('read')
}

isArrayNumeric(['1', '2', '3']);
isArrayNumeric(['a', '2', '3']);
isArrayNumeric('asd');
isArrayNumeric(['a', '2', '3']);
isArrayNumeric(['1', '2', '3']);
isArrayNumeric(['1', '2', '3']);
isArrayNumeric([]);