const searchFood = async (query, limit) => {
  const response = await fetch(
    `https://api.edamam.com/auto-complete?app_id=c06da71e&app_key=9b73fedaa81e0a9db742b22af432f224&q=${query}&limit=${limit}`
  );
  const data = await response.json();
  return data;
};
