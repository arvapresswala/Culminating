var cpr, heat, hyp, bones, choke, infant;
var txt;
var symptoms, search, display;
var word;
var display2, restart;
var plus;
var counter = 0;
/* uploading all the files
 */
function preload() {
    cpr = loadStrings('CPR.txt');
    heat = loadStrings('Heatstroke.txt');
    hyp = loadStrings('Hypothermia.txt');
    bones = loadStrings('Brokenbones.txt');
    choke = loadStrings('Choking.txt');
    infant = loadStrings('Infantchoking.txt');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();
    plus = new Plus();
    plus.display();
/* Input box to look for symptoms;
*/
    symptoms = createInput('');
    symptoms.size(500, 50);
    symptoms.position(width / 7, height / 6);
    symptoms.style("font-size", "20px");
    /* Search button to look for the symptoms in the text array;
    */
    search = createButton("Search");
    search.position(width / 7 + 500, height / 6);
    search.size(100, 50);
    search.style("font-size", "10px");
    search.mousePressed(submit);
    txt = [cpr, heat, hyp, bones, choke, infant];

}
/* when button is counter increase by one;
*/
function submit() {
    counter++;
}

function draw() {
  /* When counter= 0 display and move the first aid sign;
  */
  if(counter==0){
    background(255);
    plus.display();
    plus.move();
  }
  /* When counter = 1 all the txt is sorted and the search for symptoms occurs;
  */
  if (counter==1){
        InSort(txt);
        design(300, width, height / 5, height / 8);
        noLoop();
}
}


function InSort(t) {
    for (var i = 0; i < t.length; i++) {
        var sentences = t[i];
        for (var j = 0; j < sentences.length; j++) {
            var words = sentences[j].split(" ");
            for (var k = 0; k < words.length; k++) {
                var word = words[k].split(" ");
                for (var m = 0; m < word.length; m++) {
                    if (word[m] === symptoms.value()) {
                        var current = t;
                        for (var n = 0; n < current.length; n++) {
                          /* Sorts the txt when the symptoms are in two or mor text;
                          looks for the file with least amount of the symptoms value;
                          */
                            var array = current[i];
                            for (var r = n; r > 0 && current[i + 1] > array; r++) {
                                current[r] = current[r - 1];
                              }
                                current[r] = array;
                                /*  displays the txt file has the symptoms in it.
                                */
                                display = createSpan(array + " ");
                                display.style("font-size", "20px");
                                display.attribute("align", "justified");
                                display.position(width / 10, height /4);
                                noLoop();

                        }
                    }
                }
            }
        }
    }
}
/** This function is recursive
 * @param {number} startx   This is the x value of where the lines starts
 *  @param {number} endx   This is the x value of where the lines ends
 *  @param {number} starty   This is the y value of where the lines starts
 *  @param {number} endy   This is the y value of where the lines ends
 */
function design(startx, endx, starty, endy) {
    stroke(255, 0, 0, 60);
    line(startx, endx, starty, endy);
    if (startx < endx) {
        design(startx + int(random(width)), endx - int(random(60, 90)), starty + int(random(100, 200)), endy - int(random(100, 200)));
        design(startx + int(random(width)), endx - int(random(60, 90)), starty - int(random(100, 200)), endy + int(random(100, 200)));
        design(startx + int(random(width)), endx - int(random(60, 90)), starty - int(random(160, 190)), endy - int(random(160, 170)));
    }
}
/**
 * Represents the plus
 * @class
 * @constructor
 */
function Plus() {
    this.x = width - 200;
    this.y = height / 10;
    /** A variable to holds the speed and movement of the first aid sign;
     */
    this.move = function() {
        if (this.y < height / 5) {
            this.y += 1;
        } else {
            this.y = height / 10;
        }
        this.x += random(-1, 1);
    }
    /** The shapes that make up the first aid sign;
    */
    this.display = function() {
        fill(255, 0, 0);
        rect(this.x, this.y, 50, 150);
        rect(this.x - 50, this.y + 50, 150, 50);
    }
}
/* WORK CITED
 * "Choking - Infant under 1 Year." MedlinePlus Medical Encyclopedia. N.p., n.d. Web. 12 Jan. 2017.
 * "Choking: First Aid." Mayo Clinic. N.p., n.d. Web. 12 Jan. 2017.
 * "CPR Illustrated in Three Simple Steps." CPR Illustrated in Three Simple Steps. N.p., n.d. Web. 12 Jan. 2017.
 * "Heat Stroke: Symptoms and Treatment." WebMD. WebMD, n.d. Web. 12 Jan. 2017.
 * "Hypothermia: Causes, Symptoms, and Treatment." WebMD. WebMD, n.d. Web. 12 Jan. 2017.
 * "CPR in Babies (0 to 12 Months)." AboutKidsHealth. AboutKidsHealth, n.d. Web. 12 Jan. 2017.
 */
