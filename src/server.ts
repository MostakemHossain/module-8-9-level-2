import config from './app/config';

import mongoose from 'mongoose';
import app from './app';

async function main() {
  await mongoose.connect(config.database_url as string);

  try {
    app.listen(config.PORT, () => {
      console.log(` app listening on port ${config.PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
