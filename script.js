// const options = {
//   //root: null,
//   //rootMargin: '0px',
//   threshold: 0.5
// }

function callback (entries, observer) {
  console.log(observer);

  entries.forEach(entry => {
    console.log(entry);
  });
}

let observer = new IntersectionObserver(callback, {threshold: 0.5});
observer.observe(document.querySelector('.case-study'));
