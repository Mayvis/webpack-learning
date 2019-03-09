require('./main.scss');

import Notification from './Notification.js';
import zelda from './images/zelda.jpeg';
import zelda_1 from './images/zelda_1.jpg';

Notification.log('Here we go');

class Form {
	hello() {
		console.log('hello');
	}
}

const form = new Form();

form.hello();
