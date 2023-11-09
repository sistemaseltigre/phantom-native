# Auth Modal

> This component was build with [Web3Auth SDK](https://web3auth.io/docs/product-fit/web3auth-for-wallets#using-web3auth-to-build-your-wallet).

## Available props

Before to use it, please read each prop:

`open = flag to show it in UI`

`onClose = function when user wants dismiss modal`

`method = 'done' | 'create' just both values to indicate process`

### Example

```
...
import AuthModal from '../../components/specific/authModal';
...
<AuthModal
    open={!!methodAuth}
    method={methodAuth}
    onClose={() => setMethodAuth('')}
/>
```

## How get Web3Auth accounts

Everytime when user links an account with Web3Auth, the component saves each account in global store, so you can get this info like this:

> Remember to use jwt_decode because Web3Auth uses this standar

```
...
import jwt_decode from 'jwt-decode';
import {Store, initialStateProps} from '../../../hooks/main_store';
...
const {state}: {state: initialStateProps} = React.useContext<any>(Store);
...
state.idTokens.forEach(token => console.log(jwt_decode(token)))
```
