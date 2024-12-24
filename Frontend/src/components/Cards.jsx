import { useDispatch, useSelector } from "react-redux";

function Cards({ item }) {
    const dispatch = useDispatch();
    const { addToCart, decrementQuantity } = useSelector((state) => state.cart);
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
                                    {item &&
                                    cartItems &&
                                    !cartItems[item._id] ? (
                                        <button
                                            onClick={() =>
                                                dispatch(addToCart(item._id))
                                            }
                                        >
                                            +
                                        </button>
                                    ) : (
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() =>
                                                    dispatch(
                                                        decrementQuantity(
                                                            item._id
                                                        )
                                                    )
                                                }
                                            >
                                                -
                                            </button>
                                            <p>{cartItems[item._id]}</p>
                                            <button
                                                onClick={() =>
                                                    dispatch(
                                                        addToCart(item._id)
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
