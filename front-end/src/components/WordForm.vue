<template>
  <form action="#" @submit.prevent="onSubmit">
    <p v-if="errorsPresent" class="error">Please fill out both fields!</p>

    <div class="ui labeled input fluid">
      <div class="ui label">
        <i class="germany flag"></i> German
      </div>
      <input type="text" placeholder="Enter word..." v-model="word.german" />
    </div>

    <div class="ui labeled input fluid">
      <div class="ui label">
        <i class="united kingdom flag"></i> English
      </div>
      <input type="text" placeholder="Enter word..." v-model="word.english" />
    </div>

    <button class="positive ui button">Submit</button>
  </form>
</template>

<script>
export default { //tại sao lại là export default, tôi biết export là chia sẻ cho các file khác có thể import nhưng tại sao phải thêm chữ default vào ?
  name: 'word-form',
  props: { //props ở đây chính là properties, phân biệt, thêm nữa nó lấy dữ liệu từ dòng nào bên edit 
    word: { // khai báo word (tôi nói vậy đúng không)
      type: Object,// với kiểu object (dữ liệu được l 
      required: false, // vẫn không hiểu sao lại false 
      default: () => {
        return{
          english: '',
          german: ''
        };
      }
    }
  },
  data() { //tạo 1 funtion data cho việc khai báo nội bộ (đây gọi là function có đúng không )
    return { 
      errorsPresent: false //khai báo error present hiện tại là false (tại sao phải dùng return)
    };
  },
  methods: { // tạo 1 funtion method 
    onSubmit: function() { //gán chức năng cho onsubmit bằng cách tạo 1 function 
      if (!this.word.english || !this.word.german) { //nếu khác giá trị với giá trị word.english hoạc word.german thì 
        this.errorsPresent = true; //erorr present, error present là cái gfi 
      } else { 
        this.$emit('createOrUpdate', this.word); //gửi dữ liệ(gửi ra dòng nào) Createorupdate được định nghĩa sẵn rồi à
      }
    }
  }
};
</script>