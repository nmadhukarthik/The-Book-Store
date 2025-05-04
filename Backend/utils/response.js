export const successResponse = (
    res,
    data,
    message = "Success",
    statusCode = 200
) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
    });
};

export const errorResponse = (
    res,
    message = "Server Error",
    error = {},
    statusCode = 500
) => {
    return res.status(statusCode).json({
        success: false,
        message,
        error: error.message || error,
    });
};
