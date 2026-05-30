import https from "https";

const idsToTest = {
  biryani_1: "photo-1589302168068-964664d93dc0",
  biryani_2: "photo-1633945274405-b6c8069047b0",
  biryani_3: "photo-1626777552726-4a6b54c97e46",
  rice_dish: "photo-1541832676-9b763b0239ab",
  samosa_1: "photo-1601050690597-df0568f70950",
  samosa_2: "photo-1626132647523-66f5bf380027",
  gulab_jamun_1: "photo-1589301760014-d929f3979dbc",
  gulab_jamun_2: "photo-1605333396915-47ed6b68a00e",
  paneer_tikka: "photo-1601050690832-2d5b62b78119",
  dosa: "photo-1610192244261-3f33de3f55e4",
  tandoori_chicken: "photo-1610057099443-fde8c4d90ef8",
  butter_chicken: "photo-1603894584373-5ac82b2ae398",
  naan: "photo-1601356616077-6957284d729c",
  street_food: "photo-1567337710282-00832b415979"
};

function testId(key, id) {
  const url = `https://images.unsplash.com/${id}?w=600&auto=format&fit=crop`;
  return new Promise((resolve) => {
    https.request(url, { method: "HEAD" }, (res) => {
      resolve({ key, id, status: res.statusCode });
    })
    .on("error", (err) => {
      resolve({ key, id, status: `ERROR: ${err.message}` });
    })
    .end();
  });
}

async function run() {
  console.log("Testing Unsplash IDs...");
  for (const [key, id] of Object.entries(idsToTest)) {
    const res = await testId(key, id);
    console.log(`${key} (${id}): Status ${res.status}`);
  }
}

run();
