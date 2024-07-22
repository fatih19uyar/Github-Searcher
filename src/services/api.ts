export const fetchUserName = async (userInput: string) => {
  try {
    const response = await fetch(
      `https://api.github.com/search/users?q=${userInput}`,
    );
    const json = await response.json();
    return json.items;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchRepositories = async (userInput: string) => {
  try {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${userInput}`,
    );
    const json = await response.json();
    return json.items;
  } catch (error) {
    console.error(error);
    return [];
  }
};
