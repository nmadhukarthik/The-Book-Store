import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../context/AuthProvider";
import { addToCart, decrementQuantity } from "../redux/cartThunk";
import toast from "react-hot-toast";

function Cards({ item }) {
    const dispatch = useDispatch();

    const [authUser, setAuthUser] = useAuth();
    const userId = authUser?._id || null;
    // console.log(userId);
    // Ensure userCarts exists
    const userCart = useSelector((state) =>
        authUser && state.cart.userCarts
            ? state.cart.userCarts[userId] || {}
            : {}
    );
    // console.log("User Carts:", userCarts); // Debugging step
    // Ensure cartItems is an array
    const cartItems = userCart.items || [];
    // console.log("Cart Items:", cartItems); // Debugging step

    // Find the item in the cart
    const cartItem = cartItems.find(
        (cartItem) => cartItem.productId._id === item._id
    );

    const handleAddToCart = () => {
        if (!userId) {
            toast("Please log in to add items to the cart!");
        } else {
            dispatch(addToCart({ userId, productId: item._id }));
        }
    };

    return (
        <>
            <div className="mt-4 my-3 p-3">
                <div className="flex flex-col card w-94 h-[500px] border shadow-xl bg-gray-100 text-black  hover:scale-105 duration-200 dark:bg-slate-800 dark:text-white dark:border">
                    <figure className=" h-1/2 mt-5 flex justify-center items-center">
                        {/* aspect-[16/9] overflow-hidden */}
                        <img
                            src={item.image}
                            className="h-full w-full object-contain rounded-md"
                            alt="book"
                        />
                    </figure>
                    <div className="card-body flex flex-col h-1/2">
                        <h3 className="card-title"> {item.name} </h3>
                        <div className="badge bg-orange-500 text-white">
                            {item.category}
                        </div>
                        <p className="">{item.title}</p>
                        <div className="card-actions justify-between">
                            <div className="badge badge-outline p-3">
                                $ {item.price}{" "}
                            </div>
                            <div className=" border-gray text-black cursor-pointer px-2 rounded-full border-[2px] hover:bg-orange-400 hover:text-white duration-200  dark:text-white">
                                <div>
                                    {!cartItem ? (
                                        <button onClick={handleAddToCart}>
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
                                            <button onClick={handleAddToCart}>
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
