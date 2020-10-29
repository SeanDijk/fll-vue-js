<template>
  <header>
    <label class="hamburger-label" for="hamburger"><img alt="menu-icon" src="@/assets/icons/menu-24px.svg"></label>
    <input id="hamburger" type="checkbox"/>

<!--  todo close when clicked outside-->
    <div class="contents flex-text-center">
      <router-link class="header-item title-in-menu" to="/">FLL Score app</router-link>
      <router-link class="header-item" to="/challenges">Presets</router-link>
      <router-link class="header-item" to="/builder">Builder</router-link>
      <language-picker/>
    </div>
  </header>
</template>

<script>
import LanguagePicker from "./LanguagePicker";

export default {
  name: "AppHeader",
  components: {LanguagePicker}
}
</script>

<style scoped>

.hamburger-label {
  user-select: none;
  z-index: 101;
  position: absolute;
  left: 16px;
  top: 12px;
  height: 36px;
  width: 36px;
}
.hamburger-label > img {
  width: 100%;
  height: 100%;
}


#hamburger {
  display: none;
}

.contents {
  padding: 16px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  background: #d32f2f;
  height: auto;
  max-width: 400px;
  width: 100%;

  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
  transform-origin: 0 0;
  transform: translate(-100%, 0);
  transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0);

}

#hamburger:checked ~ .contents{
  transform: none;
 }


header {
  background-color: #42b983;
  color: white;
  height: 64px;
  box-sizing: border-box;
  position: relative;
}

.header-item {
  color: inherit;
  text-decoration: none;
  padding: 16px;
}

.title-in-menu {
  /*position: absolute;*/
  /*top: 8px;*/
  /*left: 8px;*/
}

@media only screen and (min-width: 768px) {
  .contents {
    flex-direction: row;
    position: initial;
    transform: none;
    height: 100%;
    width: 100%;
    max-width: unset;
    padding: 8px;
    background: unset;

  }

  .hamburger-label {
    display: none;
  }
  .title-in-menu{
    display: initial;
    flex-grow: 1;
  }
}


</style>