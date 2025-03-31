import { supabase } from "../lib/supabase";

/*********** Product Service ***********/

// fetch all products
export async function fetchProducts(category?: string, searchQuery?: string) {
  try {
    let query = supabase.from("product_data").select("*");

    if (category) {
      query = query.eq("product_category", category);
    }

    if (searchQuery) {
      query = query.ilike("product_name", `%${searchQuery}`);
    }

    const { data, error } = await query;

    if (error) throw error;

    return data;
  } catch (error) {
    console.error(error);
  }
}

// fetch product details
export async function fetchProductDetails(id: number) {
  try {
    const { data, error } = await supabase
      .from("product_data")
      .select("*")
      .eq("id", id);

    if (error) throw error;

    return data;
  } catch (error) {
    console.log(error);
  }
}

/************* Cart Service *************/

// add to cart

export async function addProductToCart(
  userId: string,
  productId: number,
  price: number,
  quantity: number
) {
  try {
    const { data: existingItems, error: fetchError } = await supabase
      .from("cart")
      .select("*")
      .eq("user_id", userId)
      .eq("product_id", productId);

    if (fetchError) throw fetchError;

    if (existingItems && existingItems.length > 0) {
      const newQuantity = existingItems[0].quantity + quantity;

      return await updateCartItem(userId, newQuantity, productId);
    } else {
      const { data, error } = await supabase
        .from("cart")
        .insert([
          {
            user_id: userId,
            product_id: productId,
            price_at_time: price,
            quantity: quantity,
          },
        ])
        .select();

      deleteWishlistItem(productId, userId);

      if (error) throw error;

      return data;
    }
  } catch (error) {
    console.log(error);
  }
}

// add to cart (legacy code only for first time use)

// export async function addProductToCart(
//   userId: string,
//   productId: number,
//   price: number,
//   quantity: number
// ) {
//   try {
//     const { data, error } = await supabase.from("cart").insert([
//       {
//         user_id: userId,
//         product_id: productId,
//         price_at_time: price,
//         quantity: quantity,
//       },
//     ]);

//     if (error) throw error;

//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// }

// fetch cart

export async function fetchCartData(userId: string) {
  if (!userId) return [];
  try {
    const { data, error } = await supabase
      .from("cart")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    if (error) throw error;

    return data;
  } catch (error) {
    console.log(error);
  }
}

// fetch single product for cart

export async function fetchCartItem(productId: number) {
  try {
    const { data, error } = await supabase
      .from("product_data")
      .select("*")
      .eq("id", productId)
      .single();
    if (error) throw error;

    return data;
  } catch (error) {
    console.log(error);
  }
}

// update cart item

export async function updateCartItem(
  userId: string,
  quantity: number,
  productId: number
) {
  try {
    const { data, error } = await supabase
      .from("cart")
      .update({ quantity: quantity })
      .eq("user_id", userId)
      .eq("product_id", productId)
      .select();

    if (error) throw error;

    return data;
  } catch (error) {
    console.log(error);
  }
}

// deleting cart item

export async function deleteCartItem(productId: number, userId: string) {
  try {
    const { error } = await supabase
      .from("cart")
      .delete()
      .eq("user_id", userId)
      .eq("product_id", productId);

    if (error) throw error;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// clear the cart

export async function clearCart(userId: string) {
  try {
    const { error } = await supabase
      .from("cart")
      .delete()
      .eq("user_id", userId);

    if (error) throw error;
  } catch (error) {
    console.log(error);
  }
}

/************ Wishlist service ***********/

// add to wishlist

export async function addProductToWishlist(
  userId: string,
  productId: number,
  price: number,
  quantity: number
) {
  try {
    const { data: existingItems, error: fetchError } = await supabase
      .from("wishlist")
      .select("*")
      .eq("user_id", userId)
      .eq("product_id", productId);

    if (fetchError) throw fetchError;

    if (existingItems && existingItems.length > 0) {
      const newQuantity = existingItems[0].quantity + quantity;

      return await updateCartItem(userId, newQuantity, productId);
    } else {
      const { data, error } = await supabase
        .from("wishlist")
        .insert([
          {
            user_id: userId,
            product_id: productId,
            price_at_time: price,
            quantity: quantity,
          },
        ])
        .select();

      if (error) throw error;

      return data;
    }
  } catch (error) {
    console.log(error);
  }
}

// fetch wishlist

export async function fetchWishlistData(userId: string) {
  try {
    const { data, error } = await supabase
      .from("wishlist")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    if (error) throw error;

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function updateWishlistItem(
  userId: string,
  quantity: number,
  productId: number
) {
  try {
    const { data, error } = await supabase
      .from("wishlist")
      .update({ quantity: quantity })
      .eq("user_id", userId)
      .eq("product_id", productId)
      .select();

    if (error) throw error;

    return data;
  } catch (error) {
    console.log(error);
  }
}

// fetch single product for wishlist

export async function fetchWishlistItem(productId: number) {
  try {
    const { data, error } = await supabase
      .from("product_data")
      .select("*")
      .eq("id", productId)
      .single();
    if (error) throw error;

    return data;
  } catch (error) {
    console.log(error);
  }
}

// deleting wishlist item

export async function deleteWishlistItem(productId: number, userId: string) {
  try {
    const { error } = await supabase
      .from("wishlist")
      .delete()
      .eq("user_id", userId)
      .eq("product_id", productId);

    if (error) throw error;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// clear the wishlist

export async function clearWishlist(userId: string) {
  try {
    const { error } = await supabase
      .from("wishlist")
      .delete()
      .eq("user_id", userId);

    if (error) throw error;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchUserOrders(userId: string) {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function searchProducts(searchTerm: string) {
  try {
    const { data, error } = await supabase
      .from("product_data")
      .select("*")
      .ilike("product_name", `%${searchTerm}%`);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error(error);
  }
}
