require('./main.scss');

import Notification from './Notification.js';

Notification.log('Here we go');

class Form {
	hello() {
		console.log('hello');
	}
}

const form = new Form();

form.hello();