$(document).ready(function () {
    $("select").material_select();

    $(".tabs .tab a").each(function () {
        let currentUri = window.location.href;
        let currentLink = $(this);
        currentLink.removeClass("active");
        let currentLinkHref = currentLink.attr("href");
        if (currentLinkHref == currentUri.substring(currentUri.lastIndexOf("/"))) {
            currentLink.addClass("active");
            currentLink.parent().addClass("active");
            if (currentLinkHref == "/favorites")
                populateCategoryOptions();
        }
    });

    $("#addNewFavorite").on("click", function (event) {
        event.preventDefault();

        let selectedItems = $("select").val();
        let count = 1;
        var data = {};
        selectedItems.forEach(element => {
            data["i" + count.toString()] = element;
            count++;
        });

        console.log(data);

        $.post("/api/categories", data).then(function () {
            location.reload();
        });
    });

    $(document).on("click", ".remove-fav", function () {
        let favID = $(this).data("id");
        $.ajax({
            method: "DELETE",
            url: "/api/categories/" + favID
        }).then(() => {
            location.reload();
        });
    });

    $(document).on("click", ".remove-match", function(){
        let activityID = $(this).data("id");
        $.ajax({
            method: "DELETE",
            url: "/api/matches/" + activityID
        }).then(() => {
            location.reload();
        });
    });

    $(document).on("click", "#likeRestaurant", function(){
        $.post("/api/save-match", {
            yelpID: $(this).data("id"),
            yelpBusinessName: $(this).data("name"),
            matchDate: Date()
        });
    });

    function populateCategoryOptions() {
        $.get("/api/categories").then(data => {
            data.forEach(element => {
                let optionItem = $("<option>");
                optionItem.value = element.id;
                optionItem.text(element.category_name);
                $("#categorySelect").append(optionItem);
            });
            $("select").material_select();
        });
    }

    function getLocation(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(OnPositionAcquired, OnLocationError);
        }
    }

    function OnPositionAcquired(position)
    {
        $("#searchForRestaurants").parent().removeClass("disabled");
        $("#searchForRestaurants").attr("href", "/search/" + position.coords.latitude + "/" + position.coords.longitude);
    }

    function OnLocationError(){
        $("#searchForRestaurants").parent().addClass("disabled");
        alert("Please enable location in order to search");
    }

    getLocation();
});