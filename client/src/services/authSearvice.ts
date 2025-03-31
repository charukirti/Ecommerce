import { supabase } from "../lib/supabase";
import { signInData, signUpData } from "../types/projectTypes";

//  signup

export async function signup({ name, email, password }: signUpData) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        name,
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

//  signin

export async function signIn({ email, password }: signInData) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) throw new Error(error.message);

  return data;
}

// get current user

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data;
}

// logout

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

// forgot password

export async function sendPasswordResetEmail(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://localhost:5173/auth/reset-password",
  });

  if (error) throw new Error(error.message);
}

// update reseted password

export async function resetUserPassword(newPassword: string) {
  const { error } = await supabase.auth.updateUser({ password: newPassword });

  if (error) throw new Error(error.message);
}
