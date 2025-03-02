import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

// 获取当前脚本所在目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 修改 MAP_FILE 路径到根目录
const DOCS_DIR = path.join(__dirname, '..', 'docs');
const ROOT_DIR = path.join(__dirname, '..');  // 项目根目录
const DEFAULT_FILE = path.join(ROOT_DIR, 'DEFAULT.md');
const README_FILE = path.join(ROOT_DIR, 'README.md');
const BLOG_URL = 'https://luolei.org';

console.log('当前脚本路径:', __filename);
console.log('docs 目录路径:', DOCS_DIR);
console.log('MAP.md 将生成在:', DEFAULT_FILE);

// 定义类别对应的 emoji
const CATEGORY_EMOJIS = {
    'zuoluotv': '📺',
    'photography': '📷',
    'travel': '✈️',
    'tech': '💻',
    'other': '📝'  // 添加其他类别的 emoji
};

// 定义类别的中文名称
const CATEGORY_NAMES = {
    'zuoluotv': '视频',
    'photography': '摄影',
    'travel': '旅行',
    'tech': '数码',
    'other': '其他'  // 添加其他类别的名称
};

// 获取所有 markdown 文件
function getAllMarkdownFiles(dir) {
    let results = [];
    try {
        if (!fs.existsSync(dir)) {
            console.error('错误: docs 目录不存在:', dir);
            return results;
        }

        const files = fs.readdirSync(dir);
        console.log(`在 ${dir} 中找到以下文件:`, files);
        
        files.forEach(file => {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);
            
            if (!stat.isDirectory() && 
                file.endsWith('.md') && 
                file !== 'MAP.md' && 
                file !== 'index.md' &&
                file !== 'README.md') {  // 排除 README.md
                console.log('处理 markdown 文件:', file);
                results.push(filePath);
            }
        });
    } catch (error) {
        console.error('读取目录出错:', error);
    }
    return results;
}

// 解析文章信息
function getArticleInfo(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const { data } = matter(content);
        const relativePath = path.relative(DOCS_DIR, filePath);
        const urlPath = relativePath.replace(/\.md$/, '').replace(/^\//, '');
        
        if (!data.title || !data.date) {
            console.warn(`警告: ${filePath} 缺少必要的 frontmatter (title 或 date)`);
            return null;
        }

        let date;
        try {
            const dateStr = data.date.replace(/['"]/g, '');
            date = new Date(dateStr);
            if (isNaN(date.getTime())) {
                throw new Error('无效的日期格式');
            }
        } catch (error) {
            console.warn(`警告: ${filePath} 日期格式无效:`, data.date);
            return null;
        }

        // 获取文章的所有类别标记
        const categories = Array.isArray(data.categories) ? data.categories : [];
        const emojis = categories
            .map(cat => CATEGORY_EMOJIS[cat.toLowerCase()])
            .filter(emoji => emoji) // 过滤掉 undefined
            .join(' ');
        
        return {
            title: data.title,
            date: date,
            url: `${BLOG_URL}/${urlPath}`,
            emojis: emojis
        };
    } catch (error) {
        console.error(`处理文件 ${filePath} 时出错:`, error);
        return null;
    }
}

// 生成导览内容
function generateMapContent(files, stats) {
    let content = '\n## 文章导览\n\n';
    
    // 添加统计信息（使用表格格式）
    content += '### 文章统计\n\n';
    content += `总共 ${stats.total} 篇文章\n\n`;
    
    // 表格头部
    content += '| 类别 | 数量 |\n';
    content += '|------|------|\n';
    
    // 表格内容：按照 CATEGORY_NAMES 的顺序显示
    Object.keys(CATEGORY_NAMES)
        .forEach(category => {
            const count = stats.categories[category];
            if (count > 0) {
                const emoji = CATEGORY_EMOJIS[category];
                const name = CATEGORY_NAMES[category];
                content += `| ${emoji} ${name} | ${count} 篇 |\n`;
            }
        });

    content += '\n---\n\n';
    content += '### 所有文章\n\n';

    // 按年份输出文章列表
    const articlesByYear = {};
    files.forEach(article => {
        const year = article.date.getFullYear();
        if (!articlesByYear[year]) {
            articlesByYear[year] = [];
        }
        articlesByYear[year].push(article);
    });

    Object.keys(articlesByYear)
        .sort((a, b) => b - a)
        .forEach(year => {
            const yearArticles = articlesByYear[year];
            content += `#### ${year} 年 (${yearArticles.length} 篇)\n\n`;
            
            yearArticles.forEach(article => {
                const dateStr = article.date.toISOString().split('T')[0];
                const emojiPrefix = article.emojis ? `${article.emojis} ` : '';
                content += `- ${dateStr} ${emojiPrefix}[${article.title}](${article.url})\n`;
            });
            
            content += '\n';
        });

    return content;
}

// 生成最终的 README.md
function generateReadme() {
    const files = getAllMarkdownFiles(DOCS_DIR);
    console.log(`找到 ${files.length} 个 markdown 文件`);

    const articles = files
        .map(file => getArticleInfo(file))
        .filter(article => article !== null)
        .sort((a, b) => b.date - a.date);

    console.log(`成功解析 ${articles.length} 篇文章`);

    // 统计信息
    const stats = {
        total: files.length,
        categories: {}
    };

    // 初始化所有类别的计数
    Object.keys(CATEGORY_EMOJIS).forEach(cat => {
        stats.categories[cat] = 0;
    });

    // 统计每个类别的文章数量
    files.forEach(file => {
        try {
            const content = fs.readFileSync(file, 'utf-8');
            const { data } = matter(content);
            const categories = Array.isArray(data.categories) ? data.categories : [];
            
            if (categories.length === 0) {
                stats.categories['other']++;
            } else {
                let matchedKnownCategory = false;
                categories.forEach(cat => {
                    const catLower = cat.toLowerCase();
                    if (stats.categories.hasOwnProperty(catLower)) {
                        stats.categories[catLower]++;
                        matchedKnownCategory = true;
                    }
                });
                
                if (!matchedKnownCategory) {
                    stats.categories['other']++;
                }
            }
        } catch (error) {
            console.warn(`统计类别时出错 (${file}):`, error);
            stats.categories['other']++;
        }
    });

    // 读取 DEFAULT.md
    let defaultContent = '';
    try {
        defaultContent = fs.readFileSync(DEFAULT_FILE, 'utf-8');
        console.log('成功读取 DEFAULT.md');
    } catch (error) {
        console.warn('未找到 DEFAULT.md，将只生成导览内容');
    }

    // 生成导览内容
    const mapContent = generateMapContent(articles, stats);

    // 合并内容并写入 README.md
    const readmeContent = defaultContent + mapContent;
    
    try {
        fs.writeFileSync(README_FILE, readmeContent, 'utf-8');
        console.log('README.md 生成成功！');
    } catch (error) {
        console.error('写入 README.md 失败:', error);
    }
}

// 执行生成
generateReadme(); 