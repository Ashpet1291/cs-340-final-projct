function updatePerson(id){
    $.ajax({
        url: '/familyMembers/' + id,
        type: 'PUT',
        data: $('#update-person').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};