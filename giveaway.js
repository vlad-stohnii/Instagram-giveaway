import fs from "fs";

const binarySearch = (arr, str) => {
  let l = 0;
  let r = arr.length - 1;
  while (l <= r) {
    let m = l + Math.floor((r - l) / 2);
    let res = str.localeCompare(arr[m]);
    if (res === 0) return m;
    if (res > 0) l = m + 1;
    else r = m - 1;
  }
  return -1;
};

const uniqueValues = (path) => {
  fs.readdir(path, (err, files) => {
    let arrFromFiles = [];
    for (let i = 0; i < files.length; i++) {
      arrFromFiles[i] = fs.readFileSync(`${path}/${files[i]}`, "utf-8").split(/\r?\n/);
    }
    for (let i = 0; i < arrFromFiles.length; i++) {
      arrFromFiles[i] = [...new Set(arrFromFiles[i])];
    }
    let uniqueNicknames = [];
    for (let i = 0; i < arrFromFiles.length; i++) {
      uniqueNicknames.push(...arrFromFiles[i]);
    }
    uniqueNicknames = [...new Set(uniqueNicknames)];
    console.log(path, uniqueNicknames.length);
  });
};

const existInAllFiles = (path) => {
  fs.readdir(path, (err, files) => {
    let arrFromFiles = [];
    for (let i = 0; i < files.length; i++) {
      arrFromFiles[i] = fs.readFileSync(`${path}/${files[i]}`, "utf-8").split(/\r?\n/);
      arrFromFiles[i] = [...new Set(arrFromFiles[i].sort())];
    }
    let uniqueNicknames = [];
    for (let i = 0; i < arrFromFiles.length; i++) {
      uniqueNicknames.push(...arrFromFiles[i]);
    }
    uniqueNicknames = [...new Set(uniqueNicknames)];
    uniqueNicknames.sort();
    let inAllArrays = [];
    console.time('existInAllFiles')
    for (let j = 0; j < uniqueNicknames.length; j++) {
      let count = 0;
      for (let i = 0; i < arrFromFiles.length; i++) {
        if (binarySearch(arrFromFiles[i], uniqueNicknames[j]) !== -1) {
          count++;
        }
      }
      if (count === arrFromFiles.length) {
        inAllArrays.push(uniqueNicknames[j]);
      }
    }
    console.timeEnd('existInAllFiles')
    console.log(inAllArrays.length);
  });
};

const existInAtLeastTen = (path) => {
  fs.readdir(path, (err, files) => {
    let arrFromFiles = [];
    for (let i = 0; i < files.length; i++) {
      arrFromFiles[i] = fs.readFileSync(`${path}/${files[i]}`, "utf-8").split(/\r?\n/);
      arrFromFiles[i] = [...new Set(arrFromFiles[i].sort())];
    }
    let uniqueNicknames = [];
    for (let i = 0; i < arrFromFiles.length; i++) {
      uniqueNicknames.push(...arrFromFiles[i]);
    }
    uniqueNicknames = [...new Set(uniqueNicknames)];
    uniqueNicknames.sort();
    console.time('existInAtLeastTen')
    let inTenArrays = [];
    loop: for (let j = 0; j < uniqueNicknames.length; j++) {
      let count = 0;
      for (let i = 0; i < arrFromFiles.length; i++) {
        if (binarySearch(arrFromFiles[i], uniqueNicknames[j]) !== -1) {
          count++;
        }
        if (count === 10) {
          inTenArrays.push(uniqueNicknames[j]);
          continue loop;
        }
      }
    }
    console.timeEnd('existInAtLeastTen')
    console.log(inTenArrays.length);
  });
};

// 200 000
uniqueValues("./users");
existInAllFiles("./users");
existInAtLeastTen("./users");

// 2 000 000
uniqueValues("./users2");
existInAllFiles("./users2");
existInAtLeastTen("./users2");