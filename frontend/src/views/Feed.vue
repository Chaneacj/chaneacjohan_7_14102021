<template>
  <div>
    <Nav />
    <div class="container" style="max-width: 540px">
      <button type="button" class="col-12 btn btn-primary btn-lg btn-block">
        <router-link to="/PostForm">Ajouter un post</router-link>
      </button>
    </div>
    <div class="container-md"></div>
    <Post v-for="post in posts" v-bind:key="post.id" v-bind:post="post" />
  </div>
</template>

<script>
const axios = require("axios");
import Nav from "@/components/Nav.vue";
import Post from "@/components/Post.vue";

export default {
  name: "Feed",
  components: {
    Nav,
    Post,
  },
  data: () => {
    return {
      post: {
        userId: localStorage.getItem("userId"),
        userAdmin: localStorage.getItem("userAdmin"),
        title: "",
        content: "",
        imagePost: "",
      },

      contentmodifyPost: "",
      posts: [],
    };
  },
  mounted() {
    axios
      .get("http://localhost:3000/api/post", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        const sorted = response.data.sort(function (a, b) {
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        console.log("post", response.data);
        this.posts = sorted;
      })
      .catch((error) => {
        const msgerror = error.response.data;
        this.notyf.error(msgerror.error);
      });
  },
  methods: {},
};
</script>

<style scoped lang="scss">
body {
  margin: 10%;
}
a {
  color: #ffffff;
}
button {
  margin: 30px 0px 30px 0px;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  background: #0764e3;
  color: #ffffff;
  border: none;
  border: 2px solid #0764e3;
  letter-spacing: 0.25px;
  margin-top: 10px;
}

.card {
  margin: auto;

  .card-title {
    margin-bottom: 11px;
    font-family: Montserrat;
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 34px;
    color: #1a1a1a;
  }

  .card-text {
    margin-bottom: 20px;
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    letter-spacing: 0.3125px;
    color: #595959;
  }

  .card-info {
    .card-text {
      color: #595959;
      font-size: 12px;
      line-height: 16px;
      font-weight: 400;
      letter-spacing: 0.583333px;
    }
  }
  form {
    h1 {
      margin-bottom: 11px;
      font-family: Montserrat;
      font-style: normal;
      font-weight: bold;
      font-size: 32px;
      line-height: 48px;
      letter-spacing: 1.33333px;
      color: #1a1a1a;
    }

    h2 {
      margin-bottom: 4px;
      font-family: Montserrat;
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
      letter-spacing: 0.583333px;
      text-transform: uppercase;
      color: #595959;
    }

    p {
      margin-bottom: 20px;
      font-family: Lato;
      font-style: normal;
      font-weight: normal;
      font-size: 20px;
      line-height: 32px;
      letter-spacing: 0.3125px;
      color: #595959;
    }

    label {
      color: #595959;
      font-size: 12px;
      line-height: 16px;
      font-weight: 400;
      letter-spacing: 0.583333px;
    }

    input {
      font-size: 14px;
      letter-spacing: 0.25px;
      padding: 0.4em 1em;
      width: -moz-available;
      width: -webkit-fill-available;
      width: fill-available;
      margin: 2px auto 10px;
      color: #ededed;
      line-height: 20px;
      border-radius: 8px;
      border: 2px solid #ededed;
      background: #ffffff;
      &:focus {
        border: 4px solid #0764e3;
      }
    }

    #content {
      font-size: 10px;
      letter-spacing: 0.18px;
      padding: 0.2em 0.8em;
      width: -moz-available;
      width: -webkit-fill-available;
      width: fill-available;
      margin: 1px auto 7px;
      color: #0764e3;
      line-height: 20px;
      border-radius: 6px;
      border: 2px solid #0764e3;
      background: #ffffff;
    }

    #submit {
      max-width: 200px;
      font-weight: 600;
      font-size: 14px;
      line-height: 18px;
      background: #ffffff;
      color: #0764e3;
      border: none;
      border: 2px solid #0764e3;
      letter-spacing: 0.2px;
      margin-top: 8px;
    }
  }
}
</style>
