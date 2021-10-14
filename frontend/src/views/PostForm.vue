<template>
  <div>
    <Nav />
    <div class="container-md">
        <createPost />
    </div>
  </div>
</template>

<script>
import Nav from "@/components/Nav.vue";
import createPost from "@/components/createPost.vue";

export default {
  name: "PostForm",
  components: {
    Nav,
    createPost,

  },
};
</script>

<style scoped lang="scss">
body {
  margin: 10%;
}

.container-md{
margin: 0;
  position: absolute;
  padding-top: 0;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>
