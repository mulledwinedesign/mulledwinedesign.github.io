function buildThresholdList (numSteps) {
  let thresholds = [];

  for (let i=1.0; i<=numSteps; i++) {
    let ratio = i/numSteps;
    thresholds.push(ratio);
  }

  thresholds.push(0);
  return thresholds;
}

const options = {
  // root: null,
  // rootMargin: '0px 0px -50% 0px',
  threshold: buildThresholdList(100)
}

// for (let i=0; i<=1.0; i+= 0.01) {
//   thresholdList[0].push(i);
// }

function callback (entries, observer) {
  // console.log(observer);

  // entries.forEach(entry => {
  //   console.log(entry);
  //   if (entry.isIntersecting) {
  //     console.log(entry.intersectionRatio);
  //   }
  // });

  entries.forEach(function(entry){
    // console.log(entry);
    if (entry.isIntersecting) {
      console.log(entry.intersectionRatio);
    } else {
      console.log("out of range");
    }
  });

}

let observer = new IntersectionObserver(callback, options);
observer.observe(document.querySelector('#test-target'));
