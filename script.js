const NO_COLOR = 'rgb(255,255,255)';
const DEFAULT_COLOR = 'rgb(1,1,1)';
const DEFAULT_MODE = 'draw';
let currentColor = DEFAULT_MODE;

const slider = document.getElementById('slider');
const length = slider.getAttribute('value');
const pad = document.getElementById('pad');
const colorInput = document.getElementById('color');
const boxes = document.getElementsByClassName('box');


/* set sketch pad grid depending on the given length */
function setPadGrid(length) {
    pad.style.gridTemplateColumns = `repeat(${length}, 1fr)`;
    pad.style.gridTemplateRows = `repeat(${length}, 1fr)`;
    
    for(let i = 0; i < (length * length); i++) {
        const box = document.createElement('div');
        box.classList.add('box');
        pad.appendChild(box);
    }
    setEvent(DEFAULT_COLOR, DEFAULT_MODE);
}

/* set events */
function setEvent(color, mode) {
    /* set event on each boxes so that whe event happens it change the box color */
    /* when user click and hover the cursor on a div box it change its color to the chosen color*/
    if(mode === 'erase') {
        color = NO_COLOR;
    }
    let isDrawing = false;
    Array.from(boxes).forEach(box => {
        box.addEventListener('mousedown', () => {
            isDrawing = true;
            box.style.backgroundColor = color;
        });
    
        box.addEventListener('mouseup', () => {
            isDrawing = false;
        });
    
        box.addEventListener('mouseover', () => {
            if (isDrawing) {
                box.style.backgroundColor = color;
            }
        });
    });
}


/* clear the sketch pad */
function clearPad() {
    Array.from(boxes).forEach(box => {
        box.style.backgroundColor = NO_COLOR;
    });
}


/* set the current mode based on the selected mode */
function setMode(id) {
    const drawButton = document.getElementById('draw');
    const eraseButton = document.getElementById('erase');
    /* set active on current selected mode btn */
    if (id === 'draw') {
    drawButton.classList.add('active');
    eraseButton.classList.remove('active');
    } else if (id === 'erase') {
    eraseButton.classList.add('active');
    drawButton.classList.remove('active');
    }
    setEvent(currentColor, id); //changed the default_color to current color later
}



//!!ERROR
// when color input is changed
colorInput.addEventListener('input', () => {
    color = colorInput.value;
    updateColor(color);
});
  
function updateColor(newColor) {
    currentColor = newColor;
    //FIXED ERROR WHEN COLOR IS CHANGED
    setEvent(currentColor, DEFAULT_MODE);
}
  


window.onload = () => {
    setPadGrid(length);
}
