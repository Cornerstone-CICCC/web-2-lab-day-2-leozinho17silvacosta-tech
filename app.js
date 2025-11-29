$(function() {

  let currentID = 1;
  const maxUsers = 30;

  loadUser(currentID);

// AJAX DATA FUNCTION - LOAD USER:

  function loadUser(userId) {
    $.ajax({
      url: `https://dummyjson.com/users/${userId}`,
      method: 'GET',
      success: function(user) {
        displayUser(user);
        loadPosts(userId, user.firstName);
        loadTodos(userId, user.firstName);
      },
      error: function(err) {
        console.error('Error!', err);
      }
    });
  }

// AJAX DATA FUNCTION - DISPLAY USER:

  function displayUser(user) {
    $('.info__image img').attr('src', user.image);
    $('.info__content').html(`
      <h2>${user.firstName} ${user.lastName}</h2>
      <p><strong>Age:</strong> ${user.age}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Phone:</strong> ${user.phone}</p>
    `);
  }

// AJAX DATA FUNCTION - LOAD POSTS:

  function loadPosts(userId, userFirstName) {
    $.ajax({
      url: `https://dummyjson.com/users/${userId}/posts`,
      method: 'GET',
      success: function(data) {
        displayPosts(data.posts, userFirstName);
      }, error: function(err) {
        console.error('Error!', err);
      }
    });
  }

// AJAX DATA FUNCTION - DISPLAY POSTS:

  function displayPosts(posts, userFirstName) {
    if (posts.length > 0) {
      $('.posts h3').text(`${userFirstName}'s Posts`);
      const postsID = posts.map(post => `
        <li>
          <h4 data-post-id="${post.id}">${post.title}</h4>
          <p>${post.body}</p>
        </li>
      `).join('');
      $('.posts ul').html(postsID);
    }
  }

// AJAX DATA FUNCTION - LOAD TODOS:

  function loadTodos(userId, userFirstName) {
    $.ajax({
      url: `https://dummyjson.com/users/${userId}/todos`,
      method: 'GET',
      success: function(data) {
        displayTodos(data.todos, userFirstName);
      }, error: function(err) {
        console.error('Error!', err);
      }
    });
  }

// AJAX DATA FUNCTION - DISPLAY TODOS:

  function displayTodos(todos, userFirstName) {
    if (todos.length > 0) {
      $('.todos h3').text(`${userFirstName}'s To Dos`);
      const todosHtml = todos.map(todo => `<li>${todo.todo}</li>`).join('');
      $('.todos ul').html(todosHtml);
    }
  }

// AJAX DATA FUNCTION - LOAD POST:

  function loadPost(postId) {
    $.ajax({
      url: `https://dummyjson.com/posts/${postId}`,
      method: 'GET',
      success: function(post) {
        displayModal(post);
      }, error: function(err) {
        console.error('Error!', err);
      }
    });
  }

// FUNCTION - DISPLAY MODAL:

  function displayModal(post) {
    const modal = `
      <div class="overlay">
        <div class="modal">
          <h3>${post.title}</h3>
          <p>${post.body}</p>
          <p><strong>Views:</strong> ${post.views}</p>
          <button>Close Modal</button>
        </div>
      </div>
    `;
    $('body').append(modal);
  }

// HEADER BUTTON:

  $('header button').eq(0).on('click', function() {
    currentID = currentID === 1 ? maxUsers : currentID - 1;
    loadUser(currentID);
  });

  $('header button').eq(1).on('click', function() {
    currentID = currentID === maxUsers ? 1 : currentID + 1;

    loadUser(currentID);
  });

// POSTS FUNCTION:

  $(document).on('click', '.posts h3', function() {
    $('.posts ul').slideToggle();
  });

// TODOS FUNCTION:

  $(document).on('click', '.todos h3', function() {
    $('.todos ul').slideToggle();
  });

// OPEN POST MODAL FUNCTION:

  $(document).on('click', '.posts h4', function() {
    const postId = $(this).data('post-id');
    loadPost(postId);
  });
  
// CLOSE MODAL FUNCTION:

  function displayModal(post) {
    const modalInformations = `
    <div class="overlay">
      <div class="modal">
        <h3><strong>${post.title}</strong></h3>
        <p>${post.body}</p>
        <p><i>Views:</i> ${post.views}</p>
        <button class="close-modal-btn">Close Modal</button>
      </div>
    </div>
  `;
  
  const $modalElement = $(modalInformations);
  $('body').append($modalElement);

  $modalElement.find('.close-modal-btn').on('click', function() {
    $modalElement.remove();
  });
 }
});