<template>
  <div id="app" class="wrapper-content"> 
   
    <section>
      <div class="container">
        <!-- title prodject -->
        <h1 style="text-align:center; font-weight:bold; font-size:25px;" class="main-page">Users CRM</h1>


        <!-- Если ошибка и данные из Апи не пришли -->
        <div v-if="errorApi" class="error-api">Ошибка запроса от API users - {{discrError}}</div>


        <!-- table -->
        <table v-else>
          <!-- header -->
          <thead>
            <tr>
              <!-- cортировка по name,age,gender с помощью методов -->
              <th @click="sort('name')" class="style-btn-sort">Name</th>
              <th @click="sort('age')" class="style-btn-sort">Age</th>
              <th @click="sort('gender')" class="style-btn-sort">Gender</th>
            </tr>
          </thead>

        <!-- body -->
          <tbody>
<!-- отрисовка usersSort - computed свойство -->
            <tr v-for="user in usersSort" :key="user.id">

              <td>
                <img :src="user.img" :alt="user.name">
                <span>{{user.name}}</span>
              </td>

              <td>{{user.age}}</td>
              <td>{{user.gender}}</td>
            </tr>

          </tbody>

        </table>
        <p style="display: flex;justify-content: center;">Сортировка по: {{currentSort}}, вид сортировки: {{currentSortDir}}</p>
      </div>
    </section>

<!-- buttons pagination -->
    <section class="container">
      <div class="button-list wrapper-pagination">
<!-- pre page -->
        <div class="btn btnPrimary" @click="prevPage"> pre </div>
<!-- discription pagination -->
        <div class="main-page">Текущая страница:
           <span style="color:red; font-weight:bold; margin:5px;"> {{this.page.current}}</span>
        </div>
        <!-- next page -->
        <div class="btn btnPrimary" @click="nextPage"> next </div>
        
      </div>
      <div class="all-pages main-page">Выводит по:
        <span style="color:red; font-weight:bold; margin:5px;">{{this.page.length}} </span>
      пользователей
      </div>
    </section>
  </div>
</template>


<script>
// import axios from 'axios'

export default {
  data() {
    return {
        users: [
          {
              id:1,
              name:'Vasa',
              age:23,
              gender: 'male',
             img: require("@/assets/man/11.jpg"),
          },

          {
              id:2,
              name:'Len',
              age:213,
              gender: 'female',
              img: require("@/assets/girls/1.jpg"),
          },

     {
        id:3,
        name:'Gosha',
        age:233,
        gender: 'male',
        img: require("@/assets/man/12.jpg"),
    },

    {
        id:4,
        name:'Vasilisa',
        age:2223,
        gender: 'female',
        img: require("@/assets/girls/2.jpg"),
    },

    {
        id:5,
        name:'Vasan',
        age:21,
        gender: 'male',
        img: require("@/assets/man/13.jpg"),
    },

     {
        id:6,
        name:'Vasalasa',
        age:2111,
        gender: 'female',
        img: require("@/assets/girls/3.jpg"),
    },

    {
        id:7,
        name:'Vasagina',
        age:423,
        gender: 'female',
        img: require("@/assets/girls/4.jpg"),
    },

    {
        id:8,
        name:'Vano',
        age:2253,
        gender: 'male',
        img: require("@/assets/man/14.jpg"),
    },

    {
        id:9,
        name:'Vandam',
        age:2873,
        gender: 'male',
        img: require("@/assets/man/15.jpg"),
    },

     {
        id:10,
        name:'Wika',
        age:26453,
        gender: 'female',
        img: require("@/assets/girls/5.jpg"),
    },

    {
        id:11,
        name:'Dima',
        age:2083,
        gender: 'male',
        img: require("@/assets/man/16.jpg"),
    },

],
      // кол-во контактов(юзеров из АПИ)
      countUsers:3,
      errorApi:false,
      // Описание ошибки
      discrError:'',
      // текущая соритровка
      currentSort:'age',
      currentSortDir:'asc',
      page: {
        // исходная 1-я стра, по 3 человека выводить будем на 1 страницу
        current:1,
        length:5
      }
    }

  },

computed: {

usersSort () {
this.users.sort()

  return this.users.sort( (a, b) => {

    let mod = 1

    if(this.currentSortDir === 'desc') mod = -1

    if(a[this.currentSort] < b[this.currentSort]) return -1 * mod
    if(a[this.currentSort] > b[this.currentSort]) return 1 * mod
    
    return 0

  //  filter для пагинации
  }).filter( (row,index) => {

    let start = (this.page.current - 1) * this.page.length
    let end = this.page.current * this.page.length

    if(index >= start && index < end) return true

  })
 
}

},

  methods:{ 

    sortName() {
      
      this.users.forEach(item => {
        
        this.users.push(item.name)
        
      })

    },

    sort(e) {

        if(e === this.currentSort) {
          // сортировка если совпадает с asc если нет то будет desc
          this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
        }
        // console.log(this.currentSort, e)
        this.currentSort = e
    },

    prevPage() {
      // берем текуюущую стр каррент и умножаем на длину массива (клиентов)
      // если позволяет нам длинна то увиличиваем на 1
      if(this.page.current > 1) this.page.current-=1
    },
    
    nextPage() {
      if((this.page.current * this.page.length) < this.users.length) this.page.current+=1
      
    },
  },

//       created() {
// // Запрос на АПИ сервер   // https://randomuser.me/documentation#results
//         axios
//         .get(`https://randomuser.me/api/?results=${this.countUsers}`)
//         .then(res => {
//           // записываем данные в пустой массив
//           this.users = res.data.results
//           // console.log(this.users)
//           // console.log(res.data.results.length)
//         })
//         .catch(err => {
//           // error API
//           this.errorApi= true
//           this.discrError = err
//             console.log("Ошибка см запрос -- ", err)
//         }) 
     
//     }


}
</script>


<style lang="scss">
// ERROR
.error-api {
  width: 100%;
  margin: 0 auto;
  margin-top: 45px;
  text-align: center;
  padding: 15px;
  background:#f8d7da;
}
// IMG
img {
  width:60px;
  height: auto;
  border-radius: 50%;
  margin: 10px !important;
}

.style-btn-sort {
  border-radius: 15px;
  text-align: center;
  background: cornflowerblue;
}

.style-btn-sort:hover {
  background: rgb(62, 107, 190);
  transition: 0.5s;
}

.button-list {
  width:100%;
  text-align:center;
}
.btn {
  border-radius: 60px;
  margin: 0 20px;
}

.wrapper-pagination {
  display: flex;
  justify-content: center;
}
.main-page {
  background:#ff8c00;
  color:#ffffff;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}
.all-pages {
  // margin-top: 15px;
  width: 300px;
  margin: 15px auto;
}
</style>
