$(function () {
  let db = firebase.firestore().collection('resturants')
  let resList = $('.res-container')


  db.get()
    .then(result => {
      let changes = result.docChanges()
      changes.forEach(res => {
        resList.append(`<li data-id="${res.doc.id}">${res.doc.data().name} - ${res.doc.data().location} <button class="edit">Edit</button> <button class="delete">Delete</button></li>`)
      });


    }).catch(err => console.log(err))


    resList.on('click', '.delete', function(){
       let id =  $(this).parent().data('id')
       db.doc(id).delete()
       

    })
    resList.on('click', ".edit", function(){

      //Delete
      resList.on("click", ".edit", function(){ 
          let id = $(this).parent().data("id")
  
          db.doc(id).get().then(res => {
  
              $('input[name=name]').val(res.data().name)
              $('input[name=location]').val(res.data().location)
          let id = $(this).parent().data("id") 
        })
      })
    })

  $('.submit').click(function () {
    let name = $('input[name=name]').val()
    let location = $('input[name=location]').val()
    console.log(name);
    console.log(location);
    db.add({
      name: name,
      location: location
    }).then(res => {
      resList.append(`<li data-id="${res.id}">${name} - ${location} <button class="edit">Edit</button> <button class="delete">Delete</button></li>`)
      console.log(res);

    })

  })
})
