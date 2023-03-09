<template>
  <div class="item">
    <p class="paragraph-about-application">
      <br />The application is designed to display two types of jokes: one-part
      jokes and two-part jokes. These two types of jokes are separated into
      different views, making it easy for users to access the jokes they
      prefer.<br /><br />
      In addition to being able to view jokes by type, users can also choose
      from different categories such as any, programming, dark, pun, spooky, and
      Christmas. This feature allows users to view jokes that fit their
      preferences. <br /><br />Users can add jokes to the application, delete
      them, and view their favorites in a separate view. The application stores
      the user's favorite jokes in MongoDB, ensuring that the jokes are saved
      even if the user closes the application. <br /><br />The Vue Router is
      used to navigate between the different views of the application.
      <br /><br />The application uses TypeScript to ensure that the code is
      robust and that there are fewer bugs. The CSS and HTML are used to style
      and display the jokes in an attractive and easy-to-read format.
      <br /><br />The application retrieves the jokes from
      https://sv443.net/jokeapi/v2/ using the fetch API. Once the jokes are
      retrieved, they are displayed on the appropriate views. <br /><br />Users
      can then select a joke and mark it as a favorite by clicking a button. The
      favorite jokes are stored in MongoDB, which makes it easy for users to
      access them whenever they want. The application also allows users to add
      jokes to the database.<br /><br />In conclusion, the application is a joke
      application that retrieves jokes from https://sv443.net/jokeapi/v2/ using
      Vue 3 options API, Vue Router, TypeScript, CSS, and HTML. The application
      allows users to view, add, delete, and store their favorite jokes in
      MongoDB. Users can also view jokes by type and category. The application
      is easy to use, and the jokes are displayed in an attractive and
      easy-to-read format.
    </p>
  </div>
</template>
<style scoped>
.paragraph-about-application {
  margin-top: 30px;
  font-size: 2em;
  background-color: #e6d6daad;
  padding: 20px;
  font-size: 1rem;
  color: #181113;
  border-radius: 10px;
  min-width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
