function gridify(splitCount) {
    for (let col = 1; col <= splitCount; col++) {
        for (let row = 1; row <= splitCount; row++) {
            const div = document.createElement('div');
            div.classList.add('box');
            const SIDE_LENGTH = 800 / splitCount;
            div.style.height = `${SIDE_LENGTH}px`;
            div.style.width = `${SIDE_LENGTH}px`;
            document.querySelector('.container').appendChild(div);
        }
    }
    draw();
}

function resize() {
    const splitCount = prompt("How many boxes would you like each side to have (Max:100)");
    if (splitCount > 100) splitCount = 100;
    if (splitCount < 1) splitCount = 1;

    const SIDE_LENGTH = 800 / splitCount;

    container = document.querySelector('div.container');
    container.style.cssText = `grid-template-columns : repeat(${splitCount}, ${SIDE_LENGTH}px)`;
    container.style.cssText = `grid-template-rows : repeat(${splitCount}, ${SIDE_LENGTH}px)`;

    boxes = document.querySelectorAll('div.box');
    boxes.forEach(box => container.removeChild(box));

    gridify(splitCount);
}

function clear() {
    const boxes = document.querySelectorAll('div.box');
    boxes.forEach(box => {
        box.classList.remove('hoverEffect');
        box.classList.remove('erased');
        box.style.color = 'white';
        box.style.opacity = 0;
});
}

function erase() {
    document.querySelector('button#erase').classList.add('inUse');
    document.querySelector('button#draw').classList.remove('inUse');
    document.querySelector('button#tone').classList.remove('inUse');
    document.querySelector('button#rainbow').classList.remove('inUse');

    const boxes = document.querySelectorAll('div.box');
    boxes.forEach(box => box.addEventListener('mouseover', () => {
        box.classList.remove('hoverEffect');
        box.classList.add('erased');
        box.style.opacity = 0;
    }, {once : true}));
}

function draw() {
    document.querySelector('button#erase').classList.remove('inUse');
    document.querySelector('button#draw').classList.add('inUse');
    document.querySelector('button#tone').classList.remove('inUse');
    document.querySelector('button#rainbow').classList.remove('inUse');

    const boxes = document.querySelectorAll('div.box');
    boxes.forEach(box => box.addEventListener('mouseover', () => {
        box.classList.remove('erased');
        if (document.querySelector('button#rainbow').classList.contains('inUse')) {
            box.style.backgroundColor = randomColor();
        }
        else {
            box.classList.add('hoverEffect');
            box.style.color = 'black';
        }
        box.style.opacity = 1;
    }, {once : true}));
}

function shadeChange() {
    document.querySelector('button#draw').classList.remove('inUse');
    document.querySelector('button#erase').classList.remove('inUse');
    document.querySelector('button#tone').classList.add('inUse');

    const boxes = document.querySelectorAll('div.box');
    boxes.forEach(box => box.addEventListener('mouseover', () => {
        box.classList.remove('hoverEffect');
        box.classList.remove('erased');
    }, {once : true}));
    boxes.forEach(box => box.addEventListener('mouseover', () => {
        if (document.querySelector('button#tone').classList.contains('inUse')) 
        {
            if (!box.classList.contains('erased')) {
                if (document.querySelector('button#rainbow').classList.contains('inUse')) {
                    if (box.style.color == 'white') box.style.color = randomColor();
                }
                else box.style.backgroundColor = 'black';
                const currentShade = box.style.opacity;
                if (currentShade === "1" || currentShade === "") box.style.opacity = 0;
                else box.style.opacity = parseFloat(currentShade) + .1;
            }
        }
    }));
}

function color() {
    document.querySelector('button#rainbow').classList.add('inUse');
}

function randomColor() {
    const R_VALUE = Math.floor(Math.random() * 255);
    const B_VALUE = Math.floor(Math.random() * 255);
    const G_VALUE = Math.floor(Math.random() * 255);
    return 'rgb(' + R_VALUE + ', ' + B_VALUE + ', ' + G_VALUE + ')';
}

gridify(16);
document.querySelector('button').addEventListener('click', resize);
document.querySelector('button#clear').addEventListener('click', clear);
document.querySelector('button#erase').addEventListener('click', erase);
document.querySelector('button#draw').addEventListener('click', draw);
document.querySelector('button#tone').addEventListener('click', shadeChange);
document.querySelector('button#rainbow').addEventListener('click', color);