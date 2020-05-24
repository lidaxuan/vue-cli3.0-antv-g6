<template>
  <div class="home">1
    {{asd}}
   <G6Editor :data="asd" mode="edit"></G6Editor>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

import G6Editor from '@/components/G6Editor'
export default {
  name: 'Home',
  components: {
    // HelloWorld
    G6Editor
  },
  data() {
    return {
      input: 0,
      num:'',
      sample:'',
      asd: undefined
    }
  },
  created() {
    this.num = this.$loadStorage('num')
    this.sample = this.$loadStorage('sample')
  },
  methods: {
    add() {
      this.input += 1;
      this.$store.dispatch('setNum', this.input)
      this.$store.dispatch('develop/setSample', this.input)
    },
    del() {
      this.input -= 1;
      this.$store.dispatch('setNum', this.input)
      this.$store.dispatch('develop/setSample', this.input)
    },
  },
}
</script>
