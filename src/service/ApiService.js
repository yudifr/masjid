const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const responseHandler = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    return Promise.reject(data);
  }

  return data;
};

const ApiService = {
  get(resource, queryStrings = null, params = {}) {
    let path = resource;

    if (queryStrings != null) {
      path += `?${new URLSearchParams(queryStrings).toString()}`;
    }

    return fetch(path, {
      method: "GET",
      headers,
    }).then(responseHandler);
  },
};

export default ApiService;
