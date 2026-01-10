/*
++c Standard error response helper
*/
function sendError(res, status, id, message) {
    return res.status(status).json({
        id,
        message,
    });
}

module.exports = sendError;
