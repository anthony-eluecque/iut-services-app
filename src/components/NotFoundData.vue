<template>
    <div class="message-container">
        <p class="title">Désolé !</p>
        <p class="text-line1">Nous n'avons pas trouvé de service</p>
        <p class="text-line2">Ajoutez des services ou modifier vos filtres pour pouvoir visualiser des services</p>
    </div>
</template>
<script></script>
<style>

.title {
    font-size: 40px;
    font-weight: bold;
}

.message-container {
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.text-line1 {
    margin-top: 16px;
}

.text-line1, .text-line2 {
    font-size: 20px;
}

</style>