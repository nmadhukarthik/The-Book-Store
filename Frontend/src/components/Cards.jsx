import { useDispatch, useSelector } from "react-redux";
// import { addToCart, decrementQuantity } from "../redux/cartSlice";
import { useAuth } from "../context/AuthProvider";
import { addToCart, decrementQuantity } from "../redux/cartThunk";
function Cards({ item }) {
    const dispatch = useDispatch();
    const [authUser, setAuthUser] = useAuth();
    const userId = authUser._id;
    console.log(userId);
    if (!userId) {
        return <div>Please login to add items to the cart.</div>;
    }
    // Ensure userCarts exists
    const userCarts = useSelector((state) => state.cart.userCarts || {});
    console.log("User Carts:", userCarts); // Debugging step
    // Ensure cartItems is an array
    const cartItems = userCarts[userId]?.items || [];
    console.log("Cart Items:", cartItems); // Debugging step
    // Find the item in the cart
    const cartItem = cartItems.find(
        (cartItem) => cartItem.productId === item._id
    );

    return (
        <>
            <div className="mt-4 my-3 p-3">
                <div className="card bg-base-100 w-94 shadow-xl hover:scale-105 duration-200 dark:bg-slate-800 dark:text-white dark:border">
                    <figure className="h-52 mt-5">
                        <img src={item.image} className="h-60" alt="Shoes" />
                    </figure>
                    <div className="card-body">
                        <h3 className="card-title"> {item.name} </h3>
                        <div className="badge bg-orange-500 text-white">
                            {item.category}
                        </div>
                        <p>{item.title}</p>
                        <div className="card-actions justify-between">
                            <div className="badge badge-outline">
                                $ {item.price}{" "}
                            </div>
                            <div className=" border-gray text-black cursor-pointer px-2 rounded-full border-[2px] hover:bg-orange-400 hover:text-white duration-200  dark:text-white">
                                <div>
                                    {!cartItem ? (
                                        <button
                                            onClick={() =>
                                                dispatch(
                                                    addToCart({
                                                        userId,
                                                        productId: item._id,
                                                    })
                                                )
                                            }
                                        >
                                            +
                                        </button>
                                    ) : (
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() =>
                                                    dispatch(
                                                        decrementQuantity({
                                                            userId,
                                                            productId: item._id,
                                                        })
                                                    )
                                                }
                                            >
                                                -
                                            </button>
                                            <p>{cartItem?.quantity}</p>
                                            <button
                                                onClick={() =>
                                                    dispatch(
                                                        addToCart({
                                                            userId,
                                                            productId: item._id,
                                                        })
                                                    )
                                                }
                                            >
                                                +
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cards;
