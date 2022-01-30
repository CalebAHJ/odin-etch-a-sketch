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

    container = document.querySelector('div.container');
    container.style.cssText = `grid-template-columns : repeat(${splitCount}, ${800/splitCount}px)`;
    container.style.cssText = `grid-template-rows : repeat(${splitCount}, ${800/splitCount}px)`;

    boxes = document.querySelectorAll('div.box');
    boxes.forEach(box => container.removeChild(box));

    gridify(splitCount);
}

function clear() {
    const boxes = document.querySelectorAll('div.box');
    boxes.forEach(box => box.classList.remove('hoverEffect'));
}

function erase() {
    document.querySelector('button#erase').classList.add('inUse');
    document.querySelector('button#draw').classList.remove('inUse');

    const boxes = document.querySelectorAll('div.box');
    boxes.forEach(box => box.addEventListener('mouseover', () => 
        box.classList.remove('hoverEffect')));
}

function draw() {
    document.querySelector('button#erase').classList.remove('inUse');
    document.querySelector('button#draw').classList.add('inUse');

    const boxes = document.querySelectorAll('div.box');
    boxes.forEach(box => box.addEventListener('mouseover', () => 
        box.classList.add('hoverEffect')));
}

// function shadeChange() {
//     const boxes = document.querySelectorAll('div.box');
//     boxes.forEach(box => box.addEventListener('mouseover', () => {
//         box.classList.remove('hoverEffect');

//         const boxColor = window.getComputedStyle(box).backgroundColor;
//         const newR = +boxColor.slice(4,5) + 17;
//         const newG = +boxColor.slice(7,8) + 17;
//         const newB = +boxColor.slice(10,11) + 17;
//         box.style.backgroundColor = `rgb(${newR}, ${newB}, ${newG})`;
//     }));
// }

gridify(16);
document.querySelector('button').addEventListener('click', resize);
document.querySelector('button#clear').addEventListener('click', clear);
document.querySelector('button#erase').addEventListener('click', erase);
document.querySelector('button#draw').addEventListener('click', draw);