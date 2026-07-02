// JS Pattern 1 & 2 — const/let + Arrow Functions
// Python: [x * 2 for x in arr]
export const doubleAll = (arr) => arr.map((x) => x * 2)

// JS Pattern 4a — Array .filter()
// Python: [x for x in arr if x % 2 == 0]
export const keepEvens = (arr) => arr.filter((x) => x % 2 === 0)

// JS Pattern 4b — Array .reduce()
// Python: sum(arr) or functools.reduce(lambda a, b: a + b, arr, 0)
export const sumAll = (arr) => arr.reduce((total, x) => total + x, 0)

// JS Pattern 3 — Template Literals
// Python: f"Hello, {name}!"
export const greet = (name) => `Hello, ${name}!`

// JS Pattern 5 — Destructuring
// Python: def get_full_name(person): return f"{person['first']} {person['last']}"
export const getFullName = ({ first, last }) => `${first} ${last}`

// JS Pattern 6 — Async/Await + fetch
// Python: response = requests.get(url); return response.json()[0]["title"]
export const fetchFirstTitle = async (url) => {
  const response = await fetch(url)
  const data = await response.json()
  return data[0].title
}
