(function(){let e=$("#add-friend-button");e.click((function(o){o.preventDefault();console.log(this),$.ajax({type:"get",url:$(this).attr("href"),success:function(o){1==o.data.friendRemoved?e.html("Add Friend"):(e.html("Remove Friend"),console.log(o)),console.log(o)},error:function(e){console.log(e)}})}))})();