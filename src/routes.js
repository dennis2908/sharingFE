import React from 'react';

const AddPost = React.lazy(() => import('./views/postmanagement/create-post/CreatePost'));
const ListPosts = React.lazy(() => import('./views/postmanagement/list-post/Posts'));
const Blog = React.lazy(() => import('./views/postmanagement/list-blog/Posts'));


const routes = [
  { path: '/postmanagement/addpost', name: 'Add Post', component: AddPost },
  { path: '/postmanagement/listpost', name: 'List Post', component: ListPosts },
  { path: '/postmanagement/blog', name: 'List Post', component: Blog },
    
];

export default routes;
