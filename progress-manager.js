/* progress-manager.js - 阅读进度管理 */
var ProgressManager = {
    // 保存阅读进度
    saveProgress: function(bookId, chapterId, totalChapters) {
        var key = 'progress_' + bookId;
        var progress = {
            bookId: bookId,
            chapterId: chapterId,
            totalChapters: totalChapters,
            percentage: Math.round((chapterId + 1) / totalChapters * 100),
            timestamp: Date.now()
        };
        localStorage.setItem(key, JSON.stringify(progress));
        
        // 同时保存到总进度列表
        this.updateProgressList(progress);
    },

    // 获取阅读进度
    getProgress: function(bookId) {
        var key = 'progress_' + bookId;
        var data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    },

    // 更新进度列表（用于"继续阅读"功能）
    updateProgressList: function(progress) {
        var list = this.getProgressList();
        // 移除旧的相同书籍记录
        list = list.filter(function(p) {
            return p.bookId !== progress.bookId;
        });
        // 添加到开头
        list.unshift(progress);
        // 只保留最近10条
        if (list.length > 10) list = list.slice(0, 10);
        localStorage.setItem('progress_list', JSON.stringify(list));
    },

    // 获取进度列表
    getProgressList: function() {
        var data = localStorage.getItem('progress_list');
        return data ? JSON.parse(data) : [];
    },

    // 格式化时间
    formatTime: function(timestamp) {
        var date = new Date(timestamp);
        var now = new Date();
        var diff = now - date;
        var days = Math.floor(diff / (1000 * 60 * 60 * 24));
        
        if (days === 0) return '今天';
        if (days === 1) return '昨天';
        if (days < 7) return days + '天前';
        return date.toLocaleDateString('zh-CN');
    }
};
