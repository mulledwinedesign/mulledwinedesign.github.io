// Intersection Observer:
// the ele that has the biggest intersection ratio w/ vp
//            = takes majority space
//            = currently being read
let obj = {['']: {ratio:''}}; //obj auto-remove duplicate keys = ids are always unique
let data = [];
function buildThresholdList (numSteps) {
  let thresholds = [];
  for (let i=1.0; i<=numSteps; i++) {
    let ratio = i/numSteps;
    thresholds.push(ratio);
  }
  thresholds.push(0);
  return thresholds;
}
function idExistsInData(id) {
  let bool = true;
  data.forEach(element => {bool = element.hasOwnProperty(id)});
  return bool;
}
const options = {threshold: buildThresholdList(10)};
function callback (entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // store current id n ratio
      obj = {[entry.target.id]: {ratio: entry.intersectionRatio}};
      if (data.length === 0) {data.push(obj);}
      else if (idExistsInData(entry.target.id)) {
        // update ratio only = store only current ratios
        for (const ele of data) {
          if (Object.keys(ele)[0] === Object.keys(obj)[0]) {
            Object.values(ele)[0].ratio = Object.values(obj)[0].ratio;
          }
        }
      } else {
        data.push(obj);
        // debug tip: array keeps updating until – number shown – it's manually unfolded
        console.log(data);
      }
    }
  });
}
let observer = new IntersectionObserver(callback, options);
document.querySelectorAll('section p').forEach(p => { observer.observe(p) });

// svg flow
function getViewportSize() {
  let docEle = (document.compatMode && document.compatMode === "CSS1Compat") ? document.documentElement : document.body;
  let w = docEle.clientWidth;
  let h = docEle.clientHeight;
  // mobile zoomed in?
  if (window.innerWidth && w > window.innerWidth) {
    w = window.innerWidth;
    h = window.innerHeight;
  }
  return {width: w, height: h};
}
function drawFlow() {
  // update viewBox size
  document.getElementsByClassName("flow")[0].setAttribute("viewBox","0 0 "+getViewportSize().width+" "+getViewportSize().height);
  // collect node coordinates
  let n = [];
  for(const node of document.getElementsByClassName("flowNode")) {
    let xLeft = node.getBoundingClientRect().left+window.pageXOffset;
    let xRight = node.getBoundingClientRect().right+window.pageXOffset;
    let y = node.getBoundingClientRect().top+window.pageYOffset+node.getBoundingClientRect().height/2;
    n.push({xLeft:xLeft,xRight:xRight,y:y});
  }
  // draw flow
  document.getElementById("flowPath").setAttribute("d",
    "M"+n[0].xLeft +" "+n[0].y+
    "C"+n[0].xLeft+" "+(n[0].y+(n[1].y-n[0].y)*1.618)+" "
       +(n[1].xRight+(n[0].xLeft-n[1].xRight)*0.618)+" "+n[1].y+" "
       +n[1].xRight+" "+n[1].y+
    "M"+n[1].xLeft +" "+n[1].y+"h-20"+
    "C"+n[1].xLeft+" "+(n[1].y+(n[2].y-n[1].y)*0.618/2)+" "
       +n[1].xLeft*0.618+" "+(n[1].y+(n[2].y-n[1].y)*0.618)+" "
       +n[2].xLeft +" "+n[2].y+
    "M"+n[2].xRight+" "+n[2].y+
    "C"+(n[2].xRight+(n[3].xLeft-n[2].xRight)*0.3)+" "+n[2].y*0.95+" "
       +(n[2].xRight+(n[3].xLeft-n[2].xRight)*0.6)+" "+n[2].y*1.01+" "
       +n[3].xLeft +" "+n[3].y+
    "M"+n[3].xRight+" "+n[3].y+
    "L"+n[4].xRight+" "+n[4].y+
    "M"+n[4].xLeft +" "+n[4].y+
    "L"+n[5].xLeft +" "+n[5].y+
    "M"+n[5].xRight+" "+n[5].y+
    "L"+n[6].xLeft +" "+n[6].y+
    "M"+n[6].xRight+" "+n[6].y+
    "L"+n[7].xLeft +" "+n[7].y
  );
}
window.addEventListener("load", drawFlow);
window.addEventListener("resize", drawFlow);

