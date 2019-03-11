$(function(){ //must always be here if you use JQuery
    
    let db = firebase.firestore().collection('resturant')
    let resList = $('.res-container')

    db.get()
    .then(result => {
        
        let changes = result.docChanges()//gets array of docs that change see https://firebase.google.com/docs/reference/js/firebase.firestore.QuerySnapshot
        
        changes.forEach(res => {
            // console.log(res.doc.data());
            resList.append(`<li data-id="${res.doc.id}">${res.doc.data().name} - ${res.doc.data().location} <button class="edit">edit</button> <button class="delete">delete</button> </li>`)
        });
        
    }).catch(err => console.log(err))


    resList.on('click', ".delete", function(){
        let Id = $(this).parent().attr("data-id")
        
        $(this).closest('li').remove();
        
        db.doc(id).delete()
        
        

    })
    count = 0
    resList.on('click', ".edit", function(){
       
        let id = $(this).parent().data("id")
        count += 1
        
        if(count%2 != 0){
            $(this).text('update') 
            db.doc(id).get().then(res => {
                // console.log(res.data());
                
                $('input[name=name]').val(res.data().name)
                $('input[name=location]').val(res.data().location)
            })
        } else {
            $(this).text('edit')
            db.doc(id).update({
                
                
                name: $('input[name=name]').val(),
                location: $('input[name=location]').val()
            })
            
            $(`[data-id=${id}]`).html(`${$('input[name=name]').val()} - ${$('input[name=location]').val()} <button class="edit">edit</button> <button class="delete">delete</button>`)
            $('input[name=name]').val("")
            $('input[name=location]').val("")
        }
         
        let location = $('input[name=location]').val()

        
        
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
            
            
        })
        
        
    })

})