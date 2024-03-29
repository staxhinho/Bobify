var move = document.querySelector(".dot");

move.addEventListener("mousedown", mousedown);

function mousedown() {
    move.addEventListener("mousemove", mousemove);
    function mousemove(e) {
        var x = e.clientX + "px";
        this.style.left = x;
    }
}