// svg recipe line: from 0 to 1
function drawRecipe() {
  let recipeBox = document.getElementsByClassName("recipeBox")[0];
  let recipeLine = document.getElementsByClassName("recipeLine")[0];
  let zero = document.getElementById("zero");
  let one = document.getElementById("one");
  // update viewBox size
  recipeLine.setAttribute("viewBox","0 0 "+recipeBox.getBoundingClientRect().width+" "+recipeBox.getBoundingClientRect().height);
  // collect node coordinates
  let c = [];
  let leftMargin = recipeBox.getBoundingClientRect().left;
  for(const node of document.getElementsByClassName("recipeNode")) {
    let xLeft = node.getBoundingClientRect().left+window.pageXOffset-leftMargin;
    let xRight = node.getBoundingClientRect().right+window.pageXOffset-leftMargin;
    let y = node.getBoundingClientRect().height;
    c.push({xLeft:xLeft,xRight:xRight,y:y});
  }
  // draw 0: flush left
  let gap = c[0].xLeft;
  let rem = getComputedStyle(document.documentElement).fontSize.match(/\d+/)[0];
  let r = rem*.45;
  let strokeW = Number(getComputedStyle(recipeLine).strokeWidth.match(/\d+\.\d*/)[0]);
  let y = c[0].y/1.78;
  zero.setAttribute("cx",r+strokeW/2);
  zero.setAttribute("cy",y);
  zero.setAttribute("r",r);
  // connect recipeNodes to draw the line from 0 to 1
  let offset = r/4;
  let pigtailStart = c[3].xRight+offset;
  let pigtailEnd = c[4].xLeft-offset;
  let pigtailW = pigtailEnd-pigtailStart;
  let x1 = recipeBox.getBoundingClientRect().right-leftMargin-strokeW/2;
  document.getElementById("zero2one").setAttribute("d",
    "M"+(r*2+strokeW/2)+" "+y+
    "H"+(c[0].xLeft-offset)+
    "M"+(c[0].xRight+offset)+" "+y+
    "H"+(c[1].xLeft-offset)+
    "M"+(c[1].xRight+offset)+" "+y+
    "H"+(c[2].xLeft-offset)+
    "M"+(c[2].xRight+offset)+" "+y+
    "H"+(c[3].xLeft-offset)+
    "M"+pigtailStart+" "+y+
    "C"+(pigtailEnd+pigtailW*0.618)+" "+0+" "+
        (pigtailStart-pigtailW*0.2)+" "+(-y/2)+" "+
        pigtailEnd+" "+y+
    "M"+(c[4].xRight+offset)+" "+y+
    "H"+x1
  );
  // draw 1: flush right
  one.setAttribute("x1",x1);
  one.setAttribute("y1",y-r-strokeW);
  one.setAttribute("x2",x1);
  one.setAttribute("y2",y+r+strokeW);
}
window.addEventListener("load", drawRecipe);
window.addEventListener("resize", drawRecipe);

function toggleHighlight(className,bool) {
  for (const element of document.getElementsByClassName(className)) {
    if (bool === "1") {
      element.style.color = "red";
    } else {
      element.style.color = "";
    }
  }
}

// function showCaseStudy(id) {
//   // display article n scroll past sticky top
//   document.querySelectorAll('.cs article').forEach(article => {
//     article.style.display = "none";
//     article.style.scrollMarginTop += "40rem";
//     //document.querySelector("div.recipe").getBoundingClientRect().bottom;
//   });
//   let element = document.getElementById(id);
//   if (element.style.display === "none") {
//     element.style.display = "block";
//   }
//   // update url hash
//   // window.location.hash=id;
//   // (but there's a jump instantly
//   // (also need to handle direct visit to url#id
// }

// document.querySelectorAll('article').forEach(article => {
//   article.
// });
