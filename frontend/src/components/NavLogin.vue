<template>

  <header>
<nav class="navbar navbar-expand-md navbar-light bg-light ">
  <div class="container-fluid">
    <a class="navbar-brand" href="#"><figure class="navbar-brand" collapse>
      <img id="logo" alt="Groupomania" src="../assets/logo.svg" />
    </figure></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <a class="nav-link active" aria-current="page" href="#"><router-link to="/">Connexion</router-link></a>
        <a class="nav-link" href="#"><router-link to="/Signup">Inscription</router-link></a>
      </div>
    </div>
  </div>
</nav>
  </header>
</template>

<script>
export default {
  name: "NavLogin",
};
</script>

<style scoped lang="scss">
.navbar-expand-md{
  #navbarNavAltMarkup{
    justify-content:flex-end;
  }
}
nav {
    background: #ffffff;
    border-bottom: 2px solid #E8F0FC;
    z-index: 1000;

    #logo{
      position: relative;
      width: 30%;
    }

    a{
      font-family: 'Montserrat', sans-serif;
      font-style: normal;
      font-weight: 600;
      font-size: 12px;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: #464655;
    }

    a:active {
    color: 
    #0764E3;
    }
} 
</style>