
// Whenever someone clicks a p tag
$(document).on("click", "p", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
      // The title of the article
      $("#notes").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});

// When you click the savenote button
$(".save").on("click", function() {
  var thisId = $(this).attr("data-id");
  $.ajax({
      method: "POST",
      url: "/articles/save/" + thisId
  }).done(function(data) {
      window.location = "/"
  })
});

  // /Handle Delete Article button
$(".delete").on("click", function() {
  var thisId = $(this).attr("data-id");
  $.ajax({
      method: "POST",
      url: "/articles/delete/" + thisId
  }).done(function(data) {
      window.location = "/saved"
  })
});

//Handle Save Note button
$(".saveNote").on("click", function() {
  var thisId = $(this).attr("data-id");
  if (!$("#noteText" + thisId).val()) {
      alert("please enter a note to save")
  }else {
    $.ajax({
          method: "POST",
          url: "/notes/save/" + thisId,
          data: {
            text: $("#noteText" + thisId).val()
          }
        }).done(function(data) {
            // Log the response
            console.log(data);
            // Empty the notes section
            $("#noteText" + thisId).val("");
            $(".modalNote").modal("hide");
            window.location = "/saved"
        });
  }
});

//Handle Delete Note button
$(".deleteNote").on("click", function() {
  var noteId = $(this).attr("data-note-id");
  var articleId = $(this).attr("data-article-id");
  $.ajax({
      method: "DELETE",
      url: "/notes/delete/" + noteId + "/" + articleId
  }).done(function(data) {
      console.log(data)
      $(".modalNote").modal("hide");
      window.location = "/saved"
  })
});