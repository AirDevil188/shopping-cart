export const getRequestFetch = async (url) => {
  const response = await fetch(url);
  console.log(response);

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  return response.json();
};
