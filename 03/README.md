## 30 Day Vanilla JavaScript Day 3
<p>Day 3 involved css variables and javascript.</p>

## Code:
```javascript
// get all form inputs in the form of a NodeList (like an array but different)
// a node list has less prototype features
/*
From MDN:
    NodeList objects are collections of nodes, usually returned by properties 
    such as Node.childNodes and methods such as document.querySelectorAll().

    Although NodeList is not an Array, it is possible to iterate over it 
    with forEach(). It can also be converted to a real Array using Array.from().
*/
const inputs = document.querySelectorAll('.controls input');

function handleUpdate() {
    // this.dataset contains all of the data- variables defined in the html element
    // this comes from the querySelectorAll call
    const suffix = this.dataset.sizing || '';

    // get the root element property using the substitution string with this.name
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}

inputs.forEach(input => input.addEventListener('change', handleUpdate));
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));
```

```css
:root {
	/* css variable declaration/initializations */
	--base: #ffc600;
	--spacing: 10px;
	--blur: 10px;
}

img {
	/* to use a variable, call var(--variableName) */
	padding: var(--spacing);
	background: var(--base);
	filter: blur(var(--blur));
}

.hl {
	color: var(--base);
}

a {
	color: var(--base);
	text-decoration: none;
}
```

## Explanation:
In the css `:root`, there are 3 variables defined. From the javascript, we change them in the `handleUpdate()` function.