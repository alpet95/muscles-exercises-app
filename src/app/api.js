const API = "https://wger.de/api/v2";

export const getMusclesNames = async () => {
  const response = await fetch(`${API}/muscle`);
  const data = await response.json();
  const names = [];

  for (const key in data.results) {
    const configObj = {
      id: data.results[key].id,
      name: data.results[key].name,
    };
    names.push(configObj);
  }

  return names.sort((n1, n2) => (n1.id > n2.id ? 1 : -1));
};

export const getExercisesInfo = async (query) => {
  const response = await fetch(`${API}/exercise/?muscles=${query}`);
  const data = await response.json();
  const exercises = [];

  for (const key in data.results) {
    const configObj = {
      id: data.results[key].id,
      name: data.results[key].name,
      description: data.results[key].description,
      musclesOther: data.results[key].muscles.filter(
        (id) => id.toString() !== query
      ),
    };
    exercises.push(configObj);
  }

  return exercises;
};
