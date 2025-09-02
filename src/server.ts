import { buildServer } from "./utils/app";
import { logger } from "./utils/logger";
import { env } from "./config/env";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db } from "./db/client";

async function gracefullShutdown({
  app,
}: {
  app: Awaited<ReturnType<typeof buildServer>>;
}) {
  await app.close();
}

async function server() {
  const app = await buildServer();

  const signals = ["SIGINT", "SIGTERM"];
  for (const signal of signals) {
    process.on(signal, async () => {
      console.log("signal", signal);

      await gracefullShutdown({
        app,
      });
    });
  }

  await app.listen({
    port: 3007,
  });

  await migrate(db, {
    migrationsFolder: "./src/db/migrations",
  });

  logger.info("Server is running at http://localhost:3007");
  logger.debug(env, "using env");
}

server();
