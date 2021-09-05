import React, { useContext } from 'react';
import { useHistory } from 'react-router';

import '../assets/less/Navigation.less';

import { AuthContext } from '../context/auth';

import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';

import { FaHome, FaUserGraduate, FaUserTie } from 'react-icons/fa';
import { BiGitRepoForked } from 'react-icons/bi';

const Navigation = () => {
    const { user } = useContext(AuthContext);

    const history = useHistory();

    const items = [
        {
            label: 'Home',
            command: () => history.push('/'),
            template: (item, options) => {
                return (
                    <Button
                        className='p-button-rounded p-button-text'
                        label={item.label}
                        onClick={options.onClick}
                        icon={<FaHome size='1.5em' />}
                        type='button'
                    />
                )
            },
        },
        {
            label: 'Repositories',
            command: () => history.push('/repos'),
            template: (item, options) => {
                return (
                    <Button
                        className='p-button-rounded p-button-text'
                        label={item.label}
                        onClick={options.onClick}
                        icon={<BiGitRepoForked size='1.5em' />}
                    />
                )
            }
        },
        {
            label: 'Education',
            command: () => history.push('/education'),
            template: (item, options) => {
                return (
                    <Button
                        className='p-button-rounded p-button-text'
                        label={item.label}
                        onClick={options.onClick}
                        icon={<FaUserGraduate size='1.5em' />}
                        type='button'
                    />
                )
            }
        },
        {
            label: 'About me',
            command: () => history.push('/about'),
            template: (item, options) => {
                return (
                    <Button
                        className='p-button-rounded p-button-text'
                        label={item.label}
                        onClick={options.onClick}
                        icon={<FaUserTie size='1.5em' />}
                        type='button'
                    />
                )
            }
        }
    ];

    return (
        user ? (
            <Menubar
                model={items}
            />
        ) : (
            <Menubar
                model={items}
            />
        )
    );
};

export default Navigation;