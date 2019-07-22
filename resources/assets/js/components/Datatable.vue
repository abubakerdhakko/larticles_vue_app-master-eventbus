<template>
    <v-data-table
            :headers="$parent.headers"
            :items="$parent.articles"
            class="elevation-1"
    >
        <template slot="items" slot-scope="props">
            <td>{{ props.item.value }}</td>
            <td class="text-xs-right">{{ props.item.id }}</td>
            <td class="text-xs-right">{{ props.item.title }}</td>
            <td class="text-xs-right">{{ props.item.body }}</td>
        </template>
    </v-data-table>
</template>

<script>
    import { serverBus } from '../app.js';

    export default {
        data () {
            return {
                headers: [],
                articles: [],
                props: {
                    articles: {
                        type: String,
                        required: true
                        // default: 'Lucas'
                    }
                }
            }
        },
        created() {
            // Using the service bus
            // serverBus.$on('Articles', (articles) => {
            //     this.articles = articles;
            // });
            // serverBus.$on('Headers', (headers) => {
            //     this.headers = headers;
            // })
        },
    }
</script>
