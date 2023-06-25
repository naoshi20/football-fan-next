import path from "path";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export async function getPlayers(from) {
    const supabase = createClientComponentClient();

    const result = await supabase
        .from("players5")
        .select("*")
        // .eq("favorite", true)
        .order("id", { ascending: true })
        .limit(10);
    return result;
}
