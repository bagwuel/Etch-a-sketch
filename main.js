let matrix = 50
let column = matrix * matrix;

window.addEventListener('load', () => {
    pixelMaker(column)
})

const body = document.querySelector('body');
const container = document.createElement('div');
const controls = document.createElement('div');
const colorPicker = document.createElement('input');
const rainbow = document.createElement('input');
const matrixSelector = document.createElement('input');
const pencil = document.createElement('input');
const eraser = document.createElement('input');
const sketchContainer = document.createElement('div');
const sketchBoard = document.createElement('div');
const reset = document.createElement('button');
const rainbowLabel = document.createElement('label');
const pencilLabel = document.createElement('label');
const eraserLabel = document.createElement('label');
const matrixSelectorLabel = document.createElement('label');
const colorPickerLabel = document.createElement('label');
const colorPickerDIv = document.createElement('div');
const rainbowDiv = document.createElement('div');
const matrixSelectorDiv = document.createElement('div');
const pencilDiv = document.createElement('div');
const eraserDiv = document.createElement('div');
const resetDiv = document.createElement('div');

colorPickerDIv.append(colorPicker, colorPickerLabel);
rainbowDiv.append(rainbow, rainbowLabel);
pencilDiv.append(pencil, pencilLabel);
eraserDiv.append(eraser, eraserLabel);
matrixSelectorDiv.append(matrixSelector, matrixSelectorLabel);

const controlDivs = [colorPickerDIv, rainbowDiv, pencilDiv, eraserDiv, matrixSelectorDiv]
const controlChildren = [colorPickerDIv, rainbowDiv, pencilDiv, eraserDiv, matrixSelectorDiv, reset]

controls.className = 'controls'; 
container.className = 'container'; 
const matrixSelectorAttributes = {
    type: 'range',
    id: 'matrix_selector',
    min: '1',
    max: '100',
    name: 'matrix_selector'
}
const colorPickerAttributes = {
    type: 'color',
    id: 'color',
} 
const eraserAttributes = {
    type: 'radio',
    id: 'eraser',
    name: 'pencil-eraser',
    value: 'eraser'
}
const pencilAttributes = {
    type: 'radio',
    id: 'pencil',
    name: 'pencil-eraser',
    value: 'pencil',
    checked: true
}
const rainbowAttributes = {
    type: 'checkbox',
    name: 'rainbow',
    id: 'rainbow'
} 
sketchBoard.className = 'sketch_board';
sketchBoard.style.gridTemplateColumns = `repeat(${matrix}, 1fr)`;
sketchContainer.className = 'sketch_container';
reset.className = 'reset';
reset.textContent = 'Reset';

Object.assign(colorPicker, colorPickerAttributes);
Object.assign(rainbow, rainbowAttributes);
Object.assign(matrixSelector, matrixSelectorAttributes);
Object.assign(pencil, pencilAttributes);
Object.assign(eraser, eraserAttributes);

rainbowLabel.htmlFor = rainbow.id;
rainbowLabel.textContent = 'Rainbow';
pencilLabel.htmlFor = pencil.id;
pencilLabel.textContent = 'Pencil';
eraserLabel.htmlFor = eraser.id;
eraserLabel.textContent = 'Eraser';
matrixSelectorLabel.htmlFor = matrixSelector.id;
matrixSelectorLabel.textContent = 'Pencil Size';
colorPickerLabel.htmlFor = colorPicker.id;
colorPickerLabel.textContent = 'Color';

body.appendChild(container);
container.appendChild(sketchContainer);
container.appendChild(controls);
sketchContainer.appendChild(sketchBoard);

function pixelMaker(column) {
    for (let i = 0; i < column; i++) {
        let pixels = document.createElement('div');
        pixels.className = 'pixels';
        sketchBoard.appendChild(pixels);
        addevents(pixels);
    }
}

controlChildren.forEach(controlChild => {
    controls.appendChild(controlChild);
})

controlDivs.forEach(div => {
    div.className = 'çontrol_div';
    div.style.display = 'flex';
    div.style.flexDirection = 'column';
    div.style.gap = '10px';
});

colorPicker.addEventListener('change', (e) => {
    const pixels = document.querySelectorAll('.pixels')
    pixels.forEach(pixel => {
        addevents(pixel);
    })
    colorPickerLabel.style.color = e.target.value
})

const pencilEraser = () => {
    const radioButtons = document.getElementsByName("pencil-eraser");
    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            if (radioButtons[i].value === 'pencil')
                return(true);
            else
                return(false);
        }
    }
}

matrixSelector.addEventListener('change', (e) => {
    const removePreviousPixels = document.querySelectorAll('.pixels');
    removePreviousPixels.forEach(PreviousPixel => {
        sketchBoard.removeChild(PreviousPixel);
    })
    matrix = e.target.value;
    column = matrix * matrix
    sketchBoard.style.gridTemplateColumns = `repeat(${matrix}, 1fr)`;
    pixelMaker(column)
})

function addevents(element) {
    element.addEventListener('mouseenter', (e) => {
        const random = () => Math.floor(Math.random() * 256);
        if (pencilEraser()) {
            if (rainbow.checked) {
                element.style.backgroundColor = `rgba(${random()}, ${random()}, ${random()})`;
            }else {
                element.style.backgroundColor = colorPicker.value;
            }
        }else {
            element.style.backgroundColor = 'whitesmoke';
        }
    })
}

reset.addEventListener('click', () => {
    const pixels = document.querySelectorAll('.pixels')
    pixels.forEach(pixel => {
        pixel.style.backgroundColor = 'whitesmoke';
    })
})





