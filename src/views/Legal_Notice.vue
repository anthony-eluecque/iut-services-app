<template>
  <section class="container d-flex flex-column">
    <div class="container-title d-flex">
      <h2>Mentions Légales</h2>
      <img src="../assets/IUT.png" alt="Logo de l'IUT" />
    </div>

    <p> Conformément aux dispositions de la loi n°2004 575 du 21 juin 2004 pour la confiance en économie numérique . Il est important de préciser aux utilisateurs de l’application “IUT service” l’identité des différents intervenants dans le cadre de sa réalisation et sa suivie. </p>
  
    
  <h3>Edition du projet</h3>
  <div class="container-edition-img d-flex">

    <p>Le Fur Lucie : cheffe de projet <br />Bernard Laetitia : cheffe de projet <br /> Cumzain Houssam: chef de projet <br /> Eulecque Anthony: chef de projet </p>

  <img src="../assets/JrCanDev.png" alt="Logo de JrCanDev" />
</div>


    <h3> Sources:</h3>
    <p>Material Design Icons</p>

   

    <h3> Données personnelles</h3>
    <p>Aucun traitement de données personnelles n’est effectué au sein de l’application puisque aucune donnée n’est stockée</p>
  
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

.container-edition-img img {
  width: 500px;
  height: 200px;
  margin-left: auto;
}

p {
  font-size: 1rem;
  font-family: 'Montserrat', sans-serif;
  margin: 20px;
}

</style>