function sleep(ms) {
    return new Promise(resolve => window.setTimeout(resolve, ms));
}

function refresh(movm, comp) {
    document.getElementById('comparisons').innerHTML = comp;
    document.getElementById('movements').innerHTML = movm;
    document.getElementById('runtime').innerHTML = ((new Date()).getTime() - glob_stime) / 1000.0;
}

//..........................................  FOR CHANGE THE THEME ......................................................//
function changeTheme(theme) {
    var xhtp = new XMLHttpRequest();
    xhtp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementsByTagName('style')[0].innerHTML = this.responseText;
        }
    }
    var avThemes = ["dark", "light"];
    if (!avThemes.includes(theme))
        return -1;

    glob_theme = theme;
    if (document.getElementById('theme_in')!==null)
        document.getElementById('theme_in').value = theme;
    xhtp.open("GET", "themes/" + theme + ".css");
    xhtp.send();
}

//........................................ FOR DISPLAY ARRAY PILLARS ......................................................//
function display_array_pillars(arr, focused_els_i) {
    focused_els_i = focused_els_i || [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let scale = canvas.height / Math.max(...arr);
    for (let i = canvas.width / (arr.length + 1); i <= canvas.width; i += canvas.width / (arr.length + 1)) {
        ctx.beginPath();
        ctx.strokeStyle = focused_els_i.includes(Math.floor(i / (canvas.width / (arr.length + 1)))) ? "red" : glob_themes[glob_theme]["color"];
        ctx.lineWidth = focused_els_i.includes(Math.floor(i / (canvas.width / (arr.length + 1)))) ? 4 : 2;

        ctx.moveTo(i, canvas.height);
        ctx.lineTo(i, canvas.height - (arr[Math.floor(i / (canvas.width / (arr.length + 1))) - 1] * scale));
        ctx.stroke();
    }
}

//......................................... DISPLAY ARRAY COLOR PILLARS ......................................................//
function display_array_color_pillars(arr) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let scale = canvas.height / Math.max(...arr);

    let line_weight = 2,
        arr_max = Math.max(...arr);
    for (let i = canvas.width / (arr.length - 1); i <= canvas.width; i += canvas.width / (arr.length - 1)) {
        ctx.beginPath();
        ctx.strokeStyle = "hsl(" + arr[Math.floor(i / (canvas.width / (arr.length - 1)))] * (360 / arr_max) + ", 100%, 50%)";
        ctx.lineWidth = line_weight;
        ctx.moveTo(i, canvas.height);
        ctx.lineTo(i, canvas.height - (arr[Math.floor(i / (canvas.width / (arr.length - 1))) - 1] * scale));
        ctx.stroke();
    }
}

//............................................ DISPLAY ARRAY PYRAMID ..............................................................//
function display_array_pyramid (arr, focused_els_i) {
    focused_els_i = focused_els_i || [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let scale = canvas.width / Math.max(...arr);
    for (let i = canvas.height / (arr.length + 1); i <= canvas.height; i += canvas.height / (arr.length + 1)) {
        ctx.beginPath();
        ctx.strokeStyle = focused_els_i.includes(Math.floor(i / (canvas.width / (arr.length + 1)))) ? "red" : glob_themes[glob_theme]["color"];
        ctx.lineWidth = focused_els_i.includes(Math.floor(i / (canvas.width / (arr.length + 1)))) ? 4 : 2;
        ctx.moveTo(canvas.width/2-(arr[Math.floor(i / (canvas.width / (arr.length + 1))) - 1] * scale)/2, i);
        ctx.lineTo(canvas.width/2+(arr[Math.floor(i / (canvas.width / (arr.length + 1))) - 1] * scale)/2, i);
        ctx.stroke();
    }
}

//....................................... DISPLAY ARRAY COLOR PYRAMID ....................................................//
function display_array_color_pyramid (arr) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let scale = canvas.height / Math.max(...arr);
    let line_weight = 2,
        arr_max = Math.max(...arr);
    for (let i = canvas.width / (arr.length - 1); i <= canvas.width; i += canvas.width / (arr.length - 1)) {
        ctx.beginPath();
        ctx.strokeStyle = "hsl(" + arr[Math.floor(i / (canvas.width / (arr.length - 1)))] * (360 / arr_max) + ", 100%, 50%)";
        ctx.lineWidth = line_weight;
        ctx.moveTo(canvas.width/2-(arr[Math.floor(i / (canvas.width / (arr.length + 1))) - 1] * scale)/2, i);
        ctx.lineTo(canvas.width/2+(arr[Math.floor(i / (canvas.width / (arr.length + 1))) - 1] * scale)/2, i);
        ctx.stroke();
    }
}

