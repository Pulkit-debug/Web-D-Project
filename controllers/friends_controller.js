const User = require("../models/user");
const Friendship = require("../models/friendship");

module.exports.addFriend = function (req, res) {
    let toUserId = req.params.id;

    let friendRemoved = false;
    User.findById(toUserId, async function (err, user) {
        if (err) {
            return res.json(402, {
                message: "User Not Found!",
            });
        }

        if (user) {
            // so here I've created the friendship between both the users.


            let isFriends = await Friendship.findOne({
                from_user: req.user._id,
                to_user: toUserId,
            });


            if (isFriends) {
                // req.user is the current logged in u ser.
                user.friends.pull(isFriends._id);
                user.save();
                req.user.friends.pull(isFriends._id);
                req.user.save();

                isFriends.remove();

                friendRemoved = true;
            }
            else {

                try {
                    let friendship = await Friendship.create({
                        from_user: req.user._id,
                        to_user: toUserId,
                    });


                    user.friends.push(friendship._id);
                    user.save();
                    // also adding friend in current logged in user.
                    req.user.friends.push(friendship._id);
                    req.user.save();
                } catch (err) {
                    console.log(err);
                }


            }

            console.log(user);
            console.log(req.user);

            return res.json(200, {
                message: "Successfully made friendship",
                data: {
                    fromUser: req.user,
                    toUser: user,
                    friendRemoved: friendRemoved,
                },
            });

        }
        return res.json(500, {
            message: "Internal Server Error",
        });
    });
}