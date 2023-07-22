const getCurrentUser = async(req, res) => {
    const {email, subscription} = req.user;

    res.status(200).json({
        status: "success",
        code: 200,
        email: email,
        subscription: subscription
    })
};

module.exports = getCurrentUser;