
// target elements with the "draggable" class
interact('.draggable')
    .draggable({
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        modifiers: [
            interact.modifiers.restrictRect({
                restriction: 'parent',
                endOnly: true
            })
        ],
        // enable autoScroll
        autoScroll: true,

        listeners: {
            // call this function on every dragmove event
            move: dragMoveListener,

            // call this function on every dragend event
        }
    })
let xCoor = 0;
let yCoor = 0;
function dragMoveListener(event) {
    var target = event.target
    // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

    // translate the element
    target.style.webkitTransform =
        target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)'

    // update the posiion attributes
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
}

// this function is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener


let point1 = [];
let point2 = [];

let variable = 0;
let activatedDrawer = 'false';
function drawer(e) {
    let elID = e.target.closest('div').getAttribute('id');
    if (activatedDrawer == 'true') {
        if (!point1[variable]) {
            point1.push(elID);

        } else {
            point2.push(elID);
            drawLine(point1[variable], point2[variable]);
            variable++;
            activatedDrawer = 'false';
        }
    }
}

function drawLine(p1, p2) {
    let id = [p1, p2]
    let x1 = document.getElementById(p1).getAttribute('data-x');
    let y1 = document.getElementById(p1).getAttribute('data-y');
    let x2 = document.getElementById(p2).getAttribute('data-x');
    let y2 = document.getElementById(p2).getAttribute('data-y');
    canvasDraw(x1, y1, x2, y2, id);

}
let canvasVar = 1;
function canvasDraw(x1, y1, x2, y2, id) {
    let dashed = prompt('What type of line? Write number 1 - line, 2 - dotted, 3 - delete line')

    let elem = document.createElement('canvas');
    elem.id = id[0] + '-' + id[1];
    document.querySelector('.main-field').appendChild(elem);

    const canvas = document.getElementById(id[0] + '-' + id[1])
    const context = canvas.getContext('2d')


    let width = canvas.width = innerWidth
    let height = canvas.height = innerHeight


    context.clearRect(0, 0, width, height)
    if (dashed == 2) {
        context.setLineDash([4, 16]);
    } else if (dashed == 3) {
        document.getElementById(id[0] + '-' + id[1]).remove()
        return false
    }
    context.beginPath()
    context.moveTo(+x1 + 25, +y1 + 25)
    context.lineTo(+x2 + 25, +y2 + 25)
    context.stroke()
    canvasVar++;
}

let elemsID = 0;
let deleteElems = []


function createElem(e) {
    let div = document.createElement('div')

    let p = document.createElement('p')
    let img = document.createElement('img')
    div.id = elemsID

    div.setAttribute('class', 'draggable created-elem nice')
    img.setAttribute('src', e.target.src)


    div.addEventListener('dblclick', function (e) {
        let elem = e.target.closest('div')
        elem.remove();
        if (deleteElems.length == 0) {
            deleteElems.push(elem.getAttribute('id'))
        } else {
            deleteElems.push(elem.getAttribute('id'))
            console.log(document.getElementById(deleteElems[0] + '-' + deleteElems[1]))
            let lineDel = document.getElementById(deleteElems[0] + '-' + deleteElems[1])
            lineDel.remove()
            deleteElems = []
        }
    })

    img.oncontextmenu = function (e) {
        let comm = prompt('Write comment');
        p.innerHTML = comm;
        return false;
    };


    div.appendChild(img);
    div.appendChild(p);
    document.querySelector('.main-field').appendChild(div);
    elemsID++;

}
document.getElementById('btn-line').addEventListener('click', function (e) {
    document.querySelectorAll('.draggable').forEach(function (elem) {
        elem.addEventListener('click', drawer)
    })
    activatedDrawer = 'true';
})

let elements = document.querySelectorAll('.add-elem');
elements.forEach(function (btn) {
    btn.addEventListener('click', createElem);
})
