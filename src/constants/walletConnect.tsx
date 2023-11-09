export const configConnect = {
  requiredNamespaces: {
    eip155: {
      methods: [
        'eth_sendTransaction',
        'eth_signTransaction',
        'eth_sign',
        'personal_sign',
        // 'eth_signTypedData',
        'get_balance',
      ],
      chains: __DEV__ ? ['eip155:80001'] : ['eip155:1', 'aip155:137'],
      events: ['connect', 'disconnect'],
    },
  },
};

export const registerListeners = (signClient: any) => {
  if (signClient) {
    // console.log('listeners on');

    signClient.on('session_event', response => {
      // Handle session events, such as "chainChanged", "accountsChanged", etc.
      console.log('session_event: ', response);
    });

    signClient.on('session_update', ({topic, params}) => {
      const {namespaces} = params;
      const _session = signClient.session.get(topic);
      // Overwrite the `namespaces` of the existing session with the incoming one.
      const updatedSession = {..._session, namespaces};
      // Integrate the updated session state into your dapp state.
      console.log('session_event: ', updatedSession);
      // onSessionUpdate(updatedSession);
    });

    signClient.on('session_delete', response => {
      // Session was deleted -> reset the dapp state, clean up from user session, etc.
      console.log('session_delete: ', response);
    });

    signClient.on('session_proposal', event => {
      // Show session proposal data to the user i.e. in a modal with options to approve / reject it
      console.log('session_proposal: ', event);
    });

    signClient.on('session_request', event => {
      // Handle session method requests, such as "eth_sign", "eth_sendTransaction", etc.
      console.log('session_request: ', event);
    });

    signClient.on('session_ping', event => {
      // React to session ping event
      console.log('session_ping: ', event);
    });
  }
};

export const removeListeners = (signClient: any) => {
  if (signClient) {
    // console.log('listeners off');

    signClient.off('session_event', response => {
      // Handle session events, such as "chainChanged", "accountsChanged", etc.
      console.log('session_event off: ', response);
    });

    signClient.off('session_update', ({topic, params}) => {
      const {namespaces} = params;
      const _session = signClient.session.get(topic);
      // Overwrite the `namespaces` of the existing session with the incoming one.
      const updatedSession = {..._session, namespaces};
      // Integrate the updated session state into your dapp state.
      console.log('session_update off: ', updatedSession);
      // onSessionUpdate(updatedSession);
    });

    signClient.off('session_delete', response => {
      // Session was deleted -> reset the dapp state, clean up from user session, etc.
      console.log('session_delete off: ', response);
    });

    signClient.off('session_proposal', event => {
      // Show session proposal data to the user i.e. in a modal with options to approve / reject it
      console.log('session_proposal off: ', event);
    });

    signClient.off('session_request', event => {
      // Handle session method requests, such as "eth_sign", "eth_sendTransaction", etc.
      console.log('session_request off: ', event);
    });

    signClient.off('session_ping', event => {
      // React to session ping event
      console.log('session_ping off: ', event);
    });
  }
};
