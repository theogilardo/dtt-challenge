import Vue from "vue";

Vue.filter("sliceText", (value: string) => {
  if (value.length > 20) {
    return `${value.slice(0, 20)}..`;
  }
  return value;
});
