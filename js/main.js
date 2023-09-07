var before = document.getElementById('before');
var liner = document.getElementById('liner');
var command = document.getElementById('typer');
var textarea = document.getElementById('texter');
var terminal = document.getElementById('terminal');

var git = 0;
var commands = [];

setTimeout(function () {
	loopLines(home, '', 80);
	textarea.focus();
}, 100);

window.addEventListener('keyup', enterKey);

textarea.value = '';
command.innerHTML = textarea.value;

function enterKey(e) {
	if (e.keyCode == 13) {
		commands.push(command.innerHTML);
		git = commands.length;
		addLine('visitor@R3D1AM:~$ ' + command.innerHTML, 'no-animation', 0);
		commander(command.innerHTML.toLowerCase());
		command.innerHTML = '';
		textarea.value = '';
	}
	if (e.keyCode == 38 && git != 0) {
		git -= 1;
		textarea.value = commands[git];
		command.innerHTML = textarea.value;
	}
	if (e.keyCode == 40 && git != commands.length) {
		git += 1;
		if (commands[git] === undefined) {
			textarea.value = '';
		} else {
			textarea.value = commands[git];
		}
		command.innerHTML = textarea.value;
	}
}

function commander(cmd) {
	switch (cmd.toLowerCase()) {
		case 'help':
			loopLines(help, 'color2 margin', 80);
			break;
		case 'whois':
			loopLines(whois, 'color2 margin', 80);
			break;
		case 'blog':
			loopLines(blog, 'color2 margin', 80);
			break;
		case 'projects':
			loopLines(projects, 'color2 margin', 80);
			break;
		case 'social':
			loopLines(social, 'color2 margin', 80);
			break;
		case 'history':
			addLine('<br>', '', 0);
			loopLines(commands, 'color2', 80);
			addLine('<br>', 'command', 80 * commands.length + 50);
			break;
		case 'clear':
			setTimeout(function () {
				terminal.innerHTML = '<a id="before"></a>';
				before = document.getElementById('before');
			}, 1);
			break;
		case 'home':
			loopLines(home, '', 80);
			break;
		// socials
		case 'mastadon':
			addLine('Opening Mastadon...', 'color2', 0);
			newTab(mastadon);
			break;
		case 'linkedin':
			addLine('Opening LinkedIn...', 'color2', 0);
			newTab(linkedin);
			break;
		case 'github':
			addLine('Opening GitHub...', 'color2', 0);
			newTab(github);
			break;
		default:
			addLine(
				'<span class="inherit">Command not found. For a list of commands, type <span class="command">\'help\'</span>.</span>',
				'error',
				100
			);
			break;
	}
}

function newTab(link) {
	setTimeout(function () {
		window.open(link, '_blank');
	}, 500);
}

function addLine(text, style, time) {
	var t = '';
	for (let i = 0; i < text.length; i++) {
		if (text.charAt(i) == ' ' && text.charAt(i + 1) == ' ') {
			t += '&nbsp;&nbsp;';
			i++;
		} else {
			t += text.charAt(i);
		}
	}
	setTimeout(function () {
		var next = document.createElement('p');
		next.innerHTML = t;
		next.className = style;

		before.parentNode.insertBefore(next, before);

		window.scrollTo(0, document.body.offsetHeight);
	}, time);
}

function loopLines(name, style, time) {
	name.forEach(function (item, index) {
		addLine(item, style, index * time);
	});
}
