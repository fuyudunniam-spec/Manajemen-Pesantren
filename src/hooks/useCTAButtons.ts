"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function useCTAButtons(location?: string) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchButtons() {
            const supabase = createClient();

            let query = supabase
                .from("cta_buttons")
                .select("*")
                .eq("is_active", true)
                .order("position", { ascending: true });

            if (location) {
                query = query.eq("location", location);
            }

            const { data, error } = await query;

            if (error) {
                console.error("Error fetching CTA buttons:", error);
                setLoading(false);
                return;
            }
            setLoading(false);
        }

        fetchButtons();
    }, [location]);


}
