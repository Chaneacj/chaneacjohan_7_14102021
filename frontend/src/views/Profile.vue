<template>
  <div>
    <Nav />
    <div class="container" style="max-width: 540px">
      <div class="card text-center">
        <div class="card-body">
        <form v-if="opened">
          <label>Modifier votre biographie</label>
          <textarea
            v-model="contentmodifyUser"
            :placeholder="user.bio"
            type="text"
            id="content"
            required
            aria-label="Entrez votre Message"
          >
        Entrez votre Message
        </textarea
          >

          <label class="custom-file-label" for="image"
            >Choisir une photo de profil</label
          >
          <input
            @change="getFile(user.id)"
            name="image"
            type="file"
            :id="user.id"
            :ref="'test' + user.id"
            accept="image"
            aria-label="Sélectionner un fichier"
          />
          <input
            v-on:click.prevent="modifyUser(user.id)"
            type="submit"
            id="submit"
            value="Modifier"
          />
        </form>
        <div class="card-img" v-if="user.photo">
          <div
            class="img"
            :style="{ 'background-image': `url('${user.photo}')` }"
          ></div>
        </div>

        <div class="card-body">
          <h5 class="card-title">
            {{ user.first_name + [" "] + user.last_name }}
          </h5>
          <p class="card-text">
            {{ user.email }}
          </p>
          <p class="card-text">
            {{ user.bio }}
          </p>
          <p
            v-if="userId == user.id || userAdmin == 'true'"
            v-on:click="toggleOpened()"
            class="btn btn-outline-primary card-text col-12"
          >
            <small class="text-primary">Modifier</small>
          </p>
          <p v-if="userId == user.id || userAdmin == 'true'" class="card-text">
            <a v-on:click="deleteUser(user.id)" class="btn btn-primary col-12"
              >Supprimer mon compte</a
            >
          </p>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Nav from "@/components/Nav.vue";

export default {
  name: "profile",
  components: {
    Nav,
  },
  data() {
    return {
      contentmodifyUser: "",
      user: "",
      userId: localStorage.getItem("userId"),
      opened: false,
      file: "",
      userAdmin: localStorage.getItem("userAdmin"),
    };
  },

  mounted() {
    this.displayUser();
  },
  methods: {
    toggleOpened() {
      this.opened = !this.opened;
    },

    getFile(id) {
      //console.log(document.getElementById(id));
      this.file = document.getElementById(id).files[0];
      //console.log(this.file);
    },

    // Permet d'afficher le champ pour modifier un message
    displayModifyUser(id) {
      const userId = localStorage.getItem("userId");
      let contentUser = document.querySelector('p[bioUserId="' + id + '"]');
      let contentUserId = contentUser.getAttribute("contentUserId");
      if (userId == contentUserId && this.showInputModify == false) {
        contentUser.style.display = "none";
        this.showInputModify = !this.showInputModify;
        let photo = document.querySelector('img[photoId="' + id + '"]');
        let photoId = photo.getAttribute("photoId");
        if (userId == photoId) {
          photo.style.display = "none";
        }
      } else if (this.showInputModify == true) {
        contentUser.style.display = "block";
        let photo = document.querySelector('img[photoId="' + id + '"]');
        photo.style.display = "block";
        this.showInputModify = !this.showInputModify;
      }
    },

    // Permet de modifier le profile
    modifyUser(id) {
      const userId = id;
      const formData = new FormData();
      formData.append("bio", this.contentmodifyUser);
      formData.append("image", this.file);

      console.log(this.contentmodifyUser, this.file);

      axios
        .put("http://localhost:3000/api/user/profil/" + userId, formData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          const msgerror = error.response.data;
          this.notyf.error(msgerror.error);
        });
    },

    // Permet d'afficher les informations de profil
    displayUser() {
      const userId = localStorage.getItem("userId");
      axios
        .get("http://localhost:3000/api/user/profil/" + userId, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.user = response.data;
          console.log(this.user);
        })
        .catch((error) => {
          const msgerror = error.response.data;
          this.notyf.error(msgerror.error);
        });
    },

    /*     deleteProfile(id) {
      const userId = id;
      axios
        .delete("http://localhost:3000/api/user/delete", + userId, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(() => {
          localStorage.clear();
          this.$router.push("/");
        })
        .catch((error) => console.log(error));
    }, */
    deleteUser(id) {
      //const userId = id;
      axios
        .delete("http://localhost:3000/api/user/delete/" + id, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(() => {
          localStorage.clear();
          this.$router.push("/");
        })
        .catch(() => {
          // const msgerror = error.response.data;
          // this.notyf.error(msgerror.error);
          // console.log(msgerror)
          //window.location.reload();
        });
    },
  },
};
</script>

<style scoped lang="scss">
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

  .card-img {
    width: 100%;
    display: flex;
    justify-content: center;

    .img {
      width: 300px;
      height: 300px;
      border-radius: 50%;
      background: grey;
      background-size: cover;
    }
  }
}
</style>