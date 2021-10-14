<template>
  <div class="card mb-3" style="max-width: 540px">
    <div class="card-body">
      <form @submit.prevent="sendData">
        <label>Titre</label>
        <input
          v-model="title"
          type="text"
          placeholder="Titre de votre article"
          id="title"
          required
          aria-label="Entrez le titre de votre article"
        />

        <label>Message</label>
        <textarea
          v-model="content"
          type="text"
          placeholder="Message de votre article"
          id="content"
          required
          aria-label="Entrez votre Message"
        >
Entrez votre Message
        </textarea>

        <label class="custom-file-label" for="image">Choisir une image</label>
        <input
          @change="getFile"
          name="image"
          type="file"
          class="custom-file-input"
          accept="image"
          ref="file"
          id="file"
        />
        <input type="submit" id="submit" value="Publier" />
      </form>
    </div>
  </div>
</template>

<script>
const axios = require("axios");

export default {
  name: "createPost",
  data: () => {
    return {
      title: "",
      content: "",
      file: "",
    };
  },

  methods: {
    getFile() {
      this.file = this.$refs.file.files[0];
      console.log(this.file);
    },
    sendData() {
      if (this.title != null || this.content != null) {
        let formData = new FormData();
        formData.append("title", this.title);
        formData.append("content", this.content);
        formData.append("image", this.file);

        axios
          .post("http://localhost:3000/api/post/create", formData, {
            headers: {
              authorization: "barer " + window.localStorage.getItem("token"),
              "content-type": "multipart/form-data",
            },
          })
          .then((json) => {
            console.log(json);
          })
          .then((response) => {
            if (response) {
              window.location.reload();
            }
            this.$router.push("Feed");
          })
          .catch((error) => console.log(error));
      } else {
        alert("Un problème de saisie est survenue");
      }
    },
  },
};
</script>

<style scoped lang="scss">
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
  }

  #submit {
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
}
</style>