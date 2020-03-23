## 30 Day Vanilla JavaScript Day 1
<p>Day 1 involved creating a drum machine to explore how to use key listeners.</p>

```javascript
function playSound(e) {
	// get the audio element based on keydown key code
	// the `` is an es6 template string like the $"" in c# where you can insert ${} variables!
	// this is why I took this course, to refresh my javascript knowledge!
	const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
	const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
	
	if(!audio) return;	// no audio, return
	
	audio.currentTime = 0;	// rewind to the start of the audio
	audio.play();
	
	// add the playing class to the key
	key.classList.add('playing');
}

function removeTransition(e) {
	if (e.propertyName !== 'transform') return; 	// skip if its not a transform
	
	// this = the element that got called, in this case, it's the 'key' you pressed
	this.classList.remove('playing');
}

// add event listeners to all of the keys, this has to be done in a foreach loop
// because you have to attach a listener to each item in keys
const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));

// add event listener to the window to catch keydowns
window.addEventListener('keydown', playSound);
```

```javascript
const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
```
<p>
This gets all document elements that match the pattert `audio[data-key="${e.keyCode}"]`.
The `${e.keyCode}` in the string is like the variable specifier in strings for .NET.
</p>

```javascript
key.classList.add('playing');
this.classList.remove('playing');
```
<p>
These two lines add or remove a css class to an element.
</p>
