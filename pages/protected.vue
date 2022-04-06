<template>
    <div>
        <b-button
            variant="primary"
            class="mb-2"
            @click="editUser(0)">
            Create User
        </b-button>
        <b-table
            striped
            hover
            :fields="columns"
            :items="users">
            <template #cell(actions)="row">
                <b-button @click="editUser(row.item.userId)">
                    Edit
                </b-button>
                <b-button
                    variant="danger"
                    @click="deleteUser(row.item.userId)">
                    Delete
                </b-button>
            </template>
        </b-table>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';

export default {
    name: 'ProtectedPage',
    data() {
        return {
            columns: [{
                key: 'userId',
                label: 'Profile UID',
            },
            {
                key: 'username',
                label: 'Username',
            },
            {
                key: 'avatar',
                label: 'Avatar',
            },
            {
                key: 'email',
                label: 'Email',
            },
            {
                key: 'city',
                label: 'City',
            },
            {
                key: 'state',
                label: 'State',
            }, {
                key: 'actions',
                label: 'Actions',
            }],
        };
    },
    computed: {
        ...mapState({
            users: (state) => state.users.list,
        }),
    },
    async mounted() {
        await this.fetchUserList();
    },
    methods: {
        ...mapActions({
            fetchUserList: 'users/fetchUserList',
        }),
        editUser(userId) {
            console.log(userId);
        },
        deleteUser(userId) {
            console.log(userId);
        },
    },
};
</script>
