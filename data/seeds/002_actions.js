exports.seed = function(knex, Promise) {
  // Inserts seed entries
  return knex("actions").insert([
    {
      project_id: 1,
      description: "Get Fuel",
      notes: "Do NOT FORGET",
      complete: false
    },
    {
      project_id: 1,
      description: "Mow it all!",
      notes: "CHAMPION",
      complete: false
    },
    {
      project_id: 2,
      description: "Get workout gloves",
      notes: "prevent injury",
      complete: false
    },
    {
      project_id: 2,
      description: "Start Workout",
      notes: "Get Back in shape",
      complete: false
    },
    {
      project_id: 3,
      description: "reading is fun",
      notes: "Get smarter, keep open mind",
      complete: false
    },
    {
      project_id: 3,
      description: "start new book",
      notes: "Profit from knowledge",
      complete: false
    }
  ]);
};
