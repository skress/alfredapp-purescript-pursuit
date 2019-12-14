'use strict';
const alfy = require('alfy');

if (process.argv.length !== 3) {
	console.error("Invalid number of arguments, expected 3, got " +
		process.argv.length + ", arguments: " + process.argv);
	return;
}

const query = process.argv[2];
const logoPath = "./purescript-logo-white.png";

const psSearch = (s) => alfy.fetch('https://pursuit.purescript.org/search?q=' + query);

const run = async () => {
	await psSearch(query).then(result => {
		var items = result
			.map(element => {
				var title, subtitle;
				if (element.info && element.info.title && element.info.title.length > 0) {
					title = element.info.title +
						((element.info.typeText && element.info.typeText.length > 0) ? " :: " + element.info.typeText : "");
					subtitle = element.package + "@" + element.version +
						" (" + element.info.module + ") " + ((element.text && element.text.length > 0) ? element.text : "");
				} else {
					title = (element.text && element.text.length > 0) ? element.text : "";
					subtitle = element.package + "@" + element.version +
						" (" + element.info.module + ")";

				}
				return ({
					title: title,
					subtitle: subtitle,
					arg: element.url,
					quicklookurl: element.url,
					icon: {
						path: logoPath
					}
				});
			});
		items.unshift({
			title: "Open search result in brower",
			arg: 'https://pursuit.purescript.org/search?q=' + query,
			icon: {
				path: logoPath
			}
		});
		alfy.output(items);
	}).catch(error => {
		console.error(error); // Error: Oh dear! It's broken!
	});
}

run();