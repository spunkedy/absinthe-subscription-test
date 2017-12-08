import {
  ApolloClient,
} from 'react-apollo';
import {createNetworkInterface} from 'apollo-phoenix-websocket'
import {Socket} from "phoenix"


const createClient = () =>  {
  const networkInterface = createNetworkInterface(
    {
      uri: 'ws://localhost:4000/socket',
      // how to send queries and mutations
       channel: {
         topic: '__absinthe__:control',
         event: 'doc',
       },

       // for using websocket subscriptions
       subscription: (subscriptionResponse) => ({
         topic: subscriptionResponse.subscriptionId,
         event: 'subscription:data',

         // extract the data from the event payload
         map: payload => payload.result.data,

         // what to do when unsubscribing
         off: controlChannel => {
           controlChannel.push('unsubscribe', {
             subscriptionId: subscriptionResponse.subscriptionId
           })
         }
       }),

       // If you want to reuse an existing Phoenix Socket, just provide a function
       // for APW to get it. By default, it will use the Phoenix Socket module.
       Socket: options => new Socket("/socket", {params: {token: window.userToken}}),
     })

  networkInterface.use([{
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {};  // Create the header object if needed.
      }
      next();
    }
  }]);
  const client = new ApolloClient({
    networkInterface,
  });
  return client;
}

export { createClient }
