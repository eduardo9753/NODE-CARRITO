window.addEventListener('DOMContentLoaded' , () => {
    //ESTILO TEXT CON CKEDITOR TRAER CDN
    $(function() {
       if($('textarea#ta').length) {
        CKEDITOR.replace('ta');
       }
    });
    
    //CARGAR LA IMG SUBIDA EN EL #IMGPREVIEW
    function readURL(input) {
        if(input.files && input.files[0]){
            let read = new FileReader();
            read.onload = function(e) {
                $('#imgPreview').attr('src' , e.target.result).width(100).height(100);
            }
            read.readAsDataURL(input.files[0]);
        }
    }
    $('#img').change(function() {
        readURL(this);
    });

    
})