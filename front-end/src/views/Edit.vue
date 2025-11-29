<template>
  <div>
    <h1>Edit Word</h1>
    <word-form @createOrUpdate="createOrUpdate" :word=this.word></word-form>
    <!--word-form ở đây được gọi từ file wordform để hiển thị 
    dấu : trước word báo hiệu rằng giá trị word này sẽ biến đổi theo thời gian 
    có phải word này được lấy từ word java script ở dưới -->
  </div>
</template>

<script>
import WordForm from '../components/WordForm.vue'; //trích xuất bản thiết kế từ wordform vào wordform
import { api } from '../helpers/helpers'; //trích xuuaat
export default {
  name: 'edit',
  components: {
    'word-form': WordForm //set up component để hiển thị ở trên 
  },
  data: function() { 
    return { 
      word: {} //khai báo word rỗng 
    };
  },
  async mounted() { //đánh dấu răng chỗ này sẽ làm việc chậm hơn, skip qua đoạn này chạy mấy cái chạy trước được đi 
    this.word = await api.getWord(this.$route.params.id) // lấy dữ liệu thông qua câu lệnh api get word để lấy dữ liệu về hiển thị 
  },
  methods: {
    createOrUpdate: async function(word){
      await api.updateWord(word);
      this.flash('Word update successfully!', 'success')
      this.$router.push(`/word/${word.id}`)
    }
  }
};
</script>