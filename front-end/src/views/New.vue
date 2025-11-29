<template>
    <div>
        <h1>New Word</h1>
        <word-form @createOrUpdate = "createOrUpdate"></word-form>
    </div>
    </template>
<script>
import WordForm from '../components/WordForm.vue';
import {api} from '../helpers/helpers';

export default{ //file nào cũng cần export default để set up hiển thị word form đúng không 
    name: 'new-word', //đặt tên ( không quá quan trọng )
    components: { //set up compohnent để hiển thị 
        'word-form': WordForm//  bằng cách set word-form bản thiết kế wordform để hiển thị 
        //cần chuyển sang wordform để có thể viết <word-form> </wordform> như ở trên 
    },

    methods: { //viết method cho create or update ở trên 
        createOrUpdate: async function(word){
            const res = await api.createWord(word);
            this.flash('Word create' , 'success');
            this.$router.push(`/words/${res._id}`); //tôi biết là nó chuyển đến trang web
            //nhưng nó lấy id từ đâu ra ?  

        }
    }
}
</script>