//46. Update order status immutably (PATCH pattern)
const orders = [
  { id: 1, status: "pending" },
  { id: 2, status: "pending" },
  { id: 3, status: "completed" }
];

function updateOrderStatus(orders, orderId, newStatus) {
  return orders.map(order =>
    order.id === orderId
      ? { ...order, status: newStatus } // new object (updated)
      : order // same object (unchanged)
  );
}

// Example
const updatedOrders = updateOrderStatus(orders, 2, "completed");

console.log(updatedOrders);
/*
[
  { id: 1, status: "pending" },
  { id: 2, status: "completed" },
  { id: 3, status: "completed" }
]
*/

// original array unchanged
console.log(orders);
//47. Soft-delete pattern (mark deleted)
const orders = [
  { id: 1, status: "pending" },
  { id: 2, status: "completed" },
  { id: 3, status: "pending" }
];

function softDeleteOrder(orders, orderId) {
  return orders.map(order =>
    order.id === orderId
      ? { ...order, deleted: true } // mark as deleted
      : order
  );
}

// Example
const updatedOrders = softDeleteOrder(orders, 3);

console.log(updatedOrders);
/*
[
  { id: 1, status: "pending" },
  { id: 2, status: "completed" },
  { id: 3, status: "pending", deleted: true }
]
*/

// original array unchanged
console.log(orders);

//48. Merge two datasets into API response (user summary
const users = [
  { id: 1, name: "Aman" },
  { id: 2, name: "Riya" }
];

const orders = [
  { id: 101, userId: 1, amount: 300 },
  { id: 102, userId: 1, amount: 400 },
  { id: 103, userId: 2, amount: 200 }
];

function getUserSummary(users, orders) {
  // Step 1: orders ko userId ke hisaab se aggregate karo
  const ordersByUser = orders.reduce((acc, order) => {
    const { userId, amount } = order;

    if (!acc[userId]) {
      acc[userId] = { totalOrders: 0, totalSpent: 0 };
    }

    acc[userId].totalOrders += 1;
    acc[userId].totalSpent += amount;

    return acc;
  }, {});

  // Step 2: users pe map chala ke final response banao
  return users.map(user => {
    const stats = ordersByUser[user.id] || { totalOrders: 0, totalSpent: 0 };

    return {
      userId: user.id,
      name: user.name,
      totalOrders: stats.totalOrders,
      totalSpent: stats.totalSpent
    };
  });
}

// Example
console.log(getUserSummary(users, orders));
/*
[
  { userId: 1, name: "Aman", totalOrders: 2, totalSpent: 700 },
  { userId: 2, name: "Riya", totalOrders: 1, totalSpent: 200 }
]
*/

//49. Compute percent contribution per user (of total revenue)
const orders = [
  { id: 101, userId: 1, amount: 300 },
  { id: 102, userId: 1, amount: 400 },
  { id: 103, userId: 2, amount: 1000 }
];

function percentContribution(orders) {
  // Step 1: total revenue nikaalo
  const totalRevenue = orders.reduce((sum, o) => sum + o.amount, 0);

  // Step 2: per user total nikaalo
  const revenueByUser = orders.reduce((acc, o) => {
    acc[o.userId] = (acc[o.userId] || 0) + o.amount;
    return acc;
  }, {});

  // Step 3: percent calculate karo (2 decimal)
  const result = {};
  for (let userId in revenueByUser) {
    const value = revenueByUser[userId];
    result[userId] = Number(((value / totalRevenue) * 100).toFixed(2));
  }

  return result;
}

// Example
console.log(percentContribution(orders));
// Output: { '1': 41.18, '2': 58.82 }

//50. Transform orders to minimal DTO (Data Transfer Object)
const orders = [
  { id: 1, amount: 500, userId: 1, status: "completed" },
  { id: 2, amount: 300, userId: 2, status: "pending" }
];

function toOrderDTO(orders) {
  return orders.map(o => ({
    id: o.id,
    total: o.amount
  }));
}

// Example
console.log(toOrderDTO(orders));
// Output: [ { id: 1, total: 500 }, { id: 2, total: 300 } ]

