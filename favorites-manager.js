/* favorites-manager.js - 收藏管理 */
var FavoritesManager = {
    KEY: 'book-favorites',

    // 获取所有收藏
    getFavorites: function() {
        var data = localStorage.getItem(this.KEY);
        return data ? JSON.parse(data) : [];
    },

    // 添加收藏
    addFavorite: function(book) {
        var favorites = this.getFavorites();
        // 检查是否已收藏
        var exists = favorites.some(function(f) {
            return f.id === book.id;
        });
        if (!exists) {
            favorites.push({
                id: book.id,
                title: book.title,
                titleCn: book.titleCn || '',
                author: book.author,
                cover: book.cover || '',
                link: book.link,
                addedAt: Date.now()
            });
            localStorage.setItem(this.KEY, JSON.stringify(favorites));
            return true;
        }
        return false;
    },

    // 移除收藏
    removeFavorite: function(bookId) {
        var favorites = this.getFavorites();
        favorites = favorites.filter(function(f) {
            return f.id !== bookId;
        });
        localStorage.setItem(this.KEY, JSON.stringify(favorites));
    },

    // 检查是否已收藏
    isFavorite: function(bookId) {
        var favorites = this.getFavorites();
        return favorites.some(function(f) {
            return f.id === bookId;
        });
    },

    // 切换收藏状态
    toggleFavorite: function(book) {
        if (this.isFavorite(book.id)) {
            this.removeFavorite(book.id);
            return false;
        } else {
            this.addFavorite(book);
            return true;
        }
    }
};
