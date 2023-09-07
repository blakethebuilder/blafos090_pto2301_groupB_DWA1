const products = [
  { product: "banana", price: "2" },
  { product: "mango", price: 6 },
  { product: "potato", price: " " },
  { product: "avocado", price: "8" },
  { product: "coffee", price: 10 },
  { product: "tea", price: "" },
];

console.log(
  products.reduce(
    (accumulator, currentValue) => {
      const currentPrice = parseFloat(currentValue.price);
      if (!isNaN(currentPrice)) {
        if (currentPrice > accumulator.highestPrice) {
          accumulator.highestPrice = currentPrice;
          accumulator.highestPriceName = currentValue.product;
        }
        if (currentPrice < accumulator.lowestPrice) {
          accumulator.lowestPrice = currentPrice;
          accumulator.lowestPriceName = currentValue.product;
        }
      }

      return accumulator;
    },
    {
      highestPrice: -Infinity, // 10
      lowestPrice: Infinity, // 2
      highestPriceName: "", // coffee
      lowestPriceName: "", // banana
    }
  )

  //   const highestAndLowest = `Highest: ${accumulator.highestPriceName}. Lowest: ${accumulator.lowestPriceName}`;
  //   return highestAndLowest;
  // })();

  // ====== problems ======
  // the problems i had to with this part are as follows:
  // the difficulty with changing and outputting the string as the accumulator seems to be the difficulty.
  // I have tried making a function in the return of the reduce but that just creates a factory function does not evaluate the function.
  // I thus tried to make a function that wraps around the reduce method but that doesn't seem to pass the values as expected with an anon function.
  // I have tried modifying the accumulator object before it is returned but that changes the result as I need to keep it separate from the reduce loop.
  // All my problems point to a solution that does not have my reduce logic encapsulated in the console.log.
);
