"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";

export async function updateGuest(formData) {
  const session = await auth();

  if (!session) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const updateData = { nationality, countryFlag, nationalID };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session?.user?.guestId);

  if (error) throw new Error("Guest could not be updated");

  revalidatePath("/account/profile");

  // // Regular Expression for alphanumeric string of 6 to 12 characters
  // const regex = /^[a-zA-Z0-9]{6,12}$/;

  // // Function to validate a National ID
  // function validateNationalID(nationalID) {
  //     return regex.test(nationalID);
  // }

  // // Example usage
  // const testID = "A1B2C3D4"; // Change this to test different inputs
  // console.log(`Is "${testID}" a valid National ID?`, validateNationalID(testID))
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
