function gridify(splitCount) {
    for (let col = 1; col <= splitCount; col++) {
        for (let row = 1; row <= splitCount; row++) {
            const div = document.createElement('div');
            div.classList.add('box');
            div.style.cssText = `grid-column: ${col}`;
            div.style.cssText = `grid-row: ${row}`;
            div.textContent = col.toString() + row.toString();
            div.style.cssText = 'color: white';
            document.querySelector('.container').appendChild(div);
        }
    }
    boxes = document.querySelectorAll('div.box');
    boxes.forEach((box) => box.addEventListener('mouseover', 
        () => box.classList.toggle('hoverEffect')));
}

function resize() {
    splitCount = prompt("How many boxes would you like each side to have (Max:100)");
    if (splitCount > 100) splitCount = 100;

    container = document.querySelector('div.container');
    container.style.cssText = `grid-template-columns : repeat(${splitCount}, 1fr)`;
    container.style.cssText = `grid-template-rows : repeat(${splitCount}, 1fr)`;

    boxes = document.querySelectorAll('div.box');
    boxes.forEach((box) => container.removeChild(box));

    gridify(splitCount);
}

gridify(16);
document.querySelector('button').addEventListener('click', resize);