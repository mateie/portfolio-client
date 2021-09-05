import React, { useRef } from 'react';
import { useQuery } from '@apollo/client';
import moment from 'moment';

import '../assets/less/Repo.less';

import { FETCH_REPOS } from '../gql/queries/post';

import { ProgressSpinner } from 'primereact/progressspinner';
import { DataScroller } from 'primereact/datascroller';
import { Button } from 'primereact/button';
import Pll from 'react-pll';

import NoneImage from '../assets/images/none.jpg';

const Repos = () => {
    const { loading, data: { getRepos: repos } = {} } = useQuery(FETCH_REPOS);
    const ds = useRef(null);

    const repoTemplate = repo => {
        return (
            <div className='p-col-12'>
                <div className='repo-item'>
                    {repo.lang ? (
                        <Pll
                            alt={`${repo.lang} Logo`}
                            language={repo.lang.toLowerCase()}
                        />
                    ) : (
                        <img
                            alt='none'
                            src={NoneImage}
                        />
                    )}
                    <div className='repo-detail'>
                        <div className='repo-name'>
                            {!repo.private ? (
                                <a className='p-text-bold' style={{ color: 'white' }} href={repo.url} rel='norefferer noopener' target='_blank'>
                                    {repo.name}
                                </a>
                            ) : (
                                <span className='p-text-bold'>
                                    {repo.name}
                                </span>
                            )}
                        </div>
                        <div className='repo-description p-text-italic'>
                            {repo.description ? (
                                repo.description
                            ) : (
                                'No Description'
                            )}
                        </div>
                        {repo.archived && (
                            <span className='repo-archived'>{repo.archived && 'Archived'}</span>
                        )}
                        {repo.private && (
                            <span className='repo-private'>{repo.privated && 'Private'}</span>
                        )}
                        {repo.fork && (
                            <span className='repo-fork'>{repo.fork && 'Fork'}</span>
                        )}
                    </div>
                    <div className='repo-extra'>
                        <span className='repo-last-push'>Last Push: {moment(repo.pushedAt).fromNow()}</span>
                        <br />
                        <span className='repo-last-update'>Last Update: {moment(repo.updatedAt).fromNow()}</span>
                        <br />
                        <span className='repo-created'>Created: {moment(repo.createdAt).fromNow()}</span>
                    </div>
                </div>
            </div>
        );
    };

    const footer = <Button type='text' icon='pi pi-plus' label='Load more' onClick={() => ds.current.load()} />;

    return (
        <div className='p-grid p-jc-center'>
            {loading ? (
                <div className='p-col p-text-center'>
                    <ProgressSpinner />
                    <h3 className='p-text-bold p-text-center' style={{ color: 'white' }}>
                        Loading Repos...
                    </h3>
                </div>
            ) : (
                <DataScroller
                    ref={ds}
                    value={repos}
                    itemTemplate={repoTemplate}
                    rows={3}
                    loader
                    footer={footer}
                    header={`Total Repos: ${repos.length}`}
                />
            )}
        </div>
    );
};

export default Repos;