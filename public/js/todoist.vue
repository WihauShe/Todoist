
  var tasksobj,listsobj;
  if (localStorage.getItem("tasks")) {
    tasksobj = JSON.parse(window.localStorage.getItem("tasks"));
    listsobj = JSON.parse(window.localStorage.getItem("lists"));
  } else {
    tasksobj=[];
    listsobj=[];
    localStorage.setItem("tasks",JSON.stringify(tasksobj));
    localStorage.setItem("lists",JSON.stringify(listsobj));
  }

  var vue = new Vue({
    el:'#app',
    data:{
      tasks:tasksobj,
      lists:listsobj,
      chooseTasks:[],
      addList:{
        id:0,
        name:''
      },
      addTask:{
        id:0,
        listname:'',
        name:'',
        data:'',
        emergency:'',
        state:false
      },
      show:false,
      ifDisplay:true,
      searchName:'',
    },
    created:function(){
      this.filter(0,);
    },
    methods:{
      filter(num,name){
        var chooseTasks = [] ;
        var tasks = JSON.parse(window.localStorage.getItem("tasks"));
        for(var i=0;i<tasks.length;i++)
        {
            if(num===0){
              var date = new Date();
              var seperator1 = "-";
              var month = date.getMonth() + 1;
              var strDate = date.getDate();
              if(month >= 1 && month <= 9) {
                  month = "0" + month;
              }
              if(strDate >= 0 && strDate <= 9) {
                  strDate = "0" + strDate;
              }
              var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
              if(tasks[i].data===currentdate)
                chooseTasks.push(tasks[i]);
          }else if(num===1){
            if(!tasks[i].state)
              chooseTasks.push(tasks[i]);
          }else if(num===2){
              if(tasks[i].state)
                chooseTasks.push(tasks[i]);
          }else if(num===3){
              if(tasks[i].listname===name)
                chooseTasks.push(tasks[i]);
          }else if(num===4){
            var searchName = this.searchName;
            searchName = searchName.trim().toLowerCase();
            if(tasks[i].name.toLowerCase().indexOf(searchName)!==-1)
              chooseTasks.push(tasks[i]);
          }
        }
        chooseTasks.sort(function(x,y){
             if(x['state']!==y['state']){
               return 1;
             }else{
               return x['data']>y['data']?1:-1;
             }
        });
        this.chooseTasks = chooseTasks;
      },
      showTask:function(){
        this.show=true;
      },
      closeTask:function(){
        this.show = false;
      },
      showDisplay:function(){
        this.ifDisplay = true;
      },
      hideDisplay:function(){
        this.ifDisplay = false;
      },
      changeState:function(id){
        var tasks = JSON.parse(window.localStorage.getItem("tasks"));
        console.log(id);
        for(var i=0;i<tasks.length;i++)
          if(tasks[i].id===id)
            tasks[i].state = !tasks[i].state;
        localStorage.setItem("tasks",JSON.stringify(tasks));
      },
      addnewList:function(){
        var lists = JSON.parse(window.localStorage.getItem("lists"));
        if(this.addList.id===0){
          this.addList.id=this.lists.length+1;
          this.lists.push(this.addList);
          lists.push(this.addList);
        }
        addList={
          id:0,
          name:''
        }
        localStorage.setItem("lists",JSON.stringify(lists));
      },
      editTask:function(task){
        this.show = true;
        this.addTask = task;
      },
      saveTask:function(){
        var tasks = JSON.parse(window.localStorage.getItem("tasks"));
        var lists = JSON.parse(window.localStorage.getItem("lists"));
        if(lists.length===0){
          alert('Please create your list!');
          return ;
        }
        if(this.addTask.id===0){
          this.addTask.id=tasks.length+1;
          tasks.push(this.addTask);
        };
        localStorage.setItem("tasks",JSON.stringify(tasks));
        this.addTask={
          id:0,
          listname:'',
          name:'',
          data:'',
          emergency:'',
          state:false
        };
        this.show=false;
        this.filter(0,);
      },
      deleteList:function(id){
        this.lists.splice(id,1);
        var lists = JSON.parse(window.localStorage.getItem("lists"));
        lists.splice(id,1);
        localStorage.setItem("lists",JSON.stringify(lists));
      },
      deleteTask:function(id){
        var tasks = JSON.parse(window.localStorage.getItem("tasks"));
        for(var i=0;i<tasks.length;i++){
          if(i<this.chooseTasks.length&&this.chooseTasks[i].id===id)
            this.chooseTasks.splice(i,1);
          if(tasks[i].id===id)
            tasks.splice(i,1);
        }
        localStorage.setItem("tasks",JSON.stringify(tasks));
      }
    },

  })
