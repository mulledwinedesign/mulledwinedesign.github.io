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
  // if (甲) { if (乙) {A} else if (丙) {B} else {A} }
  entries.forEach(entry => {
      if (entry.isIntersecting) { // 甲
        // obj = {[entry.target.id]: {ratio: entry.intersectionRatio}}; // current target id
        if (data.length === 0) { // 乙
          // A
          obj = {[entry.target.id]: {ratio: entry.intersectionRatio}}; // 1st new target id
          data.push(obj);
          console.log(obj);
          console.log(data);
        } else if (idExistsInData(entry.target.id)) { // 丙 target id exists
            // B: update ratio only
            for (const element of data) {
              console.log(Object.keys(obj)[0]);
              console.log(Object.values(element)[0].ratio);
              // use data.findIndex(ele => {});
              if (Object.keys(obj)[0] === entry.target.id) {
                Object.values(element)[0].ratio = entry.intersectionRatio;
              }
            }
            console.log(data);
        } else { // A again : a little WET, but it's ok.
          // obj = {[entry.target.id]: {ratio: entry.intersectionRatio}}; // new target
          // data.push(obj);
        }
    }
  });
} // end of callback

let obj = {['']: {ratio:''}};
// console.log(Object.keys(obj)[0]); // ''
// console.log(Object.values(obj)[0]); // {ratio:''}
let data = [];
function idExistsInData(id) {
  let bool;
  data.forEach(element => {bool = element.hasOwnProperty(id)});
  return bool;
}

let observer = new IntersectionObserver(callback, options);
// observer.observe(document.querySelector('#test-target'));
document.querySelectorAll('.cs-cloudrone p').forEach(p => { observer.observe(p) });

// console.log(observer);

// var kvArray = [{key: 1, value: 10},
//                {key: 2, value: 20},
//                {key: 3, value: 30}];
//
// var reformattedArray = kvArray.map(obj =>{
//    var rObj = {};
//    rObj[obj.key] = obj.value;
//    return rObj;
// });

// data = [{ratio: entry.intersectionRatio, id: observer.target.id}, ...,
//         {ratio: entry.intersectionRatio, id: observer.target.id}];
// reformattedData = data.map(obj => {
//   let rObj = {};
//   data.forEach(
//
//   );
//   return rObj;
// });

// ratios.forEach(ratio => {
//   if (ratio === 1) {
//     // if multiple targets are 100% visible, choose the topmost one
//     btn.onclick = function() {
//
//       // change content to display entry.target in min view:
//       // shift vp to left/right, or
//       // currentlyReading.innerHTML = entry.target;
//       // document.getElementById(entry.target).innerHTML = ;
//     }
//   }
// });

// entries.sort((a, b) => b[0].localeCompare(a[0]));

// console.log(entries);
// console.log(entry);

// if (entry.isIntersecting) {
//   dataEntry.ratio = entry.intersectionRatio;
//   if (entry.target.id !== dataEntry.id) {
//     dataEntry.id = entry.target.id;
//   } else {
//     data.push(dataEntry);
//   }
//   data.sort((a, b) => a - b); // sort numbers in ascending order
//   data.sort((a, b) => a[0] - b[0]); // sort data by ratio in ascending order

//   console.log(data);
// } else {
//   console.log('out of range');
// }

// const arr = [
//   { name: 'Sharpe', value: 37 },
//   { name: 'And', value: 45 },
//   { name: 'The', value: -12 }
// ];
// arr.sort((a,b) => a['name'].localeCompare(b['name'])); // sort by name string
// arr.sort((a,b) => a['value']-b['value']); // sort by value number
// data.sort((a,b) => a['id']-b['id']);

// Objects do not allow duplicate key values, old values are overwritten by the new values.
// const obj = { b: "one", a: "two", a: "three" };
// console.log(obj); // returns {b: "one", a: "three"}

// remove duplicates from array of objects
// const arr = [{a:1},{b:2},{a:1}];
// let brr = arr.filter((obj, index) => {
//   // return arr.map(obj['a']);
//   return arr.map(obj => obj['a']).indexOf(obj['a']) === index;
// }); // removes duplicate based on the key 'a'
// console.log(brr);

// const btn = document.querySelector('button');
// let obj = {};
