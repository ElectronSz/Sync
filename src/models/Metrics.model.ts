import { db } from "../../db/config";

export async function getMetrics() {
    const metrics = await db.$metrics.json()

    return metrics;
}