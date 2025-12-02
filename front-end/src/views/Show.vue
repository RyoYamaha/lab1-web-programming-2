<template>
  <div>
    <h1>Show Word</h1>

    <div class="ui labeled input fluid">
      <div class="ui label">
        <i class="germany flag"></i> German
      </div>
      <div style="padding: 10px; border: 1px solid #ccc;">{{ word.german }}</div> <!--tìm word được khai báo ở dưới có thuộc tính là german-->
    </div>

    <div class="ui labeled input fluid" style="margin-top: 1em;">
      <div class="ui label">
        <i class="united kingdom flag"></i> English
      </div>
      <div style="padding: 10px; border: 1px solid #ccc;">{{ word.english }}</div> <!-- tìm giá trị word được khai báo ở dưới có giá trị là english -->
    </div>

    <router-link :to="{ name: 'edit', params: { id: this.$route.params.id }}" class="ui button" style="margin-top: 1em;"> <!--xem đường dẫn của trang hiện tại (this.route)
                                                                                                                            tìm tham số trên đường dẫ đấy (params) rồi nạp vào id-->
      Edit word
    </router-link>
  </div>
</template>
<script>
import {api} from '../helpers/helpers'; //nạp dữ liệu api từ helper 
export default { //export toàn bộ những dòng ở dưới vào default
    name: 'show', //đặt tên là show
    data(){ //tạo hàm data khai báo giá trị word
        return{
            word: {} //khai báo giá trị word là rỗng
        };
    },
    async mounted(){  
     
        this.word = await api.getWord(this.$route.params.id); 
    }
};
</script>