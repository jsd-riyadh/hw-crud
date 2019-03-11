let collection = { //var collection is collection, what`s inside is document

}
//CRUD - Create, Read, Update and Delete
$(function(){

    let db = firebase.firestore().collection('restaurants');
    let resList = $('.res-container');
    
    db.get().then(res => {
       let changes = res.docChanges();// gets array of docs in my collection and checks for changes

       changes.forEach(res => {
           //Read
           console.log(res.doc.data());
           resList.append(`<li data-id="${res.doc.id}">${res.doc.data().name} - ${res.doc.data().location}
           <button class="edit">Edit</button>
           <button class="delete">Delete</button>
           </li>`)
           
           
       })
        
    }).catch(err => {
        console.log(err);
        
    })
    
    //Delete
    resList.on("click", ".delete", function(){ //we used .on so that we can select an element that didn't exist before but existed after loading the page, so we select the parent then we                                              select delete because it didn't exist before
        // $(this).parent().attr("data-id")
        let id = $(this).parent().data("id") //Same as the one above
       
        db.doc(id).delete().then(() => {
            $(this).parent().remove();
        })
       
    })

    //Update
    resList.on("click", ".edit", function(){ 
        let id = $(this).parent().data("id") //store the id of the item

  
        //show a form at the exact position where record is with button for update and cancel
        $(this).parent().replaceWith('<li><input type="text" name="editedName" placeholder="Name of Restaurant"> <input type="text" name="editedLocation" placeholder="Location of Restaurant"> <button class="update">Update</button> <button class="cancel">Cancel</button></li>')
       
        db.doc(id).get().then(res => {
            console.log(res);
            //we get the values of the selected item and put it in the edit form
            $('input[name=editedName]').val(res.data().name);
            $('input[name=editedLocation').val(res.data().location);
        })

        resList.on("click",".update",function(){
            let name =  $('input[name=editedName]').val() 
            let location = $('input[name=editedLocation').val()
    
            db.doc(id).update({
                name: name,
                location: location
    
            }).then(res => {
                console.log(res);
                $(this).parent().replaceWith(`<li data-id="${id}">${name} - ${location}
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
                </li>`)
            })
        })
    
        resList.on("click",".cancel",function(){
            //when we click cancel we return to the old item with its old values
            let name =  $('input[name=editedName]').val()
            let location = $('input[name=editedLocation').val()
            $(this).parent().replaceWith(`<li data-id="${id}">${name} - ${location}
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
            </li>`)
        })
        
    })



    //Create
    $('.submit').click(function(){
      let name =  $('input[name=name]').val()
      let location = $('input[name=location').val()

      console.log(name);
      console.log(location);

      db.add({
          name: name,
          location: location
      }).then(res => {
          console.log(res);
          resList.append(`<li data-id="${res.id}">${name} - ${location}
          <button class="edit">Edit</button>
          <button class="delete">Delete</button>
          </li>`)
      })
      
      $('input[name=name]').val('')
      $('input[name=location').val('')
    })
})