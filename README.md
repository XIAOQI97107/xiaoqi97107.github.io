# 个人作品集

中文个人作品集，纯静态页面，支持移动端、浅色与深色模式，无构建依赖。

## 更新内容

编辑 `profile.js`，修改显示姓名、简介、联系方式、技能和项目。仅填写希望公开的内容；邮箱留空时不显示邮件入口。

```js
skills: ['技能名称', '工具名称'],
projects: [
  {
    title: '项目名称',
    description: '项目的用途，以及你完成的工作。',
    tags: ['领域', '工具'],
    url: 'https://github.com/XIAOQI97107/项目仓库',
  },
],
```

默认未填入真实项目和技能。页面会显示对应的空状态，补充资料后自动替换。

## GitHub Pages

仓库名：`xiaoqi97107.github.io`。

将本目录中的文件（含 `.nojekyll`）放在仓库 `main` 分支根目录，打开 Settings → Pages，选择 Deploy from a branch → main → /(root) → Save。

预期地址：`https://xiaoqi97107.github.io/`。只有部署完成后，该地址才可访问。

## 本地预览

在本目录运行 `python3 -m http.server 8000`，浏览器访问 `http://localhost:8000`。

参考：[GitHub Pages 官方指南](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)。
