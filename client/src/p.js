let address = [
  {
    country: {
      type: String,
    },
    city: {
      type: String,
    },
    address1: {
      type: String,
    },
    address2: {
      type: String,
    },
    zipCode: {
      type: String,
    },
    addressTpe: {
      type: String,
    },
  },
];
let ans = address.find((data) => {
  return data.country;
});
console.log(ans);
