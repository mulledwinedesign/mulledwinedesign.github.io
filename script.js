function buildThresholdList (numSteps) {
  let thresholds = [];

  for (let i=1.0; i<=numSteps; i++) {
    let ratio = i/numSteps;
    thresholds.push(ratio);
  }

  thresholds.push(0); // [0.01, 0.02, ..., 1, 0]
  // thresholds.push(0.000001); // [0.01, 0.02, ..., 1, 0.000001]

  return thresholds;
}

const options = {
  // root: null,
  // rootMargin: '0px 0px -50% 0px',
  threshold: buildThresholdList(100)
}

function callback (entries, observer) {
  // console.log(observer);

  entries.forEach(entry => {
    console.log(entry);
    if (entry.isIntersecting) {
      ratios.push(entry.intersectionRatio); // store all visible ratios to be compared
      // console.log(entry.intersectionRatio);
    } else {
      console.log("out of range");
    }
  });

  ratios.sort((a, b) => a - b); // sort numbers in ascending order
  console.log(ratios[ratios.length-1]+" ["+ratios+"]");

  ratios.forEach(ratio => {
    if (ratio === 1) {
      // multiple targets are 100% visible, choose the topmost one
    }
  });

// even if these all works, is there a way to trace back to the corresponding target element? yes, entry.target;
// or change to: button.onclick inside each callback?

} // end of callback

let ratios = []; // need to clear this after each bulk callback
let observer = new IntersectionObserver(callback, options);
// observer.observe(document.querySelector('#test-target'));
document.querySelectorAll('.cs-cloudrone p').forEach(p => { observer.observe(p) });
