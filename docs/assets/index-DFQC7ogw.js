import{_ as R,r as h,c as p,e as s,j as w,F as I,n as S,D as G,E as D,G as L,C as A,d as v,p as V,t as C}from"./index-CSHMc4Yg.js";import{M as N}from"./index-_Dy2zPzC.js";const U=`你是一名专业的 AI 助手，负责回答关于"李想"的问题。以下是他的简历信息，请基于这些信息准确并完整回答，语气友好专业。

## 基本信息
- 姓名：李想
- 职位：前端开发工程师
- 邮箱：15879955069@163.com
- 电话：158-7995-5069
- 目前在广东深圳
- 江西萍乡人
- 本科学历
- Gitee：https://gitee.com/LiXiang--Gitee
- 2025届应届毕业生，热爱编程

## 工作经历

### 长沙万文学未来科技有限公司（2025.08 - 2026.04）前端开发
项目：开发并维护企业管理平台
技术栈：Vue3 + TypeScript + AG Grid + ECharts
主要职责：
- 基于 Axios 封装 RESTful API 请求模块，集成请求/响应拦截器，实现统一异常处理、状态码校验，提升接口稳定性
- 基于 Pinia 设计模块化状态管理方案，处理多模块复杂业务数据流，保障数据一致性
- 基于 AG Grid 实现万级数据列表的展示、筛选、排序功能，结合产品需求设计前端数据处理方案
工作业绩：
- 独立负责绩效管理模块 0-1 落地：完成需求对接、页面开发、接口联调与上线，支撑企业内部绩效流程线上化
- 针对万级大数据量场景实施前端性能优化：采用分页加载提升首屏体验，结合 Web Worker 处理复杂计算，降低主线程阻塞
- 跨团队协作：配合后端完成 AI 大模型接口对接，实现能力集成并上线至公司官网

### 湖南哆哆米科技有限公司（2025.04 - 2025.06）前端开发实习
项目：负责公司 PC端用户平台和微信小程序的前端页面开发
技术栈：Vue2 + Vuex + Element UI + Axios，uniapp + vue3
主要职责：
- 用Vue.js技术栈实现响应式布局，提升用户体验
- 基于Axios封装RESTful API请求模块，集成拦截器实现统一错误处理
- 采用Vuex进行全局状态管理，处理复杂业务数据流
- 使用ElementUI，确保界面设计既美观又实用

## 专业技能
- 熟练掌握前端三件套（HTML、CSS、JavaScript）
- 熟练使用 Vue2 和 Vue3 及其生态系统，包括 Vue-Router、Pinia 等
- 熟练使用 TypeScript，常与 Vue 结合使用令项目开发更加规范
- 熟悉前端性能优化与用户体验优化手段，包括路由懒加载、图片懒加载、防抖节流、Web Worker 等，能够针对首屏加载和运行时卡顿问题进行有效优化
- 丰富的 UI 组件库使用经验，包括 Element Plus、Ant Design、ECharts 和 uView 等类库
- 熟练使用 Uni-app 进行微信小程序及多端应用开发；掌握条件编译差异化处理各平台逻辑，能够进行跨平台应用开发，实现一套代码多端运行
- 熟悉 Electron，能够使用 Electron 进行桌面软件开发
- 熟练使用 AI 工具辅助，提升代码交付质量与开发效率
- 了解现代前端工程化工具，如 Webpack 和 Vite，熟悉 NPM 和 PNPM 等包管理工具

## 后端与扩展
- 熟悉 Node.js，熟悉 MySQL 相关语句，能够以 RESTful 风格完成 CRUD 接口开发
- 掌握 JWT 用户认证、大文件切片上传等常见场景


## 个人项目

### 爱尚学 - 智能教学管理系统
技术栈：uniapp + Vue 3 + Vite + Ant Design Vue + Element Plus + Pinia
- 采用小程序 + 后台管理双端架构，面向教育场景
- 实现课堂管理、作业发布与提交、签到、测验投票、公告通知等一站式教学互动功能
- 代码地址：https://gitee.com/LiXiang--Gitee/love-shangxue

## 求职意向
- 期望职位：前端开发工程师
- 期望城市：深圳
- 当前状态：离职 随时到岗

注意：
1. 使用Markdown语法组织内容
2. 层级用标题（#、##、###）区分
3. 列表用 - 或 1. 表示
4. 重要信息用**加粗**强调
5. 段落或者层级标题之间空一行，避免拥挤
如果问题超出简历范围，请说明你只了解简历中的信息。`,W="https://open.bigmodel.cn/api/paas/v4/chat/completions",j="8f5a253213334e1b843dc81720205127.enwaeEjUeO2qSN4Q";async function O(T,{signal:y,onDelta:f}={}){const m=await fetch(W,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${j}`},signal:y,body:JSON.stringify({model:"glm-4-flash",messages:T,stream:!0,max_tokens:4096,temperature:1})});if(!m.ok){const c=await m.json().catch(()=>({}));throw new Error(c.error?.message||`请求失败 (${m.status})`)}const i=m.body.getReader(),g=new TextDecoder;let r="";for(;;){const{done:c,value:u}=await i.read();if(c)break;r+=g.decode(u,{stream:!0});const e=r.split(`
`);r=e.pop()||"";for(const k of e){const d=k.trim();if(!d||!d.startsWith("data:"))continue;const b=d.slice(5).trim();if(b==="[DONE]")break;try{const _=JSON.parse(b).choices?.[0]?.delta?.content;_&&f&&f(_)}catch{}}}}const B={class:"ai-chat"},H={class:"chat-container"},q={class:"message-avatar"},J={class:"message-body"},Q=["innerHTML"],$={key:0,class:"typing-indicator"},F={key:0,class:"quick-questions"},K=["onClick"],z={class:"input-area"},X=["disabled"],Y=["disabled"],Z={__name:"index",setup(T){const y=new N({html:!1,breaks:!0,linkify:!0}),f=h(null),m=h(null),i=h(""),g=h(!1),r=h(!1),c=h(!1);let u=null;const e=h([{role:"assistant",content:"你好！我是基于李想简历信息的 AI 助手。你可以问我关于技能、经历、作品等问题，我会根据他的信息为你解答。"}]),k=[{label:"他会什么技术？",text:"他掌握了哪些技术栈？"},{label:"做过什么项目？",text:"他做过哪些代表性项目？"},{label:"工作经历？",text:"他的工作经历是什么？"},{label:"如何联系他？",text:"他的联系方式是什么？"}];function d(){A(()=>{f.value&&(f.value.scrollTop=f.value.scrollHeight)})}function b(n){i.value=n,x()}function E(n){return n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function _(n){return y.render(n)}function M(){u&&(u.abort(),u=null)}function P(){A(()=>A(()=>m.value?.focus()))}async function x(){const n=i.value.trim();if(!n||g.value)return;e.value.push({role:"user",content:E(n)}),i.value="",g.value=!0,c.value=!0,d();const a=e.value.filter(o=>o.role!=="typing").slice(0,-1).slice(-20).map(o=>({role:o.role,content:o.content.replace(/<[^>]*>/g,"")})),t=[{role:"system",content:U},...a,{role:"user",content:n}];e.value.push({role:"assistant",content:""});const l=e.value.length-1;c.value=!1,r.value=!0,d(),u=new AbortController;try{await O(t,{signal:u.signal,onDelta(o){e.value[l].content+=o,d()}})}catch(o){o.name==="AbortError"?e.value[l].content||(e.value[l].content="（已停止生成）"):e.value[l].content=`请求出错：${o.message}`}finally{u=null,g.value=!1,r.value=!1,d(),P()}}return(n,a)=>(v(),p("div",B,[s("div",H,[a[2]||(a[2]=s("h1",{class:"page-title"},"AI 助手",-1)),a[3]||(a[3]=s("p",{class:"page-subtitle"},"基于简历信息，智能回答问题（GLM-4.7-Flash）",-1)),s("div",{class:"chat-messages",ref_key:"messagesRef",ref:f},[(v(!0),p(I,null,S(e.value,(t,l)=>(v(),p("div",{class:V(["message",t.role]),key:l},[s("div",q,C(t.role==="user"?"你":"AI"),1),s("div",J,[s("div",{class:V(["message-text",{streaming:t.role==="assistant"&&l===e.value.length-1&&r.value}]),innerHTML:t.role==="assistant"?_(t.content):t.content},null,10,Q)])],2))),128)),c.value?(v(),p("div",$,a[1]||(a[1]=[s("div",{class:"dot"},null,-1),s("div",{class:"dot"},null,-1),s("div",{class:"dot"},null,-1)]))):w("",!0)],512),e.value.length<=1?(v(),p("div",F,[(v(),p(I,null,S(k,(t,l)=>s("button",{class:"quick-btn",key:l,onClick:o=>b(t.text)},C(t.label),9,K)),64))])):w("",!0),s("div",z,[G(s("input",{type:"text","onUpdate:modelValue":a[0]||(a[0]=t=>i.value=t),onKeydown:L(x,["enter"]),placeholder:"输入你的问题...",class:"chat-input",disabled:g.value,ref_key:"inputRef",ref:m},null,40,X),[[D,i.value]]),r.value||c.value?(v(),p("button",{key:0,class:"send-btn stop-btn",onClick:M}," 停止生成 ")):(v(),p("button",{key:1,class:"send-btn",onClick:x,disabled:!i.value.trim()}," 发送 ",8,Y))])])]))}},se=R(Z,[["__scopeId","data-v-d8b0565b"]]);export{se as default};
