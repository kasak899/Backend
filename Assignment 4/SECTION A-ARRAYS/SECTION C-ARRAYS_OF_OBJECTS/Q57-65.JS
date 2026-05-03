//57. Compute histogram of ages (bucketed)
const users = [
  { id: 1, name: "Aman", age: 20 },
  { id: 2, name: "Riya", age: 17 },
  { id: 3, name: "Rahul", age: 22 },
  { id: 4, name: "Neha", age: 26 }
];

function ageHistogram(users) {
  return users.reduce((acc, u) => {
    let bucket;

    if (u.age < 18) {
      bucket = "<18";
    } else if (u.age <= 24) {
      bucket = "18-24";
    } else {
      bucket = "25+";
    }

    acc[bucket] = (acc[bucket] || 0) + 1;
    return acc;
  }, {});
}

// Example
console.log(ageHistogram(users));
// Output: { '<18': 1, '18-24': 2, '25+': 1 }

//58. Build lookup map for users by id (cache)
const users = [
  { id: 1, name: "Aman" },
  { id: 2, name: "Riya" }
];

function buildUserMap(users) {
  return users.reduce((acc, user) => {
    acc[user.id] = user;
    return acc;
  }, {});
}

// Example
const userMap = buildUserMap(users);
console.log(userMap);
/*
{
  1: { id: 1, name: "Aman" },
  2: { id: 2, name: "Riya" }
}
*/
//59. Top K users by spending (join + sort)
const users = [
  { id: 1, name: "Aman" },
  { id: 2, name: "Riya" },
  { id: 3, name: "Rahul" }
];

const orders = [
  { id: 101, userId: 1, amount: 300 },
  { id: 102, userId: 1, amount: 400 },
  { id: 103, userId: 3, amount: 800 },
  { id: 104, userId: 2, amount: 200 }
];

function topKUsersBySpending(users, orders, k) {
  // Step 1: total spend per user
  const spendByUser = orders.reduce((acc, o) => {
    acc[o.userId] = (acc[o.userId] || 0) + o.amount;
    return acc;
  }, {});

  // Step 2: userId -> user map (fast lookup)
  const userMap = Object.fromEntries(users.map(u => [u.id, u]));

  // Step 3: convert to array + sort desc
  const sorted = Object.entries(spendByUser)
    .sort((a, b) => b[1] - a[1]);

  // Step 4: top k + map to names
  return sorted
    .slice(0, k)
    .map(([userId]) => userMap[userId]?.name);
}

// Example
console.log(topKUsersBySpending(users, orders, 2));
// Output: ["Rahul", "Aman"]

//60. Distinct values for a field (unique statuses)
const orders = [
  { id: 1, status: "completed" },
  { id: 2, status: "pending" },
  { id: 3, status: "completed" }
];

function getUniqueStatuses(orders) {
  return [...new Set(orders.map(o => o.status))];
}

// Example
console.log(getUniqueStatuses(orders));
// Output: ["completed", "pending"]

//61. Normalize nested arrays (orders with product arrays)
const orders = [
  {
    id: 1,
    products: [
      { productId: 5, qty: 2 },
      { productId: 6, qty: 1 }
    ]
  },
  {
    id: 2,
    products: [
      { productId: 5, qty: 3 }
    ]
  }
];

function normalizeOrders(orders) {
  return orders.flatMap(order =>
    order.products.map(p => ({
      orderId: order.id,
      productId: p.productId,
      qty: p.qty
    }))
  );
}

// Example
console.log(normalizeOrders(orders));
/*
[
  { orderId: 1, productId: 5, qty: 2 },
  { orderId: 1, productId: 6, qty: 1 },
  { orderId: 2, productId: 5, qty: 3 }
]
*/
//62. Calculate lifetime value per user (LTV) with weights
const orders = [
  { id: 1, userId: 1, amount: 300, status: "completed" },
  { id: 2, userId: 1, amount: 400, status: "completed" },
  { id: 3, userId: 2, amount: 300, status: "pending" }
];

// weight map
const weights = {
  completed: 1.0,
  pending: 0.5
};

function calculateWeightedLTV(orders) {
  return orders.reduce((acc, o) => {
    const weight = weights[o.status] ?? 1; // default 1
    const value = o.amount * weight;

    acc[o.userId] = (acc[o.userId] || 0) + value;
    return acc;
  }, {});
}

// Example
console.log(calculateWeightedLTV(orders));
// Output: { '1': 700, '2': 150 }

//63. Convert array of users to CSV string (export)
const users = [
  { id: 1, name: "Aman" },
  { id: 2, name: "Riya" }
];

function toCSV(users) {
  if (!users.length) return "";

  const headers = Object.keys(users[0]);

  const rows = users.map(obj =>
    headers.map(h => obj[h]).join(",")
  );

  return headers.join(",") + "\n" + rows.join("\n") + "\n";
}

// Example
console.log(toCSV(users));
/*
id,name
1,Aman
2,Riya
*/

//64. Merge user preferences into user objects (left join with defaults)
const users = [
  { id: 1, name: "Aman" },
  { id: 2, name: "Riya" },
  { id: 3, name: "Rahul" }
];

const preferences = [
  { userId: 1, theme: "dark" }
];

// default preferences
const defaultPrefs = { theme: "light" };

function mergePreferences(users, preferences) {
  // Step 1: preference map banao (userId -> pref)
  const prefMap = Object.fromEntries(
    preferences.map(p => [p.userId, p])
  );

  // Step 2: users pe map chalao (left join)
  return users.map(u => ({
    ...u,
    preferences: {
      ...defaultPrefs,
      ...(prefMap[u.id] || {})
    }
  }));
}

// Example
console.log(mergePreferences(users, preferences));
/*
[
  { id: 1, name: "Aman", preferences: { theme: "dark" } },
  { id: 2, name: "Riya", preferences: { theme: "light" } },
  { id: 3, name: "Rahul", preferences: { theme: "light" } }
]
*/
//65. Snapshot diff: detect changed users between two lists
const oldUsers = [
  { id: 1, name: "A", age: 20 },
  { id: 2, name: "Riya", age: 22 }
];

const newUsers = [
  { id: 1, name: "Aman", age: 20 },
  { id: 2, name: "Riya", age: 23 }
];

function diffUsers(oldUsers, newUsers) {
  // Step 1: maps banao (id -> user)
  const oldMap = Object.fromEntries(oldUsers.map(u => [u.id, u]));
  const newMap = Object.fromEntries(newUsers.map(u => [u.id, u]));

  const result = [];

  // Step 2: ids loop karo
  for (let id in newMap) {
    const oldUser = oldMap[id];
    const newUser = newMap[id];

    if (!oldUser) continue; // ignore new-only users

    const changedFields = [];

    // Step 3: shallow compare fields
    for (let key in newUser) {
      if (key === "id") continue;

      if (oldUser[key] !== newUser[key]) {
        changedFields.push(key);
      }
    }

    // Step 4: only push if changes found
    if (changedFields.length > 0) {
      result.push({
        id: Number(id),
        changedFields
      });
    }
  }

  return result;
}

// Example
console.log(diffUsers(oldUsers, newUsers));
/*
[
  { id: 1, changedFields: ["name"] },
  { id: 2, changedFields: ["age"] }
]
*/