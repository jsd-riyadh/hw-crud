var db = firebase.firestore().collection('restaurants');
var update = false;
var idTobeUpdated = 0;
$(document).ready(function () {

    var resList = $(".res-conrainer");

    function getData() {
        resList.empty();
        db.get().then(querySnapshot => {
            querySnapshot.forEach((doc) => {
                // console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
                let data = doc.data()
                // console.log(data)
                resList.append(`
                <li data-id="${doc.id}">
                    ${data.name} - ${data.location}
                    <button class="edit">edit</button>
                    <button class="delete">delete</button>
                </li>`)
            });
        }).catch(console.log)
    }

    function writeRestaurantData(name, location) {
        db.add({
            name: name,
            location: location,
        })
            .then(function (docRef) {
                console.log("Document written with ID: ", docRef.id);
                getData();
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
    }
    function deleteRestaurantData(id) {
        db.doc(id).delete()
            .then(function (docRef) {
                getData();
            })
            .catch(function (error) {
                console.error("Error deleteing document: ", error);
            });
    }
    function updateRestaurantData(id, name, location) {
        update = false;
        db.doc(id).update({
            name: name,
            location: location,
        }).then(function (docRef) {
            getData();
        }).catch(function (error) {
            console.error("Error updating document: ", error);
        });
    }

    getData()

    resList.on('click', '.delete', function (e) {
        // console.log( $(this).parent().attr('data-id'))
        // console.log( $(this).parent().data('id'))
        let id = $(this).parent().data('id')
        deleteRestaurantData(id)
    });
    resList.on('click', '.edit', function (e) {
        // console.log( $(this).parent().attr('data-id'))
        // console.log( $(this).parent().data('id'))
        update = true;
        let id = $(this).parent().data('id')
        idTobeUpdated = id;
        db.doc(id).get().then(res => {

            $('input[name=name]').val(res.data().name)
            $('input[name=location]').val(res.data().location)
        })
        // deleteRestaurantData(id)
    });
    $('.submit').click(function (e) {
        var name = $('input[name=name]').val();
        var location = $('input[name=location]').val();
        if (update) {
            updateRestaurantData(idTobeUpdated, name, location)
        } else {
            writeRestaurantData(name, location)
        }
    });
});





