const express = require("express");

const app = express();
app.use(express.json());

let recipes = [
  {
    id: 1,
    title: "チキンカレー",
    making_time: "45分",
    serves: "4人",
    ingredients: "玉ねぎ,肉,スパイス",
    cost: 1000
  },
  {
    id: 2,
    title: "オムライス",
    making_time: "30分",
    serves: "2人",
    ingredients: "玉ねぎ,卵,スパイス,醤油",
    cost: 700
  }
];

app.post("/recipes", (req, res) => {
  const { title, making_time, serves, ingredients, cost } = req.body;

  if (!title || !making_time || !serves || !ingredients || cost === undefined) {
    return res.status(200).json({
      message: "Recipe creation failed!"
    });
  }

  const recipe = {
    id: recipes.length ? Math.max(...recipes.map(r => r.id)) + 1 : 1,
    title,
    making_time,
    serves,
    ingredients,
    cost
  };

  recipes.push(recipe);

  res.status(200).json({
    message: "Recipe successfully created!",
    recipe: [recipe]
  });
});

app.get("/recipes", (req, res) => {
  res.status(200).json({
    recipes
  });
});

app.get("/recipes/:id", (req, res) => {
  const recipe = recipes.find(r => r.id === Number(req.params.id));

  res.status(200).json({
    message: "Recipe details by id",
    recipe: recipe ? [recipe] : []
  });
});

app.patch("/recipes/:id", (req, res) => {
  const recipe = recipes.find(r => r.id === Number(req.params.id));

  if (!recipe) {
    return res.status(200).json({
      message: "No Recipe found"
    });
  }

  Object.assign(recipe, req.body);

  res.status(200).json({
    message: "Recipe successfully updated!",
    recipe: [recipe]
  });
});

app.delete("/recipes/:id", (req, res) => {
  const index = recipes.findIndex(r => r.id === Number(req.params.id));

  if (index === -1) {
    return res.status(200).json({
      message: "No Recipe found"
    });
  }

  recipes.splice(index, 1);

  res.status(200).json({
    message: "Recipe successfully removed!"
  });
});

app.use((req, res) => {
  res.status(404).json({
    message: "Not Found"
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});