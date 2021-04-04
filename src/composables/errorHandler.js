import { watch } from "vue";
import Swal from "sweetalert2";

export default function errorHandler(noResult, loading, message) {
    const noResultErrMsg = () => {
        loading.value = false;
        
        Swal.fire({
          text: message.value,
          showConfirmButton: false
        })
        
        setTimeout(() => {
          Swal.close()
        }, 3000)
      }
      
      watch(noResult, (newValue) => {
        if(newValue === true) {
          noResultErrMsg()
        }
      });
}