const library = ['nothing', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// Clean the template first before appending my GitHub data
let emptyDiv = new Promise((resolve, reject) => {
  $('.timeline').empty()
  resolve()
})

// This function sort repos by date.
function sortRepos(repositories) {
  repositories.forEach(el => {
    let date = new Date(el.updated_at)
    el.milisecs = date.getTime()
  })
  return repositories.sort((a, b) => b.milisecs - a.milisecs)
}

// Neccessary because GitHub's date format is different from Javascript's, apparently

// function dateConverter(gitHubDate) {
//   let getDate = gitHubDate.split('T')
//   let spacedDate = getDate[0].split('-')
//   let month = spacedDate[1][1]
//   spacedDate[1] = library[month]
//   let date = spacedDate.reverse().join(' ')

//   return date
// }

// Function above not currently needed but I'll keep them here for when I decide to use them again.

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
      const sortedRepos = sortRepos(response)
      for(i=0; i < sortedRepos.length; i++) {
        // Converts date
        const d = new Date(sortedRepos[i].updated_at)
        const date = d.toDateString()
        console.log('date string', date)
        // Decides whether this repo gets shown in the left or right side of timeline
        let position = ''
        if(i % 2 === 0) position = 'left'
        else position = 'right'
        // End of positioning
        $('.timeline').append(`
          <div class="container ${position}">
            <div class="content">
              <h2>
                ${date}
              </h2>
              <h3>
                ${sortedRepos[i].name}
              </h3>
              <p>Click <a href="${sortedRepos[i].html_url}">here</a> to visit repo</p>

            </div>
          </div>
        `)
      }
    })
  )
})
