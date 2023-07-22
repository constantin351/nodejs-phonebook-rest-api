const {User} = require("../../models/user");

const updateSubscription = async(req, res) => {
    const {_id} = req.user;

    const user = await User.findByIdAndUpdate(_id, req.body, {new: true});

    res.status(200).json({
        status: "success",
        code: 200,
        email: user.email,
        subscription: user.subscription,
    })
};

module.exports = updateSubscription;