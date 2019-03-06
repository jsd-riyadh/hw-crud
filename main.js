$(function(){ //must always be here if you use JQuery
    
    let db = firebase.firestore().collection('restaurants')
    let resList = $('.res-container')

    db.get()
    .then(result => {
        let changes = result.docChanges()//gets array of docs

        changes.forEach(res => {
            console.log(res.doc.data());
            resList.append(`<li data-id="${res.doc.id}">${res.doc.data().name} - ${res.doc.data().location} <button class="edit">edit</button> <button class="delete">delete</button> </li>`)

            
        });
        
    }).catch(err => console.log(err))


    resList.on('click', ".delete", function(){
        // $(this).parent().attr("data-id")
        let id = $(this).parent().data("id") // gets parent data-id

        db.doc(id).delete()
        // .then()

    })

    resList.on('click', ".edit", function(){
        // $(this).parent().attr("data-id")
        let id = $(this).parent().data("id")

        db.doc(id).get().then(res => {
            // console.log(res.data());
            
            $('input[name=name]').val(res.data().name)
            $('input[name=location]').val(res.data().location)
        })

    })

    //create data and store to restaurants collection
    $('.submit').click(function(){
        
        let name = $('input[name=name]').val()
        let location = $('input[name=location]').val()

        console.log(name)
        console.log(location)

        db.add({
            name: name,
            location: location
        }).then(res =>{
            resList.append(`<li data-id="${res.id}">${name} - ${location} <button class="edit">edit</button> <button class="delete">delete</button></li>`)
            
            //clear the input fields after append
            $('input[name=name]').val("")
            $('input[name=location]').val("")

            //alert message
            $("#alert").css("display", "block")
            $("#alert").append("Added to List!")

            //set delay 4 seconds then empty alert
            setInterval(function(){ 
                $("#alert").css("display", "none")
                $("#alert").empty() 
            }, 4000)
            
        })
        
        
    })

    //Update data
    //id is parent data-id
    //selector .parent().data("id")
    // db.doc(id).update({

        // })
        // .then()
})