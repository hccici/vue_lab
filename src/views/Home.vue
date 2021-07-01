<template>
    <div class="home">
      <search-select :optionList="optionList" v-model="select">

      </search-select>
    </div>
</template>

<script>
import SearchSelect from "@components/SearchSelect";
export default {
    name: "Home",
    components: {
        SearchSelect,
    },
    data() {
      return {
        select: [],
        optionList: [
          {
            label: 't1',
            value: 't1'
          },
          {
            label: 't2',
            value: 't2'
          },
          {
            label: 't3',
            value: 't3'
          }
        ]
      }
    }
};
</script>
