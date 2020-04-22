## 30 Day Vanilla JavaScript Day 5
<p>Day 5 used CSS nested flex containers and items along with javascript to toggle classes to panel divs.</p>

<p>Also, the starter file referenced `<link href='https://fonts.googleapis.com/css?family=Amatic+SC' rel='stylesheet' type='text/css'>`
but I don't like getting stuff from external links if I can help it (in case in the future, the link breaks or something). So I added
fonts.css to the styles.</p>

<p>The same goes for the unsplash pictures, I added them to the imgs directory.</p>

This:
```css
.panel1 { background-image:url(https://source.unsplash.com/gYl-UtwNg_I/1500x1500); }
.panel2 { background-image:url(https://source.unsplash.com/rFKUFzjPYiQ/1500x1500); }
.panel3 { background-image:url(https://images.unsplash.com/photo-1465188162913-8fb5709d6d57?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&w=1500&h=1500&fit=crop&s=967e8a713a4e395260793fc8c802901d); }
.panel4 { background-image:url(https://source.unsplash.com/ITjiVXcwVng/1500x1500); }
.panel5 { background-image:url(https://source.unsplash.com/3MNzGlQM7qs/1500x1500); }
```

Became this:
```css
.panel1 {background-image: url("./imgs/panel1.jpg");}
.panel2 {background-image: url("./imgs/panel2.jpg");}
.panel3 {background-image: url("./imgs/panel3.jpg");}
.panel4 {background-image: url("./imgs/panel4.jpg");}
.panel5 {background-image: url("./imgs/panel5.jpg");}
```

## Code/Explaination:
The javascript that controls the toggling of the css classes: `open` and `open-active`.
```javascript
    // get all the panels in a NodeList
    const panels = document.querySelectorAll('.panel');

    function toggleOpen() {
        this.classList.toggle('open');
    }

    function toggleOpenActive(e) {
        // only toggle on flex-grow transition
        if(e.propertyName.includes('flex')) {
            this.classList.toggle('open-active');
        }
    }

    // toggleOpen is a reference to the toggleOpen() function
    // speficying toggleOpen() in the event listener would only run it on page load
    panels.forEach(panel => panel.addEventListener('click', toggleOpen));
    panels.forEach(panel => panel.addEventListener('transitionend', toggleOpenActive));
```

The css.
```css
.panels {
    min-height: 100vh;
    overflow: hidden;
    display: flex; /* shows panels side-by-side not up/down */
}

.panel {
    background: #6b0f9c;
    box-shadow: inset 0 0 0 5px rgba(255,255,255,0.1);
    color: #ffffff;
    text-align: center;
    align-items: center;

    /* This is the panels 'animation' */
    /* Safari transitioned event.propertyName === flex */
    /* Chrome + Firefox transitioned event.propertyName === flex-grow */
    transition:
        font-size 0.8s cubic-bezier(0.61,-0.19,0.7,-0.11),
        flex 0.7s cubic-bezier(0.61,-0.19,0.7,-0.11),
        background 0.2s;
    
    font-size: 20px;
    background-size: cover;
    background-position: center;
    flex: 1;	/* each panel will evenly distribute the extra display space (defined by display: flex; in .panels) */
    justify-content: center;
    display: flex;	/* nest flex box, this is a flex item because .panels is a flex container, .panel can also be a flex container by adding this */
    flex-direction: column-reverse;	/* make the flex elements stack in a reverse column */
    /*flex-direction: column;	/* make the flex elements stack in a column */
}

/* Flex Items */
.panel > * {
    margin: 0;
    width: 100%;
    transition: transform 0.5s;
    flex: 1 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* set first and last children to disappear off screen */
.panel > *:first-child {
    /* hide the first child above the visible 'screen' of browser */
    transform: translatey(100%);
}

.panel > *:last-child {
    /* hide the last child below the visible 'screen' of browser */
    transform: translatey(-100%);
}

/* set the open-active of the first and last child to bring the text back to the screen */
.panel.open-active > *:first-child {
    transform: translateY(0);
}

.panel.open-active > *:last-child {
    transform: translateY(0);
}

/* style of the middle <p> tag */
.panel p:nth-child(2) {
    font-size: 4em;
}

.panel.open {
    font-size: 40px;
    flex: 5;	/* expand the panel, take 5 times the amount of extra room as the other panels */
}
```