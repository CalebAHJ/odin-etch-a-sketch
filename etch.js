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
    boxes = document.querySelectorAll('div.box');
    boxes.forEach((box) => box.addEventListener('mouseover', 
        () => box.classList.add('hoverEffect')));
}

function resize() {
    splitCount = prompt("How many boxes would you like each side to have (Max:100)");
    if (splitCount > 100) splitCount = 100;

    container = document.querySelector('div.container');
    container.style.cssText = `grid-template-columns : repeat(${splitCount}, ${800/splitCount}px)`;
    container.style.cssText = `grid-template-rows : repeat(${splitCount}, ${800/splitCount}px)`;

    boxes = document.querySelectorAll('div.box');
    boxes.forEach((box) => container.removeChild(box));

    gridify(splitCount);
}

function clear() {
    boxes = document.querySelectorAll('div.box');
    boxes.forEach((box) => box.classList.remove('hoverEffect'));
}

gridify(16);
document.querySelector('button').addEventListener('click', resize);
document.querySelector('button#clear').addEventListener('click', clear);