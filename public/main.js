const clearRequest=function()
{
	$("#todoList").html("");
}

const appendButton=function(data)
{
	data.forEach(function(todoItem){
		$("#todoList").append('<li>'+todoItem.message+'<button id='+todoItem.id+'class="delete">Delete</button><input type="checkbox" class="checkbox" id=' + todoItem.id +'</li>');

	});
}
 //This requests the todo items on page load
const drawRequest=function()
{
	clearRequest();
	$.ajax(
	{
		url:"/todos",
		type:"get",
		dataType:"JSON", //We expect JSON as response
		data:{"default-post":"Loading the page"},
		contentType:"application/x-www-form-urlencoded;utf-8",
		success:function(data)//calls the function, with the response data
		{
			appendButton(data.items);
		},
		error:function(e)
		{
			console.log("You screwed up!");
			alert("You screwed up");
		}})
};

const updateTodo=function()
{
	$.ajax({
		url:"/todos"+todoItem,
		type:'put',
		dataType:'json',
		data:JSON.stringify(todoItem),
		contentType:"application/json; charset=utf-8",
		success:function(data){
			drawRequest();
		},
		error:function(data){
			alert('error while creating');
		}
	});
}

const deleteTodo=function(itemID)
{
	$.ajax({
		url:"/todos"+itemsID,
		type:'delete',
		success:function(data){
			drawRequest();
		},
		error:function(data){
			alert('Error deleting the item');
		}
	});
};

$("#addBtn").on("click",function()
{
	const val=$('#addTodoTxt').val();
	if(val==="")return;
	$('#addTodoTxt').val('');//clear the textbox

	$.ajax({
		url:"/todos",
		type:'post',
		dataType:'json',
		data:JSON.stringify({
			message:val,
			completed:false
		}),
		contentType:"application/json;charset=utf-8",
		success:function(data){
			drawRequest();
			//refresh the list(re-run the search query)
		},
		error:function(data){
			alert('Error creating todo');
		}
	});
});
//Search for the todo items on cick
$("#searchBtn").on("click",function(e)
{
	$.ajax(
	{
		url:"/todos",
		type:"get",
		dataType: "JSON",
		data:{searchtext:$("#searchTxt").val()},
		contentType:"application/x-www-form-urlencoded;utf-8",
		success:function(received_data)
		{
			clearRequest();
			appendButton(received_data.items);
		},
		error:function(e)
		{
			alert("You screwed up!");
		}
	});
});

$('#todoList').on('click', '.delete', function(e){
$.ajax({
	url:"/todos/"+todoItemID,
	type:"delete",
	succees:function(data){
		//remove the rendering of that item from the UI 
	},
		error:function(data){
			alert('Error deleting the item');
		}
		}
});

$('#todoList').on('change', '.checkbox', function(e){
$.ajax({
	url:"/todos/"+todoItemID,
	type:'put',
	dataType:'json',
	data:JSON.stringify(todoItem),
	contentType:"application/json;charset=utf-8",
	success:function(data){

	},
	error:function(data){
		alert('Error creating todo');
	}
});

drawRequest();
