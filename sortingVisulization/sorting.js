
function listGen() {
    var l = document.getElementsById('length').value;
    if (l <= 0) return;
    var arr = [];
    for (var i = 0; i < l; i++) 
        arr.push(Math.floor(Math.random()*l) + 1);
}

function bubbleSort(arr) {
    var c = arr.length() - 1;
    var change = false;
    var i;
    for (i = 0, change = false; i < c; i++) {
        if (arr[i] > arr[i + 1]) {
            change = true;
            var v = arr[i];
            arr[i] = arr[i + 1];
            arr[i + 1] = v;
        }
    }
}

