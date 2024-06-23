export function isReload() {
    let result: boolean = false
    const oldAPI = window?.performance?.navigation?.type
    if(oldAPI === undefined) {
        const entries = performance.getEntriesByType("navigation");
        
        entries.forEach((entry) => {
          if (entry.type === "reload") {
            result = true
          }
        });
    } else {
        // type 为 1: 表示页面通过点击刷新页面按钮或Location.reload()方法打开；
        if(oldAPI === 1) {
            result = true
        }
    }
    return result
}