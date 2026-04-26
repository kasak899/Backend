//31. Merge nested objects immutably (one-level nested)
const user = { 
   name: 'A', 
   address: { city: 'Old', zip: 123 } 
 };

// // Update city immutably
 const updatedUser = {
   ...user,
  address: {
   ...user.address,
   city: 'New'
  }
 };

console.log(updatedUser);
// /* Output:
{
  name: 'A',
  address: { city: 'New', zip: 123 }
}
// */

// // Original object remains unchanged
console.log(user);
/* Output:
{
  name: 'A',
  address: { city: 'Old', zip: 123 }
 }
*/

//32. Rename a key in object immutably
const user = { fullName: 'A', age: 20 };

// // Destructure to pick the value and rest of the object
const { fullName, ...rest } = user;

// // Create new object with renamed key
 const updatedUser = { name: fullName, ...rest };

console.log(updatedUser);
 Output: { name: 'A', age: 20 }

// Original object remains unchanged
 console.log(user);
 Output: { fullName: 'A', age: 20 }


//33. Merge defaults with provided config
 const defaults = { retries: 3, timeout: 500 };
 const config = { timeout: 100 };
 const mergedConfig = { ...defaults, ...config };

 console.log(mergedConfig);

//34. Check if object is empty
const obj1 = {};

 const isEmpty = Object.keys(obj1).length === 0;

 console.log(isEmpty); 