//........................................ FOR DISPLAY ARRAY PILLAR SPIRAL .........................................................//
function display_array_pillar_spiral(arr, focused_els_i) {
    focused_els_i = focused_els_i || [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 360 / (arr.length - 1), c = 0; i < 360; i += 360 / (arr.length - 1), c++) {
        ctx.beginPath();
        ctx.strokeStyle = focused_els_i.includes(Math.floor(i / (canvas.width / (arr.length + 1)))) ? "red" : glob_themes[glob_theme]["color"];
        ctx.lineWidth = focused_els_i.includes(Math.floor(i / (canvas.width / (arr.length + 1)))) ? 4 : 2;
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.lineTo((canvas.width / 2) + arr[c] * Math.cos(Math.PI * i / 180.0), (canvas.height / 2) + arr[c] * Math.sin(Math.PI * i / 180.0));
        ctx.stroke();
    }
}

//....................................... DISPLAY ARRAY COLOR PILLAR SPIRAL ...........................................//
function display_array_color_pillar_spiral(arr) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let line_weight = 2,
        arr_max = Math.max(...arr);
    for (let i = 360 / (arr.length - 1), c = 0; i < 360; i += 360 / (arr.length - 1), c++) {
        ctx.beginPath();
        ctx.strokeStyle = "hsl(" + arr[c] * (360 / arr_max) + ", 100%, 50%)";
        ctx.lineWidth = line_weight;
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.lineTo((canvas.width / 2) + arr[c] * Math.cos(Math.PI * i / 180.0), (canvas.height / 2) + arr[c] * Math.sin(Math.PI * i / 180.0));
        ctx.stroke();
    }
}

//.......................................... DISPLAY ARRAY COLOR CIRCLE ...........................................................//
function display_array_color_circle(arr) {
    let arr_max = Math.max(...arr),
        line_weight = 3;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let r = canvas.width / 3;
    for (let i = 360 / (arr.length - 1), c = 0; i < 360; i += 360 / (arr.length - 1), c++) {
        ctx.beginPath();

        ctx.strokeStyle = "hsl(" + arr[c] * (360 / arr_max) + ", 100%, 50%)";
        ctx.lineWidth = line_weight;

        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.lineTo((canvas.width / 2) + r * Math.cos(Math.PI * i / 180.0), (canvas.height / 2) + r * Math.sin(Math.PI * i / 180.0));
        ctx.stroke();
    }
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
}

//............................................ DISPLAY ARRAY ARRAY DOTS ........................................................//
function display_array_dots(arr, focused_els_i) {
    focused_els_i = focused_els_i || [];
    let radius = 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let scale = canvas.height / Math.max(...arr);

    for (let i = canvas.width / (arr.length - 1); i < canvas.width; i += canvas.width / (arr.length - 1)) {
        ctx.beginPath();
        ctx.fillStyle = focused_els_i.includes(Math.floor(i / (canvas.width / (arr.length + 1)))) ? "red" : glob_themes[glob_theme]["color"];

        ctx.ellipse(i, canvas.height - (arr[Math.floor(i / (canvas.width / (arr.length - 1)))] * scale),
            focused_els_i.includes(Math.floor(i / (canvas.width / (arr.length + 1)))) ? 2 * radius : radius,
            focused_els_i.includes(Math.floor(i / (canvas.width / (arr.length + 1)))) ? 2 * radius : radius, 0, 0, 2 * Math.PI);
        ctx.fill();
    }
}

