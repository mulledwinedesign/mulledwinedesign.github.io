let rem = getComputedStyle(document.documentElement).fontSize.match(/\d+/)[0];
let recipeBox = document.getElementsByClassName("recipeBox")[0];
let topNav = document.getElementsByClassName("top-nav")[0];
let articles = document.querySelectorAll(".cs article");
let anchors = document.querySelectorAll(".cs nav a");
let lis = document.querySelectorAll(".recipe ul li");

// svg recipe line: from 0 to 1
function drawRecipeNGrid() {
  let recipeLine = document.getElementsByClassName("recipeLine")[0];
  let zero = document.getElementById("zero");
  let one = document.getElementById("one");
  // update viewBox size
  recipeLine.setAttribute("viewBox","0 0 "+recipeBox.getBoundingClientRect().width+" "+recipeBox.getBoundingClientRect().height);
  // collect node coordinates
  let c = [];
  let leftMargin = recipeBox.getBoundingClientRect().left;
  for(const node of document.getElementsByClassName("recipeNode")) {
    c.push({
      xLeft:window.pageXOffset-leftMargin+node.getBoundingClientRect().left,
      xRight:window.pageXOffset-leftMargin+node.getBoundingClientRect().right,
      y:node.getBoundingClientRect().height
    });
  }
  // draw 0: flush left
  let gap = c[0].xLeft;
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
  // set article grid cols based on recipeBox lists
  let col = "";
  for(const li of document.querySelectorAll(".recipeBox>li")) {
    col += li.getBoundingClientRect().width+"px"+" ";
  }
  articles.forEach(article => {
    article.style.gridTemplateColumns = col;
    article.style.marginLeft = gap+"px";
    article.style.columnGap = gap+"px";
  });
}
window.addEventListener("load",drawRecipeNGrid);
window.addEventListener("resize",drawRecipeNGrid);

// maintain display states between page loads n #id clicks
function checkStorage() {
  if (sessionStorage.getItem("topNavDisplay") === "block") {
    // keep showing topNav
    topNav.classList.remove("hidden");
  }
  articles.forEach((article,i) => {
    if (sessionStorage.getItem("article"+Number(i+1)+"Display") === "grid") {
      // keep showing article
      article.classList.remove("hidden");
      // anchor: solid border n highlight color
      for (const anchor of anchors) {
        if (anchor.hash === "#"+article.id) {
          anchor.style.borderStyle = "solid";
          anchor.style.borderRadius = ".2ex";
          anchor.style.color = "var(--color-highlight)";
        } else {
          anchor.style.borderStyle = "";
          anchor.style.borderRadius = "";
          anchor.style.color = "";
        }
      }
      // keep dimming irrelevant li
      for (const li of lis) {
        if (!li.classList.contains("cs"+article.id.charAt(article.id.length-1))) {
          li.classList.add("dim");
        }
      }

    }
  });
}
window.addEventListener("load",checkStorage);
window.addEventListener("hashchange",checkStorage);

// handle anchor hover n click events
anchors.forEach(anchor => {
  anchor.addEventListener("mouseenter", function () {
    for (const li of lis) {
      li.classList.remove("dim");
      // dim irrelevant li for the hovered anchor
      if (!li.classList.contains("cs"+this.hash.charAt(this.hash.length-1))) {
        li.classList.add("dim");
      }
    }
  });
  anchor.addEventListener("mouseleave", function () {
    let articlesDisplay = [];
    articles.forEach((article,i) => {
      articlesDisplay.push(sessionStorage.getItem("article"+Number(i+1)+"Display"));
    });
    if (articlesDisplay.some(item => item === "grid")) { // if there is (at least one) shown article
      for (const li of lis) {
        li.classList.remove("dim");
        // dim irrelevant li for the shown article
        if (!li.classList.contains("cs"+Number(articlesDisplay.indexOf("grid")+1))) {
          li.classList.add("dim");
        }
      }
    } else { // if there is no shown article
      for (const li of lis) {
        li.classList.remove("dim");
      }
    }
  });
  // handle layout changes on click, n save display state
  anchor.addEventListener("click", function () {
    // show topNav
    topNav.classList.remove("hidden");
    sessionStorage.setItem("topNavDisplay",getComputedStyle(topNav).display);
    // show n scroll article into place
    let scrollMT = recipeBox.getBoundingClientRect().height + anchor.getBoundingClientRect().height + rem*5.618; // xs+recipeBox.h+(xs-xxs)+anchor.h+l = recipeBox.h+anchor.h+(2-.618+4.236)
    articles.forEach((article,i) => {
      if ("#"+article.id === this.hash) {
        article.classList.remove("hidden");
      } else {
        article.classList.add("hidden");
      }
      sessionStorage.setItem("article"+Number(i+1)+"Display",getComputedStyle(article).display);
      article.style.scrollMarginTop = scrollMT+"px";
    });
  });
});

