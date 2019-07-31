export const uniqueKeyGenerator = pre => {
  const unique_key = `${pre}_${(
    Date.now().toString(36) +
    Math.random()
      .toString(36)
      .substr(2, 5)
  ).toUpperCase()}`;
  return unique_key;
};
