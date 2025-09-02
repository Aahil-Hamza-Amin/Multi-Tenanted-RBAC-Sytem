// Need to Services
// 1) to create application
// 2) to list applications
import { InferInsertModel } from "drizzle-orm";
import { db } from "../../db/client";
import { applicationTable } from "../../db/schema";

export async function createApplication(
  data: InferInsertModel<typeof applicationTable>
) {
  const result = await db.insert(applicationTable).values(data).returning();
  return result[0];
}

export async function getApplications() {
  // SELECT * FROm applicationTable
  // We want => id, name, createdAt from applications
  const result = await db
    .select({
      id: applicationTable.id,
      name: applicationTable.name,
      createdAt: applicationTable.createdAt,
    })
    .from(applicationTable);
  return result;
}