// svg mindmap lines
function drawMindmap() {
  let mindmapGrid = document.getElementsByClassName("mindmapGrid")[0];
  let mindmapLines = document.getElementsByClassName("mindmapLines")[0];
  // update viewBox size
  mindmapLines.setAttribute("viewBox","0 0 "+mindmapGrid.getBoundingClientRect().width+" "+mindmapGrid.getBoundingClientRect().height);
  // collect node coordinates
  let m = [];
  let leftMargin = mindmapGrid.getBoundingClientRect().left;
  for(let li of document.querySelectorAll(".mindmap li")) {
    let node = li.firstElementChild; // get all <ln>, n=1~6
    if (node.nextElementSibling !== null) { // only those <ln> followed by <ol>
      let thisR = [window.pageXOffset-leftMargin+node.getBoundingClientRect().right, window.pageYOffset-leftMargin+node.getBoundingClientRect().top+node.getBoundingClientRect().height/2];
      for (const child of node.nextElementSibling.children) { // ln+ol>li
        let nextL = [window.pageXOffset-leftMargin+child.getBoundingClientRect().left, window.pageYOffset-leftMargin+child.getBoundingClientRect().top+child.getBoundingClientRect().height/2];
        m.push({lineStartX:thisR[0],lineStartY:thisR[1],lineEndX:nextL[0],lineEndY:nextL[1]});
      }
    }
  }
  let path = "";
  for(const item of m) {
    let cx = (item.lineEndX - item.lineStartX)/2+item.lineStartX;
    path += "M"+item.lineStartX+" "+item.lineStartY+
            "C"+cx+" "+item.lineStartY+" "
               +cx+" "+item.lineEndY+" "
               +item.lineEndX+" "+item.lineEndY;
  }
  // draw mindmap lines
  document.getElementById("mindmapPath").setAttribute("d",path);
}
window.addEventListener("load",drawMindmap);
window.addEventListener("resize",drawMindmap);

// currently reading Intersection Observer:
// the ele that has the biggest intersection ratio w/ vp
//            = takes majority space
//            = currently being read
// let obj = {[""]: {ratio:""}}; //obj auto-remove duplicate keys = ids are always unique
// let data = [];
// function buildThresholdList (numSteps) {
//   let thresholds = [];
//   for (let i=1.0; i<=numSteps; i++) {
//     let ratio = i/numSteps;
//     thresholds.push(ratio);
//   }
//   thresholds.push(0);
//   return thresholds;
// }
// function idExistsInData(id) {
//   let bool = true;
//   data.forEach(element => {bool = element.hasOwnProperty(id)});
//   return bool;
// }
// const currentlyReadingOptions = {threshold:buildThresholdList(10)};
// function currentlyReadingCallback (entries) {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//       // store current id n ratio
//       obj = {[entry.target.id]: {ratio: entry.intersectionRatio}};
//       if (data.length === 0) {data.push(obj);}
//       else if (idExistsInData(entry.target.id)) {
//         // update ratio only = store only current ratios
//         for (const ele of data) {
//           if (Object.keys(ele)[0] === Object.keys(obj)[0]) {
//             Object.values(ele)[0].ratio = Object.values(obj)[0].ratio;
//           }
//         }
//       } else {
//         data.push(obj);
//         // debug tip: array keeps updating until – number shown – it"s manually unfolded
//         console.log(data);
//       }
//     }
//   });
// }
// let currentlyReadingObserver = new IntersectionObserver(currentlyReadingCallback, currentlyReadingOptions);
// document.querySelectorAll("section p").forEach(p => { currentlyReadingObserver.observe(p) });

// svg flow
// function getViewportSize() {
//   let docEle = (document.compatMode && document.compatMode === "CSS1Compat") ? document.documentElement : document.body;
//   let w = docEle.clientWidth;
//   let h = docEle.clientHeight;
//   // mobile zoomed in?
//   if (window.innerWidth && w > window.innerWidth) {
//     w = window.innerWidth;
//     h = window.innerHeight;
//   }
//   return {width:w,height:h};
// }
// function drawFlow() {
//   // update viewBox size
//   document.getElementsByClassName("flow")[0].setAttribute("viewBox","0 0 "+getViewportSize().width+" "+getViewportSize().height);
//   // collect node coordinates
//   let n = [];
//   for(const node of document.getElementsByClassName("flowNode")) {
//     let xLeft = node.getBoundingClientRect().left+window.pageXOffset;
//     let xRight = node.getBoundingClientRect().right+window.pageXOffset;
//     let y = node.getBoundingClientRect().top+window.pageYOffset+node.getBoundingClientRect().height/2;
//     n.push({xLeft:xLeft,xRight:xRight,y:y});
//   }
//   // draw flow
//   document.getElementById("flowPath").setAttribute("d",
//     "M"+n[0].xLeft +" "+n[0].y+
//     "C"+n[0].xLeft+" "+(n[0].y+(n[1].y-n[0].y)*1.618)+" "
//        +(n[1].xRight+(n[0].xLeft-n[1].xRight)*0.618)+" "+n[1].y+" "
//        +n[1].xRight+" "+n[1].y+
//     "M"+n[1].xLeft +" "+n[1].y+"h-20"+
//     "C"+n[1].xLeft+" "+(n[1].y+(n[2].y-n[1].y)*0.618/2)+" "
//        +n[1].xLeft*0.618+" "+(n[1].y+(n[2].y-n[1].y)*0.618)+" "
//        +n[2].xLeft +" "+n[2].y+
//     "M"+n[2].xRight+" "+n[2].y+
//     "C"+(n[2].xRight+(n[3].xLeft-n[2].xRight)*0.3)+" "+n[2].y*0.95+" "
//        +(n[2].xRight+(n[3].xLeft-n[2].xRight)*0.6)+" "+n[2].y*1.01+" "
//        +n[3].xLeft +" "+n[3].y+
//     "M"+n[3].xRight+" "+n[3].y+
//     "L"+n[4].xRight+" "+n[4].y+
//     "M"+n[4].xLeft +" "+n[4].y+
//     "L"+n[5].xLeft +" "+n[5].y+
//     "M"+n[5].xRight+" "+n[5].y+
//     "L"+n[6].xLeft +" "+n[6].y+
//     "M"+n[6].xRight+" "+n[6].y+
//     "L"+n[7].xLeft +" "+n[7].y
//   );
// }
// window.addEventListener("load", drawFlow);
// window.addEventListener("resize", drawFlow);