//51. Add computed field — tax and grand total (map)
const orders = [
  { id: 1, total: 100 },
  { id: 2, total: 250 }
];

function addTaxAndGrandTotal(orders) {
  return orders.map(o => {
    const tax = +(o.total * 0.18).toFixed(2);
    const grandTotal = +(o.total + tax).toFixed(2);

    return {
      ...o,
      tax,
      grandTotal
    };
  });
}

// Example
console.log(addTaxAndGrandTotal(orders));
/*
[
  { id: 1, total: 100, tax: 18.00, grandTotal: 118.00 },
  { id: 2, total: 250, tax: 45.00, grandTotal: 295.00 }
]
*/
//52. Bulk update: increase totals by percentage for promotions
const orders = [
  { id: 1, total: 500, status: "completed" },
  { id: 2, total: 300, status: "pending" },
  { id: 3, total: 200, status: "completed" }
];

function applyPromotion(orders, percentIncrease = 10) {
  return orders.map(o => {
    if (o.status === "completed") {
      const increasedTotal = +(o.total * (1 + percentIncrease / 100)).toFixed(2);

      return {
        ...o,
        total: increasedTotal
      };
    }
    return o; // unchanged
  });
}

// Example
console.log(applyPromotion(orders));
/*
[
  { id: 1, total: 550, status: "completed" },
  { id: 2, total: 300, status: "pending" },
  { id: 3, total: 220, status: "completed" }
]
*/

// original array unchanged
console.log(orders);

//53. Validate payloads: find invalid orders (missing fields)
const orders = [
  { id: 1, userId: 1, total: 500 },
  { id: 2, userId: 2, total: 300 },
  { id: 5, total: 100 } // invalid (missing userId)
];

function findInvalidOrders(orders) {
  return orders.filter(o =>
    o.id == null || o.userId == null || o.total == null
  );
}

// Example
console.log(findInvalidOrders(orders));
// Output: [ { id: 5, total: 100 } ]

//54. Merge newer orders array into existing (upsert)

const existing = [
  { id: 1, total: 500 },
  { id: 2, total: 300 }
];

const incoming = [
  { id: 1, total: 600 }, // replace
  { id: 3, total: 200 }  // new
];

function upsertOrders(existing, incoming) {
  // Step 1: id map banao
  const map = {};

  existing.forEach(o => {
    map[o.id] = o;
  });

  // Step 2: incoming se overwrite/add
  incoming.forEach(o => {
    map[o.id] = o;
  });

  // Step 3: array + sort
  return Object.values(map).sort((a, b) => a.id - b.id);
}

// Example
console.log(upsertOrders(existing, incoming));
/*
[
  { id: 1, total: 600 },
  { id: 2, total: 300 },
  { id: 3, total: 200 }
]
*/

//55. Group users by activity status (active/inactive)
const users = [
  { id: 1, name: "Aman", active: true },
  { id: 2, name: "Riya", active: false },
  { id: 3, name: "Rahul", active: true },
  { id: 4, name: "Neha", active: false }
];

function groupByActivity(users) {
  return users.reduce(
    (acc, user) => {
      if (user.active) {
        acc.active.push(user);
      } else {
        acc.inactive.push(user);
      }
      return acc;
    },
    { active: [], inactive: [] }
  );
}

// Example
console.log(groupByActivity(users));
/*
{
  active: [
    { id: 1, name: "Aman", active: true },
    { id: 3, name: "Rahul", active: true }
  ],
  inactive: [
    { id: 2, name: "Riya", active: false },
    { id: 4, name: "Neha", active: false }
  ]
}
*/

//56. Multi-criteria filter (age and activity)
const users = [
  { id: 1, name: "Aman", age: 20, isActive: true },
  { id: 2, name: "Riya", age: 17, isActive: true },
  { id: 3, name: "Rahul", age: 22, isActive: true },
  { id: 4, name: "Neha", age: 19, isActive: false }
];

function getEligibleUsers(users) {
  return users
    .filter(u => u.isActive && u.age >= 18)
    .map(u => u.name);
}

// Example
console.log(getEligibleUsers(users));
// Output: ["Aman", "Rahul"]