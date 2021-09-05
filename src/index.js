import 'react-hot-loader/patch';
import { render } from 'react-dom';

import ApolloProvider from './ApolloProvider';

render(
    ApolloProvider,
    document.getElementById('app')
);

if (module.hot) {
    module.hot.accept();
}