//............................................. DISPLAY ARRAY COLOR DOTS ...........................................................//
function display_array_color_dots(arr) {
    let radius = 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let scale = canvas.height / Math.max(...arr),
        arr_max = Math.max(...arr);

    for (let i = canvas.width / (arr.length - 1); i < canvas.width; i += canvas.width / (arr.length - 1)) {
        ctx.beginPath();
        ctx.fillStyle = "hsl(" + arr[Math.floor(i / (canvas.width / (arr.length - 1)))] * (360 / arr_max) + ", 100%, 50%)";
        ctx.ellipse(i, canvas.height - (arr[Math.floor(i / (canvas.width / (arr.length - 1)))] * scale), radius, radius, 0, 0, 2 * Math.PI);
        ctx.fill();
    }
}

//............................................. DISPLAY ARRAY DOT SPIRAL ........................................................//
function display_array_dots_spiral(arr, focused_els_i) {
    focused_els_i = focused_els_i || [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let radius = 2;

    for (let i = 360 / (arr.length - 1),c= 0;i<360; i += 360 / (arr.length - 1), c++) {
        ctx.beginPath();
        ctx.fillStyle = focused_els_i.includes(Math.floor(i / (canvas.width / (arr.length + 1)))) ? "red" : glob_themes[glob_theme]["color"];

        ctx.ellipse((canvas.width / 2) + arr[c] * Math.cos(Math.PI * i / 180.0), (canvas.height / 2) + arr[c] * Math.sin(Math.PI * i / 180.0),
            focused_els_i.includes(Math.floor(i / (canvas.width / (arr.length + 1)))) ? 2 * radius : radius,
            focused_els_i.includes(Math.floor(i / (canvas.width / (arr.length + 1)))) ? 2 * radius : radius, 0, 0, 2 * Math.PI);
        ctx.fill();
    }
}

//............................................ DISPLAY ARRAY COLOR DOTS SPIRAL ...............................................................//
function display_array_color_dots_spiral(arr) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let radius = 2;
        arr_max = Math.max(...arr);

    for (let i = 360 / (arr.length - 1), c = 0; i < 360; i += 360 / (arr.length - 1), c++) {
        ctx.beginPath();
        ctx.fillStyle = ctx.fillStyle = "hsl(" + arr[Math.floor(i / (canvas.width / (arr.length - 1)))] * (360 / arr_max) + ", 100%, 50%)";
        ctx.ellipse((canvas.width / 2) + arr[c] * Math.cos(Math.PI * i / 180.0), (canvas.height / 2) + arr[c] * Math.sin(Math.PI * i / 180.0), radius,
            radius, 0, 0, 2 * Math.PI);
        ctx.fill();
    }
}

//......................................... DISPLAY ARRAY COLOR CIRCLE DOTS ....................................................//
function display_array_color_circle_dots(arr) {
    let arr_max = Math.max(...arr),
        radius = 3;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let r = canvas.width / 3;

    for (let i = 360 / (arr.length - 1), c = 0; i < 360; i += 360 / (arr.length - 1), c++) {
        ctx.beginPath();
        ctx.fillStyle = "hsl(" + arr[c] * (360 / arr_max) + ", 100%, 50%)";

        ctx.ellipse((canvas.width / 2) + r * Math.cos(Math.PI * i / 180.0), (canvas.height / 2) + r * Math.sin(Math.PI * i / 180.0), radius,
            radius, 0, 0, 2 * Math.PI);
        ctx.fill();
    }

    ctx.fillStyle = "black";
    ctx.lineWidth = 1;
}

//....................................... DISPLAY DRAW RANDOM ...............................................//
function draw_random(amount, upper, lower, display) {
    arr = [];
    lower = lower || glob_lower;
    upper = upper || glob_upper;
    for (let i = 0; i < amount; i++)
        arr.push(lower + Math.floor(Math.random() * (upper - lower)));
    display(arr);
    return arr;
}

