import supabase from "./supabase.jsx";

export async function getApiData() {
    const { data, error } = await supabase.from("Data").select("*");

    if (error) {
        console.log(error);
        console.log("Error fetching data from Supabase");
    }

    return data;
}
