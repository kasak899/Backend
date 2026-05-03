//1. Print each element (basic iteration)
 const arr =[10,20,30,40];
 for(let i=0; i<arr.length; i++){
     console.log(arr[i]);
 }

//2. Sum of array (accumulator)
 const arr = [1,2,3,4];
 let sum =0;
 for(let i=0; i<arr.length; i++){
     sum +=arr[i];
}
 console.log(sum);

//3. Maximum value without Math.max
 const arr = [5,1,9,3];
 let max =arr[0];
 for(let i=1; i<arr.length; i++){
     if(arr[i]>max){
        max=arr[i];
    }
 }
 console.log(max);

//4. Minimum value with reduce
 const arr=[7,3,9,0];
 let min=arr[0];
 for(let i=1; i<arr.length; i++){
     if(arr[i]<min){
         min=arr[i];
     }
 }
 console.log(min);

//5. Reverse an array (manual)
 const arr = [1, 2, 3];

 let reversed = [];

for (let i = arr.length - 1; i >= 0; i--) {
   reversed.push(arr[i]);
}
 console.log(reversed);

//6. Remove duplicates (preserve order)
 const arr = [1, 2, 2, 3, 1];

let result = [];

 for (let i = 0; i < arr.length; i++) {
   if (!result.includes(arr[i])) {
     result.push(arr[i]);
   }
 }

 console.log(result);


//7. Count element frequency (generic)
 const arr = ['a', 'b', 'a', 'c'];

 let freq = {};

 for (let i = 0; i < arr.length; i++) {
   let val = arr[i];

   if (freq[val]) {
    freq[val]++;
   } else {
    freq[val] = 1;
  }
}

 console.log(freq);

//8. Flatten 1-level nested array
const arr = [1, [2, 3], 4];

let result = [];

 for (let i = 0; i < arr.length; i++) {
   if (Array.isArray(arr[i])) {
     for (let j = 0; j < arr[i].length; j++) {
       result.push(arr[i][j]);
     }
   } else {
     result.push(arr[i]);
  }
}
console.log(result);

//9. Rotate array by k steps (right)
 const arr = [1, 2, 3, 4];
 let k = 1;

 k = k % arr.length; 

 const result = [
   ...arr.slice(-k),
   ...arr.slice(0, arr.length - k)
 ];

 console.log(result);


//10. Chunk array into size n
 const arr = [1, 2, 3, 4, 5];
 let n = 2;

let result = [];

 for (let i = 0; i < arr.length; i += n) {
  result.push(arr.slice(i, i + n));
}

 console.log(result);
