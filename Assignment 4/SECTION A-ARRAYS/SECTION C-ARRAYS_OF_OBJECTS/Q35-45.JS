//35. Total spending per user (aggregate)
 const orders = [
   { id: 1, userId: 1, total: 500, status: 'completed' },
   { id: 2, userId: 2, total: 300, status: 'pending' },
   { id: 3, userId: 1, total: 200, status: 'completed' },
  { id: 4, userId: 3, total: 700, status: 'completed' }
 ];

 const totalSpentPerUser = orders.reduce((acc, order) => {
   acc[order.userId] = (acc[order.userId] || 0) + order.total;
   return acc;
 }, {});

 console.log(totalSpentPerUser);

//36. Completed orders only (filter)
 const completedOrders = orders.filter(order => order.status === 'completed');

 console.log(completedOrders);

//37. Join user info into orders (left join)
const users = [
  { id: 1, name: 'Aman' },
  { id: 2, name: 'Meenu' },
  { id: 3, name: 'Ravi' }
];

// Precompute lookup map
 const userById = users.reduce((map, user) => {
   map[user.id] = user.name;
   return map;
 }, {});

 const ordersWithUser = orders.map(order => ({
 ...order,
   userName: userById[order.userId] || null
 }));

 console.log(ordersWithUser);



//38. Orders grouped by userId
 const orders = [
   { id: 1, userId: 1 },
  { id: 2, userId: 2 },
   { id: 3, userId: 1 },
   { id: 4, userId: 3 }
 ];
 const groupedOrders = orders.reduce((acc, order) => {
   const userId = order.userId;

   // agar pehle se userId exist nahi karta
  if (!acc[userId]) {
    acc[userId] = [];
  }

//   // order push kar do
  acc[userId].push(order);

  return acc;
}, {});

 console.log(groupedOrders);


//39. 39. Top N orders by total (sorting + slice)
function topNOrders(orders, N) {
     return [...orders]                 // copy to avoid mutation
         .sort((a, b) => b.total - a.total)  // descending order
         .slice(0, N);                 // take top N
 }


//40. Average order total per user
function averageOrderPerUser(orders) {

    const result = orders.reduce((acc, order) => {
        const { userId, total } = order;

        if (!acc[userId]) {
            acc[userId] = { sum: 0, count: 0 };
        }

        acc[userId].sum += total;
        acc[userId].count += 1;

        return acc;
    }, {});

     //convert sum → average
    for (let userId in result) {
       result[userId] = result[userId].sum / result[userId].count;
     }

     return result;
 }



//41. Users who placed at least one order (unique)
 const users = [
   { id: 1, name: "Aman" },
   { id: 2, name: "Riya" },
   { id: 3, name: "Rahul" },
   { id: 4, name: "Neha" }
 ];

 const orders = [
   { id: 1, userId: 1 },
   { id: 2, userId: 2 },
   { id: 3, userId: 1 },
   { id: 4, userId: 3 }
 ];

// // Step 1: unique userIds
 const userIds = new Set(orders.map(o => o.userId));

// // Step 2: map to names
 const result = users
 .filter(user => userIds.has(user.id))
  .map(user => user.name);

 console.log(result);



//42. Users with no orders (anti-join)

 const users = [
   { id: 1, name: "Aman" },
   { id: 2, name: "Riya" },
   { id: 3, name: "Neha" }
 ];

 const orders = [
   { id: 101, userId: 1 },
   { id: 102, userId: 2 }
 ];


const orderUserIds = new Set(orders.map(o => o.userId));


const result = users
   .filter(u => !orderUserIds.has(u.id))
  .map(u => u.name);

 console.log(result); 

//43. Paginate results (page, limit)
function paginate(orders, page, limit) {
  const totalItems = orders.length;

  // total pages calculate karo
  const totalPages = Math.ceil(totalItems / limit);

  const start = (page - 1) * limit;
  const end = start + limit;

  // data slice karo
  const data = orders.slice(start, end);

  return {
    page,
    totalPages,
    data
  };
}

// Example
const orders = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 }
];

console.log(paginate(orders, 1, 2));
//44. Search users by name substring (case-insensitive)
const users = [
  { id: 1, name: "Aman" },
  { id: 2, name: "Riya" },
  { id: 3, name: "Neha" }
];

function searchUsers(users, query) {
  return users
    .filter(u =>
      u.name.toLowerCase().includes(query.toLowerCase())
    )
    .map(u => u.name);
}

// Example
console.log(searchUsers(users, "am")); // ["Aman"]

//45. Count orders by status (aggregation)
const orders = [
  { id: 1, status: "completed" },
  { id: 2, status: "pending" },
  { id: 3, status: "completed" },
  { id: 4, status: "completed" }
];

function countByStatus(orders) {
  return orders.reduce((acc, order) => {
    const status = order.status;


    acc[status] = (acc[status] || 0) + 1;

    return acc;
  }, {});
}

// Example
console.log(countByStatus(orders));

