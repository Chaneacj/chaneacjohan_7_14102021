<template>
  <div>
    <NavLogin />

      <div class="main-container">
      <div class="container">
        <div class="row">
          <div class="col-sm-6 col-lg-6">
      <figure>
        <img
          id="illustration"
          alt="Groupomania"
          src="../assets/people new-03.svg"
        />
      </figure>
          </div>
          <div class="col-sm-8 col-lg-6">
      <form @submit.prevent="login">
        <h2>Hey, look who's here!</h2>
        <h1>Before the start</h1>
        <p>
          Fill in the form below to get instant access to all major features.
        </p>
        <label>E-mail</label>
        <input
          class="form-text text-muted"
          type="email"
          placeholder="Votre email"
          id="email"
          required
          pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}"
          maxlength="60"
          aria-label="Entrez votre email"
          v-model="email"
        />

        <label>Password</label>
        <input
          class="form-text text-muted"
          type="password"
          placeholder="Votre mot de passe"
          id="password"
          required
          aria-label="Entrez votre mot de passe"
          aria-describedby="passwordInfo"
          v-model="password"
        />

        <input type="submit" id="submit" value="Connexion" />
      </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavLogin from "@/components/NavLogin.vue";
const axios = require("axios");

export default {
  name: "Login",
  components: {
    NavLogin,
  },

  data: () => {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      let contact = {
        email : this.email,
        password : this.password,
      }
      if (
        this.email !== null ||
        this.password !== null
      ) {
        axios
        .post("http://localhost:3000/api/user/login" , contact , {
        headers : { authorization : "bare "} })
        .then(response => {
            localStorage.setItem('token',response.data.token)
            localStorage.setItem('userId',response.data.userId)
            localStorage.setItem('userAdmin',response.data.userAdmin)
             console.log(response.data);
            this.$router.push("Feed");
          })
        .catch(error => console.log(error));
        
      } else {
        console.log("Un problème de saisie est survenue");
         alert("Email ou mot de passe invalide");
      }
    }
  }
};

</script>

<style scoped lang="scss">

.container {
  margin: 0;
  position: absolute;
  padding-top: 0;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.row {
 justify-content: center;
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
      color: #2c2c2c;
      border: 4px solid #0764e3;
    }
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