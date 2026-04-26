11. Remove falsy values
 const arr = [0, 1, false, 2, '', 3, null];

 const result = arr.filter(Boolean);

 console.log(result);

//12. Find index of first occurrence (manual)
const arr = ['a', 'b', 'c'];
 const target = 'b';

 let index = -1;

 for (let i = 0; i < arr.length; i++) {
  if (arr[i] === target) {
    index = i;
     break; 
  }
 }

 console.log(index);

//13. Merge two arrays immutably
 const arr1 = [1, 2];
 const arr2 = [3, 4];

 const result = [...arr1, ...arr2];

 console.log(result);

//14. Interleave two arrays
const arr1 = [1, 2];
 const arr2 = [10, 20];

 let result = [];

let maxLen = Math.max(arr1.length, arr2.length);

 for (let i = 0; i < maxLen; i++) {
  if (i < arr1.length) {
    result.push(arr1[i]);
  }
  if (i < arr2.length) {
    result.push(arr2[i]);
  }
}

 console.log(result);

//15. Sliding window sums (window size k)
const arr = [1, 2, 3, 4];
 let k = 2;

 let result = [];
 let windowSum = 0;
for (let i = 0; i < k; i++) {
  windowSum += arr[i];
 }

 result.push(windowSum);


 for (let i = k; i < arr.length; i++) {
   windowSum = windowSum + arr[i] - arr[i - k];
   result.push(windowSum);
 }

 console.log(result);

//16. Create range array (inclusive)
 function createRange(start, end) {
  let result = [];

 if (start > end) return result; 

  for (let i = start; i <= end; i++) {
    result.push(i);
  }

   return result;
 }

 console.log(createRange(3, 6));

// 17. Remove item at index immutably
 const arr = [1, 2, 3];
const i = 1;

const result = [
  ...arr.slice(0, i),
   ...arr.slice(i + 1)
];

 console.log(result);

//18. Count elements matching predicate
 const arr = [5, 12, 8, 20];

 const count = arr.filter(x => x > 10).length;

console.log(count);

//19. Unique sorted array
const arr = [3, 1, 2, 3, 2];

const result = [...new Set(arr)].sort((a, b) => a - b);

console.log(result);

//20. Map indices to values (index map)
 const arr = ['a', 'b'];

 let result = {};

 for (let i = 0; i < arr.length; i++) {
  result[i] = arr[i];
}

 console.log(result);
