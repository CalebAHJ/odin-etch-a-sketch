function gridify(splitCount) {
    for (let col = 1; col <= splitCount; col++) {
        for (let row = 1; row <= splitCount; row++) {
            const div = document.createElement('div');
            div.classList.add('box');
            div.style.cssText = `grid-column: ${col}`;
            div.style.cssText = `grid-row: ${row}`;
            document.querySelector('.container').appendChild(div);
        }
    }
    draw();
}

function resize() {
    splitCount = prompt("How many boxes would you like each side to have (Max:100)");
    if (splitCount > 100) splitCount = 100;
    if (splitCount < 1) splitCount = 1;

    container = document.querySelector('div.container');
    container.style.cssText = `grid-template-columns : repeat(${splitCount}, ${800/splitCount}px)`;
    container.style.cssText = `grid-template-rows : repeat(${splitCount}, ${800/splitCount}px)`;

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

    const boxes = document.querySelectorAll('div.box');
    boxes.forEach(box => box.addEventListener('mouseover', () => {
        box.classList.remove('erased');
        box.classList.add('hoverEffect');
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
        if (!box.classList.contains('hoverEffect')) 
        {
            if (!box.classList.contains('erased')) {
                box.style.backgroundColor = 'black';
                const currentShade = box.style.opacity;
                if (currentShade === "1" || currentShade === "") box.style.opacity = 0;
                else box.style.opacity = parseFloat(currentShade) + .1;
            }
        }
    }));
}

gridify(16);
document.querySelector('button').addEventListener('click', resize);
document.querySelector('button#clear').addEventListener('click', clear);
document.querySelector('button#erase').addEventListener('click', erase);
document.querySelector('button#draw').addEventListener('click', draw);
document.querySelector('button#tone').addEventListener('click', shadeChange);