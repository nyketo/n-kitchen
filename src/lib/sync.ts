import { supabase } from "./supabase";
import { db } from "./db";
import type { Table } from "dexie";

/**
 * Which local (Dexie/IndexedDB) tables are mirrored to the cloud.
 * `aiUsage` and `photos` are intentionally excluded: usage tracking is
 * per-device by design, and photos are large binary blobs not worth
 * syncing in this simple version.
 */
const SYNCED_TABLES = [
  "favorites",
  "ratings",
  "notes",
  "fridge",
  "pantry",
  "shopping",
  "weeklyMenu",
  "preferences",
  "personalProducts",
  "recentlyViewed",
  "savedAiRecipes",
] as const;

type SyncedTableName = (typeof SYNCED_TABLES)[number];

function tableFor(name: SyncedTableName): Table<unknown, unknown> {
  return (db as unknown as Record<SyncedTableName, Table<unknown, unknown>>)[name];
}

async function currentUserId(): Promise<string | null> {
  if (!supabase) return null;
  const { data } = await supabase.auth.getUser();
  return data.user?.id ?? null;
}

/** Uploads the full current contents of every synced table to the cloud (overwrites remote). */
export async function pushAll(): Promise<void> {
  if (!supabase) return;
  const userId = await currentUserId();
  if (!userId) return;

  for (const name of SYNCED_TABLES) {
    const rows = await tableFor(name).toArray();
    await supabase.from("user_sync_data").upsert({
      user_id: userId,
      table_name: name,
      data: rows,
      updated_at: new Date().toISOString(),
    });
  }
}

/** Downloads the cloud contents of every synced table and overwrites the local copy. */
export async function pullAll(): Promise<void> {
  if (!supabase) return;
  const userId = await currentUserId();
  if (!userId) return;

  const { data, error } = await supabase
    .from("user_sync_data")
    .select("table_name, data")
    .eq("user_id", userId);
  if (error || !data) return;

  for (const row of data as { table_name: string; data: unknown }[]) {
    if (!(SYNCED_TABLES as readonly string[]).includes(row.table_name)) continue;
    const table = tableFor(row.table_name as SyncedTableName);
    await table.clear();
    if (Array.isArray(row.data) && row.data.length > 0) {
      await table.bulkPut(row.data);
    }
  }
}

/**
 * Merge strategy for the very first sync after sign-in on a device:
 * if the cloud already has data for this account, that wins (so a second
 * device picks up what the first device saved). Otherwise, whatever is
 * already on this device gets uploaded as the starting point.
 */
export async function initialMerge(): Promise<void> {
  if (!supabase) return;
  const userId = await currentUserId();
  if (!userId) return;

  const { data } = await supabase
    .from("user_sync_data")
    .select("table_name")
    .eq("user_id", userId)
    .limit(1);

  if (data && data.length > 0) {
    await pullAll();
  } else {
    await pushAll();
  }
}
