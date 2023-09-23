<template>
  <section class="container d-flex flex-column">
    <div class="container-title d-flex">
      <h2>Home</h2>
      <img src="../assets/IUT.png" alt="Logo de l'IUT" />
    </div>
  </section>
</template>
    
<script lang="ts" setup>

</script>
    
<style>

.container{
    width: 95%;
    margin: auto;
    display: flex;
    padding: 20px;
    justify-content: space-around;
}

.container-title{
    padding-left: 20px;
    padding-right: 20px;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 110px;
    background: white;
}

.container-title h2{
    font-family: 'Montserrat',sans-serif;
    font-weight: bold;
    font-size: 32px;
}

</style>