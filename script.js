const library = ['nothing', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// Clean the template first before appending my GitHub data
let emptyDiv = new Promise((resolve, reject) => {
  $('.timeline').empty()
  resolve()
})

// Neccessary because GitHub's date format is different from Javascript's, apparently
function dateConverter(gitHubDate) {
  let getDate = gitHubDate.split('T')
  let spacedDate = getDate[0].split('-')
  let month = spacedDate[1][1]
  spacedDate[1] = library[month]
  let date = spacedDate.reverse().join(' ')

  return date
}

$(document).ready(function() {
  emptyDiv.then(
    $.ajax({
      url: 'https://api.github.com/users/thomasmartuaps/repos',
      method: 'GET',
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
    .done(response => {
      for(i=0; i < response.length; i++) {
        console.log(response[i])
        let date = dateConverter(response[i].updated_at)
        let position = ''
        if(i % 2 === 0) position = 'left'
        else position = 'right'
        $('.timeline').append(`
          <div class="container ${position}">
            <div class="content">
              <h2>${date}</h2>
              <p>${response[i].name}</p>
            </div>
          </div>
        `)
      }
    })
  )
})
