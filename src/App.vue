<template>
  <div class="form-group">
    <label for=""></label>
    <select class="form-control" v-model="selectedChapter">
      <option v-for="chapter in chapters" :value="chapter.id">
        {{ chapter.name_simple }}
      </option>
    </select>

    <input
      @click="clickChapters"
      name=""
      id=""
      class="btn btn-primary"
      type="button"
      value="search"
    />
  </div>
  <div class="container" v-if="isi">
    <div style="text-align: right" v-for="(is, index) in isi.verses">
      {{ index + 1 }}
      <h1>{{ is.text_uthmani }}</h1>
    </div>
  </div>
</template>
<script>
import ApiService from "./service/ApiService";

export default {
  data() {
    return {
      chapters: null,
      selectedChapter: null,
      juzs: null,
      selectedjuz: null,
      isi: null,
    };
  },
  async mounted() {
    let chapters = await ApiService.get(
      "https://api.quran.com/api/v4/chapters?language=en"
    );
    this.chapters = chapters.chapters;
    console.log(this.chapters);
    let juzs = await ApiService.get("https://api.quran.com/api/v4/juzs");
    this.juzs = juzs.juzs;
    console.log(this.juzs);
  },
  methods: {
    async clickChapters() {
      this.isi = await ApiService.get(
        "https://api.quran.com/api/v4/quran/verses/uthmani",
        { chapter_number: this.selectedChapter }
      );
    },
  },
  setup() {},
};
</script>
