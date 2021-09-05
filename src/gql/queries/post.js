import gql from 'graphql-tag';

export const FETCH_POSTS = gql`
    {
        getPosts {
            id title description createdAt
        }
    }
`;

export const FETCH_REPOS = gql`
    {
        getRepos {
            id
            name
            description
            url
            lang
            createdAt
            updatedAt
            pushedAt
            archived
            private
            fork
        }
    }
`;