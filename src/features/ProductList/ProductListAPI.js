// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/products");
    const data = await response.json();

    resolve({ data });
  });
}

export function fetchFilterProducts(filter, sort, pagination) {
  console.log("filter", filter);
  let queryParams = [];

  // Process filter parameters
  for (let key in filter) {
    const categoryVal = filter[key];
    if (categoryVal.length > 0) {
      const lastCategoryVal = categoryVal[categoryVal.length - 1];
      console.log(`Key: ${key}, Last Category Value: ${lastCategoryVal}`);
      queryParams.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(lastCategoryVal)}`
      );
    }
  }

  // Process sort parameters
  for (let key in sort) {
    const sortVal = sort[key];
    console.log(`Sort Key: ${key}, Sort Value: ${sortVal}`);
    queryParams.push(
      `${encodeURIComponent(key)}=${encodeURIComponent(sortVal)}`
    );
  }

  // Add pagination parameters
  queryParams.push(`page=${encodeURIComponent(pagination.page)}`);
  queryParams.push(`limit=${encodeURIComponent(pagination.limit)}`);

  // Join all query parameters with "&"
  const queryString = queryParams.join("&");
  console.log("Final query string:", queryString);

  // let queryString = Object.keys(filter)
  //   .map(
  //     (key) => `${encodeURIComponent(key)}=${encodeURIComponent(filter[key])}`
  //   )
  //   .join("&");

  console.log("query string:", queryString);
  return new Promise(async (resolve) => {
    const response = await fetch(
      `http://localhost:8000/products?${queryString}`
    );
    const data = await response.json();

    resolve({ data });
  });
}
