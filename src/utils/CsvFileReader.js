import Papa from 'papaparse';

export function readFile(file, config) {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      ...config,
      error: (err, file, inputElem, reason) => {
        reject(err);
      },
      complete: (result) => {
        resolve(result.data);
      }
    })
  });
}

export function readFiles(files, config) {
  return new Promise((resolve, reject) => {
    (async _ => {
      let datas = []
      try {
        for (var i = 0; i < files.length; i++) {
          const _datas = await readFile(files[i], config);
          datas = datas.concat(_datas);
        }
      } catch (err) {
        reject(err);
      }
      resolve(datas);
    })();
  });
}