//...................................... DISPLAY DRAW SEMI RANDOM .....................................................//
function draw_semi_random(amount, upper, lower, display) {
    arr = [...Array(upper).keys()].splice(lower);

    for (let i = 0; i < arr.length; i++) {
        let temp = arr[i],
            rindex = Math.floor(Math.random() * arr.length);

        arr[i] = arr[rindex];
        arr[rindex] = temp;
    }
    display(arr);

    return arr;
}

// ------------------------------ GLOBALS ------------------------------------------------- //
var glob_amount = 256,
    glob_lower = 0,
    glob_upper = 150,
    glob_sleep_time = 1,
    glob_sleep_between = 1000,
    glob_display_func = display_array_color_circle,
    glob_random_func = draw_semi_random,
    glob_stime = (new Date()).getTime(),
    glob_theme = "light",
    glob_themes = {
        "light": {
            "color": "dimgray"
        },
        "dark": {
            "color": "white"
        }
    };

var glob_comp = 0,
    glob_movm = 0;


// ---------------------------------------------------------------------------------------------------- //
async function doSortingAlgo(f) {
    document.getElementById('algorithm_settings').style.display = "none";

    glob_comp = 0;
    glob_movm = 0;

    refresh(0, 0);
    rarr = glob_random_func(glob_amount, glob_upper, glob_lower, glob_display_func);
    await f(rarr);

    glob_display_func(rarr);

    glob_comp = 0;
    glob_movm = 0;

    document.getElementById('algorithm_settings').style.display = "block";
}


// ----------------------------------------ALL SORT-------------------------------------------//
                    // -- COUNTING SORT -- //
async function doCountingSort(rarr) {
    document.getElementById('algorithm_div').innerHTML = "CountingSort";
    await cSort(rarr, glob_display_func);
}

                    // -- QUICKSORT -- // 
async function doQuickSort(rarr) {
    document.getElementById('algorithm_div').innerHTML = "QuickSort";
    await qSort(rarr, 0, rarr.length - 1, glob_display_func)
}

                // -- INSERTION SORT -- //
async function doInsertionSort(rarr) {
    document.getElementById('algorithm_div').innerHTML = "InsertionSort";
    await iSort(rarr, glob_display_func);
}

                // -- SELECTION SORT -- //
async function doSelectionSort(rarr) {
    document.getElementById('algorithm_div').innerHTML = "SelectionSort";
    await sSort(rarr, glob_display_func);
}

                // -- BUBBLE SORT -- //
async function doBubbleSort(rarr) {
    document.getElementById('algorithm_div').innerHTML = "BubbleSort";
    await bSort(rarr, glob_display_func);
}

                // -- HEAPSORT -- // 
async function doHeapSort(rarr) {
    document.getElementById('algorithm_div').innerHTML = "HeapSort";
    await hSort(rarr, glob_display_func);
}

                // -- RADIX SORT -- //
async function doRadixSort_i(rarr) {
    document.getElementById('algorithm_div').innerHTML = "RadixSort [with InsertionSort]";
    await rSort_i(rarr, glob_display_func);
}

                // -- RADIX SORT -- //
async function doRadixSort_c(rarr) {
    document.getElementById('algorithm_div').innerHTML = "RadixSort [with CountingSort]";
    await rSort_c(rarr, glob_display_func);
}

                // -- BITONIC SORT -- //
async function doBitonicSort(rarr) {
    document.getElementById('algorithm_div').innerHTML = "BitonicSort";
    await bitSort(rarr, glob_display_func);
}

                // -- SHELL SORT -- //
async function doShellSort(rarr) {
    document.getElementById('algorithm_div').innerHTML = "ShellSort";
    await shellSort(rarr, glob_display_func);
}

                // -- MERGE SORT -- //
async function doMergeSort(rarr) {
    document.getElementById('algorithm_div').innerHTML = "MergeSort";
    await mergeSort(rarr, 0, rarr.length - 1, glob_display_func);
}

                // -- BOGO SORT -- //
