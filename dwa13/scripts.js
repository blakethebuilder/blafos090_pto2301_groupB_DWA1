const provinces = [
  "Western Cape",
  "Gauteng",
  "Northern Cape",
  "Eastern Cape",
  "KwaZulu-Natal",
  "Free State",
];
const names = [
  "Ashwin",
  "Sibongile",
  "Jan-Hendrik",
  "Sifso",
  "Shailen",
  "Frikkie",
];

/**
 *  Console log each name
 */
names.forEach((name) => {
  console.log(name);
});

/**
 * Console log each name with a matching province
 */
names.forEach((name, index) => {
  console.log(`${name} (${provinces[index]})`);
});

/**
 *  Map province names to uppercase and log the new array
 */
const uppercaseProvinces = provinces.map((province) => province.toUpperCase());
console.log(uppercaseProvinces);

/**
 * Create an array with the length of each name
 */
const nameLengths = names.map((name) => name.length);
console.log(nameLengths);

/**
 * Sort provinces alphabetically
 */
const sortedProvinces = provinces.slice().sort();
console.log(sortedProvinces);

/**
 * Filter out provinces with 'Cape' and return the count
 */
const filteredProvinces = provinces.filter(
  (province) => !province.includes("Cape")
);
console.log(filteredProvinces.length);

/**
 * Create a boolean array based on the presence of 'S' in names
 */
const nameContainsS = names.map((name) => name.includes("S"));
console.log(nameContainsS);

/**
 * using reduce,turn the code into an object that indicates the province of an individual
 */
const nameProvinceObject = names.reduce((result, name, index) => {
  result[name] = provinces[index];
  return result;
}, {});

console.log(nameProvinceObject);
