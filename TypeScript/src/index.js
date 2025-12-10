// Example 1: Typo in property name
const user = {
  name: "Alice",
  age: 20
};

// Typo: "nam" instead of "name"
console.log(user.nam);       // undefined

// Later in the code…
console.log(user.name.toUpperCase());
// ❌ TypeError: Cannot read properties of undefined


// Example 2: Implicit type coercion
const product = {
  name: "Book",
  price: "100"  // string, not number
};

const total1 = product.price * 2;  // 200 (auto convert)
const total2 = product.price + 50; // "10050" (string + number)
console.log(total1, total2);