async function doBogoSort(rarr) {
    document.getElementById('algorithm_div').innerHTML = "BogoSort";
    await bogoSort(rarr, glob_display_func);
}

                // -- COCKTAIL SORT -- //
async function doCocktailSort(rarr) {
    document.getElementById('algorithm_div').innerHTML = "CocktailShaker-Sort";
    await cocktailSort(rarr, glob_display_func);
}

                // -- GNOME SORT -- //
async function doGnomeSort(rarr) {
    document.getElementById('algorithm_div').innerHTML = "GnomeSort";
    await gnomeSort(rarr, glob_display_func);
}

                // -- COMB SORT -- //
async function doCombSort(rarr) {
    document.getElementById('algorithm_div').innerHTML = "CombSort";
    await combSort(rarr, glob_display_func);
}

                // -- TREE SORT -- //
async function doTreeSort(rarr) {
    document.getElementById('algorithm_div').innerHTML = "TreeSort";
    await treeSort(rarr, glob_display_func);
}

                // -- INTRO SORT -- //
async function doIntroSort(rarr) {
    document.getElementById('algorithm_div').innerHTML = "IntroSort";
    await introSort(rarr, glob_display_func);
}

                // -- SLOW SORT -- //
async function doSlowSort(rarr) {
    document.getElementById('algorithm_div').innerHTML = "SlowSort";
    await slowSort(rarr, 0, rarr.length - 1, glob_display_func);
}

                // -- STOOGE SORT -- //
async function doStoogeSort(rarr) {
    document.getElementById('algorithm_div').innerHTML = "StoogeSort";
    await stoogeSort(rarr, 0, rarr.length - 1, glob_display_func);
}

                // -- DOUBLE SELECTION SORT -- //
async function doDSelectionSort(rarr) {
    document.getElementById('algorithm_div').innerHTML = "Double SelectionSort";
    await dSelectionSort(rarr, glob_display_func);
}

                // -- GRAVITY SORT -- //
async function doGravitySort(rarr) {
    document.getElementById('algorithm_div').innerHTML = "GravitySort";
    await gravitySort(rarr, glob_display_func);
}

                // -- COCKTAIL-MERGE SORT -- //
async function doCocktailMergeSort(rarr) {
    document.getElementById('algorithm_div').innerHTML = "Cocktail-MergeSort";
    await cmSort(rarr, 0, rarr.length - 1, Math.floor(rarr.length / 8), glob_display_func);
}

                // -- QUICK-MERGE SORT -- //
async function doQuickMergeSort(rarr) {
    document.getElementById('algorithm_div').innerHTML = "Quick-MergeSort";
    await qmSort(rarr, 0, rarr.length - 1, Math.floor(rarr.length / 8), glob_display_func);
}

                // -- ODD EVEN SORT -- //
async function doOddEvenSort(rarr) {
    document.getElementById('algorithm_div').innerHTML = "OddEvenSort";
    await oeSort(rarr, glob_display_func);
}

                // -- ODD-EVEN MERGE SORT -- //
async function doOddEvenMergeSort(rarr) {
    document.getElementById('algorithm_div').innerHTML = "OddEven-MergeSort";
    await oemSort(rarr, 0, rarr.length - 1, Math.floor(rarr.length / 8), glob_display_func);
}

                // -- WAVE SORT -- //
async function doWeaveSort(rarr) {
    document.getElementById('algorithm_div').innerHTML = "WeaveSort [Merge&Insertion]";
    await weaveSort(rarr, 0, rarr.length - 1, Math.floor(rarr.length / 8), glob_display_func);
}


async function visualize_init(amount, upper, lower) {
    amount = amount || glob_amount;
    upper = upper || glob_upper;
    lower = lower || glob_lower;

    glob_stime = (new Date()).getTime();
    await sleep(glob_sleep_between);

    // -- QUICK SORT -- //
    doSortingAlgo(doQuickSort);
}