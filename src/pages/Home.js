import React from 'react';
import { useQuery } from '@apollo/client';

import { FETCH_POSTS } from '../gql/queries/post';

import { DataView } from 'primereact/dataview';
import { ProgressSpinner } from 'primereact/progressspinner';



const Home = () => {
    const { loading, data: { getPosts: posts } = {} } = useQuery(FETCH_POSTS);

    const renderPost = post => <div key={post.id}></div>;

    const postTemplate = post => {
        if (!post) return;

        return renderPost(post);
    };

    return (
        <div className='p-grid p-jc-center'>
            {loading ? (
                <div className='p-col p-text-center'>
                    <ProgressSpinner />
                    <h3
                        className='p-text-bold p-text-italic'
                    >
                        Loading Posts...
                    </h3>
                </div>
            ) : (
                <DataView
                    value={posts}
                    itemTemplate={postTemplate}
                    layout='grid'
                    paginator
                    rows={5}
                    rowsPerPageOptions={[5, 10, 15]}
                    emptyMessage='No Posts...'
                />
            )}
        </div>
    )
};

export default Home;