for (let col = 1; col < 17; col++) {
    for (let row = 1; row < 17; row++) {
        const div = document.createElement('div');
        div.classList.add('box');
        div.textContent = col.toString() + row.toString();
        document.querySelector('.container').appendChild(div);
    }
}

boxes = document.querySelectorAll('div.box');
boxes.forEach((box) => box.addEventListener('mouseover', 
    () => box.classList.toggle('hoverEffect')));