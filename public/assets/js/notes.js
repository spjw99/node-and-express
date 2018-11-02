const notes_src = $('.notes_src');
const submit_btn = $('.submit_btn');
const my_encode = (data) => {return encodeURIComponent(data).replace(/'/g, "%27");}
const my_decode = (data) =>{return decodeURIComponent(data).replace(/%27/g,"'");}

const update_lists = () => {
    $.ajax({
        url : "/api/view",
        method : "GET"
    }).then(function(data){
        notes_src.html(data);
    })
}
const view_mode = idx => {
    //hide create mode
    $('#title').val('');
    $('#content').val('');
    $('.write_mode').hide();

    //show view mode
    const selected_note = $('.note[data-idx="'+idx+'"]');
    const view_title = my_decode(selected_note.text());
    const view_content = my_decode(selected_note.attr('data-content'));
    $('.view_title').html(view_title);
    $('.view_content').html(view_content);
    $('.view_mode').show();
}
const create_mode = () => {
    //hide view mode
    $('.view_title').empty();
    $('.view_content').empty();
    $('.view_mode').hide();
    //show create mode
    $('.write_mode').show();
}
const delete_mode = idx =>{
    const selected_note = $('.note[data-idx="'+idx+'"]');
    const note_data = {
        idx : idx
    };
    $.ajax({
        url : '/api/delete',
        method : 'PUT',
        data : note_data
    }).then(function(data){
        console.log(data);
        if(data.affectedRows === 1){
            $('.alert-success').html("Successfully deleted.").show().fadeOut(3000);
            selected_note.remove();
            create_mode();
        }else{
            $('.alert-danger').html("<strong>Error!</strong> Something is wrong!").show().fadeOut(3000);
            return false;
        }
    })
}
const create_notes = function(event){
    event.preventDefault();
    $('.alert-danger').empty();
    $('.alert-success').empty();

    let note_title = $('#title').val().trim();
    let note_content = $('#content').val().trim();
    if(note_title && note_content){
        note_title = my_encode(note_title);
        note_content = my_encode(note_content);
    }else if(!note_title){
        $('.alert-danger').html("<strong>Error!</strong> Please enter title!").show().fadeOut(3000);
        return false;
    }else if(!note_content){
        $('.alert-danger').html("<strong>Error!</strong> Please enter content!").show().fadeOut(3000);
        return false;
    }
    const ts = Math.round((new Date()).getTime() / 1000);
    const note_data = {
        title : note_title,
        content : note_content,
        search_ts : ts,
        del_flag : '1'
    };

    $.ajax({
        url : "/api/save",
        method : "POST",
        data: note_data
    }).then(function(data){
        console.log(data);
        if(data.affectedRows === 1){
            $('.alert-success').html("Successfully created.").show().fadeOut(3000);
            update_lists();
        }
        else{

        }
        $('#title').val('');
        $('#content').val('');
    })
}
//notes_src.on('click', '.note', view_mode($(this).attr('data-idx')));
notes_src.on('click', '.note', function(){
    view_mode(($(this).attr('data-idx')));
});
notes_src.on('click', '.create_btn', create_mode);
notes_src.on('click', '.delete_btn', function(){
    delete_mode($(this).parent().attr('data-idx'));
});
submit_btn.on('click', create_notes);

update_lists();