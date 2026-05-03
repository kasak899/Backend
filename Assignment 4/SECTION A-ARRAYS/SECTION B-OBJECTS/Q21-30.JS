//21. List keys and values (iteration)
 const obj = { name: 'Aman', age: 22 };

 for (let key in obj) {
  console.log(key, obj[key]);
 }


//22. Add / update property immutably
 const obj = { name: 'Aman' };

 const newObj = { ...obj, role: 'admin' };

console.log(newObj);

//23. Delete property immutably
 const user = { name: 'A', password: 'x' };

const { password, ...rest } = user;

console.log(rest);

//24. Merge two objects (deep vs shallow)
 const a = { x: 1 };
 const b = { y: 2 };

 const result = { ...a, ...b };

 console.log(result);

//25. Convert keys ↔ values (invert object)
const obj = { a: 1, b: 2 };

 const inverted = Object.entries(obj).reduce((acc, [key, value]) => {
   acc[value] = key;
  return acc;
 }, {});

console.log(inverted);

//26. Deep clone simple object (no functions)
 const obj = { a: { b: 2 } };

 const deepCopy = JSON.parse(JSON.stringify(obj));

deepCopy.a.b = 100;

console.log(obj.a.b); 
 console.log(deepCopy.a.b); 

//27. Count properties (keys)
 const obj = { a: 1, b: 2 };

 const count = Object.keys(obj).length;

console.log(count); 

//28. Default values using destructuring
 const user = { name: 'A' };

Destructure with default value for role
 const { name, role = 'user' } = user;

 console.log(name); 
 console.log(role); 

 function greet({ name, role = 'user' }) {
   console.log(`Hello ${name}, your role is ${role}`);
 }

 greet({ name: 'A' }); 

 greet({ name: 'B', role: 'admin' }); 

//29. Pick subset of properties (pick)
 const user = { id: 1, name: 'A', email: 'a@x' };
 const keysToPick = ['id', 'email'];

 const picked = keysToPick.reduce((obj, key) => {
   if (key in user) {
    obj[key] = user[key];
  }
  return obj;
}, {});

console.log(picked); 


//30. Omit properties (opposite of pick)
 const user = { user: 'A', password: 'x' };

 //Destructure the property to omit, gather the rest
 const { password, ...safeUser } = user;

 console.log(safeUser); 
