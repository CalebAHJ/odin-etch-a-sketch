for (let col = 1; col < 17; col++) {
    for (let row = 1; row < 17; row++) {
        const div = document.createElement('div');
        div.textContent = col.toString() + row.toString();
        document.querySelector('.container').appendChild(div);
    }
}