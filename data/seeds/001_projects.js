exports.seed = function(knex, Promise) {
  return knex("projects").insert([
    { name: "Cut Grass", description: "Mow Lawn", complete: false },
    { name: "Workout", description: "Swing Kettlebells", complete: false },
    { name: "Read", description: "Just Read it all!", complete: false }
  ]);
};
