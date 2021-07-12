<template>
  <SearchSelect :optionList="optionList" v-model="select" />
</template>

<script>
import SearchSelect from "@components/SearchSelect";
export default {
  name: "searchSelect",
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
