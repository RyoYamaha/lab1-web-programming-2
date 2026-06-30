<template>
  <div>
    <h1>Words</h1>
    <table id="words" class="ui celled compact table">
      <thead>
        <tr>
          <th>English</th>
          <th>German</th>
          <th colspan="3"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(word, i) in words" :key="i"> <!--duyệt qua từng giá trị của word ở trong array words-->
          <td>{{ word.english }}</td> <!--tìm đến giá trị word có thuộc tính english-->
          <td>{{ word.german }}</td> <!--tìm đến giá trị word có thuộc tính german-->
          <td width="75" class="center aligned">
            <router-link :to="{ name: 'show', params: { id: word._id }}">Show</router-link>
          </td>
<td width="75" class="center aligned">
  <router-link :to="{ name: 'edit', params: { id: word._id }}">Edit</router-link>
</td>
<td width="75" class= "center aligned" @click.prevent="onDestroy(word._id)">
          <a width="75" class="center aligned">Destroy</a></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { api } from '../helpers/helpers'; //nhúng dữ liệu api từ file helpers
export default { //export toàn bộ dòng dưới vào default
  name: 'words', //đặt tên giúp tránh nhầm lẫn 
  data() { // 
    return {
      words: []
    };
  },
    methods: {
    async onDestroy(id){
      const sure = window.confirm('Are you sure?');
      if(!sure) return;
        await api.deleteWord(id);
        this.flash('Word deleted successfully!' , 'success');
        const newWord = this.words.filter(word => word._id !== id);
        this.words = newWords;
    }
  },
  async mounted() { 
    this.words = await api.getWords(); 
    //await bảo chờ lấy dữ liệu, nếu chạy luôn thì sẽ không có dữ liệu 
    //gán dữ liệu được gọi về vào words
  }
};
</script>