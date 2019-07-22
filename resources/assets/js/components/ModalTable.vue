<template>
    <div>
        <v-toolbar flat color="white">
            <v-toolbar-title>My CRUD</v-toolbar-title>
            <v-divider
                    class="mx-2"
                    inset
                    vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
                <v-btn slot="activator" color="primary" dark class="mb-2">New Item</v-btn>
                <v-card>
                    <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12 sm6 md4>
                                    <v-text-field v-model="editedItem.id" label="ID"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <v-text-field v-model="editedItem.title" label="Title"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <v-text-field v-model="editedItem.body" label="Body"></v-text-field>
                                </v-flex>
                                </v-layout>
                        </v-container>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
                        <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-toolbar>
        <!--:headers="$parent.headers"-->
        <!--:items="$parent.articles"-->
        <!--class="elevation-1"-->

        <v-data-table
                :headers="headers"
                :items="articles"
                class="elevation-1"

        >
            <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
                <td class="text-xs-right">{{ props.item.id }}</td>
                <td class="text-xs-right">{{ props.item.title }}</td>
                <td class="text-xs-right">{{ props.item.body }}</td>
                <td class="justify-center layout px-0">
                    <v-icon
                            small
                            class="mr-2"
                            @click="editItem(props.item)"
                    >
                        edit
                    </v-icon>
                    <v-icon
                            small
                            @click="deleteItem(props.item)"
                    >
                        delete
                    </v-icon>
                </td>
            </template>
            <template slot="no-data">
                <v-btn color="primary" @click="initialize">Reset</v-btn>
            </template>
        </v-data-table>
    </div>
</template>


<script>
    export default {
        data: () => ({
            dialog: false,
            headers: [
                {
                    text: 'name',
                    align: 'left',
                    sortable: false,
                    value: 'name'
                },
                { text: 'id', value: 'id' },
                { text: 'title', value: 'title' },
                { text: 'body', value: 'body' },
            ],
            article: {
                // value: false,
                id: '',
                title: '',
                body: ''
            },
            // headers: [],
            // articles: [],
            // props: {
            //     articles: {
            //         type: String,
            //         required: true
            //         // default: 'Lucas'
            //     }
            // },
            // desserts: [],
            articles: [],
            editedIndex: -1,
            editedItem: {
                name: '',
                id: '',
                title: '',
                body: '',
            },
            defaultItem: {
                name: '',
                id: '',
                title: '',
                body: '',
            }
        }),

        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
            }
        },

        watch: {
            dialog (val) {
                val || this.close()
            }
        },

        created () {
            this.initialize()
        },

        methods: {

            fetchArticles()  {
                // const index = this.articles.indexOf(item)
                // confirm('Are you sure you want to delete this item?') && this.articles .splice(index, 1)
              // alert('hllooo')
                axios.get('api/article' )
                    .then(response =>{
                        console.log(response)
                        this.articles=response.data.data;
                    })
            },
            initialize () {
                this.fetchArticles();
            },
            editItem (item) {
                this.editedIndex = this.articles.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            deleteItem (item) {
                const index = this.articles.indexOf(item)
                confirm('Are you sure you want to delete this item?') && this.articles .splice(index, 1)
                axios.delete('api/article/' +this.editedItem.id, {title:this.editeditem.title , body:this.editeditem.body})
                    .then(response =>{
                        console.log(response)
                    })
                alert(deleted)
            console.log('deleted')
            },

            close () {
                this.dialog = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300)
            },

            save () {
                if (this.editedIndex > -1) {
                    // Update
                    axios.put('api/article/' +this.editedItem.id, {title:this.editeditem.title , body:this.editeditem.body})
                        .then(response =>{
                            console.log(response)
                        })
                    Object.assign(this.articles[this.editedIndex], this.editedItem)
                } else {
                    axios.post('api/article', {title:this.editeditem.title , body:this.editeditem.body})
                        .then(response =>{
                            console.log(response)
                        })
                    this.articles.push(this.editedItem)
                }
                this.close()
            }
        }
    }
</script>