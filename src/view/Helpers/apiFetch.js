const singleFetch = url =>
  new Promise((resolve, reject) => {
    fetch(url)
      .then(res => res.json())
      .catch(err => {
        reject(err);
      })
      .then(response => {
        if (response) {
          resolve(response.results);
        }
      });
  });

const fetchAll = url =>
  new Promise((resolve, reject) => {
    fetch(url)
      .then(res => res.json())
      .catch(err => {
        reject(err);
      })
      .then(response => {
        const { results, count } = response;
        const pageCount = Math.ceil(count / results.length);
        const iterable = [];
        for (let i = 2; i < pageCount + 1; i++) {
          iterable.push(`${url}/?page=${i}`);
        }
        Promise.all(iterable.map(ele => singleFetch(ele)))
          .catch(err => {
            reject(err);
          })
          .then(values => {
            values.forEach(ele => {
              results.push(...ele);
            });
            resolve(results);
          });
      });
  });

export default fetchAll;