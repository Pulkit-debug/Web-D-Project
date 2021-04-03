{
    let addFriend = function () {
        let addFriendButton = $("#add-friend-button");


        addFriendButton.click(function (event) {
            event.preventDefault();
            let self = this;

            console.log(this);
            $.ajax({
                type: "get",
                url: $(self).attr("href"),
                success: function (data) {
                    if (data.data.friendRemoved == true) {
                        addFriendButton.html("Add Friend");

                    }
                    else {
                        addFriendButton.html("Remove Friend");
                        console.log(data);
                    }

                    console.log(data);
                },
                error: function (error) {
                    console.log(error);
                }
            })
        });
    }

    addFriend();
}