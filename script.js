const NO_COLOR = 'rgb(255,255,255)';
const DEFAULT_COLOR = 'rgb(1,1,1)';
const DEFAULT_MODE = 'draw';
let currentColor = DEFAULT_MODE;

const gridSizeSlider = document.getElementById('slider');
const gridSize = gridSizeSlider.getAttribute('value');
const pad = document.getElementById('pad');
const colorInput = document.getElementById('color');
const boxes = document.getElementsByClassName('box');


/* set sketch pad grid depending on the given size */
function setPadGrid(size) {
    pad.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    pad.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    
    for(let i = 0; i < (size * size); i++) {
        const box = document.createElement('div');
        box.classList.add('box');
        pad.appendChild(box);
    }
    setEvent(DEFAULT_COLOR, DEFAULT_MODE);
}

/* set the current mode based on the selected mode button */
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
    setEvent(currentColor, id);
}

/* set events on each div boxes that changed their background when events(like mouseover) happened */
function setEvent(color, mode) {
    //when user click and hover the cursor on a div box it change its color to the chosen color
    if(mode === 'erase') {
        color = NO_COLOR;
    }  
    let isDrawing = false;
    Array.from(boxes).forEach(box => {
        //when cursor press the box it changed its background-color
        box.addEventListener('mousedown', () => {
            box.style.backgroundColor = color;
            box.style.cursor = 'crosshair';
            isDrawing = true;
        });
        //when cursor press is released 
        box.addEventListener('mouseup', () => {
            box.style.cursor = 'default';
            isDrawing = false;
        });
        //when cursor is pressing a box and hover it to other boxes it changed thier background-color
        box.addEventListener('mouseover', () => {
            if (isDrawing) {
                box.style.backgroundColor = color;
                box.style.cursor = 'crosshair';
            }
        });
        // When cursor is not pressed or hovering, set the cursor back to default
        box.addEventListener('mouseleave', () => {
            box.style.cursor = 'default';
        });
    });
}


/* clear the sketch pad */
function clearPad() {
    Array.from(boxes).forEach(box => {
        box.style.backgroundColor = NO_COLOR;
    });
}


/* when color input is changed update currentColor */
colorInput.addEventListener('input', () => {
    color = colorInput.value;
    updateColor(color);
});
function updateColor(newColor) {
    currentColor = newColor;
    setEvent(currentColor, DEFAULT_MODE);
}


/* set pad everytime the page is realoaded */
window.onload = () => {
    setPadGrid(gridSize);
}
