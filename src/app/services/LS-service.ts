export const LSService: any = {
    addUserIdToLS(id: String) {
        window.localStorage.setItem('user', JSON.stringify(id));
    },

    getUserIdFromLS(): string | null {
        const itemFromLS: string | null = window.localStorage.getItem('user');
        return itemFromLS ? JSON.parse(itemFromLS) : null;
    },

    deleteUserFromLS() {
        window.localStorage.removeItem('user');
    }
};
