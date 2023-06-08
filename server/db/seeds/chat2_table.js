/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("chat2_table").del();
  await knex("chat2_table").insert([
    {
      id: 1,
      name: "岸田",
      message: "こんにちは",
      created_at: new Date().toISOString(),
    },
    {
      id: 2,
      name: "麻生",
      message: "お元気ですか？",
      created_at: new Date().toISOString(),
    },
    {
      id: 3,
      name: "岸田",
      message: "今日はいい天気ですね",
      created_at: new Date().toISOString(),
    },
  ]);
};
