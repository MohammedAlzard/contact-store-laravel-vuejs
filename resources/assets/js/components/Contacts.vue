<template>
  <div>
    <div class="row">
      <div class="col-sm-6">
        <h1>Add / Edit Contact</h1>
        <form action="#" @submit.prevent="edit ? updateContact(contact.id) : createContact()">
          <div class="form-group">
            <label>Name</label>
            <input v-model="contact.name" type="text" name="name" class="form-control">
          </div>
          <div class="form-group">
            <label>Email</label>
            <input v-model="contact.email" type="text" name="email" class="form-control">
          </div>
          <div class="form-group">
            <label>Phone</label>
            <input v-model="contact.phone" type="text" name="phone" class="form-control">
          </div>
          <div class="form-group">
            <button v-show="!edit" type="submit" class="btn btn-primary">New Contact</button>
            <button v-show="edit" type="submit" class="btn btn-success">Update Contact</button>
            <button @click="resetForm()" type="submit" class="btn btn-danger">Reset Form</button>
          </div>
        </form>
      </div>
      <div class="col-sm-6">
        <h1>List</h1>
        <ul class="list-group">
          <li class="list-group-item" v-for="contact in list" :key="contact.id">
            <strong>{{ contact.name }} [{{ contact.email }}] [{{ contact.phone }}] </strong>
            <div class="btn-group btn-group-xs pull-right">
              <button @click="showContact(contact.id)" class="btn btn-info">Edit</button>
              <button @click="deleteContact(contact.id)" class="btn btn-danger">Delete</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: function(){
      return {
        edit:false,
        list:[],
        contact:{
          id:'',
          name:'',
          email:'',
          phone:''
        }
      }
    },
    mounted: function(){
      console.log('Contacts Component Loaded...');
      this.fetchContactList();
    },
    methods: {
      fetchContactList(){
        console.log('Fetching contacts...');
        axios.get('api/contacts')
          .then((response) => {
            console.log(response.data);
            this.list = response.data;
          }).catch((error) => {
            console.log(error);
          });
      },
      createContact(){
        console.log('Creating contact...');
        let self = this;
        let params =Object.assign({}, self.contact);
        axios.post('api/contact/store', params)
          .then(function(){
            self.contact.name = '';
            self.contact.email = '';
            self.contact.phone = '';
            self.edit = false;
            self.fetchContactList();
          })
          .catch(function(error){
            console.log(error);
          });
      },
      updateContact(id){
        console.log('Updating contact '+id+'...');
        let self = this;
        let params =Object.assign({}, self.contact);
        axios.patch('api/contact/'+id, params)
          .then((response) => {
            self.contact.name = '';
            self.contact.email = '';
            self.contact.phone = '';
            self.edit = false;
            self.fetchContactList();
          })
          .catch((error) => {
            console.log(error);
          });
      },
      showContact(id){
        let self = this;
        axios.get('api/contact/'+id)
          .then((response) => {
            self.contact.id = response.data.id;
            self.contact.name = response.data.name;
            self.contact.email = response.data.email;
            self.contact.phone = response.data.phone;
          })
          .catch((error) => {
            console.log(error);
          });
          self.edit = true;
      },
      deleteContact(id){
        let self = this;
        axios.delete('api/contact/'+id)
        .then((response) => {
          self.fetchContactList();
        })
        .catch((error) => {
          console.log(error);
        })
      },
      resetForm(){
        self.contact.id = '';
        self.contact.name = '';
        self.contact.email = '';
        self.contact.phone = '';
      }
    }
  }
</script>
