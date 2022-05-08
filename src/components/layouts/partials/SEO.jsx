import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = ({ pageTitle, type }) => {

    const meta = {
        url: 'https://todo.com',
        title: 'Todo App Limited',
        description: 'Achieve your daily task easily',
        language: 'en-US',
        Image: 'https://i.ibb.co/rGch96S/seo.jpg',
        author: {
            email: 'hello@todo.com',
            name: 'Todo App Limited',
            image: 'https://i.ibb.co/rGch96S/seo.jpg',
        },
        site: {
            siteName: 'Todo App Limited',
            searchUrl: 'https://www.google.com/search?=Todo'
        }
    }
    return(
        <>
            <Helmet>

                <meta charSet="utf-8"></meta>
                <title>{type === 'main' ? meta.title + '-' + meta.description : pageTitle}</title>

                <meta name="description" content={meta.description}></meta>
                <meta name="keywords" content="todo, app"></meta>

                <meta itemprop="description" content={meta.description}></meta>
                <meta itemprop="image" content={meta.image}></meta>

                <meta name="twitter:card" content="summary_large_image"></meta>

                <meta name="twitter:site" content="@todo_tasks"></meta>
                <meta name="twitter:creator" content="@todo_tasks"></meta>
                <meta name="twitter:title" content="Todo Limited"></meta>
                <meta name="twitter:description" content={meta.description}></meta>
                <meta name="twitter:image" content={meta.image}></meta>
                
                <meta property="og:site_name" content="todo Limited"></meta>
                <meta property="og:title" content="Todo"></meta>
                <meta property="og:description" content={meta.description}></meta>
                <meta property="og:image" content={meta.image}></meta>
                <meta property="og:type" content="website"></meta>
                <meta property="og:url" content={meta.urll}></meta>
            </Helmet>
        </>
    )
}

export default SEO;